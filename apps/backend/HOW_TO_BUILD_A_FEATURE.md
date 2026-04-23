# How to Build a New Feature in the Backend

This guide walks you through adding a brand-new feature step by step, using a **Ride** feature as a practical example. It also explains *why* each piece exists — not just *what* it is.

---

## The Big Picture

Every feature follows the same flow:

```
HTTP Request
     ↓
  Controller          ← receives the request, calls the service
     ↓
  Service (interface) ← defines what the feature can do
     ↓
  ServiceIpl          ← the actual implementation of the logic
     ↓
  Mapper              ← reads the JSON file and converts it to a DTO
     ↓
  JSON file           ← the raw data (replaces a database for now)
     ↓
  DTO (response)      ← the shaped object returned to the frontend
```

Each layer has exactly one job. This separation keeps the code clean and easy to change later.

---

## Step 1 — Create the JSON Data File

**Location:** `src/main/resources/data/`

Since we are not connected to a database yet, all data lives in JSON files. Each feature gets its own file here.

Create `src/main/resources/data/rides.json`:

```json
[
  {
    "id": "ride-001",
    "driverName": "Lel K.",
    "from": "Hauptbahnhof",
    "to": "Flughafen",
    "fare": 32.50,
    "date": "2026-04-15"
  },
  {
    "id": "ride-002",
    "driverName": "Thomas W.",
    "from": "Marktplatz",
    "to": "Klinikum",
    "fare": 14.80,
    "date": "2026-04-15"
  }
]
```

> **Neccessary:** The field names in the JSON must match the field names in your DTO exactly. Jackson (the library that reads the JSON) uses them to map values.

---

## Step 2 — Create the DTO

**Location:** `domain/dtos/responses/`

**What is a DTO?**
DTO stands for *Data Transfer Object*. It is a plain Java class that represents exactly what data gets sent to the frontend. It has no logic — only fields.

**Why not just send the raw entity/data directly?**
Because you don't want to expose your internal data structure to the outside world. A DTO lets you control exactly what the frontend sees, and you can reshape or rename fields without breaking anything internally.

Create `domain/dtos/responses/RideDto.java`:

```java
package com.zynqly.backend.domain.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideDto {
    private String id;
    private String driverName;
    private String from;
    private String to;
    private double fare;
    private String date;
}
```

The Lombok annotations (`@Data`, `@Builder`, etc.) automatically generate getters, setters, constructors, and builders so you don't have to write them by hand.

---

## Step 3 — Create the Mapper

**Location:** `domain/mappers/`

**What does the mapper do?**
The mapper reads the JSON file from the classpath and uses Jackson's `ObjectMapper` to convert the raw JSON into your DTO objects. That's its only job.

**Why a separate class?**
If you later switch from JSON files to a real database, you only rewrite the mapper. The service, controller, and DTO stay exactly the same.

Create `domain/mappers/RideMapper.java`:

```java
package com.zynqly.backend.domain.mappers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zynqly.backend.domain.dtos.responses.RideDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RideMapper {

    private final ObjectMapper objectMapper;

    public List<RideDto> fromJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("data/rides.json");
        try (InputStream in = resource.getInputStream()) {
            return objectMapper.readValue(
                in,
                objectMapper.getTypeFactory().constructCollectionType(List.class, RideDto.class)
            );
        }
    }
}
```

> **Note:** `ClassPathResource("data/rides.json")` automatically looks inside `src/main/resources/`, so you only need to write the relative path from there.

---

## Step 4 — Create the Service Interface

**Location:** `services/`

**What is a service interface?**
An interface in Java defines *what* a class can do, without saying *how* it does it. Think of it as a contract.

**Why use an interface instead of going straight to the implementation?**
- The controller only knows about the interface. It doesn't care about the implementation details.
- If you want to swap the implementation (e.g., from JSON to a database), you create a new class that implements the same interface. Zero changes needed in the controller.
- Unit testing becomes easy: you can create a fake (mock) implementation of the interface without touching the real code.

Create `services/RideService.java`:

```java
package com.zynqly.backend.services;

import java.util.List;
import com.zynqly.backend.domain.dtos.responses.RideDto;

public interface RideService {
    List<RideDto> getRides();
}
```

---

## Step 5 — Create the Service Implementation

**Location:** `services/ipl/`

This is where the actual logic lives. It implements the interface and calls the mapper.

Create `services/ipl/RideServiceIpl.java`:

```java
package com.zynqly.backend.services.ipl;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.dtos.responses.RideDto;
import com.zynqly.backend.domain.mappers.RideMapper;
import com.zynqly.backend.services.RideService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RideServiceIpl implements RideService {

    private final RideMapper rideMapper;

    @Override
    public List<RideDto> getRides() {
        try {
            return rideMapper.fromJson();
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to load ride data", e);
        }
    }
}
```

**Why wrap `IOException` in `UncheckedIOException`?**
`IOException` is a *checked exception* in Java, meaning every caller would have to handle it explicitly. By wrapping it in `UncheckedIOException` (which is unchecked), we let it bubble up naturally without forcing every layer to deal with it. Spring will handle it at the top level.

---

## Step 6 — Create the Controller

**Location:** `controllers/`

The controller is the entry point for HTTP requests. It maps a URL path to a method, calls the service, and returns the response.

Create `controllers/RideController.java`:

```java
package com.zynqly.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.domain.dtos.responses.RideDto;
import com.zynqly.backend.services.RideService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/rides")
@RequiredArgsConstructor
public class RideController {

    private final RideService rideService;

    @GetMapping
    public ResponseEntity<List<RideDto>> getRides() {
        return new ResponseEntity<>(rideService.getRides(), HttpStatus.OK);
    }
}
```

> **Important:** The controller depends on `RideService` (the **interface**), not `RideServiceIpl`. Spring automatically finds the correct implementation and injects it. This is called *Dependency Injection*.

---

## Full Checklist

When adding any new feature, create these files in this order:

| # | File | Location |
|---|------|----------|
| 1 | `rides.json` | `src/main/resources/data/` |
| 2 | `RideDto.java` | `domain/dtos/responses/` |
| 3 | `RideMapper.java` | `domain/mappers/` |
| 4 | `RideService.java` | `services/` |
| 5 | `RideServiceIpl.java` | `services/ipl/` |
| 6 | `RideController.java` | `controllers/` |

Follow this pattern for every feature and the codebase stays consistent, easy to navigate, and ready to swap out the JSON layer for a real database whenever the time comes.

package com.zynqly.backend.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.zynqly.backend.services.RideStartService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class RideStartControllerTest {
  private MockMvc mvc;

  @BeforeEach void setup() {
    mvc = MockMvcBuilders.standaloneSetup(new RideStartController(new RideStartService())).build();
  }

  @Test void createsAndRetrievesRide() throws Exception {
    var result = mvc.perform(post("/ride-starts").principal(() -> "driver-a").contentType("application/json")
        .content("""
            {"rideType":"PASSENGER","pickupAddress":" Graz Hbf ","destinationAddress":"Graz Flughafen"}
            """))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.status").value("STARTED"))
        .andExpect(jsonPath("$.pickupAddress").value("Graz Hbf"))
        .andExpect(jsonPath("$.startedAt").exists()).andReturn();
    mvc.perform(get(result.getResponse().getHeader("Location")).principal(() -> "driver-b"))
        .andExpect(status().isNotFound());
    mvc.perform(get(result.getResponse().getHeader("Location")).principal(() -> "driver-a"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.destinationAddress").value("Graz Flughafen"));
  }

  @Test void rejectsBlankDestination() throws Exception {
    mvc.perform(post("/ride-starts").principal(() -> "driver-a").contentType("application/json")
        .content("""
            {"rideType":"COURIER","pickupAddress":"Graz Hbf","destinationAddress":"  "}
            """))
        .andExpect(status().isBadRequest());
  }

  @Test void rejectsUnknownRideType() throws Exception {
    mvc.perform(post("/ride-starts").principal(() -> "driver-a").contentType("application/json")
        .content("""
            {"rideType":"INVALID","pickupAddress":"Graz Hbf","destinationAddress":"Graz Flughafen"}
            """))
        .andExpect(status().isBadRequest());
  }

  @Test void unknownRideReturnsNotFound() throws Exception {
    mvc.perform(get("/ride-starts/00000000-0000-0000-0000-000000000000").principal(() -> "driver-a"))
        .andExpect(status().isNotFound());
  }
}

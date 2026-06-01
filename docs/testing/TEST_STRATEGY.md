# Testing Strategy — Database Configuration

## 1. Project Structure

```
src/
├── main/
│   └── resources/
│       └── application.properties      # PostgreSQL (production)
└── test/
    └── resources/
        └── application-test.properties      # H2 (tests only)
```

---

## 2. Configuration

### `src/main/resources/application.properties`
Used when running the actual application.

```properties
# Database connection (JDBC)
# Connects to the Docker container mapped to your local machine
spring.datasource.url=jdbc:postgresql://localhost:5432/zynqly
spring.datasource.username=user
spring.datasource.password=zynqly
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate settings
# 'update' automatically creates/updates database tables based on your Java classes
spring.jpa.hibernate.ddl-auto=update

# SQL Logging (useful for debugging)
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Hibernate dialect for PostgreSQL
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### `src/test/resources/application-test.properties`
Used automatically during tests. Spins up a fresh H2 in-memory database for every test run.

```properties
spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

> `MODE=PostgreSQL` tells H2 to emulate PostgreSQL syntax as closely as possible.  
> `create-drop` means the schema is created on startup and dropped when the test context closes.

---

## 3. Activating the Test Profile

Annotate your test classes with `@ActiveProfiles("test")`. This tells Spring Boot to pick up the `application.properties` located in `src/test/resources/` instead of the main one.

```java
@SpringBootTest
@ActiveProfiles("test")
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void shouldCreateUser() {
        // runs against H2 in-memory — no Docker needed
    }
}
```

---

## 4. Required Dependency

Add H2 to `pom.xml` with `test` scope so it is never included in the production build:

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```

---

## Summary

- **Never** run tests against the PostgreSQL Docker instance.
- **Always** use `@ActiveProfiles("test")` on Spring Boot test classes.
- H2 starts and stops automatically — no setup needed.
- The production database is never touched during a test run.

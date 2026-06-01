# E2E Testing Guide

This document describes the full end-to-end (E2E) test infrastructure for Zynqly: what it spins up, why, and how to run it.

---

## Overview

E2E tests verify the full stack — frontend UI, backend API, and database — running together in a realistic environment. Three services must be running at the same time:

| Service | Tech | Port |
|---|---|---|
| Test database | PostgreSQL (Docker) | `5433` |
| Test backend | Spring Boot (`e2e` profile) | `8081` |
| Frontend under test | Next.js (`staging` Infisical env) | `3000` |

Tests are written with **Playwright** and live in `apps/web/new/__tests__/e2e/`.

---

## Key Files

| File | Purpose |
|---|---|
| `docker-compose.test.yml` *(repo root)* | Spins up a dedicated PostgreSQL container for E2E tests |
| `apps/backend/src/main/resources/application-e2e.properties` | Spring Boot config for the `e2e` profile (points to port 5433) |
| `apps/web/new/playwright.config.ts` | Playwright configuration (baseURL, browsers, webServer) |
| `apps/web/new/__tests__/e2e/` | All E2E test specs |
| `apps/web/new/package.json` | npm scripts that wire everything together |

---

## `npm run dev` vs. `npm run test`

Both commands start Next.js, but they load **different secrets** via [Infisical](../setup/INFISICAL.md):

```jsonc
// apps/web/new/package.json
"dev":  "infisical run --env=dev     --path=/web -- next dev",
"test": "infisical run --env=staging --path=/web -- next dev -p 3000"
```

- **`npm run dev`** — pulls secrets from the `dev` environment in Infisical. Used for day-to-day development. Starts on the default Next.js port (`3000` unless otherwise configured).
- **`npm run test`** — pulls secrets from the `staging` environment in Infisical and **explicitly binds to port `3000`**. This is the command that Playwright's `webServer` block runs during E2E tests, so the frontend is always reachable at `http://localhost:3000`.

> The terminal output looks like this when the test server starts:
> ```
> > new@0.1.0 test
> > infisical run --env=staging --path=/web -- next dev -p 3000
> ```

---

## npm Scripts (all E2E-related)

All scripts are run from `apps/web/new/`.

| Script | What it does |
|---|---|
| `npm run e2e:db-up` | Starts the test PostgreSQL container (`zynqly-test-db`) on port `5433` |
| `npm run e2e:db-down` | Stops and removes the test PostgreSQL container |
| `npm run e2e:backend` | Starts Spring Boot from `apps/backend` with the `e2e` Spring profile on port `8081` |
| `npm run test:e2e` | **Full pipeline** — runs all of the above together (see below) |

---

## Full Pipeline: `npm run test:e2e`

```jsonc
"test:e2e": "npm run e2e:db-up && concurrently -k -s first \"npm run e2e:backend\" \"npx playwright test --ui\" && (fuser -k 8081/tcp || true) && sleep 2 && npm run e2e:db-down"
```

Step by step:

1. **`npm run e2e:db-up`** — brings up the Docker test database and waits for it to be ready.
2. **`concurrently`** starts two processes in parallel:
   - `npm run e2e:backend` — Spring Boot with the `e2e` profile.
   - `npx playwright test --ui` — Playwright UI. Playwright's `webServer` block (in `playwright.config.ts`) automatically starts Next.js via `npm run test` before running any tests.
3. **`-k -s first`** flag means: once Playwright exits (tests done), kill the backend process too.
4. **`fuser -k 8081/tcp`** — force-releases port `8081` in case the backend process didn't exit cleanly.
5. **`npm run e2e:db-down`** — tears down the Docker container so nothing is left running.

---

## Docker: Test Database

Defined in `docker-compose.test.yml` at the repo root:

```yaml
services:
  db-e2e:
    image: postgres:17.7
    container_name: zynqly-test-db
    environment:
      - POSTGRES_USER=testuser
      - POSTGRES_PASSWORD=testpass
      - POSTGRES_DB=zynqly-test
    ports:
      - "5433:5432"   # host 5433 → container 5432
```

Port `5433` is intentionally different from the main dev database (port `5432`) so both can run simultaneously without conflict.

---

## Spring Boot: `e2e` Profile

`apps/backend/src/main/resources/application-e2e.properties` is activated by passing `-Dspring-boot.run.profiles=e2e` to Maven:

```properties
# Points to the Docker test DB on port 5433
spring.datasource.url=jdbc:postgresql://localhost:5433/zynqly-test
spring.datasource.username=testuser
spring.datasource.password=testpass

# Recreates the schema on every test run (clean state)
spring.jpa.hibernate.ddl-auto=create-drop

# Disables Spring Boot's automatic Docker Compose startup
spring.docker.compose.enabled=false

# Uses port 8081 so it doesn't clash with the main backend (8080)
server.port=8081
```

`ddl-auto=create-drop` means the database schema is created fresh when Spring Boot starts and dropped again when it shuts down — every test run starts with a clean database.

---

## Playwright Configuration

`apps/web/new/playwright.config.ts`:

```ts
export default defineConfig({
  testDir: "__tests__/e2e",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit",   use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "npm run test",         // starts Next.js with staging secrets
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

- Tests run against both **Chromium** and **WebKit** (Safari engine).
- `reuseExistingServer: true` locally — if you already have `npm run test` running, Playwright won't start a second instance.
- In CI (`process.env.CI`), a fresh server is always started and retries are set to `2`.

---

## Test Suite

Tests are in `apps/web/new/__tests__/e2e/ride-history.spec.ts`.

| Group | Tests |
|---|---|
| **Search** | By ID, by city, no results |
| **Filters › Type** | Boten only, Passagier only |
| **Filters › Settlement** | Karte only, Bar only |
| **Filters › Status** | Abgeschlossen, Storniert, Ausstehend |
| **Filters › Reset** | Resets all active filters |
| **Filters › Combined** | Type + Settlement, Type + Search |
| **Pagination** | Page size, prev disabled on page 1, next navigates, prev returns, next disabled on last page |

---

## Running E2E Tests

Make sure you have Docker running, then from `apps/web/new/`:

```bash
npm run test:e2e
```

That's the only command you need — it handles the database, backend, and frontend automatically.

### Running a single spec manually

If you want to iterate on a specific test without the full pipeline:

```bash
# Terminal 1 — test DB
npm run e2e:db-up

# Terminal 2 — backend
npm run e2e:backend

# Terminal 3 — Playwright (frontend is started automatically by the webServer block)
npx playwright test --ui
```

---

## Prerequisites

| Tool | Required for |
|---|---|
| Docker | Test database |
| Java 21 + Maven (via `mvnw`) | Spring Boot backend |
| Node.js 20+ | Next.js + Playwright |
| Infisical CLI | Loading secrets for `npm run test` |

Make sure the Infisical CLI is authenticated before running E2E tests. See [INFISICAL.md](../setup/INFISICAL.md) for setup instructions.

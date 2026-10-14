# Zynqly Documentation

Central place for all project documentation. Files are grouped by topic so you
can tell at a glance what each one covers.

| Area | Document | What it covers |
|------|----------|----------------|
| **API** | [api/AUTH.md](api/AUTH.md) | JWT auth system: how the backend issues tokens and how the clients consume them |
| **API** | [openapi.yaml](openapi.yaml) | OpenAPI 3 contract for every endpoint (rendered by the Swagger UI container) |
| **Backend** | [backend/HOW_TO_BUILD_A_FEATURE.md](backend/HOW_TO_BUILD_A_FEATURE.md) | Step-by-step guide for adding a new backend feature |
| **Backend** | [backend/DATABASE_GUIDE.md](backend/DATABASE_GUIDE.md) | Starting PostgreSQL via Docker and connecting with DBeaver or Spring Boot |
| **Frontend** | [frontend/DATA_TESTID_CONVENTION.md](frontend/DATA_TESTID_CONVENTION.md) | Naming convention for `data-testid` attributes |
| **Testing** | [testing/E2E_TESTING.md](testing/E2E_TESTING.md) | End-to-end test infrastructure: setup, services, and running Playwright |
| **Testing** | [testing/TEST_STRATEGY.md](testing/TEST_STRATEGY.md) | Overall testing strategy and conventions |
| **Setup** | [setup/INFISICAL.md](setup/INFISICAL.md) | Secret management with Infisical (replaces local `.env` files) |

> Note: `README.md` and `CONTRIBUTING.md` stay at the repository root by
> convention (GitHub surfaces them automatically). `AGENTS.md` / `CLAUDE.md`
> stay next to the code they instruct, since the AI tooling loads them by path.

## Viewing the API docs

```bash
docker compose up swagger-ui   # then open http://localhost:8082
```

The Swagger UI container reads [`openapi.yaml`](openapi.yaml) directly from this
folder (mounted via `docker-compose.yml`).

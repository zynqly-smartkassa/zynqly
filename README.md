# Zynqly

## What is it about?

The goal of this project is to create a modern register system initially designed for taxi companies.
In the future, the system will be expanded and adapted for other business sectors.

### Key Features

- **Registering Rides**
- **Map with navigation**
- **All rides documented and saved in a database**
  - **Sorting functionality**
- **Dynamically generated invoice that gets saved in a storage**
- **All invoices documented**
  - **PDF Viewer in App**
  - **Scannable QR Code to access invoice via an URL**
  - **Downloadable**
- **Dashboard with Analytics**
- **Safe Authentication System**
- **Mobile App for both iOS and Android**

---

## Project Documentation

All project documentation lives centrally under [`docs/`](docs/README.md) —
see that index for the full list. Quick links:

| File | Description |
|------|-------------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | Git branching strategy, commit conventions, and general contribution workflow |
| [docs/](docs/README.md) | Central documentation index (API, backend, frontend, testing, setup) |
| [docs/backend/DATABASE_GUIDE.md](docs/backend/DATABASE_GUIDE.md) | How to start the PostgreSQL database via Docker and connect with DBeaver or Spring Boot |
| [docs/setup/INFISICAL.md](docs/setup/INFISICAL.md) | Secret management setup using Infisical — replaces local `.env` files |
| [docs/testing/E2E_TESTING.md](docs/testing/E2E_TESTING.md) | Full end-to-end test infrastructure: setup, services involved, and how to run Playwright tests |
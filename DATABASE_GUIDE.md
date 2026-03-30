# Database Setup & Connectivity Guide 🐘

This guide explains how to start the PostgreSQL database using Docker and how to connect to it using DBeaver or Spring Boot.

---

## 1. Starting the Database

We use **Docker Compose** to run PostgreSQL 18. This ensures everyone on the team uses the exact same database version without needing to install PostgreSQL locally on their OS.

**Command:**
Navigate to the project root and run:

```bash
docker compose up -d
```

### Understanding Docker Components

- **Container:** A lightweight, isolated environment running the PostgreSQL engine.
- **Volume (`zynqly_v18_data`):** This is the persistent storage. Without a volume, all your data (users, tables) would be deleted as soon as the container stops. The volume maps a folder inside the container to a safe spot on your hard drive.
- **Port Mapping (`5432:5432`):** This connects the database port inside the container to your local machine (`localhost`).

---

## 2. Connecting with DBeaver

To browse the data manually, follow these steps in DBeaver:

1. Click: `File` → `New` → `Database Connection`
2. Select: `PostgreSQL`
3. **Main Settings:**
   - Host: `localhost`
   - Port: `5432`
   - Database: `zynqly`
   - Username: `user`
   - Password: `password`
4. **Driver Check:** If DBeaver asks to download "PostgreSQL Driver Files", click **Download**. It needs these files to talk to version 18.
5. **Test Connection:** Click "Test Connection" to verify.

---

## 3. Connecting with Spring Boot

The application is pre-configured to connect to this Docker instance. The settings are located in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/zynqly
spring.datasource.username=user
spring.datasource.password=password
```

---

## 4. Troubleshooting

- **Port already in use:** If you have a local PostgreSQL installed on your Linux/Windows, it might block port `5432`. Stop the local service first:
  ```bash
  sudo systemctl stop postgresql
  ```

- **Fresh Start:** If the database becomes corrupted or you want to wipe all data:
  ```bash
  docker compose down -v
  docker compose up -d
  ```
  > ⚠️ The `-v` flag deletes the volume and **all stored data**!

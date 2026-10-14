# How to Run the Mobile App on an Emulator

This guide lists everything that has to run, and every argument you have to pass,
to see real data from the backend in the Flutter app on an Android emulator.

---

## 1. What has to run (in this order)

| # | What | Command | Where | Ready when |
|---|------|---------|-------|------------|
| 1 | Docker Desktop | start the application | Windows | "Engine running" (check: `docker info`) |
| 2 | Database + Swagger UI | `docker compose up -d` | repo root | `docker ps` lists `zynqly-db` and `zynqly-swagger` |
| 3 | Backend | `./mvnw spring-boot:run` | `apps/backend` | log shows `Started BackendApplication` |
| 4 | Android emulator | `flutter emulators --launch <id>` | anywhere | Android home screen is visible |
| 5 | The app | `flutter run --dart-define-from-file=dev.json` | `apps/mobile` | app opens in the emulator |

Keep the backend terminal and the `flutter run` terminal open. Each one needs its own window.

---

## 2. One-time setup

### 2.1 Backend signing key

The backend needs a `jwt.secret` (at least 32 characters) to sign tokens. Without it the
start fails with `Could not resolve placeholder 'jwt.secret'`.

Create `apps/backend/src/main/resources/application-local.properties` (it is git-ignored):

```properties
jwt.secret=<your-own-random-key-without-quotes>
```

Generate a key with `openssl rand -base64 48`. Use a different key for staging and
production, and never commit it. Alternative for a single terminal session:
`export JWT_SECRET="..."` before `./mvnw spring-boot:run`.

### 2.2 Dev user

Every endpoint except `/auth/**` needs a JWT, so the app signs in with a dev user.
Create it once (it stays in the database volume):

1. Open Swagger UI at `http://localhost:8082`.
2. In the **Servers** dropdown select `http://localhost:8080/api/v1`.
   **Never use the Vercel server**, it is the production system.
3. `POST /auth/sign-up` → **Try it out**, body:

   ```json
   {
     "name": "Dev User",
     "email": "dev@zynqly.test",
     "phone": "0123456789",
     "password": "secret1",
     "role": "FAHRER"
   }
   ```

4. **Execute**. Expected: `201`. `400` with "already taken" means the user already exists.

Validation rules: name ≥ 2, phone ≥ 10, password ≥ 6 characters, valid email,
role is `UNTERNEHMER`, `FAHRER` or `BUCHHALTER`.

Or with curl:

```bash
curl -X POST http://localhost:8080/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"Dev User","email":"dev@zynqly.test","phone":"0123456789","password":"secret1","role":"FAHRER"}'
```

### 2.3 App config file

```bash
cd apps/mobile
cp dev.example.json dev.json
```

`dev.json` is git-ignored. Its email and password must match the dev user from 2.2.

### 2.4 Emulator

If `flutter emulators` lists no device, create one in Android Studio:
**Device Manager → Create Device**, pick a device (e.g. Pixel 8) and download a system image.

---

## 3. Starting the emulator

```bash
flutter emulators                      # list available emulators and their ids
flutter emulators --launch <id>        # start one, e.g. Pixel_8_Pro
flutter devices                        # confirm it is detected
```

In VS Code you can also click the device in the status bar and choose **Start Emulator**.

The emulator is only a virtual phone. Starting it does **not** start the app.
`flutter run` builds the app and installs it on the running emulator.

---

## 4. Starting the app

From `apps/mobile`:

```bash
flutter run --dart-define-from-file=dev.json
```

If several devices are connected, pick one with `flutter run -d <device-id>`.

### Arguments the app needs

They are compile-time values, passed through `--dart-define-from-file=dev.json`:

| Key | Meaning | Default |
|-----|---------|---------|
| `API_BASE_URL` | Backend address including the context path | `http://10.0.2.2:8080/api/v1` |
| `DEV_EMAIL` | Email of the dev user | none (required) |
| `DEV_PASSWORD` | Password of the dev user | none (required) |

- `10.0.2.2` is the emulator's alias for the host's `localhost`. Inside the emulator,
  `localhost` is the emulator itself.
- On a physical device use your computer's IP in the same Wi-Fi, e.g.
  `http://192.168.0.12:8080/api/v1`.
- Without `DEV_EMAIL` and `DEV_PASSWORD` the screen shows "Dev login is not configured".
- Single values also work: `--dart-define=DEV_EMAIL=... --dart-define=DEV_PASSWORD=...`.

When the app has opened, tap **History** in the bottom navigation. The default tab is Home.

---

## 5. While the app runs

Keys for the terminal where `flutter run` is active:

| Key | Action | When to use |
|-----|--------|-------------|
| `r` | Hot reload, keeps state | code changes in widgets |
| `R` | Hot restart, resets state | changed initial values, `main()`, providers; also signs in again |
| `q` | Quit | |

Changes to `pubspec.yaml`, to native Android files, and to the `--dart-define` values
need a **full restart**: press `q` and run the command again.

The access token is valid for 15 minutes and is not refreshed yet. After that the list
shows an error. Pull down to refresh (signs in again) or press `R`.

---

## 6. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `error during connect: ... dockerDesktopLinuxEngine` | Docker Desktop is not running | start it, wait for "Engine running", check `docker info` |
| Swagger shows "Failed to fetch" | backend not running or wrong server selected | start the backend, select `localhost:8080` |
| Backend: `Could not resolve placeholder 'jwt.secret'` | no signing key | see 2.1 |
| App: "Server nicht erreichbar." | backend is down or the URL is wrong | start the backend, check `API_BASE_URL` |
| App: "Anmeldung fehlgeschlagen oder abgelaufen." (401) | wrong email or password, user does not exist, or token expired | create the user (2.2), match `dev.json`, pull to refresh |
| App: "Dev login is not configured" | started without `dev.json` | quit and run with `--dart-define-from-file=dev.json` |
| `flutter run` asks for a device | several devices available | choose the emulator or use `-d <id>` |
| Port 8080 already in use | another backend instance is running | stop it, then start again |
| `Could not find an option named "--launch"` | `--launch` belongs to `flutter emulators`, not `flutter run` | `flutter emulators --launch <id>` |

---

## 7. Checks before a commit

```bash
cd apps/mobile
flutter analyze
flutter test
```

The tests use fake repositories and do not need the backend, the database or an emulator.

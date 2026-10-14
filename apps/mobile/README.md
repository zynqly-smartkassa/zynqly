# Zynqly Mobile

Flutter app for Zynqly. The API contract is `docs/openapi.yaml`.

## Run against the local backend

1. **Database:** `docker compose up -d` in the repository root.
2. **Backend:** `./mvnw spring-boot:run` in `apps/backend` (port 8080, context path `/api/v1`).
3. **Dev user (once):** create it with `POST /auth/sign-up`, for example via Swagger UI at
   `http://localhost:8082`, using the email and password from your `dev.json`:

   ```json
   {
     "name": "Dev User",
     "email": "dev@zynqly.test",
     "phone": "0123456789",
     "password": "secret1",
     "role": "FAHRER"
   }
   ```

4. **App config (once):** `cp dev.example.json dev.json`. `dev.json` is git-ignored.
5. **Start an emulator**, then in `apps/mobile`:

   ```bash
   flutter run --dart-define-from-file=dev.json
   ```

`API_BASE_URL` defaults to `http://10.0.2.2:8080/api/v1`, the Android emulator's
alias for the host's `localhost`. Use your computer's IP for a physical device.

The access token lives 15 minutes and is not refreshed yet. Hot restart (`R`) signs in again.

## Checks

```bash
flutter analyze
flutter test
```

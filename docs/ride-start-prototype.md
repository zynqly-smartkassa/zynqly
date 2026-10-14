# Ride start prototype

The mobile New Ride tab now opens the ride preparation screen. Pickup and destination can be edited by tapping their fields. Starting a ride sends its type and addresses to Spring Boot and shows the returned ride ID.

This prototype stores rides only in memory and clears them on backend restart. It does not update the team database or the history screen. Pricing is illustrative and the map is a painted background, without GPS or routing.

## Backend contract

The existing `/api/v1` context path applies. POST `/api/v1/ride-starts` validates the ride type (`PASSENGER` or `COURIER`) and nonblank addresses (maximum 300 characters). It returns 201, an ID, start time and STARTED status. GET `/api/v1/ride-starts/{id}` returns a ride belonging to the authenticated user, or 404. Existing team authentication remains required; no security configuration is changed.

## Run

Use the team's configured backend and an existing account. Pass a valid access token at build time using `RIDE_API_TOKEN`. Do not commit credentials or tokens. `RIDE_API_URL` is the full API base, including `/api/v1`; it defaults to localhost on iOS and 10.0.2.2 on Android, port 8080. A physical device needs the host's reachable address and applicable platform network permissions. This client targets native mobile, not Flutter Web.

Example (replace the placeholder locally):

```sh
flutter run --dart-define=RIDE_API_URL=http://localhost:8080/api/v1 --dart-define=RIDE_API_TOKEN=YOUR_ACCESS_TOKEN
```

A timeout may leave the outcome unknown; check the server before retrying. Automatic retry and server-side idempotency are not implemented. This is a prototype for review, not a complete trip lifecycle.

## Checks

```sh
cd apps/backend
./mvnw -Dtest=RideStartControllerTest test
cd ../mobile
flutter analyze lib/features/dashboard lib/core/theme/app_colors.dart
flutter test test/features/dashboard/ride_start_api_test.dart
```

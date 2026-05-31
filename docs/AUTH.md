# Authentication

> Reference for the Zynqly auth system: how the backend issues JWTs, how the
> Next.js web client consumes them, and how a future Flutter integration
> should look.

This document targets the engineers who maintain the backend and the
frontends. The endpoint contracts themselves live in
[`openapi.yaml`](./openapi.yaml) and are browsable via the Swagger container
(`docker compose up swagger-ui`, then open <http://localhost:8082>).

---

## 1. Overview

The platform uses **stateless JWT authentication** with two tokens:

| Token         | Lifetime  | Transport                                    | Purpose                                    |
| ------------- | --------- | -------------------------------------------- | ------------------------------------------ |
| Access token  | 15 min    | `Authorization: Bearer <token>` header       | Authenticates every API call               |
| Refresh token | 30 days   | HTTP-only cookie `refresh_tk` (`Path=/`)     | Used only to mint new access tokens        |

The backend keeps **no server-side session**. Signing out is a pure client
operation: drop the refresh cookie and the user becomes anonymous again.

```
┌──────────┐  POST /auth/sign-in            ┌──────────┐
│  Client  │ ─────────────────────────────▶ │ Backend  │
│          │                                │ (Spring) │
│          │ ◀── 200 { accessTk, ... }      │          │
│          │ ◀── Set-Cookie: refresh_tk     │          │
└──────────┘                                └──────────┘
      │
      │  Authorization: Bearer <accessTk>
      ▼
   /dashboard, /receipts, /ride-history, ...
```

When the access token expires the client calls `GET /auth/access-tk`. The
backend reads the refresh cookie from the request, validates it, and answers
with a fresh access token (the refresh cookie itself is **not** rotated).

---

## 2. Backend (Spring Boot)

Source: [`apps/backend/src/main/java/com/zynqly/backend/auth`](../apps/backend/src/main/java/com/zynqly/backend/auth)

### Module layout

```
auth/
├── AuthController.java          # POST /sign-up, /sign-in, GET /access-tk
├── AuthService.java             # Sign-up + credential authentication
├── JwtService.java              # JWT create / parse / extract
├── config/
│   ├── JacksonConfig.java       # Java time module for date serialisation
│   └── WebConfig.java           # Legacy CORS for /api/**
├── dto/
│   ├── TkName.java              # ACCESS | REFRESH discriminator
│   ├── requests/
│   │   ├── SignInAccountRequestDto.java
│   │   └── SignUpAccountRequestDto.java   # includes Role enum
│   └── responses/
│       ├── AuthResponseDto.java
│       └── SignUpAccountResponseDto.java
└── security/
    ├── CustomUserDetails.java
    ├── CustomUserDetailsService.java
    ├── JwtAuthFilter.java       # Spring filter that validates each request
    └── config/
        ├── CorsConfig.java
        └── SecurityConfig.java  # Filter chain, password encoder, CORS source
```

### Token contents

Each JWT is signed with HMAC-SHA256 (`HS256`) using `jwt.secret` from
`application.properties`. The signed claims are:

- `sub` — the user's email (also serves as the Spring Security principal name)
- `iat` — issued-at timestamp
- `exp` — expiration timestamp (15 min for access, 30 days for refresh)
- `type_tk` — `ACCESS` or `REFRESH`

The email is the canonical identifier inside the security context. If you
ever need the persisted UUID, cast the principal to
[`CustomUserDetails`](../apps/backend/src/main/java/com/zynqly/backend/auth/security/CustomUserDetails.java)
and call `getId()`.

### Filter chain

`SecurityConfig` registers `JwtAuthFilter` before
`UsernamePasswordAuthenticationFilter`:

1. The filter reads the `Authorization: Bearer ...` header via
   `JwtService#extractAccesTk`.
2. The token is validated (signature, expiry) and the matching user is
   loaded via `CustomUserDetailsService`.
3. The resulting `UserDetails` is published as an authenticated
   `UsernamePasswordAuthenticationToken` in the `SecurityContextHolder`.
4. The user's email is also exposed as the request attribute `"email"` for
   controllers that prefer reading it directly.

Invalid or missing tokens are **silently** dropped; the request continues
unauthenticated and any downstream rule (Spring Security or `@PreAuthorize`)
decides whether to reject it.

### Public vs. protected routes

`SecurityConfig#securityFilterChain` currently sets:

- `OPTIONS /**` → permit all (CORS preflight)
- `/auth/**` → permit all (the auth endpoints themselves)
- `anyRequest()` → `permitAll()` (open while we are migrating endpoints)

> ⚠️ The blanket `permitAll()` at the bottom will be tightened once every
> controller has its `@PreAuthorize` or matcher in place. Use the
> `ROLE_UNTERNEHMER`, `ROLE_FAHRER`, `ROLE_BUCHHALTER` authorities granted by
> `CustomUserDetails#getAuthorities()`.

### Error responses

| Cause                                  | Status | Body                                           |
| -------------------------------------- | ------ | ---------------------------------------------- |
| Field validation fails (`@Valid`)      | 400    | Spring's default validation envelope           |
| Email or phone already taken           | 400    | `ApiError` with `errors[]` (one per field)     |
| Wrong credentials on `/sign-in`        | 401    | `ApiError` with `message = "..."` (generic)    |
| Missing `refresh_tk` on `/access-tk`   | 401    | `text/plain` `"The refresh token is missing"`  |
| Unhandled exception                    | 500    | `ErrorResponse` envelope                       |

All mapping happens in
[`GlobalExceptionHandler`](../apps/backend/src/main/java/com/zynqly/backend/common/exception/GlobalExceptionHandler.java).

### Configuration

`application.properties` keys that matter for auth:

```properties
server.servlet.context-path=/api/v1    # everything below is mounted under here
jwt.secret=<at least 32 bytes>         # HMAC-SHA256 signing key
```

The CORS allow-list lives in `SecurityConfig#corsConfigurationSource()` and
reads the comma-separated `FRONTEND_URL` environment variable (default
`http://localhost:3000`).

---

## 3. Web client (Next.js + RTK)

Source: [`apps/web`](../apps/web)

The browser **never sees the refresh token** — it is HTTP-only and lives in
a cookie. All refresh-cookie reads and writes happen inside Next.js server
actions so the cookie stays out of client JavaScript.

### Files involved

| File                                                              | Role                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`actions/auth-action.ts`](../apps/web/actions/auth-action.ts)    | Server actions: `signUpAction`, `signInAction`, `getAccessTkAction`, `deleteRefreshCookie` |
| [`redux/api/apis/auth.ts`](../apps/web/redux/api/apis/auth.ts)    | RTK Query endpoints wrapping the server actions                                 |
| [`redux/api/apiSlice.ts`](../apps/web/redux/api/apiSlice.ts)      | Base query that injects the cached `accessTk` as `Authorization` header         |
| [`components/AuthProvider.tsx`](../apps/web/components/AuthProvider.tsx) | Gate that delays the app shell until an access token is resolved          |
| [`proxy.ts`](../apps/web/proxy.ts)                                | Next.js middleware that gates page routes by the presence of `refresh_tk`       |
| [`components/Header.tsx`](../apps/web/components/Header.tsx)      | Sign-out trigger (`deleteRefreshCookie` + redirect)                             |

### Sign-in / sign-up flow

```
SignInPage  ─▶ useSignInMutation  ─▶ signInAction (server)
                                        │
                                        │ axios.post /api/v1/auth/sign-in
                                        ▼
                                     Spring backend
                                        │
                                        │ Set-Cookie: refresh_tk
                                        │ { accessTk, expiresIn }
                                        ▼
                            setRefreshCookie() re-writes cookie
                            via next/headers cookies()
                                        │
                                        ▼
                              { success: true, data }
                                        │
RTK cache  ◀── onQueryStarted updateAuthCache fills getAccessTk(undefined)
```

After a successful mutation the access token is **immediately available** in
the RTK cache under the key `getAccessTk(undefined)`. The shared
`apiSlice.prepareHeaders` reads it and injects `Authorization: Bearer ...`
into every subsequent API call.

### Page gating

There are two gates in place:

1. **Middleware (`proxy.ts`)** — runs on every page navigation. If the
   `refresh_tk` cookie is missing and the user is not on `/`, `/sign-in` or
   `/sign-up`, they are redirected to `/sign-in`. Conversely, an already
   logged-in user hitting `/sign-in` or `/sign-up` is bounced to
   `/dashboard`.
2. **`AuthProvider`** — wraps the authenticated app shell
   (`app/(shell)/layout.tsx`). On mount it calls `useGetAccessTkQuery`,
   which triggers `getAccessTkAction` on the server. While the token is in
   flight it renders a loading placeholder.

### Refresh flow

The current `getAccessTk` query has `keepUnusedDataFor: 900` (15 min), which
matches the access-token lifetime. When the cache entry expires RTK calls
the server action again, which forwards the refresh cookie to the backend
and stores the new access token in the cache.

> A scheduled silent refresh (e.g. ~1 min before expiry) is a follow-up
> improvement; today the next API call after expiry will trigger a refresh
> via the cache miss.

### Sign-out

`Header.tsx` calls `deleteRefreshCookie()` and then `router.push("/")`.
Because the backend is stateless, no `/auth/sign-out` call is required —
the cookie removal alone terminates the session. The middleware will then
gate any further protected navigation.

### Environment variables

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

The actions concatenate this with `/api/v1/auth` so make sure the backend's
`server.servlet.context-path` matches.

---

## 4. Flutter client (planned)

The Flutter app is not yet wired up. This section documents the contract the
mobile team should target so the implementation stays consistent with web.

### Recommended packages

- `dio` for the HTTP client (interceptors + cookie support)
- `dio_cookie_manager` + `cookie_jar` for persisting the refresh cookie on
  device (web platform uses the browser cookie store automatically)
- `flutter_secure_storage` as a fallback if you prefer not to use cookies on
  native and want to store the refresh token in the secure keychain
- `riverpod` / `bloc` / `provider` — pick one and treat the access token as
  in-memory state mirroring the web's RTK cache

### Suggested architecture

```
lib/
├── auth/
│   ├── auth_repository.dart      # signUp / signIn / refresh / signOut
│   ├── auth_state.dart           # current access token + role (in memory)
│   ├── dto/
│   │   ├── sign_up_request.dart  # mirrors SignUpAccountRequestDto
│   │   ├── sign_in_request.dart
│   │   └── auth_response.dart    # { accessTk, expiresIn }
│   └── interceptors/
│       ├── jwt_interceptor.dart  # adds Authorization header
│       └── refresh_interceptor.dart  # on 401, calls /auth/access-tk
└── ...
```

### Flow

1. **Sign-up / Sign-in** — `POST /api/v1/auth/sign-up` or `/sign-in` with the
   same JSON body as the web. The response sets the `refresh_tk` cookie; let
   `cookie_jar` persist it for native, the browser handles it for web.
2. **Store the access token** in memory only (e.g. a `StateNotifier`). Do
   **not** write it to disk — it is short-lived by design.
3. **JWT interceptor** — for every outbound request, attach
   `Authorization: Bearer <accessTk>` if a token is present.
4. **Refresh interceptor** — on a 401 response (or just before the token
   expires, using the `expiresIn` value), call `GET /api/v1/auth/access-tk`.
   The cookie jar attaches the refresh cookie automatically. On success,
   update the in-memory access token and retry the original request.
5. **Sign-out** — clear the in-memory token and call
   `cookieJar.delete(Uri.parse(backendUrl))` so the refresh cookie is gone.
   There is no server-side `/sign-out` route to call.

### Example snippets

```dart
// auth_response.dart
class AuthResponse {
  final String accessTk;
  final int expiresIn; // seconds

  AuthResponse({required this.accessTk, required this.expiresIn});

  factory AuthResponse.fromJson(Map<String, dynamic> j) =>
      AuthResponse(accessTk: j['accessTk'], expiresIn: j['expiresIn']);
}
```

```dart
// jwt_interceptor.dart
class JwtInterceptor extends Interceptor {
  JwtInterceptor(this._authState);
  final AuthStateNotifier _authState;

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final token = _authState.value?.accessTk;
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }
}
```

```dart
// refresh_interceptor.dart
class RefreshInterceptor extends QueuedInterceptor {
  RefreshInterceptor(this._dio, this._authState);
  final Dio _dio;
  final AuthStateNotifier _authState;

  @override
  Future<void> onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode != 401) return handler.next(err);

    try {
      final res = await _dio.get('/auth/access-tk');
      _authState.setToken(AuthResponse.fromJson(res.data));
      final retried = await _dio.fetch(err.requestOptions);
      handler.resolve(retried);
    } catch (_) {
      _authState.clear(); // forces redirect to sign-in
      handler.next(err);
    }
  }
}
```

### Things to mirror from web

- The `role` enum is `UNTERNEHMER | FAHRER | BUCHHALTER` — the backend
  uppercases these and adds the `ROLE_` prefix when granting authorities.
  Send the value exactly as listed.
- The same `ApiError`/`FieldError` shape applies on 400 responses — map
  `errors[].field` back onto your form inputs (the web client does this in
  `app/sign-up/page.tsx`).
- The CORS allow-list in `SecurityConfig#corsConfigurationSource()` already
  whitelists `http://localhost:9100` and `app://localhost` for Flutter local
  development. Add your production scheme to `FRONTEND_URL` before shipping.

---

## 5. Local development & testing

- **Run the backend**: `cd apps/backend && ./mvnw spring-boot:run`
- **Run the web client**: `cd apps/web && npm run dev`
- **Browse the API spec**: `docker compose up swagger-ui` and open
  <http://localhost:8082>
- **E2E auth test**: `apps/web/__tests__/e2e/auth.spec.ts` and
  `apps/web/__tests__/e2e/setup/auth.setup.ts`. The latter creates a
  bootstrap account that the rest of the e2e suite reuses.
- **Backend unit tests**: `JwtServiceTest`, `JwtAuthFilterTest`,
  `AuthServiceTest`, `AuthControllerTest`.

---

## 6. Open items

- Tighten `SecurityConfig` from `anyRequest().permitAll()` to
  `authenticated()` once every controller declares its access rules
  explicitly.
- Add an `/auth/sign-out` endpoint that rotates the refresh token (defence
  against a stolen cookie) instead of relying purely on cookie deletion.
- Set `Secure` on the refresh cookie in production (currently `false` so
  local HTTP works).
- Implement a proactive silent refresh in the web client instead of waiting
  for the cache entry to expire.

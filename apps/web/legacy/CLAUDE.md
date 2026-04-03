# Frontend — CLAUDE.md

React 19 + Vite + TypeScript. UI: shadcn/ui + Tailwind.

## Scripts

```bash
npm run dev           # Vite Dev Server (http://localhost:5173)
npm run test:e2e      # Playwright E2E (headless)
npm run test:e2e:ui   # Playwright E2E (mit UI)
npm run test:unit     # Vitest Unit Tests
```

## Validierung — `src/hooks/userfeedback/useValidator.ts`

Hooks geben `true` zurück wenn der Wert **ungültig** ist.

| Hook | Regex / Regel |
|---|---|
| `useInvalidFirmenbuchnummer` | `^FN\d{6}[a-z]$` — z.B. `FN123456a` |
| `useInvalidATU` | `^ATU\d{9}$` — Leerzeichen & `/` werden vor Prüfung entfernt |
| `useInvalidEmail` | Standard-E-Mail-Regex |
| `useInvalidTelefonnummer` | Ziffern, `+()- `, Länge 7–20 |
| `useInvalidPassword` | ≥8 Zeichen, ≥1 Ziffer, ≥1 Sonderzeichen |

## Axios "Network Error" — was das wirklich bedeutet

`ERR_NETWORK` tritt auf bei: CORS-Fehler, Backend down, kein Internet, SSL-Fehler, `VITE_API_URL` nicht gesetzt.

**CORS debuggen:** Browser-Konsole → roter `Access-Control-Allow-Origin`-Fehler.
Häufigste Ursache hier: `NODE_ENV` in `.env.test` ist `"production"` → `localhost:5173` fliegt aus CORS-Whitelist.

## Playwright E2E Tests

### Unique Testdaten (WICHTIG)

Felder `email`, `telefon`, `fn`, `atu` sind **DB-UNIQUE** — pro Test eigene Werte via `Date.now()`:

```ts
const RUN_ID = Date.now(); // 13 Stellen, z.B. 1740921234567
email:   `playwright_${RUN_ID}@test.at`
telefon: `+43 660 ${String(RUN_ID).slice(-7)}`
fn:      `FN${String(RUN_ID).slice(-6)}a`   // slice(-6) → genau 6 Ziffern!
atu:     `ATU${String(RUN_ID).slice(-9)}`   // slice(-9) → genau 9 Ziffern!
```

Jeder Test mit eigener Registrierung braucht einen eigenen lokalen `Date.now()`.

### RideFlow — Besonderheiten

- **Nur Mobile sichtbar** (`md:hidden`) → Test nutzt `devices["iPhone 13"]` (390px)
- **GPS-Mock:** Playwright setzt `geolocation` + `permissions: ["geolocation"]`
- **Mindestdauer:** `checkRide()` gibt `false` wenn `timer <= 3` → per `waitForFunction` warten bis Timer > 3s im DOM, **nicht** `waitForTimeout`
- **Distanz:** `useDriverLocation` erhöht lat/lng jede Sekunde automatisch — kein manuelles Update nötig
- **Test-IDs:** `constants/rideDataTestId.ts` (aufgeteilt in `ride`, `payment`, `invoice`)

### VITE_API_URL

`frontend/.env.local` muss für E2E-Tests auf `http://localhost:3000` zeigen (nicht LAN-IP).
Wenn LAN-IP gesetzt ist → `ProtectedRoute` hängt im Loading → Test bleibt auf `/register` → `toHaveURL("/")` Timeout.

### Häufige Fehler

| Fehler | Ursache |
|---|---|
| `Timed out waiting from config.webServer` | Backend startet nicht oder DB nicht erreichbar |
| Network Error im Test | `NODE_ENV` in `.env.test` ist `"production"` → CORS blockiert |
| `registerButton` bleibt disabled | FN braucht genau 6 Ziffern, ATU genau 9 — `slice(-6)`/`slice(-9)` verwenden |
| `toHaveURL("/")` Timeout | `VITE_API_URL` zeigt auf LAN-IP statt `localhost` |

### Playwright Konfiguration

- Wartet auf `http://localhost:3000/health` (macht `SELECT 1`) bevor Tests starten
- Browser: **Chromium** + **WebKit**
- CI: `.github/workflows/playwright.yml` — läuft auf `main` + `develop`, benötigte Secrets: `TEST_DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`

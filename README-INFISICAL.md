# Secret Management with Infisical

We have migrated from local `.env` files to **Infisical** (EU Cloud) for secret management.  
This means: **no more `.env` files on your machine.** Infisical injects secrets directly into the process at runtime, keeping every developer in sync and eliminating the risk of stale, missing, or accidentally committed secrets.

---

## 1. Install the Infisical CLI

Install the CLI once on your machine based on your OS:

**Windows** (PowerShell — run as Administrator)
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
iex "& {$(irm https://raw.githubusercontent.com/Infisical/infisical/main/cli/install.ps1)}"
```

**macOS** (Homebrew)
```bash
brew install infisical/get-cli/infisical
```

**Linux / Linux Mint** (apt)
```bash
curl -1sLf 'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.deb.sh' | sudo -E bash
sudo apt-get update && sudo apt-get install -y infisical
```

Verify the installation:
```bash
infisical --version
```

---

## 2. Log In

Run the login command and follow the prompts:

```bash
infisical login
```

When asked for the region / host, make sure to select or enter the **EU region**:

```
https://eu.infisical.com
```

> You will need to be invited to the Infisical project first. Ask the project owner for an invite to your team email address.

---

## 3. Project Structure

Secrets are organized into **folders** and **environments** inside Infisical:

| Folder | App |
|---|---|
| `/web` | Next.js frontend |
| `/mobile` | Flutter mobile app |

| Environment | Purpose |
|---|---|
| `dev` | Local development |
| `staging` | Running tests (e.g. Playwright e2e) |

---

## 4. Running the Next.js App

You don't need to do anything special — just use the normal npm scripts. Infisical is already wired up in `package.json`:

| Command | What it does |
|---|---|
| `npm run dev` | Injects `/web` dev secrets → starts Next.js on port 3000 |
| `npm run test` | Injects `/web` staging secrets → starts Next.js on port 3001 |

Under the hood, `npm run dev` executes:
```
infisical run --env=dev --path=/web -- next dev
```

And `npm run test` executes:
```
infisical run --env=staging --path=/web -- next dev -p 3001
```

You just run `npm run dev` as you always have — Infisical handles the rest.

---

## 5. Important: Do Not Delete `.infisical.json`

The file `apps/web/new/.infisical.json` is the **link between this repository and the Infisical project**. It contains the workspace ID that tells the CLI which project to pull secrets from.

**Do not delete or modify this file.** It must stay in the repository.

```json
{
    "workspaceId": "58a0efda-91c2-4b24-9a90-c70a69fe9dd1"
}
```

This file does **not** contain any secrets — it is safe to commit.

---

## Troubleshooting

**`infisical: command not found`** → CLI not installed or not in PATH. Re-run the install step.

**`unauthorized` / `403`** → You are not logged in or not added to the project. Run `infisical login` again and ask the project owner for an invite.

**Wrong region error** → Make sure you selected `eu.infisical.com` during login, not the default US endpoint.

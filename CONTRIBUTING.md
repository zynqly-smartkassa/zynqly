# Contributing Guide

Welcome to the project! This document defines our Git branching strategy, commit conventions, and general workflow. Please read it carefully before contributing.

Our monorepo is structured as follows:

```
/
├── backend/    # Server-side API & business logic
├── website/    # React web application
└── mobile/     # Flutter mobile application
```

---

## 1. Branching Strategy

We use a structured branching model built around three scopes — `backend`, `website`, and `mobile` — so it is always clear which part of the codebase a branch belongs to.

### 1.1 Permanent Branches

| Branch | Purpose |
|---|---|
| `main` | Production-ready code. Never commit directly. |
| `develop` | Integration branch. All finished features merge here first. |

`main` is protected. Only merge into `main` from `develop` after a successful review and test cycle.

### 1.2 Branch Naming Convention

All working branches follow this pattern:

```
<type>/<scope>/<short-description>
```

| Segment | Values | Description |
|---|---|---|
| `type` | `feature`, `fix`, `hotfix`, `chore`, `refactor`, `docs` | What kind of work this is |
| `scope` | `backend`, `website`, `mobile`, `root` | Which part of the monorepo is affected |
| `short-description` | kebab-case, max ~4 words | A brief but meaningful name |

#### Examples

```bash
feature/backend/user-authentication
feature/website/login-page-ui
feature/mobile/onboarding-flow
fix/backend/token-refresh-bug
fix/mobile/splash-screen-crash
hotfix/website/broken-navbar-link
chore/root/update-docker-compose
docs/root/update-contributing-guide
refactor/backend/simplify-auth-middleware
```

> 💡 The `root` scope is used for changes that affect the whole monorepo (CI config, Docker, documentation, etc.).

### 1.3 Branch Lifecycle

```
main
 └── develop
      ├── feature/backend/...     →  PR into develop  →  deleted after merge
      ├── feature/website/...     →  PR into develop  →  deleted after merge
      └── feature/mobile/...      →  PR into develop  →  deleted after merge
```

1. **Create** your branch off `develop` (never off `main`).
2. **Work** on your branch locally.
3. **Open a Pull Request** into `develop` when done.
4. **Delete** the branch after the PR is merged.
5. **Release:** When `develop` is stable and tested, it is merged into `main` by a maintainer.

#### Hotfixes

A hotfix is the only case where you branch off `main` directly:

```
hotfix/website/critical-payment-error
  └── branches off: main
  └── merges into:  main AND develop
```

---

## 2. Commit Message Convention

We follow the **Conventional Commits** specification. Every commit message must be structured like this:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

### 2.1 Types

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore` | Tooling, dependencies, config changes |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `test` | Adding or updating tests |
| `perf` | Performance improvement |
| `ci` | CI/CD pipeline changes |

### 2.2 Scopes

Use the same scopes as in branch naming: `backend`, `website`, `mobile`, `root`.

### 2.3 Examples

```
feat(mobile): add push notification support
fix(backend): resolve null pointer in user service
refactor(website): extract auth form into reusable component
chore(root): upgrade Node.js to v22
docs(root): add branching strategy to CONTRIBUTING
test(backend): add unit tests for payment controller
```

### 2.4 Rules

- Use the **imperative mood** in the summary: *"add feature"* not *"added feature"* or *"adds feature"*
- Keep the summary line **under 72 characters**
- Do **not** end the summary line with a period
- Separate the body from the summary with a blank line
- Use the body to explain **what** and **why**, not how

---

## 3. Pull Request Guidelines

### Opening a PR

- Always open PRs **into `develop`**, not into `main`
- Give the PR a clear title following the same `type(scope): summary` format
- Fill out the PR description:
  - What does this change do?
  - How was it tested?
  - Any screenshots for UI changes (website/mobile)?
- Link any related issues

### Review Rules

- At least **1 approval** is required before merging
- The author should **not merge their own PR** unless explicitly agreed upon
- Resolve all comments before merging
- Use **Squash and Merge** to keep `develop` history clean

---

## 4. Workflow: Step-by-Step Example

Here is a full example of adding a new feature to the mobile app.

```bash
# 1. Make sure you are on develop and it is up to date
git checkout develop
git pull origin develop

# 2. Create your feature branch
git checkout -b feature/mobile/user-profile-screen

# 3. Work, stage, and commit incrementally
git add mobile/lib/screens/profile_screen.dart
git commit -m "feat(mobile): add user profile screen layout"

git add mobile/lib/widgets/avatar_widget.dart
git commit -m "feat(mobile): add reusable avatar widget"

# 4. Push your branch
git push origin feature/mobile/user-profile-screen

# 5. Open a Pull Request into develop on GitHub

# 6. After approval and merge, clean up
git checkout develop
git pull origin develop
git branch -d feature/mobile/user-profile-screen
```

---

## 5. Quick Reference

```
main          →  production, protected, never commit directly
develop       →  integration, all features merge here

Branch:       <type>/<scope>/<short-description>
Commit:       <type>(<scope>): <short summary>

Types:        feature | fix | hotfix | chore | refactor | docs | test | perf | ci
Scopes:       backend | website | mobile | root

Merge target: always develop (hotfixes → main + develop)
PR merges:    Squash and Merge
```

---

*Keep history clean. Keep names meaningful. When in doubt, ask before you branch.* 🚀
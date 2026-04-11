---
name: comment
description: 'Add or update code documentation comments when the user types "comment". Detects environment from file path or language: frontend (JS/TS/JSX/TSX) uses JSDoc + inline JSX comments; backend (Java/Spring Boot) uses Javadoc. All comments English only. Never uses @param. Use for: documenting functions, classes, React components, Spring Boot controllers/services, updating stale docs.'
argument-hint: 'Optional: file path or code snippet to document'
---

# Comment Skill

Documents code on demand. Triggered by the `comment` command.

## When to Use
- User says "comment", "add comments", "document this", or "add docs"
- A file or code snippet is provided in context
- Existing documentation is stale or missing

## Scope Determination

Detect environment automatically:

| Signal | Environment |
|--------|-------------|
| Path contains `frontend/`, language is JS/TS/JSX/TSX | FRONTEND |
| Path contains `backend/`, language is Java | BACKEND |

Only process files or code explicitly provided in context.

## General Rules (Critical)

- All comments **must be in English**
- **NEVER use `@param`** — this is a strict requirement, no exceptions
- Allowed annotations: `@return`, `@throws`, `@see`
- If documentation already exists → update it to match the current code
- If documentation is missing → create it

## Frontend Procedure (React / JS / TS)

1. Apply **JSDoc** to every function, method, exported constant, and class.
2. Add **inline TSX comments** inside component render output to describe the DOM structure.
   - Place the comment immediately before the element it describes.
   - Example: `{/* Main navigation container */}` above a `<nav>` tag.
3. Focus on making the component tree easy to scan for humans — not every tag needs a comment, only structural landmarks.
4. Do **not** add `@param` — describe inputs in prose inside the JSDoc block if needed.

### Frontend JSDoc Template

```ts
/**
 * Brief one-line description of what the function/component does.
 *
 * Longer explanation if needed (optional).
 *
 * @return What is returned (omit for void/JSX when obvious).
 * @throws {ErrorType} When this can be thrown (if applicable).
 */
```

### Frontend JSX Comment Template

```tsx
{/* Section: user profile header */}
<header>
  {/* Avatar with fallback initials */}
  <Avatar ... />
</header>
```

## Backend Procedure (Java / Spring Boot)

1. Apply **Javadoc** to every class, interface, and method (public and protected).
2. For Spring Boot components, open the class Javadoc with a clear statement of the component's role:
   - **Controller**: "REST controller responsible for handling [resource] endpoints."
   - **Service**: "Service layer responsible for [business concern] logic."
   - **Repository**: "Repository for [Entity] persistence operations."
3. Do **not** add `@param` — describe method inputs in prose inside the Javadoc block or omit if self-explanatory.
4. Use `@return`, `@throws`, `@see` where applicable.
5. Respect Java naming conventions in all descriptions.

### Backend Javadoc Template

```java
/**
 * Brief one-line description of the class/method.
 *
 * Longer explanation if needed (optional).
 *
 * @return description of return value (omit for void)
 * @throws ExceptionType when this condition occurs
 * @see RelatedClass
 */
```

## Output Format

1. Provide the fully updated code block(s) with comments applied.
2. After the code, list a brief summary:
   - Which files were documented
   - Which methods/classes received new or updated comments

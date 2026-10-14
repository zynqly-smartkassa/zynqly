# `data-testid` Naming Convention

All `data-testid` attributes follow a strict three-part schema to keep test selectors consistent, readable, and easy to grep:

```
[page]-[component]-[action]
```

| Segment | Description | Examples |
|---|---|---|
| `page` | The route/page the element lives on | `ride-history`, `dashboard`, `settings`, `invoices` |
| `component` | The UI element or feature area | `filter-type`, `search`, `export`, `reset`, `table`, `pagination` |
| `action` | What the element does or represents | `button`, `select`, `input`, `trigger`, `dialog`, `link` |

---

## Rules

- **Always lowercase**, words separated by `-` (kebab-case)
- **No abbreviations** — prefer `filter-status` over `fltr-st`
- **Never use dynamic IDs** (e.g. a row ID) in the testid — use index or a stable label instead
- **One testid per interactive element** — do not add them to pure layout wrappers
- The three segments must always be present — no two-part or four-part IDs

---

## Examples by element type

### `<button>`

```tsx
// Export action on the Ride History page
<Button data-testid="ride-history-export-button">
  CSV exportieren
</Button>

// Reset filters on the Ride History page
<Button data-testid="ride-history-reset-button">
  Reset Filters
</Button>

// Submit on the Settings page
<Button data-testid="settings-account-submit">
  Save changes
</Button>
```

### `<Select>` (shadcn)

```tsx
// Type filter on the Ride History page
<Select>
  <SelectTrigger data-testid="ride-history-filter-type-select">
    <SelectValue placeholder="Typ" />
  </SelectTrigger>
  ...
</Select>

// Status filter on the Invoices page
<Select>
  <SelectTrigger data-testid="invoices-filter-status-select">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  ...
</Select>
```

> Place the `data-testid` on the `<SelectTrigger>`, not the `<Select>` wrapper — the trigger is what Playwright can click and assert on.

### `<Input>`

```tsx
// Search input on Ride History
<Input data-testid="ride-history-search-input" />

// Email field on the Login page
<Input data-testid="login-email-input" />

// Amount field in the Invoice form
<Input data-testid="invoices-amount-input" />
```

### `<a>` / `<Link>`

```tsx
// Navigation link to Settings in the sidebar
<Link data-testid="sidebar-settings-link" href="/settings">
  Settings
</Link>

// "View details" link in a Dashboard card
<a data-testid="dashboard-ride-details-link">
  View details
</a>
```

### Dialog trigger

```tsx
// Button that opens the "Delete ride" confirmation dialog
<DialogTrigger asChild>
  <Button data-testid="ride-history-delete-trigger">
    Delete
  </Button>
</DialogTrigger>

// The dialog itself (for asserting visibility)
<DialogContent data-testid="ride-history-delete-dialog">
  ...
</DialogContent>
```

### Table rows / cells (use index for stable selection)

```tsx
// A row in the Ride History table
<TableRow data-testid={`ride-history-table-row-${idx}`}>
  <TableCell data-testid={`ride-history-table-id-cell-${idx}`}>
    {ride.id}
  </TableCell>
</TableRow>
```

### Pagination

```tsx
<Button data-testid="ride-history-pagination-prev">Previous</Button>
<Button data-testid={`ride-history-pagination-page-${p}`}>{p}</Button>
<Button data-testid="ride-history-pagination-next">Next</Button>
```

---

## Real examples from this codebase

| Element | `data-testid` |
|---|---|
| Reset filters button (Ride History) | `ride-history-reset-button` |
| Search input (Ride History) | `ride-history-search-input` |
| Type filter select (Ride History) | `ride-history-filter-type-select` |
| Settlement filter select (Ride History) | `ride-history-filter-settlement-select` |
| Status filter select (Ride History) | `ride-history-filter-status-select` |
| Export CSV button (Ride History) | `ride-history-export-button` |
| Previous page button (Ride History) | `ride-history-pagination-prev` |
| Next page button (Ride History) | `ride-history-pagination-next` |

---

## Usage in Playwright tests

```ts
// Click the reset button
await page.getByTestId('ride-history-reset-button').click();

// Assert a select has a value
await expect(page.getByTestId('ride-history-filter-type-select')).toHaveText('Alle Typen');

// Fill the search input
await page.getByTestId('ride-history-search-input').fill('Berlin');

// Check dialog is visible
await expect(page.getByTestId('ride-history-delete-dialog')).toBeVisible();
```

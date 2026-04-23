// Shared page heading used on every main route (dashboard, ride-history, invoices, …).
// Usage: <PageHeader title="Dashboard" subtitle="Übersicht über diesen Monat" />

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1
        className="text-2xl sm:text-3xl font-extrabold tracking-tight"
        style={{ color: "var(--z-text-main)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm" style={{ color: "var(--z-text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

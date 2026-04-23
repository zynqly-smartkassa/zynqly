import { cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/types/Invoice";

const STATUS_CONFIG: Record<InvoiceStatus, { className: string; label: string }> = {
  paid: {
    className:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/60",
    label: "Bezahlt",
  },
  pending: {
    className:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/60",
    label: "Ausstehend",
  },
  overdue: {
    className:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/60",
    label: "Überfällig",
  },
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

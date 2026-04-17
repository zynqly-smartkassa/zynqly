import { cn } from "@/lib/utils";

type RideType = "Passagier" | "Boten";
type Settlement = "card" | "cash";
type RideStatus = "completed" | "cancelled" | "pending";

/** Handles both ISO-8601 (T separator) and space-separated dateTime strings */
export function formatDateTime(dt: string) {
  const [date, timePart] = dt.includes("T") ? dt.split("T") : dt.split(" ");
  const time = timePart?.slice(0, 5) ?? "";
  return (
    <span className="flex flex-col gap-0.5">
      <span>{date}</span>
      <span className="text-xs text-z-neutral-400 dark:text-z-neutral-500">{time}</span>
    </span>
  );
}

export function TypeBadge({ type }: { type: RideType }) {
  const isPassagier = type === "Passagier";
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-z-neutral-900 dark:text-z-neutral-50">
      {isPassagier ? (
        <span className="text-z-violet-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h-.5a.5.5 0 0 0 0 1H2v2.5a1.5 1.5 0 0 0 1.5 1.5h1A1.5 1.5 0 0 0 6 14v-.5h8v.5a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V11.5h.5a.5.5 0 0 0 0-1H18V4.607a1.49 1.49 0 0 0-1.375-1.49A44.07 44.07 0 0 0 13.5 3h-7Z" />
          </svg>
        </span>
      ) : (
        <span className="text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h9.73a1.5 1.5 0 0 0 1.442-1.086l1.414-4.926a.75.75 0 0 0-.826-.95l-3.453 1.026c-.726.214-1.494.214-2.22 0L10 3.04l-1.222.308a5.74 5.74 0 0 1-2.22 0L3.105 2.288ZM4.5 11.25a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11ZM3.75 16a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11a.75.75 0 0 1-.75-.75Z" />
          </svg>
        </span>
      )}
      {type}
    </span>
  );
}

export function SettlementBadge({ method }: { method: Settlement }) {
  const isCard = method === "card";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        isCard
          ? "bg-z-violet-100 text-z-violet-500 border-z-violet-200 dark:bg-violet-950/50 dark:text-z-violet-300 dark:border-violet-800/60"
          : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/60"
      )}
    >
      {isCard ? "Karte" : "Bar"}
    </span>
  );
}

export function StatusBadge({ status }: { status: RideStatus }) {
  const classes: Record<RideStatus, { className: string; label: string }> = {
    completed: {
      className: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/60",
      label: "Abgeschlossen",
    },
    cancelled: {
      className: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/60",
      label: "Storniert",
    },
    pending: {
      className: "bg-z-neutral-100 text-z-neutral-600 border-z-neutral-200 dark:bg-z-neutral-800/60 dark:text-z-neutral-400 dark:border-z-neutral-700",
      label: "Ausstehend",
    },
  };
  const s = classes[status];
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border", s.className)}>
      {s.label}
    </span>
  );
}

import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i} className="border-b border-z-neutral-200 dark:border-z-neutral-700">
          {[60, 80, 70, 90, 90, 50, 45, 75].map((w, j) => (
            <TableCell key={j} className="py-4 px-4">
              <Skeleton className="h-4 rounded" style={{ width: `${w}px` }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function MobileSkeletonCards() {
  return (
    <div className="flex flex-col divide-y divide-z-neutral-200 dark:divide-z-neutral-700">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-3.5 px-4">
          <Skeleton className="w-9 h-9 rounded-full shrink-0" />
          <div className="flex-1 min-w-0 space-y-1.5">
            <Skeleton className="h-3.5 w-36 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Skeleton className="h-3.5 w-16 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

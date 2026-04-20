"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationBarProps {
  /** Aktuelle Seite (1-basiert) */
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Optionale data-testid für Prev/Next-Buttons */
  prevTestId?: string;
  nextTestId?: string;
  /** Optionale CSS-Klassen für den Wrapper */
  className?: string;
}

export function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
  prevTestId,
  nextTestId,
  className,
}: PaginationBarProps) {
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "…", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-8 h-8 text-z-neutral-600 dark:text-z-neutral-300 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700"
        aria-label="Vorherige Seite"
        data-testid={prevTestId}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      </Button>

      {pageNumbers.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex items-center justify-center w-8 h-8 text-sm text-z-neutral-400 dark:text-z-neutral-500"
          >
            …
          </span>
        ) : (
          <Button
            key={p}
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(p as number)}
            className={cn(
              "w-8 h-8 text-sm font-medium",
              p === currentPage
                ? "bg-z-violet-500 text-white hover:bg-z-violet-600 dark:bg-z-violet-500 dark:text-white dark:hover:bg-z-violet-600"
                : "text-z-neutral-600 dark:text-z-neutral-300 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700"
            )}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-8 h-8 text-z-neutral-600 dark:text-z-neutral-300 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700"
        aria-label="Nächste Seite"
        data-testid={nextTestId}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06L7.28 11.78a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </Button>
    </div>
  );
}

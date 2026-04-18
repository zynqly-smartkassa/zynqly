/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { useGetRideHistoryQuery } from "@/redux/api/apis/ride-history";
import type { Ride } from "@/types/RideHistory";

import ResetFiltersButton from "@/components/ResetFiltersButton";
import { TypeBadge, SettlementBadge, StatusBadge, formatDateTime } from "./_components/badges";
import { TableSkeletonRows, MobileSkeletonCards } from "./_components/skeletons";

// ── Types ──────────────────────────────────────────────────────────────────────

type RideType = "Passagier" | "Boten";
type Settlement = "card" | "cash";
type RideStatus = "completed" | "cancelled" | "pending";

// ── Export CSV ─────────────────────────────────────────────────────────────────

function exportToCSV(rides: Ride[]) {
  const headers = ["Fahrt-ID", "Datum & Uhrzeit", "Typ", "Von", "Nach", "Betrag (€)", "Zahlung", "Status"];
  const rows = rides.map((r) => [
    r.id,
    r.dateTime,
    r.type,
    r.from,
    r.to,
    r.amount.toFixed(2),
    r.settlement === "card" ? "Karte" : "Bar",
    r.status === "completed" ? "Abgeschlossen" : r.status === "cancelled" ? "Storniert" : "Ausstehend",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fahrtenbuch.csv";
  link.click();
  URL.revokeObjectURL(url);
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function RideHistoryPage() {
  const [search, setSearch] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterSettlement, setFilterSettlement] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: rideHistory, isLoading, isFetching } = useGetRideHistoryQuery(currentPage - 1);

  // isFetching is true on every request (including page changes); isLoading only on initial
  const isPaginating = isFetching && !isLoading;

  // Show skeletons until client is mounted (prevents SSR/client hydration mismatch)
  const showSkeleton = !mounted || isLoading;

  // Search filter — filter/sort logic left for developer to extend
  const filtered = useMemo(() => {
    const rides = rideHistory?.content ?? [];

    const q = search.toLowerCase();
    return rides.filter(
      (ride) => {

        // This if statement will check wether the select is not "all" and if the 
        // selection matches with the field of the current ride

        if (filterType !== "all" && ride.type !== filterType) return false;

        if (filterSettlement !== "all" && ride.settlement !== filterSettlement) return false;

        if (filterStatus !== "all" && ride.status !== filterStatus) return false;

        if (q.trim() !== "") {
          const searchTerm = q.toLowerCase();

          // Is there a match in any field?
          const matchesId = ride.id.toLowerCase().includes(searchTerm);
          const matchesFrom = ride.from.toLowerCase().includes(searchTerm);
          const matchesTo = ride.to.toLowerCase().includes(searchTerm);
          const matchesDate = ride.dateTime.includes(searchTerm);

          // If at least one is not true, then sort the result out
          if (!matchesId && !matchesFrom && !matchesTo && !matchesDate) {
            return false;
          }
        }
        // add the ride to the variable
        return true;
      }
    );
  }, [search, rideHistory?.content, filterType, filterSettlement, filterStatus]);

  // Pagination — all values come directly from the backend
  const totalPages = rideHistory?.page.totalPages ?? 1;
  const activePage = (rideHistory?.page.number ?? currentPage - 1) + 1; // backend is 0-based, UI is 1-based
  const pageStart = rideHistory ? rideHistory.page.number * rideHistory.page.size + 1 : 0;
  const pageEnd = rideHistory ? Math.min((rideHistory.page.number + 1) * rideHistory.page.size, rideHistory.page.totalElements) : 0;
  const totalElements = rideHistory?.page.totalElements ?? 0;

  const handleSearch = (v: string) => { setSearch(v); setCurrentPage(1); };

  // Pagination page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    if (activePage <= 4) {
      pages.push(1, 2, 3, 4, 5, "…", totalPages);
    } else if (activePage >= totalPages - 3) {
      pages.push(1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "…", activePage - 1, activePage, activePage + 1, "…", totalPages);
    }
    return pages;
  }, [totalPages, activePage]);

  return (
    <div className="max-w-[1440px] mx-auto">

      {/* ── Header row: title + export ── */}
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Fahrtenverlauf"
          subtitle="Vollständiges Protokoll aller Fahrten (Fahrtenbuch)"
        />

        <Button
          size="sm"
          className="gap-1.5 h-9 px-3 text-sm shrink-0 bg-z-violet-500 hover:bg-z-violet-600 text-white dark:bg-z-violet-500 dark:hover:bg-z-violet-600"
          onClick={() => exportToCSV(filtered)}
          disabled={showSkeleton || filtered.length === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
            <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
          </svg>
          <span className="hidden sm:inline">CSV exportieren</span>
          <span className="sm:hidden">CSV</span>
        </Button>
      </div>

      {/* ── Toolbar: search full-width on mobile, then filters in 3-col grid on mobile / inline on desktop ── */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-6">
        {/* Search — full width on mobile, flex-1 on desktop */}
        <div className="relative w-full lg:flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-z-neutral-400 dark:text-z-neutral-500"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex flex-row items-center gap-2">
             <Input
            placeholder="Fahrten nach ID, Route oder Datum suchen ..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            data-testid="ride-history-search-input"
            className="pl-9 h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 
            dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 
            placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
          />
            <ResetFiltersButton
            setFilterType={setFilterType}
            setFilterSettlement={setFilterSettlement}
            setSearch={setSearch}
            setFilterStatus={setFilterStatus}
            classNames="lg:hidden"
          />
          </div>
        </div>

        {/* Separator — desktop only */}
        <div className="h-5 w-px bg-z-neutral-200 dark:bg-z-neutral-700 hidden lg:block" />

        {/* Filters — equal-width 3-col grid on mobile, inline row on desktop */}
        <div className="grid grid-cols-3 lg:flex lg:items-center gap-2">
          {/* Type filter */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="h-9 text-sm w-full lg:w-auto lg:min-w-[130px] 
            bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-700 dark:text-z-neutral-200"
            data-testid="ride-history-filter-type-trigger">
              <SelectValue placeholder="Typ" />
            </SelectTrigger>
            <SelectContent data-testid="ride-history-filter-type-content">
              <SelectItem value="all">Alle Typen</SelectItem>
              <SelectItem value="Passagier">Passagier</SelectItem>
              <SelectItem value="Boten">Boten</SelectItem>
            </SelectContent>
          </Select>

          {/* Settlement filter */}
          <Select value={filterSettlement} onValueChange={setFilterSettlement}>
            <SelectTrigger className="h-9 text-sm w-full lg:w-auto lg:min-w-[130px]
             bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-700 dark:text-z-neutral-200"
             data-testid="ride-history-filter-settlement-trigger">
              <SelectValue placeholder="Zahlung" />
            </SelectTrigger>
            <SelectContent data-testid="ride-history-filter-settlement-content">
              <SelectItem value="all">Alle Zahlungen</SelectItem>
              <SelectItem value="card">Karte</SelectItem>
              <SelectItem value="cash">Bar</SelectItem>
            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9 text-sm w-full lg:w-auto lg:min-w-[130px]
             bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-700 dark:text-z-neutral-200"
             data-testid="ride-history-filter-status-trigger">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent data-testid="ride-history-filter-status-content">
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="completed">Abgeschlossen</SelectItem>
              <SelectItem value="cancelled">Storniert</SelectItem>
              <SelectItem value="pending">Ausstehend</SelectItem>
            </SelectContent>
          </Select>

          <ResetFiltersButton
            setFilterType={setFilterType}
            setFilterSettlement={setFilterSettlement}
            setSearch={setSearch}
            setFilterStatus={setFilterStatus}
            classNames="hidden lg:flex"
          />
        </div>
      </div>

      {/* ── Mobile card list (sm: and above hidden) ── */}
      <div className="relative sm:hidden rounded-lg overflow-hidden border border-z-neutral-200 dark:border-z-neutral-700 bg-white dark:bg-z-neutral-800 mb-6">
        {isPaginating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-z-neutral-800/70 rounded-lg">
            <svg className="animate-spin w-6 h-6 text-z-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        )}
        {showSkeleton ? (
          <MobileSkeletonCards />
        ) : filtered.length === 0 ? (
          <p className="text-center py-12 text-sm text-z-neutral-400 dark:text-z-neutral-500">
            Keine Fahrten gefunden.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-z-neutral-200 dark:divide-z-neutral-700">
            {filtered.map((ride) => {
              const isPassagier = ride.type === "Passagier";
              const [date, timePart] = ride.dateTime.includes("T")
                ? ride.dateTime.split("T")
                : ride.dateTime.split(" ");
              const time = timePart?.slice(0, 5) ?? "";
              return (
                <div key={ride.id} className="flex items-center gap-3 py-3.5 px-4">
                  {/* Type icon */}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                      isPassagier
                        ? "bg-z-violet-100 dark:bg-violet-950/50"
                        : "bg-green-50 dark:bg-green-950/40"
                    )}
                  >
                    {isPassagier ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-z-violet-500">
                        <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h-.5a.5.5 0 0 0 0 1H2v2.5a1.5 1.5 0 0 0 1.5 1.5h1A1.5 1.5 0 0 0 6 14v-.5h8v.5a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V11.5h.5a.5.5 0 0 0 0-1H18V4.607a1.49 1.49 0 0 0-1.375-1.49A44.07 44.07 0 0 0 13.5 3h-7Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                        <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h9.73a1.5 1.5 0 0 0 1.442-1.086l1.414-4.926a.75.75 0 0 0-.826-.95l-3.453 1.026c-.726.214-1.494.214-2.22 0L10 3.04l-1.222.308a5.74 5.74 0 0 1-2.22 0L3.105 2.288ZM4.5 11.25a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11ZM3.75 16a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11a.75.75 0 0 1-.75-.75Z" />
                      </svg>
                    )}
                  </div>

                  {/* Route + meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-z-neutral-900 dark:text-z-neutral-50 truncate">
                      {ride.from} → {ride.to}
                    </p>
                    <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500 mt-0.5">
                      {date}&nbsp;&nbsp;{time}
                    </p>
                  </div>

                  {/* Amount + badges */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm font-semibold text-z-neutral-900 dark:text-z-neutral-50">
                      {ride.amount.toFixed(2)} €
                    </span>
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                      <SettlementBadge method={ride.settlement as Settlement} />
                      <StatusBadge status={ride.status as RideStatus} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Desktop table (hidden on mobile) ── */}
      <div className="relative hidden sm:block rounded-lg overflow-hidden border border-z-neutral-200 dark:border-z-neutral-700 bg-white dark:bg-z-neutral-800 mb-6">
        {isPaginating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-z-neutral-800/70 rounded-lg">
            <svg className="animate-spin w-6 h-6 text-z-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow className="border-b border-z-neutral-200 dark:border-z-neutral-700 bg-z-neutral-100 dark:bg-z-neutral-800 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-800">
              {["Fahrt-ID", "Datum & Uhrzeit", "Typ", "Von", "Nach", "Betrag", "Zahlung", "Status"].map((h) => (
                <TableHead key={h} className="text-xs font-medium py-3 px-4 text-z-neutral-400 dark:text-z-neutral-500">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {showSkeleton ? (
              <TableSkeletonRows />
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-sm text-z-neutral-400 dark:text-z-neutral-500">
                  Keine Fahrten gefunden.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((ride, idx) => (
                <TableRow
                  key={ride.id}
                  className={cn(
                    "transition-colors hover:bg-z-neutral-50 dark:hover:bg-z-neutral-700/40",
                    idx < filtered.length - 1
                      ? "border-b border-z-neutral-200 dark:border-z-neutral-700"
                      : "border-none"
                  )}
                >
                  <TableCell className="py-4 px-4 font-medium text-sm text-z-neutral-900 dark:text-z-neutral-100">
                    {ride.id}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm text-z-neutral-600 dark:text-z-neutral-300">
                    {formatDateTime(ride.dateTime)}
                  </TableCell>
                  <TableCell className="py-4 px-4" data-testid="ride-history-row-type">
                    <TypeBadge type={ride.type as RideType} />
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm text-z-neutral-900 dark:text-z-neutral-100">
                    {ride.from}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm text-z-neutral-900 dark:text-z-neutral-100">
                    {ride.to}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm font-medium text-z-neutral-900 dark:text-z-neutral-100">
                    {ride.amount.toFixed(2)} €
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <SettlementBadge method={ride.settlement as Settlement} />
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <StatusBadge status={ride.status as RideStatus} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer: count + pagination ── */}
      <div className="flex items-center justify-center md:justify-between gap-4 flex-wrap">
        <span className="text-xs text-z-neutral-400 dark:text-z-neutral-500">
          {showSkeleton ? (
            <Skeleton className="h-3 w-40 rounded" />
          ) : filtered.length === 0 ? (
            "Keine Fahrten gefunden"
          ) : (
            `${pageStart}–${pageEnd} von ${totalElements} Fahrten`
          )}
        </span>

        {!showSkeleton && totalPages > 1 && (
          <div className="flex items-center gap-1">
            {/* Prev */}
            <Button
              variant="ghost"
              size="icon"
              disabled={activePage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-8 h-8 text-z-neutral-600 dark:text-z-neutral-300 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700"
              aria-label="Vorherige Seite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </Button>

            {/* Page numbers */}
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
                  onClick={() => setCurrentPage(p as number)}
                  className={cn(
                    "w-8 h-8 text-sm font-medium",
                    p === activePage
                      ? "bg-z-violet-500 text-white hover:bg-z-violet-600 dark:bg-z-violet-500 dark:text-white dark:hover:bg-z-violet-600"
                      : "text-z-neutral-600 dark:text-z-neutral-300 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700"
                  )}
                >
                  {p}
                </Button>
              )
            )}

            {/* Next */}
            <Button
              variant="ghost"
              size="icon"
              disabled={activePage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-8 h-8 text-z-neutral-600 dark:text-z-neutral-300 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700"
              aria-label="Nächste Seite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06L7.28 11.78a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

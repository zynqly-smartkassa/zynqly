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
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { useGetRideHistoryQuery } from "@/redux/api/apis/ride-history";

// ── Types ──────────────────────────────────────────────────────────────────────

type RideType = "Passagier" | "Boten";
type PaymentMethod = "card" | "cash";
type RideStatus = "completed" | "cancelled" | "pending";

interface Ride {
  id: string;
  dateTime: string;
  type: RideType;
  from: string;
  to: string;
  amount: number;
  payment: PaymentMethod;
  status: RideStatus;
}

// ── Dummy data ─────────────────────────────────────────────────────────────────

const DUMMY_RIDES: Ride[] = [
  { id: "R-1042", dateTime: "2026-04-11 08:15", type: "Passagier", from: "Hauptbahnhof",    to: "Flughafen",        amount: 42.50, payment: "card", status: "completed"  },
  { id: "R-1041", dateTime: "2026-04-11 07:30", type: "Boten",     from: "Friedrichstr. 12", to: "Alexanderplatz 5", amount: 18.90, payment: "cash", status: "completed"  },
  { id: "R-1040", dateTime: "2026-04-10 19:45", type: "Passagier", from: "Potsdamer Platz", to: "Charlottenburg",   amount: 28.60, payment: "card", status: "completed"  },
  { id: "R-1039", dateTime: "2026-04-10 17:20", type: "Boten",     from: "Kreuzberg",        to: "Mitte",            amount: 15.40, payment: "cash", status: "completed"  },
  { id: "R-1038", dateTime: "2026-04-10 14:00", type: "Passagier", from: "Tempelhof",        to: "Spandau",          amount: 35.20, payment: "card", status: "completed"  },
  { id: "R-1037", dateTime: "2026-04-09 22:10", type: "Passagier", from: "Neukölln",         to: "Prenzlauer Berg",  amount: 22.80, payment: "card", status: "cancelled"  },
  { id: "R-1036", dateTime: "2026-04-09 16:30", type: "Boten",     from: "Schöneberg",       to: "Wedding",          amount: 19.50, payment: "cash", status: "completed"  },
  { id: "R-1035", dateTime: "2026-04-09 12:00", type: "Passagier", from: "Lichtenberg",      to: "Steglitz",         amount: 31.70, payment: "card", status: "completed"  },
  { id: "R-1034", dateTime: "2026-04-08 09:45", type: "Boten",     from: "Pankow",           to: "Friedrichshain",   amount: 12.30, payment: "cash", status: "completed"  },
  { id: "R-1033", dateTime: "2026-04-08 08:00", type: "Passagier", from: "Mitte",            to: "Zehlendorf",       amount: 38.90, payment: "card", status: "completed"  },
  { id: "R-1032", dateTime: "2026-04-07 21:30", type: "Passagier", from: "Tempelhof",        to: "Reinickendorf",    amount: 44.10, payment: "card", status: "cancelled"  },
  { id: "R-1031", dateTime: "2026-04-07 18:15", type: "Boten",     from: "Treptow",          to: "Spandau",          amount: 21.60, payment: "cash", status: "completed"  },
  { id: "R-1030", dateTime: "2026-04-07 14:50", type: "Passagier", from: "Charlottenburg",   to: "Marzahn",          amount: 52.40, payment: "card", status: "completed"  },
  { id: "R-1029", dateTime: "2026-04-06 11:20", type: "Boten",     from: "Wedding",          to: "Neukölln",         amount: 16.80, payment: "cash", status: "completed"  },
  { id: "R-1028", dateTime: "2026-04-06 09:00", type: "Passagier", from: "Steglitz",         to: "Hauptbahnhof",     amount: 27.50, payment: "card", status: "completed"  },
  { id: "R-1027", dateTime: "2026-04-05 20:45", type: "Passagier", from: "Flughafen",        to: "Mitte",            amount: 48.30, payment: "card", status: "completed"  },
  { id: "R-1026", dateTime: "2026-04-05 17:00", type: "Boten",     from: "Lichtenberg",      to: "Pankow",           amount: 13.70, payment: "cash", status: "cancelled"  },
  { id: "R-1025", dateTime: "2026-04-05 13:30", type: "Passagier", from: "Spandau",          to: "Kreuzberg",        amount: 39.20, payment: "card", status: "completed"  },
  { id: "R-1024", dateTime: "2026-04-04 10:15", type: "Boten",     from: "Prenzlauer Berg",  to: "Tempelhof",        amount: 17.90, payment: "cash", status: "completed"  },
  { id: "R-1023", dateTime: "2026-04-04 08:30", type: "Passagier", from: "Zehlendorf",       to: "Flughafen",        amount: 55.60, payment: "card", status: "completed"  },
  { id: "R-1022", dateTime: "2026-04-03 22:00", type: "Passagier", from: "Friedrichshain",   to: "Charlottenburg",   amount: 24.10, payment: "card", status: "cancelled"  },
  { id: "R-1021", dateTime: "2026-04-03 19:45", type: "Boten",     from: "Mitte",            to: "Reinickendorf",    amount: 23.40, payment: "cash", status: "completed"  },
  { id: "R-1020", dateTime: "2026-04-03 15:20", type: "Passagier", from: "Reinickendorf",    to: "Steglitz",         amount: 33.80, payment: "card", status: "completed"  },
  { id: "R-1019", dateTime: "2026-04-02 12:00", type: "Boten",     from: "Schöneberg",       to: "Marzahn",          amount: 20.50, payment: "cash", status: "completed"  },
  { id: "R-1018", dateTime: "2026-04-02 09:30", type: "Passagier", from: "Neukölln",         to: "Spandau",          amount: 36.90, payment: "card", status: "completed"  },
  { id: "R-1017", dateTime: "2026-04-01 20:15", type: "Passagier", from: "Hauptbahnhof",     to: "Prenzlauer Berg",  amount: 19.70, payment: "card", status: "completed"  },
  { id: "R-1016", dateTime: "2026-04-01 17:40", type: "Boten",     from: "Kreuzberg",        to: "Pankow",           amount: 14.20, payment: "cash", status: "completed"  },
  { id: "R-1015", dateTime: "2026-04-01 11:00", type: "Passagier", from: "Mitte",            to: "Zehlendorf",       amount: 41.30, payment: "card", status: "cancelled"  },
  { id: "R-1014", dateTime: "2026-03-31 18:50", type: "Boten",     from: "Treptow",          to: "Wedding",          amount: 11.80, payment: "cash", status: "completed"  },
  { id: "R-1013", dateTime: "2026-03-31 14:30", type: "Passagier", from: "Charlottenburg",   to: "Lichtenberg",      amount: 45.60, payment: "card", status: "completed"  },
  { id: "R-1012", dateTime: "2026-03-30 21:00", type: "Passagier", from: "Friedrichshain",   to: "Flughafen",        amount: 50.20, payment: "card", status: "completed"  },
  { id: "R-1011", dateTime: "2026-03-30 16:15", type: "Boten",     from: "Steglitz",         to: "Neukölln",         amount: 18.40, payment: "cash", status: "completed"  },
  { id: "R-1010", dateTime: "2026-03-30 10:45", type: "Passagier", from: "Spandau",          to: "Mitte",            amount: 37.10, payment: "card", status: "cancelled"  },
  { id: "R-1009", dateTime: "2026-03-29 19:00", type: "Boten",     from: "Pankow",           to: "Kreuzberg",        amount: 16.30, payment: "cash", status: "completed"  },
  { id: "R-1008", dateTime: "2026-03-29 13:30", type: "Passagier", from: "Reinickendorf",    to: "Charlottenburg",   amount: 29.80, payment: "card", status: "completed"  },
  { id: "R-1007", dateTime: "2026-03-28 22:45", type: "Passagier", from: "Marzahn",          to: "Hauptbahnhof",     amount: 43.70, payment: "card", status: "completed"  },
  { id: "R-1006", dateTime: "2026-03-28 18:00", type: "Boten",     from: "Prenzlauer Berg",  to: "Schöneberg",       amount: 22.10, payment: "cash", status: "completed"  },
  { id: "R-1005", dateTime: "2026-03-28 11:30", type: "Passagier", from: "Zehlendorf",       to: "Spandau",          amount: 47.50, payment: "card", status: "completed"  },
  { id: "R-1004", dateTime: "2026-03-27 20:00", type: "Boten",     from: "Wedding",          to: "Lichtenberg",      amount: 15.90, payment: "cash", status: "cancelled"  },
  { id: "R-1003", dateTime: "2026-03-27 14:15", type: "Passagier", from: "Tempelhof",        to: "Friedrichshain",   amount: 26.40, payment: "card", status: "completed"  },
  { id: "R-1002", dateTime: "2026-03-27 09:00", type: "Boten",     from: "Neukölln",         to: "Charlottenburg",   amount: 24.80, payment: "cash", status: "completed"  },
  { id: "R-1001", dateTime: "2026-03-26 17:30", type: "Passagier", from: "Hauptbahnhof",     to: "Zehlendorf",       amount: 34.60, payment: "card", status: "completed"  },
];

const RIDES_PER_PAGE = 8;

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDateTime(dt: string) {
  const [date, time] = dt.split(" ");
  return (
    <span className="flex flex-col gap-0.5">
      <span>{date}</span>
      <span className="text-xs text-z-neutral-400 dark:text-z-neutral-500">{time}</span>
    </span>
  );
}

function TypeBadge({ type }: { type: RideType }) {
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

function PaymentBadge({ method }: { method: PaymentMethod }) {
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

function StatusBadge({ status }: { status: RideStatus }) {
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
    r.payment === "card" ? "Karte" : "Bar",
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
  const [search, setSearch]               = useState("");
  const [filterType, setFilterType]       = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [filterStatus, setFilterStatus]   = useState<string>("all");
  const [currentPage, setCurrentPage]     = useState(1);


  const {data: rideHistory, isLoading} = useGetRideHistoryQuery();

  useEffect(() => {
    console.log(rideHistory);
  }, [rideHistory])

  // Only search is wired up — filter logic left for the developer
  const filtered = useMemo(() => {
    if (!search.trim()) return DUMMY_RIDES;
    const q = search.toLowerCase();
    return DUMMY_RIDES.filter(
      (ride) =>
        ride.id.toLowerCase().includes(q) ||
        ride.from.toLowerCase().includes(q) ||
        ride.to.toLowerCase().includes(q) ||
        ride.dateTime.includes(q)
    );
  }, [search]);

  // Pagination
  const totalPages      = Math.max(1, Math.ceil(filtered.length / RIDES_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginated       = filtered.slice(
    (safeCurrentPage - 1) * RIDES_PER_PAGE,
    safeCurrentPage * RIDES_PER_PAGE
  );

  const handleSearch = (v: string) => { setSearch(v); setCurrentPage(1); };

  // Pagination page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    if (safeCurrentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "…", totalPages);
    } else if (safeCurrentPage >= totalPages - 3) {
      pages.push(1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "…", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "…", totalPages);
    }
    return pages;
  }, [totalPages, safeCurrentPage]);

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
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
        {/* Search — full width on mobile, flex-1 on desktop */}
        <div className="relative w-full sm:flex-1">
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
          <Input
            placeholder="Fahrten nach ID, Route oder Datum suchen ..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
          />
        </div>

        {/* Separator — desktop only */}
        <div className="h-5 w-px bg-z-neutral-200 dark:bg-z-neutral-700 hidden sm:block" />

        {/* Filters — equal-width 3-col grid on mobile, inline row on desktop */}
        <div className="grid grid-cols-3 sm:flex sm:items-center gap-2">
          {/* Type filter */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="h-9 text-sm w-full sm:w-auto sm:min-w-[120px] bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-700 dark:text-z-neutral-200">
              <SelectValue placeholder="Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Typen</SelectItem>
              <SelectItem value="Passagier">Passagier</SelectItem>
              <SelectItem value="Boten">Boten</SelectItem>
            </SelectContent>
          </Select>

          {/* Payment filter */}
          <Select value={filterPayment} onValueChange={setFilterPayment}>
            <SelectTrigger className="h-9 text-sm w-full sm:w-auto sm:min-w-[130px] bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-700 dark:text-z-neutral-200">
              <SelectValue placeholder="Zahlung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Zahlungen</SelectItem>
              <SelectItem value="card">Karte</SelectItem>
              <SelectItem value="cash">Bar</SelectItem>
            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9 text-sm w-full sm:w-auto sm:min-w-[130px] bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-700 dark:text-z-neutral-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="completed">Abgeschlossen</SelectItem>
              <SelectItem value="cancelled">Storniert</SelectItem>
              <SelectItem value="pending">Ausstehend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-lg overflow-hidden border border-z-neutral-200 dark:border-z-neutral-700 bg-white dark:bg-z-neutral-800 mb-6">
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
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-sm text-z-neutral-400 dark:text-z-neutral-500">
                  Keine Fahrten gefunden.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((ride, idx) => (
                <TableRow
                  key={ride.id}
                  className={cn(
                    "transition-colors hover:bg-z-neutral-50 dark:hover:bg-z-neutral-700/40",
                    idx < paginated.length - 1
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
                  <TableCell className="py-4 px-4">
                    <TypeBadge type={ride.type} />
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
                    <PaymentBadge method={ride.payment} />
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <StatusBadge status={ride.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer: count + pagination ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500">
          {filtered.length === 0
            ? "Keine Fahrten gefunden"
            : `${(safeCurrentPage - 1) * RIDES_PER_PAGE + 1}–${Math.min(safeCurrentPage * RIDES_PER_PAGE, filtered.length)} von ${filtered.length} Fahrten`}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            {/* Prev */}
            <button
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="inline-flex items-center justify-center w-8 h-8 rounded text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700 text-z-neutral-600 dark:text-z-neutral-300"
              aria-label="Vorherige Seite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>

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
                <button
                  key={p}
                  onClick={() => setCurrentPage(p as number)}
                  className={cn(
                    "inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium transition-colors",
                    p === safeCurrentPage
                      ? "bg-z-violet-500 text-white dark:bg-z-violet-500 dark:text-white"
                      : "text-z-neutral-600 dark:text-z-neutral-300 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700"
                  )}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="inline-flex items-center justify-center w-8 h-8 rounded text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-z-neutral-100 dark:hover:bg-z-neutral-700 text-z-neutral-600 dark:text-z-neutral-300"
              aria-label="Nächste Seite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06L7.28 11.78a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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
import { Spinner } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { useGetInvoicesQuery, useGetInvoicesStatsQuery } from "@/redux/api/apis/invoices";
import type { InvoiceStatus, Invoice } from "@/types/Invoice";
import { RotateCcw, Plus, Eye, Download, Loader2 } from "lucide-react";
import { PaginationBar } from "@/components/PaginationBar";

import { InvoiceStatusBadge } from "./_components/badges";
import { TableSkeletonRows, MobileSkeletonCards, StatCardSkeleton } from "./_components/skeletons";
import { CreateInvoiceDialog } from "./_components/CreateInvoiceDialog";
import { InvoicePreviewDialog, downloadInvoicePDF } from "./_components/InvoicePreviewDialog";



// ── Stat card ──────────────────────────────────────────────────────────────────

interface InvoiceStatCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function InvoiceStatCard({ label, value, valueClassName }: InvoiceStatCardProps) {
  return (
    <div className="rounded-xl border border-z-neutral-200 dark:border-z-neutral-700 bg-white dark:bg-z-neutral-800 px-5 py-4 transition-all duration-150 hover:shadow-md hover:border-z-violet-200 hover:-translate-y-0.5 cursor-default">
      <p className="text-xs font-medium text-z-neutral-500 dark:text-z-neutral-400 mb-1.5">{label}</p>
      <p className={cn("text-2xl font-bold tracking-tight text-z-neutral-900 dark:text-z-neutral-50", valueClassName)}>
        {value}
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (inv: Invoice) => {
    setDownloadingId(inv.id);
    try {
      await downloadInvoicePDF(inv);
    } finally {
      setDownloadingId(null);
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: invoices, isLoading: isLoadingInvoices, isFetching } = useGetInvoicesQuery(currentPage - 1);
  const isPaginating = isFetching && !isLoadingInvoices;
  const { data: stats } = useGetInvoicesStatsQuery();

  const showSkeleton = !mounted || isLoadingInvoices;

  // ── Filter ─────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const invoicesToFilter = invoices?.content ?? [];
    return invoicesToFilter.filter((inv) => {
      if (filterStatus !== "all" && inv.status !== filterStatus) return false;
      if (q !== "") {
        const matchId = inv.id.toLowerCase().includes(q);
        const matchRide = inv.rideId.toLowerCase().includes(q);
        const matchCustomer = inv.customer.toLowerCase().includes(q);
        const matchDate = inv.date.includes(q);
        if (!matchId && !matchRide && !matchCustomer && !matchDate) return false;
      }
      return true;
    });
  }, [invoices, search, filterStatus]);

  // ── Pagination — alle Werte kommen vom Server ────────────────────────────────

  const totalPages = invoices?.page.totalPages ?? 1;
  const activePage = (invoices?.page.number ?? currentPage - 1) + 1;
  const pageStart = invoices ? invoices.page.number * invoices.page.size + 1 : 0;
  const pageEnd = invoices ? Math.min((invoices.page.number + 1) * invoices.page.size, invoices.page.totalElements) : 0;
  const totalElements = invoices?.page.totalElements ?? 0;

  const handleSearch = (v: string) => { setSearch(v); setCurrentPage(1); };
  const handleFilterStatus = (v: string) => { setFilterStatus(v); setCurrentPage(1); };

  // ── Stats ──────────────────────────────────────────────────────────────────

  const fmt = (n: number) => `${n.toFixed(2)} €`;

  return (
    <div className="max-w-[1440px] mx-auto">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Rechnungen"
          subtitle="Alle generierten Rechnungen verwalten und einsehen"
        />
        <Button
          size="lg"
          className="gap-1.5 shrink-0 bg-z-violet-500 hover:bg-z-violet-600 text-white dark:bg-z-violet-500 dark:hover:bg-z-violet-600 text-sm"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Rechnung erstellen</span>
          <span className="sm:hidden">Erstellen</span>
        </Button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {showSkeleton ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <InvoiceStatCard
              label="Gesamt"
              value={fmt(stats?.totalInvoiced ?? 0)}
            />
            <InvoiceStatCard
              label="Bezahlt"
              value={fmt(stats?.paid ?? 0)}
              valueClassName="text-orange-600 dark:text-orange-400"
            />
            <InvoiceStatCard
              label="Ausstehend"
              value={fmt(stats?.pending ?? 0)}
              valueClassName="text-green-600 dark:text-green-400"
            />
            <InvoiceStatCard
              label="Überfällig"
              value={fmt(stats?.overdue ?? 0)}
              valueClassName="text-red-600 dark:text-red-400"
            />
          </>
        )}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-6">
        {/* Search */}
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
              placeholder="Rechnungen suchen …"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              data-testid="invoices-search-input"
              className="pl-9 h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
            />
            {/* Mobile reset */}
            <Button
              size="lg"
              className="lg:hidden text-sm shrink-0"
              data-testid="invoices-reset-button"
              onClick={() => { setSearch(""); setFilterStatus("all"); setCurrentPage(1); }}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="sr-only">Filter zurücksetzen</span>
            </Button>
          </div>
        </div>

        {/* Separator */}
        <div className="h-5 w-px bg-z-neutral-200 dark:bg-z-neutral-700 hidden lg:block" />

        {/* Filters row */}
        <div className="flex items-center gap-2">
          <Select value={filterStatus} onValueChange={handleFilterStatus}>
            <SelectTrigger
              className="h-9 text-sm w-full lg:w-auto lg:min-w-[150px] bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-700 dark:text-z-neutral-200"
              data-testid="invoices-filter-status-trigger"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="paid">Bezahlt</SelectItem>
              <SelectItem value="pending">Ausstehend</SelectItem>
              <SelectItem value="overdue">Überfällig</SelectItem>
            </SelectContent>
          </Select>

          {/* Desktop reset */}
          <Button
            size="lg"
            className="hidden lg:flex text-sm"
            data-testid="invoices-reset-button"
            onClick={() => { setSearch(""); setFilterStatus("all"); setCurrentPage(1); }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Filters</span>
          </Button>
        </div>
      </div>

      {/* ── Mobile card list ── */}
      <div className="relative sm:hidden rounded-lg overflow-hidden border border-z-neutral-200 dark:border-z-neutral-700 bg-white dark:bg-z-neutral-800 mb-6">
        {isPaginating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-z-neutral-800/70 rounded-lg">
            <Spinner className="w-6 h-6" />
          </div>
        )}
        {showSkeleton ? (
          <MobileSkeletonCards />
        ) : filtered.length === 0 ? (
          <p className="text-center py-12 text-sm text-z-neutral-400 dark:text-z-neutral-500">
            Keine Rechnungen gefunden.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-z-neutral-200 dark:divide-z-neutral-700">
            {filtered.map((inv) => (
              <div key={inv.id} className="flex items-center gap-3 py-3.5 px-4">
                {/* Icon */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-z-violet-100 dark:bg-violet-950/50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-z-violet-500">
                    <path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-z-neutral-900 dark:text-z-neutral-50 truncate">
                    {inv.id}
                  </p>
                  <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500 mt-0.5">
                    {inv.date}&nbsp;&nbsp;{inv.customer}
                  </p>
                </div>

                {/* Amount + status */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-sm font-semibold text-z-neutral-900 dark:text-z-neutral-50">
                    {inv.amount.toFixed(2)} €
                  </span>
                  <InvoiceStatusBadge status={inv.status as InvoiceStatus} />
                </div>

                {/* Eye + Download */}
                <div className="ml-1 flex items-center gap-0.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-z-neutral-400 hover:text-z-violet-500 hover:bg-z-violet-50 dark:hover:bg-z-violet-950/30"
                    aria-label={`Rechnung ${inv.id} anzeigen`}
                    onClick={() => setPreviewInvoice(inv)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-z-neutral-400 hover:text-z-violet-500 hover:bg-z-violet-50 dark:hover:bg-z-violet-950/30"
                    aria-label={`Rechnung ${inv.id} herunterladen`}
                    disabled={downloadingId === inv.id}
                    onClick={() => handleDownload(inv)}
                  >
                    {downloadingId === inv.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop table ── */}
      <div className="relative hidden sm:block rounded-lg overflow-hidden border border-z-neutral-200 dark:border-z-neutral-700 bg-white dark:bg-z-neutral-800 mb-6">
        {isPaginating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-z-neutral-800/70 rounded-lg">
            <Spinner className="w-6 h-6" />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow className="border-b border-z-neutral-200 dark:border-z-neutral-700 bg-z-neutral-100 dark:bg-z-neutral-800 hover:bg-z-neutral-100 dark:hover:bg-z-neutral-800">
              {["Rechnung #", "Fahrt-ID", "Datum", "Kunde", "Betrag", "Status", "Aktionen"].map((h) => (
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
                <TableCell colSpan={7} className="text-center py-12 text-sm text-z-neutral-400 dark:text-z-neutral-500">
                  Keine Rechnungen gefunden.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((inv, idx) => (
                <TableRow
                  key={inv.id}
                  className={cn(
                    "transition-colors hover:bg-z-neutral-50 dark:hover:bg-z-neutral-700/40",
                    idx < filtered.length - 1
                      ? "border-b border-z-neutral-200 dark:border-z-neutral-700"
                      : "border-none"
                  )}
                >
                  <TableCell className="py-4 px-4 font-medium text-sm text-z-neutral-900 dark:text-z-neutral-100">
                    {inv.id}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm text-z-neutral-500 dark:text-z-neutral-400">
                    {inv.rideId}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm text-z-neutral-600 dark:text-z-neutral-300">
                    {inv.date}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm text-z-neutral-900 dark:text-z-neutral-100">
                    {inv.customer}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm font-medium text-z-neutral-900 dark:text-z-neutral-100">
                    {inv.amount.toFixed(2)} €
                  </TableCell>
                  <TableCell className="py-4 px-4" data-testid="invoices-row-status">
                    <InvoiceStatusBadge status={inv.status as InvoiceStatus} />
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-0.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-z-neutral-400 hover:text-z-violet-500 hover:bg-z-violet-50 dark:hover:bg-z-violet-950/30"
                        aria-label={`Rechnung ${inv.id} anzeigen`}
                        onClick={() => setPreviewInvoice(inv)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-z-neutral-400 hover:text-z-violet-500 hover:bg-z-violet-50 dark:hover:bg-z-violet-950/30"
                        aria-label={`Rechnung ${inv.id} herunterladen`}
                        disabled={downloadingId === inv.id}
                        onClick={() => handleDownload(inv)}
                      >
                        {downloadingId === inv.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
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
          ) : totalElements === 0 ? (
            "Keine Rechnungen gefunden"
          ) : (
            `${pageStart}–${pageEnd} von ${totalElements} Rechnungen`
          )}
        </span>

        {!showSkeleton && totalPages > 1 && (
          <PaginationBar
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            prevTestId="invoices-pagination-prev"
            nextTestId="invoices-pagination-next"
            className={isPaginating ? "opacity-60 pointer-events-none" : ""}
          />
        )}
      </div>

      {/* ── Create Invoice Dialog ── */}
      <CreateInvoiceDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* ── Invoice PDF Preview Dialog ── */}
      <InvoicePreviewDialog
        invoice={previewInvoice}
        onClose={() => setPreviewInvoice(null)}
      />
    </div>
  );
}

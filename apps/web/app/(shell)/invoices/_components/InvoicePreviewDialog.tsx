"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/types/Invoice";

// ── Helpers ────────────────────────────────────────────────────────────────────

async function buildPdfBlob(invoice: Invoice): Promise<Blob> {
  const { pdf } = await import("@react-pdf/renderer");
  const { InvoicePDF } = await import("./InvoicePDF");
  return pdf(<InvoicePDF invoice={invoice} />).toBlob();
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface InvoicePreviewDialogProps {
  invoice: Invoice | null;
  onClose: () => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function InvoicePreviewDialog({ invoice, onClose }: InvoicePreviewDialogProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Generate blob URL whenever invoice changes
  useEffect(() => {
    if (!invoice) {
      setBlobUrl(null);
      return;
    }
    let revoked = false;
    setLoading(true);
    buildPdfBlob(invoice)
      .then((blob) => {
        if (revoked) return;
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      })
      .finally(() => {
        if (!revoked) setLoading(false);
      });
    return () => {
      revoked = true;
      setBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [invoice]);

  // Close on Escape
  useEffect(() => {
    if (!invoice) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [invoice, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = invoice ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [invoice]);

  const handleDownload = useCallback(async () => {
    if (!invoice) return;
    setDownloading(true);
    try {
      const blob = await buildPdfBlob(invoice);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoice.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }, [invoice]);

  if (!invoice) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="relative flex flex-col w-full max-w-4xl h-[90vh] rounded-xl bg-white dark:bg-z-neutral-800 shadow-2xl overflow-hidden border border-z-neutral-200 dark:border-z-neutral-700">

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-z-neutral-200 dark:border-z-neutral-700 shrink-0">
          <div>
            <p className="text-sm font-semibold text-z-neutral-900 dark:text-z-neutral-50">
              Rechnungsvorschau
            </p>
            <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500 mt-0.5">
              {invoice.id} · {invoice.customer} · {invoice.amount.toFixed(2)} €
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              disabled={downloading || loading}
              className="gap-1.5 bg-z-violet-500 hover:bg-z-violet-600 text-white dark:bg-z-violet-500 dark:hover:bg-z-violet-600 text-xs"
              onClick={handleDownload}
            >
              {downloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              {downloading ? "Wird erstellt…" : "PDF herunterladen"}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-z-neutral-400 hover:text-z-neutral-700 dark:hover:text-z-neutral-200"
              aria-label="Vorschau schließen"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ── PDF iframe ── */}
        <div className="flex-1 overflow-hidden bg-z-neutral-100 dark:bg-z-neutral-900">
          {loading || !blobUrl ? (
            <div className="flex h-full items-center justify-center text-z-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <iframe
              src={blobUrl}
              className="w-full h-full border-0"
              title={`Rechnung ${invoice.id}`}
            />
          )}
        </div>

      </div>
    </div>
  );
}

// ── Standalone download util (used by the Download icon button) ────────────────

export async function downloadInvoicePDF(invoice: Invoice): Promise<void> {
  const { pdf } = await import("@react-pdf/renderer");
  const { InvoicePDF } = await import("./InvoicePDF");
  const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invoice.id}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

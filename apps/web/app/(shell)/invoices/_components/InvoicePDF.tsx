"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Invoice } from "@/types/Invoice";

// ── Typography — use built-in Helvetica for crisp output ──────────────────────

// ── Colour palette ─────────────────────────────────────────────────────────────
const C = {
  violet: "#7C3AED",   // z-violet-600
  violetLight: "#EDE9FE",
  neutral50: "#F8FAFC",
  neutral100: "#F1F5F9",
  neutral200: "#E2E8F0",
  neutral500: "#64748B",
  neutral700: "#334155",
  neutral900: "#0F172A",
  green: "#16A34A",
  orange: "#EA580C",
  red: "#DC2626",
  white: "#FFFFFF",
} as const;

// ── Styles ─────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: C.neutral900,
    backgroundColor: C.white,
    paddingTop: 36,
    paddingBottom: 52,
    paddingHorizontal: 48,
    lineHeight: 1.4,
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 56,
    objectFit: "contain",
  },
  senderBlock: {
    alignItems: "flex-end",
  },
  senderCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: C.neutral900,
  },
  senderDetail: {
    fontSize: 9,
    color: C.neutral500,
    marginTop: 1,
  },

  // ── Divider ──
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: C.violet,
    marginBottom: 18,
  },

  // ── Recipient + meta two-column ──
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  recipientBlock: {
    flex: 1,
  },
  recipientLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.neutral500,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  recipientName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: C.neutral900,
    marginBottom: 2,
  },
  recipientDetail: {
    fontSize: 9,
    color: C.neutral500,
  },
  invoiceMetaBlock: {
    width: 180,
    alignItems: "flex-end",
  },
  invoiceTitleBadge: {
    backgroundColor: C.violet,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 8,
  },
  metaLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 3,
  },
  metaKey: {
    fontSize: 9,
    color: C.neutral500,
    marginRight: 8,
  },
  metaValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: C.neutral900,
  },

  // ── Items table ──
  tableHeader: {
    flexDirection: "row",
    backgroundColor: C.neutral100,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: C.neutral500,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: C.neutral200,
  },
  colPos: { width: 28 },
  colDesc: { flex: 1 },
  colDate: { width: 72 },
  colUnit: { width: 56 },
  colAmount: { width: 72, alignItems: "flex-end" },
  cellText: { fontSize: 10, color: C.neutral700 },
  cellTextRight: { fontSize: 10, color: C.neutral700, textAlign: "right" },

  // ── Totals ──
  totalsBlock: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 3,
    width: 240,
  },
  totalKey: {
    fontSize: 9,
    color: C.neutral500,
    width: 140,
    textAlign: "right",
    paddingRight: 12,
  },
  totalValue: {
    fontSize: 9,
    color: C.neutral700,
    width: 80,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1.5,
    borderTopColor: C.violet,
    width: 240,
  },
  grandTotalKey: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.neutral900,
    width: 140,
    textAlign: "right",
    paddingRight: 12,
  },
  grandTotalValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.violet,
    width: 80,
    textAlign: "right",
  },

  // ── Payment box ──
  paymentBox: {
    marginTop: 14,
    backgroundColor: C.neutral50,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.violet,
  },
  paymentTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: C.neutral900,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  paymentKey: {
    fontSize: 9,
    color: C.neutral500,
    width: 110,
  },
  paymentValue: {
    fontSize: 9,
    color: C.neutral700,
    fontFamily: "Helvetica-Bold",
  },

  // ── Status badge ──
  statusBadgePaid: {
    backgroundColor: "#DCFCE7",
    color: C.green,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    alignSelf: "flex-start",
    marginTop: 4,
  },
  statusBadgePending: {
    backgroundColor: "#FEF9C3",
    color: "#A16207",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    alignSelf: "flex-start",
    marginTop: 4,
  },
  statusBadgeOverdue: {
    backgroundColor: "#FEE2E2",
    color: C.red,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    alignSelf: "flex-start",
    marginTop: 4,
  },

  // ── Legal / notes ──
  legalBox: {
    marginTop: 12,
    padding: 9,
    borderWidth: 1,
    borderColor: C.neutral200,
    borderRadius: 4,
  },
  legalTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: C.neutral500,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  legalText: {
    fontSize: 7,
    color: C.neutral500,
    lineHeight: 1.5,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 20,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: C.neutral200,
    paddingTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7.5,
    color: C.neutral500,
  },
  footerViolet: {
    fontSize: 7.5,
    color: C.violet,
    fontFamily: "Helvetica-Bold",
  },
});

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function statusLabel(status: Invoice["status"]): string {
  if (status === "paid") return "Bezahlt";
  if (status === "pending") return "Ausstehend";
  return "Überfällig";
}

function dueDate(invoiceDate: string): string {
  const d = new Date(invoiceDate);
  d.setDate(d.getDate() + 14);
  return formatDate(d.toISOString().split("T")[0]);
}

// Net + 19 % VAT breakdown
function vatBreakdown(gross: number) {
  const net = gross / 1.19;
  const vat = gross - net;
  return { net, vat };
}

// ── Component ──────────────────────────────────────────────────────────────────

interface InvoicePDFProps {
  invoice: Invoice;
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  const { net, vat } = vatBreakdown(invoice.amount);

  const statusStyle =
    invoice.status === "paid"
      ? s.statusBadgePaid
      : invoice.status === "pending"
      ? s.statusBadgePending
      : s.statusBadgeOverdue;

  return (
    <Document
      title={`Rechnung ${invoice.id}`}
      author="Zynqly GmbH"
      subject={`Rechnung für Fahrt ${invoice.rideId}`}
      creator="Zynqly Platform"
      producer="@react-pdf/renderer"
    >
      <Page size="A4" style={s.page}>

        {/* ── Header: Logo + Absender ── */}
        <View style={s.header}>
          <Image src="/Logo.png" style={s.logo} />
          <View style={s.senderBlock}>
            <Text style={s.senderCompany}>Zynqly GmbH</Text>
            <Text style={s.senderDetail}>Musterstraße 42</Text>
            <Text style={s.senderDetail}>10115 Berlin</Text>
            <Text style={s.senderDetail}>Deutschland</Text>
            <Text style={s.senderDetail}>Tel.: +49 30 1234567</Text>
            <Text style={s.senderDetail}>E-Mail: buchhaltung@zynqly.de</Text>
            <Text style={s.senderDetail}>Web: app.zynqly.de</Text>
          </View>
        </View>

        {/* ── Violet divider ── */}
        <View style={s.divider} />

        {/* ── Recipient + Invoice meta ── */}
        <View style={s.metaRow}>
          {/* Recipient */}
          <View style={s.recipientBlock}>
            <Text style={s.recipientLabel}>Rechnungsempfänger</Text>
            <Text style={s.recipientName}>{invoice.customer}</Text>
            <Text style={s.recipientDetail}>Kundenreferenz: {invoice.id}</Text>
            <Text style={[s.recipientDetail, { marginTop: 6 }]}>
              Zynqly GmbH · Musterstraße 42 · 10115 Berlin
            </Text>
          </View>

          {/* Invoice meta */}
          <View style={s.invoiceMetaBlock}>
            <Text style={s.invoiceTitleBadge}>RECHNUNG</Text>
            <View style={s.metaLine}>
              <Text style={s.metaKey}>Rechnungs-Nr.</Text>
              <Text style={s.metaValue}>{invoice.id}</Text>
            </View>
            <View style={s.metaLine}>
              <Text style={s.metaKey}>Rechnungsdatum</Text>
              <Text style={s.metaValue}>{formatDate(invoice.date)}</Text>
            </View>
            <View style={s.metaLine}>
              <Text style={s.metaKey}>Leistungsdatum</Text>
              <Text style={s.metaValue}>{formatDate(invoice.date)}</Text>
            </View>
            <View style={s.metaLine}>
              <Text style={s.metaKey}>Fälligkeitsdatum</Text>
              <Text style={s.metaValue}>{dueDate(invoice.date)}</Text>
            </View>
            <View style={s.metaLine}>
              <Text style={s.metaKey}>Status</Text>
              <Text style={statusStyle}>{statusLabel(invoice.status)}</Text>
            </View>
          </View>
        </View>

        {/* ── Items table ── */}
        {/* Table header */}
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, s.colPos]}>#</Text>
          <Text style={[s.tableHeaderCell, s.colDesc]}>Leistungsbeschreibung</Text>
          <Text style={[s.tableHeaderCell, s.colDate]}>Datum</Text>
          <Text style={[s.tableHeaderCell, s.colUnit]}>Fahrt-ID</Text>
          <Text style={[s.tableHeaderCell, s.colAmount, { textAlign: "right" }]}>Betrag</Text>
        </View>

        {/* Single item row */}
        <View style={s.tableRow}>
          <Text style={[s.cellText, s.colPos]}>1</Text>
          <View style={s.colDesc}>
            <Text style={s.cellText}>Beförderungsleistung (Taxi)</Text>
            <Text style={[s.cellText, { fontSize: 8.5, color: "#94A3B8", marginTop: 2 }]}>
              Personenbeförderung gemäß Taxifahrt-Protokoll
            </Text>
          </View>
          <Text style={[s.cellText, s.colDate]}>{formatDate(invoice.date)}</Text>
          <Text style={[s.cellText, s.colUnit]}>{invoice.rideId}</Text>
          <Text style={[s.cellTextRight, s.colAmount]}>
            {net.toFixed(2)} €
          </Text>
        </View>

        {/* ── Totals ── */}
        <View style={s.totalsBlock}>
          <View style={s.totalRow}>
            <Text style={s.totalKey}>Nettobetrag</Text>
            <Text style={s.totalValue}>{net.toFixed(2)} €</Text>
          </View>
          <View style={s.totalRow}>
            <Text style={s.totalKey}>zzgl. 19 % Umsatzsteuer</Text>
            <Text style={s.totalValue}>{vat.toFixed(2)} €</Text>
          </View>
          <View style={s.grandTotalRow}>
            <Text style={s.grandTotalKey}>Gesamtbetrag (brutto)</Text>
            <Text style={s.grandTotalValue}>{invoice.amount.toFixed(2)} €</Text>
          </View>
        </View>

        {/* ── Payment info ── */}
        <View style={s.paymentBox}>
          <Text style={s.paymentTitle}>Zahlungsinformationen</Text>
          <View style={s.paymentRow}>
            <Text style={s.paymentKey}>Kontoinhaber</Text>
            <Text style={s.paymentValue}>Zynqly GmbH</Text>
          </View>
          <View style={s.paymentRow}>
            <Text style={s.paymentKey}>IBAN</Text>
            <Text style={s.paymentValue}>DE89 3704 0044 0532 0130 00</Text>
          </View>
          <View style={s.paymentRow}>
            <Text style={s.paymentKey}>BIC</Text>
            <Text style={s.paymentValue}>COBADEFFXXX</Text>
          </View>
          <View style={s.paymentRow}>
            <Text style={s.paymentKey}>Verwendungszweck</Text>
            <Text style={s.paymentValue}>{invoice.id}</Text>
          </View>
          <View style={[s.paymentRow, { marginTop: 4 }]}>
            <Text style={s.paymentKey}>Zahlungsziel</Text>
            <Text style={s.paymentValue}>14 Tage netto (bis {dueDate(invoice.date)})</Text>
          </View>
        </View>

        {/* ── Legal notes ── */}
        <View style={s.legalBox}>
          <Text style={s.legalTitle}>Rechtliche Hinweise</Text>
          <Text style={s.legalText}>
            Steuernummer: 30/268/12345 · Umsatzsteuer-Identifikationsnummer: DE 123456789{"\n"}
            Handelsregister: Amtsgericht Berlin-Charlottenburg, HRB 123456 B{"\n"}
            Geschäftsführer: Max Mustermann{"\n\n"}
            Die Rechnungsstellung erfolgt gemäß § 14 UStG. Der ausgewiesene Umsatzsteuerbetrag ist nach {"\n"}
            den deutschen steuerrechtlichen Vorschriften (UStG) korrekt berechnet.{"\n"}
            Bei Fragen zu dieser Rechnung wenden Sie sich bitte an buchhaltung@zynqly.de.{"\n\n"}
            Bitte überweisen Sie den Rechnungsbetrag unter Angabe der Rechnungsnummer als Verwendungszweck.{"\n"}
            Bei verspäteter Zahlung behalten wir uns vor, Verzugszinsen gemäß § 288 BGB zu berechnen.
          </Text>
        </View>

        {/* ── Footer ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            Zynqly GmbH · Musterstraße 42 · 10115 Berlin · HRB 123456 B
          </Text>
          <Text style={s.footerViolet}>{invoice.id}</Text>
        </View>

      </Page>
    </Document>
  );
}

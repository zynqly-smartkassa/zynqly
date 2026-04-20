export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface Invoice {
  id: string;       // "INV-2026-0089"
  rideId: string;   // "R-1042"
  date: string;     // "2026-04-11"
  customer: string; // "Max Müller"
  amount: number;   // 42.50
  status: InvoiceStatus;
}

export interface InvoiceStats {
  totalInvoiced: number;
  paid: number;
  pending: number;
  overdue: number;
}

export interface InvoicesResponse {
  stats: InvoiceStats;
  invoices: Invoice[];
}

export interface CreateInvoiceRequest {
  rideId: string;
  customer: string;
  amount: number;
}

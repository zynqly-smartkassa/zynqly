
export interface Ride {
  id: string;
  dateTime: string; // ISO-8601, e.g. "2026-04-11T08:15:00"
  type: "Passagier" | "Boten";
  from: string;
  to: string;
  amount: number;
  settlement: "card" | "cash";
  status: "completed" | "cancelled" | "pending";
}

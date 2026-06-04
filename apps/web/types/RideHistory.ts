
/** Compact ride shape returned by the paginated list endpoint (GET /ride). */
export interface Ride {
  id: string;
  dateTime: string; // ISO-8601, e.g. "2026-04-11T08:15:00"
  type: "Passagier" | "Boten";
  fromLocation: string;
  toLocation: string;
  amount: number;
  settlement: "card" | "cash";
  status: "completed" | "cancelled" | "pending";
}

/** Full ride entity returned by the detail endpoint (GET /ride/{id}). */
export interface RideDetail {
  id: string;
  userId: string;
  vehicleId: string;
  type: "Passagier" | "Boten";
  startAddress: string;
  endAddress: string;
  startTime: string;
  endTime: string;
  duration: string;
  distance: string;
  route: string; // JSON-encoded list of [lat, lng] pairs
  amount: number;
  settlement: "card" | "cash";
  status: "completed" | "cancelled" | "pending";
}

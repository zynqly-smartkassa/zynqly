export interface Dashboard {
  stats: Stat[];
  monthlyData: MonthlyData[];
  weeklyData: WeeklyData[];
  settlementData: Settlement[];
  topDrivers: TopDriver[];
}

export interface Stat {
  label: string;
  value: string;
  rawValue: number;
  change: string;
  changePercent: number | null;
  positive: boolean;
  icon: "revenue" | "rides" | "drivers" | "fare";
}

export interface MonthlyData {
  month: string;
  revenue: number;
  rides: number;
}

export interface WeeklyData {
  day: string;
  brutto: number;
  netto: number;
}

export interface Settlement {
  name: string;
  value: number;
}

export interface TopDriver {
  name: string;
  rides: number;
  revenue: string;
  revenueRaw: number;
  rating: number;
}

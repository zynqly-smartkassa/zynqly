"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/stat-card";
import { useGetDashboardQuery } from "@/redux/api/apis/dashboard";

/* ── Icon map: API key → JSX ─────────────────────────────── */
const ICON_MAP: Record<string, React.ReactNode> = {
  revenue: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.75 1.73 1.111.309 2.251-.522 2.251-1.673V14.5H1.75Z" clipRule="evenodd" />
    </svg>
  ),
  rides: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h-.5a.5.5 0 0 0 0 1H2v2.5a1.5 1.5 0 0 0 1.5 1.5h1A1.5 1.5 0 0 0 6 14v-.5h8v.5a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V11.5h.5a.5.5 0 0 0 0-1H18V4.607a1.49 1.49 0 0 0-1.375-1.49A44.07 44.07 0 0 0 13.5 3h-7Z" />
    </svg>
  ),
  drivers: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
    </svg>
  ),
  fare: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v.558a2.75 2.75 0 0 0 .75 5.392v1.558a1.25 1.25 0 0 1-.75-1.158.75.75 0 0 0-1.5 0 2.75 2.75 0 0 0 1.5 2.443v.457a.75.75 0 0 0 1.5 0v-.457a2.75 2.75 0 0 0-.75-5.393V8.1c.358.183.6.55.6.95a.75.75 0 0 0 1.5 0 2.75 2.75 0 0 0-1.35-2.35v-.9Z" clipRule="evenodd" />
    </svg>
  ),
};

/* ── Donut chart colors (frontend-only) ──────────────────── */
const SETTLEMENT_COLORS = ["var(--z-violet-500)", "var(--z-violet-200)"];

const monthlyChartConfig: ChartConfig = {
  revenue: { label: "Umsatz", color: "var(--z-violet-500)" },
};

const weeklyChartConfig: ChartConfig = {
  brutto: { label: "Brutto", color: "var(--z-violet-500)" },
  netto: { label: "Netto", color: "var(--z-violet-200)" },
};

/* ── Component ────────────────────────────────────────────── */
export default function DashboardPage() {
  const { data, isLoading } = useGetDashboardQuery();

  const settlementWithColors = data?.settlementData.map((s, i) => ({
    ...s,
    color: SETTLEMENT_COLORS[i % SETTLEMENT_COLORS.length],
  })) ?? [];

  return (
    <div className="min-h-screen" style={{ background: "var(--z-bg-page)" }}>

      {/* ── Main content ─────────────────────────────────── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--z-text-main)" }}>
            Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--z-text-secondary)" }}>
            Übersicht über diesen Monat
          </p>
        </div>

        {/* ── KPI cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[100px] rounded-xl" />
            ))
            : data?.stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                positive={stat.positive}
                icon={ICON_MAP[stat.icon]}
              />
            ))}
        </div>

        {/* ── Row: Area chart + Donut ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 mb-6">
          {/* Monthly Revenue & Rides */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Monatlicher Umsatz &amp; Fahrten
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[260px] w-full rounded-lg" />
              ) : (
                <ChartContainer config={monthlyChartConfig} className="h-[260px] w-full">
                  <AreaChart data={data?.monthlyData ?? []} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--z-violet-400)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--z-violet-400)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="var(--z-border)" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--z-text-muted)" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--z-text-muted)" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--z-violet-500)"
                      strokeWidth={2.5}
                      fill="url(#revGrad)"
                    />
                  </AreaChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Settlement Methods */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Zahlungsarten
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {isLoading ? (
                <>
                  <Skeleton className="w-48 h-48 rounded-full" />
                  <div className="flex flex-col gap-2 mt-4 w-full">
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-48 h-48">
                    <ChartContainer config={{ card: { label: "Karte", color: "var(--z-violet-500)" }, cash: { label: "Bar", color: "var(--z-violet-200)" } }} className="w-full h-full">
                      <PieChart>
                        <Pie
                          data={settlementWithColors}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          {settlementWithColors.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 w-full">
                    {settlementWithColors.map((entry) => (
                      <div key={entry.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-sm" style={{ background: entry.color }} />
                          <span style={{ color: "var(--z-text-secondary)" }}>{entry.name}</span>
                        </div>
                        <span className="font-semibold" style={{ color: "var(--z-text-main)" }}>{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </>)}
            </CardContent>
          </Card>
        </div>

        {/* ── Row: Bar chart + Table ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Weekly Earnings */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Wocheneinnahmen (Brutto vs. Netto)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[260px] w-full rounded-lg" />
              ) : (
                <ChartContainer config={weeklyChartConfig} className="h-[260px] w-full">
                  <BarChart data={data?.weeklyData ?? []} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
                    <CartesianGrid vertical={false} stroke="var(--z-border)" strokeDasharray="3 3" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--z-text-muted)" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--z-text-muted)" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="brutto" fill="var(--z-violet-500)" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="netto" fill="var(--z-violet-200)" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Top Drivers */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Top Fahrer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex flex-col gap-3 p-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b" style={{ borderColor: "var(--z-border)" }}>
                      <TableHead className="text-xs font-semibold" style={{ color: "var(--z-text-secondary)" }}>Fahrer</TableHead>
                      <TableHead className="text-xs font-semibold text-right" style={{ color: "var(--z-text-secondary)" }}>Fahrten</TableHead>
                      <TableHead className="text-xs font-semibold text-right" style={{ color: "var(--z-text-secondary)" }}>Umsatz</TableHead>
                      <TableHead className="text-xs font-semibold text-right" style={{ color: "var(--z-text-secondary)" }}>Bewertung</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(data?.topDrivers ?? []).map((driver) => (
                      <TableRow key={driver.name} className="border-b last:border-0 " style={{ borderColor: "var(--z-border)" }}>
                        <TableCell className="font-medium text-sm" style={{ color: "var(--z-text-main)" }}>
                          {driver.name}
                        </TableCell>
                        <TableCell className="text-sm text-right" style={{ color: "var(--z-text-secondary)" }}>
                          {driver.rides}
                        </TableCell>
                        <TableCell className="text-sm text-right font-medium" style={{ color: "var(--z-text-main)" }}>
                          {driver.revenue}
                        </TableCell>
                        <TableCell className="text-sm text-right" style={{ color: "var(--z-text-main)" }}>
                          {driver.rating} ★
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "@/components/stat-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

/* ── Mock data ────────────────────────────────────────────── */
const STATS = [
  {
    label: "Total Revenue",
    value: "11.340,00 €",
    change: "+14,9% vs last month",
    positive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.798 7.45a.75.75 0 0 0-1.1 1.02L9.22 10l-1.522 1.53a.75.75 0 0 0 1.1 1.02L10 11.06l1.202 1.49a.75.75 0 0 0 1.1-1.02L10.78 10l1.522-1.53a.75.75 0 1 0-1.1-1.02L10 8.94 8.798 7.45Z" />
      </svg>
    ),
  },
  {
    label: "Total Rides",
    value: "415",
    change: "+8,3% vs last month",
    positive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h-.5a.5.5 0 0 0 0 1H2v2.5a1.5 1.5 0 0 0 1.5 1.5h1A1.5 1.5 0 0 0 6 14v-.5h8v.5a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V11.5h.5a.5.5 0 0 0 0-1H18V4.607a1.49 1.49 0 0 0-1.375-1.49A44.07 44.07 0 0 0 13.5 3h-7Z" />
      </svg>
    ),
  },
  {
    label: "Active Drivers",
    value: "12",
    change: "+2 vs last month",
    positive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
      </svg>
    ),
  },
  {
    label: "Avg. Fare",
    value: "27,32 €",
    change: "−1,2% vs last month",
    positive: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.75 1.73 1.111.309 2.251-.522 2.251-1.673V14.5H1.75Z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const MONTHLY_DATA = [
  { month: "Jan", revenue: 7800, rides: 280 },
  { month: "Feb", revenue: 8200, rides: 310 },
  { month: "Mar", revenue: 8600, rides: 340 },
  { month: "Apr", revenue: 9400, rides: 360 },
  { month: "May", revenue: 10200, rides: 390 },
  { month: "Jun", revenue: 11340, rides: 415 },
];

const WEEKLY_DATA = [
  { day: "Mon", brutto: 220, netto: 165 },
  { day: "Tue", brutto: 290, netto: 215 },
  { day: "Wed", brutto: 180, netto: 130 },
  { day: "Thu", brutto: 380, netto: 290 },
  { day: "Fri", brutto: 480, netto: 360 },
  { day: "Sat", brutto: 450, netto: 340 },
  { day: "Sun", brutto: 310, netto: 230 },
];

const SETTLEMENT_DATA = [
  { name: "Kartenzahlung", value: 62, color: "var(--z-violet-500)" },
  { name: "Barzahlung", value: 38, color: "var(--z-violet-200)" },
];

const TOP_DRIVERS = [
  { name: "Lel K.", rides: 89, revenue: "2.430 €", rating: 4.9 },
  { name: "Russan R.", rides: 76, revenue: "2.080 €", rating: 4.8 },
  { name: "Thomas W.", rides: 71, revenue: "1.940 €", rating: 4.7 },
  { name: "Sarah L.", rides: 65, revenue: "1.780 €", rating: 4.9 },
  { name: "Susuf A.", rides: 58, revenue: "1.590 €", rating: 4.6 },
];

const monthlyChartConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--z-violet-500)" },
};

const weeklyChartConfig: ChartConfig = {
  brutto: { label: "Brutto", color: "var(--z-violet-500)" },
  netto: { label: "Netto", color: "var(--z-violet-200)" },
};

/* ── Component ────────────────────────────────────────────── */
export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--z-bg-page)" }}>
      {/* ── Top bar ──────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "var(--z-bg-glass)",
          borderColor: "var(--z-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between gap-4">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0 hidden sm:block">
              <Image src="/Logo.svg" alt="Zynqly" width={120} height={60} className="h-8 w-auto" priority />
            </Link>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm w-40 sm:w-56"
              style={{ borderColor: "var(--z-border)", background: "var(--z-bg-surface)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="w-4 h-4 flex-shrink-0" style={{ color: "var(--z-text-muted)" }}>
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
              <span style={{ color: "var(--z-text-muted)" }}>Search...</span>
            </div>
          </div>

          {/* Right: icons + avatar */}
          <div className="flex items-center gap-1">
            {/* Dark / light mode toggle */}
            <ThemeToggle />

            {/* Notification */}
            <button className="relative p-1.5 rounded-lg transition-colors hover:bg-[var(--z-neutral-100)] dark:hover:bg-[var(--z-neutral-800)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="w-5 h-5" style={{ color: "var(--z-text-secondary)" }}>
                <path fillRule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508.75.75 0 0 0 .677-.678A3.465 3.465 0 0 0 7.19 14h5.62c0 .127-.006.252-.018.376a.75.75 0 0 0 .677.678 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a1.5 1.5 0 0 0 2.9-.001 32.4 32.4 0 0 1-2.9 0Z" clipRule="evenodd" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--z-error)" }} />
            </button>

            {/* User dropdown */}
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 ml-1 pl-1 pr-2 py-1 rounded-full border transition-colors hover:bg-[var(--z-neutral-100)] dark:hover:bg-[var(--z-neutral-800)]"
                  style={{ borderColor: "var(--z-border)" }}>
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs font-semibold text-white" style={{ background: "var(--z-violet-500)" }}>
                      LK
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline" style={{ color: "var(--z-text-main)" }}>Leyl K.</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className="w-4 h-4" style={{ color: "var(--z-text-muted)" }}>
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Einstellungen</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Abmelden</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--z-text-main)" }}>
            Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--z-text-secondary)" }}>
            Overview of your fleet performance — Juni 2026
          </p>
        </div>

        {/* ── KPI cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* ── Row: Area chart + Donut ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 mb-6">
          {/* Monthly Revenue & Rides */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Monthly Revenue &amp; Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={monthlyChartConfig} className="h-[260px] w-full">
                <AreaChart data={MONTHLY_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
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
            </CardContent>
          </Card>

          {/* Settlement Methods */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Settlement Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-48 h-48">
                <ChartContainer config={{ card: { label: "Karte", color: "var(--z-violet-500)" }, cash: { label: "Bar", color: "var(--z-violet-200)" } }} className="w-full h-full">
                  <PieChart>
                    <Pie
                      data={SETTLEMENT_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {SETTLEMENT_DATA.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex flex-col gap-2 mt-4 w-full">
                {SETTLEMENT_DATA.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm" style={{ background: entry.color }} />
                      <span style={{ color: "var(--z-text-secondary)" }}>{entry.name}</span>
                    </div>
                    <span className="font-semibold" style={{ color: "var(--z-text-main)" }}>{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Row: Bar chart + Table ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Weekly Earnings */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Weekly Earnings (Brutto vs Netto)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={weeklyChartConfig} className="h-[260px] w-full">
                <BarChart data={WEEKLY_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
                  <CartesianGrid vertical={false} stroke="var(--z-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--z-text-muted)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--z-text-muted)" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="brutto" fill="var(--z-violet-500)" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="netto" fill="var(--z-violet-200)" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Drivers */}
          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-bold" style={{ color: "var(--z-text-main)" }}>
                Top Drivers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b" style={{ borderColor: "var(--z-border)" }}>
                    <TableHead className="text-xs font-semibold" style={{ color: "var(--z-text-secondary)" }}>Driver</TableHead>
                    <TableHead className="text-xs font-semibold text-right" style={{ color: "var(--z-text-secondary)" }}>Rides</TableHead>
                    <TableHead className="text-xs font-semibold text-right" style={{ color: "var(--z-text-secondary)" }}>Revenue</TableHead>
                    <TableHead className="text-xs font-semibold text-right" style={{ color: "var(--z-text-secondary)" }}>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOP_DRIVERS.map((driver) => (
                    <TableRow key={driver.name} className="border-b last:border-0" style={{ borderColor: "var(--z-border)" }}>
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

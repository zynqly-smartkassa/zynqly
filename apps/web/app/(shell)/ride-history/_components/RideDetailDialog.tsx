"use client";

import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRideQuery } from "@/redux/api/apis/ride-history";
import { TypeBadge, SettlementBadge, StatusBadge, shortId } from "./badges";

type RideType = "Passagier" | "Boten";
type Settlement = "card" | "cash";
type RideStatus = "completed" | "cancelled" | "pending";

interface RideDetailDialogProps {
  /** When set, the dialog is open and the ride with this id is fetched. */
  rideId: string | null;
  onClose: () => void;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Parses the JSON-encoded "[[lat,lng],…]" route string; returns [] on failure. */
function parseRoute(route: string | undefined): [number, number][] {
  if (!route) return [];
  try {
    const parsed = JSON.parse(route);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is [number, number] =>
        Array.isArray(p) && p.length === 2 && p.every((n) => typeof n === "number")
    );
  } catch {
    return [];
  }
}

/** Formats an ISO-8601 datetime into a "DD.MM.YYYY · HH:MM" label. */
function formatFull(dt: string | undefined): string {
  if (!dt) return "—";
  const [date, timePart] = dt.includes("T") ? dt.split("T") : dt.split(" ");
  const [y, m, d] = date.split("-");
  const time = timePart?.slice(0, 5) ?? "";
  return `${d}.${m}.${y} · ${time}`;
}

// ── Route mini-map ─────────────────────────────────────────────────────────────

function RouteMiniMap({ points }: { points: [number, number][] }) {
  // Need at least two points to draw a path
  if (points.length < 2) {
    return (
      <div className="flex items-center justify-center h-32 rounded-lg bg-z-neutral-100 dark:bg-z-neutral-900/60 text-xs text-z-neutral-400 dark:text-z-neutral-500">
        Keine Routendaten verfügbar
      </div>
    );
  }

  const W = 100;
  const H = 100;
  const pad = 12;

  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const spanLat = maxLat - minLat || 1;
  const spanLng = maxLng - minLng || 1;

  // Map lng → x, lat → y (y inverted so north is up)
  const project = ([lat, lng]: [number, number]): [number, number] => {
    const x = pad + ((lng - minLng) / spanLng) * (W - 2 * pad);
    const y = pad + (1 - (lat - minLat) / spanLat) * (H - 2 * pad);
    return [x, y];
  };

  const projected = points.map(project);
  const path = projected.map(([x, y]) => `${x},${y}`).join(" ");
  const [sx, sy] = projected[0];
  const [ex, ey] = projected[projected.length - 1];

  return (
    <div className="rounded-lg overflow-hidden bg-z-neutral-100 dark:bg-z-neutral-900/60 border border-z-neutral-200 dark:border-z-neutral-700">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32" preserveAspectRatio="xMidYMid meet">
        <polyline
          points={path}
          fill="none"
          stroke="currentColor"
          className="text-z-violet-400"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Start point */}
        <circle cx={sx} cy={sy} r={3.5} className="fill-green-500" />
        {/* End point */}
        <circle cx={ex} cy={ey} r={3.5} className="fill-red-500" />
      </svg>
    </div>
  );
}

// ── Detail field ───────────────────────────────────────────────────────────────

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-z-neutral-400 dark:text-z-neutral-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-z-neutral-900 dark:text-z-neutral-100 break-words">
        {value}
      </dd>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export function RideDetailDialog({ rideId, onClose }: RideDetailDialogProps) {
  const { data: ride, isFetching } = useGetRideQuery(rideId ?? "", { skip: !rideId });

  const points = useMemo(() => parseRoute(ride?.route), [ride?.route]);

  const loading = isFetching || !ride;

  return (
    <Dialog open={!!rideId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="mb-0 p-6 pb-4 border-b border-z-neutral-200 dark:border-z-neutral-700">
          <div className="flex items-center gap-2 pr-8">
            <DialogTitle className="font-mono text-base">
              Fahrt #{rideId ? shortId(rideId) : ""}
            </DialogTitle>
            {!loading && <StatusBadge status={ride.status as RideStatus} />}
          </div>
          <DialogDescription>
            {loading ? "Lädt Fahrtdetails …" : `${ride.startAddress} → ${ride.endAddress}`}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-5">
          {loading ? (
            <>
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Route visualisation */}
              <RouteMiniMap points={points} />

              {/* Start → End addresses */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="w-px flex-1 my-1 bg-z-neutral-300 dark:bg-z-neutral-600 min-h-6" />
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500">Start</p>
                    <p className="text-sm font-medium text-z-neutral-900 dark:text-z-neutral-100">
                      {ride.startAddress}
                    </p>
                    <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500">
                      {formatFull(ride.startTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500">Ziel</p>
                    <p className="text-sm font-medium text-z-neutral-900 dark:text-z-neutral-100">
                      {ride.endAddress}
                    </p>
                    <p className="text-xs text-z-neutral-400 dark:text-z-neutral-500">
                      {formatFull(ride.endTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detail grid */}
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 pt-2 border-t border-z-neutral-200 dark:border-z-neutral-700">
                <Field label="Typ" value={<TypeBadge type={ride.type as RideType} />} />
                <Field
                  label="Betrag"
                  value={`${ride.amount.toFixed(2)} €`}
                />
                <Field label="Dauer" value={ride.duration} />
                <Field label="Distanz" value={`${ride.distance} km`} />
                <Field
                  label="Zahlung"
                  value={<SettlementBadge method={ride.settlement as Settlement} />}
                />
                <Field
                  label="Status"
                  value={<StatusBadge status={ride.status as RideStatus} />}
                />
                <Field label="Fahrzeug-ID" value={<span className="font-mono text-xs">{ride.vehicleId}</span>} />
                <Field label="Nutzer-ID" value={<span className="font-mono text-xs">{ride.userId}</span>} />
                <div className="col-span-2">
                  <Field label="Fahrt-ID" value={<span className="font-mono text-xs break-all">{ride.id}</span>} />
                </div>
              </dl>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

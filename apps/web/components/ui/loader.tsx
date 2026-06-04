import { cn } from "@/lib/utils";

/**
 * Small circular spinner in the brand (amber) colour.
 *
 * Drop-in replacement for the ad-hoc inline `animate-spin` SVGs scattered
 * across the app (pagination overlays, dialogs …). Sizing/colour is driven by
 * the parent via `className` (it inherits `currentColor` by default).
 */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin text-z-violet-500", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Wird geladen"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/**
 * Animated, on-brand taxi loader.
 *
 * A little cab bobs on its suspension, its wheels spin and the dashed road
 * scrolls underneath — a playful nod to the taxi / ride-hailing domain that
 * replaces a bare "Loading" text. Animations live in `globals.css` and are
 * disabled automatically when the user prefers reduced motion.
 */
export function TaxiLoader({
  label = "Wird geladen …",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-4", className)}
      role="status"
      aria-live="polite"
    >
      <svg
        width="132"
        height="80"
        viewBox="0 0 132 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── Road ── */}
        <line
          className="taxi-road"
          x1="6"
          y1="70"
          x2="126"
          y2="70"
          stroke="var(--z-neutral-300)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="12 12"
        />

        {/* ── Cab (bobs on its suspension) ── */}
        <g className="taxi-bob">
          {/* Roof "TAXI" sign — blinks */}
          <g className="taxi-sign">
            <rect x="52" y="14" width="28" height="11" rx="2.5" fill="var(--z-neutral-900)" />
            <text
              x="66"
              y="22.5"
              textAnchor="middle"
              fontSize="7"
              fontWeight="700"
              fill="var(--z-violet-400)"
              fontFamily="var(--font-geist-mono, monospace)"
            >
              TAXI
            </text>
          </g>

          {/* Cabin / roof */}
          <path d="M40 40 L48 26 H84 L92 40 Z" fill="var(--z-violet-500)" />
          {/* Windows */}
          <path d="M50 30 H63 V39 H44 Z" fill="var(--z-violet-100)" opacity="0.9" />
          <path d="M67 30 H82 L88 39 H67 Z" fill="var(--z-violet-100)" opacity="0.9" />

          {/* Body */}
          <rect x="16" y="38" width="100" height="18" rx="6" fill="var(--z-violet-500)" />
          {/* Checker stripe — the unmistakable taxi marker */}
          <g>
            {Array.from({ length: 10 }).map((_, i) => (
              <rect
                key={i}
                x={20 + i * 9.2}
                y="45"
                width="9.2"
                height="5"
                fill={i % 2 === 0 ? "var(--z-neutral-900)" : "var(--z-violet-100)"}
              />
            ))}
          </g>
          {/* Headlight */}
          <circle cx="112" cy="44" r="2.6" fill="#FDE68A" />

          {/* ── Wheels (spin) ──
              Each wheel group is symmetric about its own centre, so the
              `.taxi-wheel` rule's `transform-box: fill-box; transform-origin: center`
              rotates it around the hub without any per-element origin override. */}
          <g className="taxi-wheel">
            <circle cx="40" cy="56" r="9" fill="var(--z-neutral-900)" />
            <circle cx="40" cy="56" r="3.5" fill="var(--z-neutral-300)" />
            <line x1="40" y1="49" x2="40" y2="63" stroke="var(--z-neutral-400)" strokeWidth="1.2" />
            <line x1="33" y1="56" x2="47" y2="56" stroke="var(--z-neutral-400)" strokeWidth="1.2" />
          </g>
          <g className="taxi-wheel">
            <circle cx="92" cy="56" r="9" fill="var(--z-neutral-900)" />
            <circle cx="92" cy="56" r="3.5" fill="var(--z-neutral-300)" />
            <line x1="92" y1="49" x2="92" y2="63" stroke="var(--z-neutral-400)" strokeWidth="1.2" />
            <line x1="85" y1="56" x2="99" y2="56" stroke="var(--z-neutral-400)" strokeWidth="1.2" />
          </g>
        </g>
      </svg>

      {label && (
        <p className="text-sm font-medium tracking-wide text-z-neutral-500 dark:text-z-neutral-400">
          {label}
        </p>
      )}
    </div>
  );
}

/**
 * Full-viewport loading screen built around {@link TaxiLoader}.
 *
 * Used as the auth/app-shell gate while the access token and first route data
 * are resolved, but reusable anywhere a whole-page blocking loader is needed.
 */
export function FullPageLoader({ label }: { label?: string }) {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      style={{ background: "var(--z-bg-page)" }}
    >
      <TaxiLoader label={label} />
    </div>
  );
}

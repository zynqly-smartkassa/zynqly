import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features",     href: "#features" },
  { label: "About",        href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Models",      href: "#models" },
];

const STATS = [
  { value: "2,400+", label: "Active Drivers" },
  { value: "1.2M",   label: "Rides Tracked" },
  { value: "99.9%",  label: "Online" },
  { value: "4.9/5",  label: "App Rating" },
];

const AVATARS = ["AK", "SL", "TW", "MK"];

const FOOTER_LINKS = [
  {
    heading: "Produkt",
    links: [
      { label: "Features",      href: "#features" },
      { label: "Pricing",       href: "#pricing" },
      { label: "Mobile App",    href: "#app" },
      { label: "Web Dashboard", href: "#dashboard" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Karriere", href: "/karriere" },
      { label: "Blog",     href: "/blog" },
      { label: "Presse",   href: "/presse" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { label: "Datenschutz",     href: "/datenschutz" },
      { label: "AGB",             href: "/agb" },
      { label: "Cookie-Richtlinie", href: "/cookies" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--z-bg-page)" }}>

      {/* ─────────────────────── Header ─────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderColor: "var(--z-border)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/Logo.svg"
              alt="Zynqly"
              width={220}
              height={111}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "var(--z-text-main)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/sign-in"
              className="hidden sm:inline-block text-sm font-medium px-4 py-1.5 rounded-full transition-opacity hover:opacity-60"
              style={{ color: "var(--z-text-main)" }}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold px-5 py-2 rounded-full text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--z-color-main)" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ─────────────────────── Hero ────────────────────────── */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left column ──────────────────────────────── */}
            <div className="flex flex-col gap-6">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: "var(--z-color-main-light)",
                  color: "var(--z-color-main)",
                }}
              >
                {/* Lightning bolt icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
                </svg>
                Neu: Automatische Botenfahrt-Erkennung
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight"
                style={{ color: "var(--z-text-main)" }}
              >
                Die smarte{" "}
                <span style={{ color: "var(--z-color-main)" }}>Registrierkasse</span>
                {" "}für Taxiunternehmer
              </h1>

              {/* Description */}
              <p
                className="text-base sm:text-lg leading-relaxed max-w-md"
                style={{ color: "var(--z-text-secondary)" }}
              >
                Zynqly vereint Fahrtenmanagement, Kassenführung und Rechnungsstellung
                in einer einzigen Plattform. Für Fahrer und Flottenmanager —
                auf dem Handy und im Browser.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-md transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{ background: "var(--z-color-main)" }}
                >
                  Kostenlos starten
                  {/* Arrow right icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </Link>
                <button
                  className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold border-2 transition-all hover:opacity-70 active:scale-[0.97]"
                  style={{
                    borderColor: "var(--z-border)",
                    color: "var(--z-text-main)",
                    background: "transparent",
                  }}
                >
                  Mehr erfahren
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-1">
                {/* Avatar stack */}
                <div className="flex -space-x-2">
                  {AVATARS.map((initials, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white select-none"
                      style={{
                        background: `hsl(${258 + i * 15}, 60%, ${42 + i * 5}%)`,
                        zIndex: AVATARS.length - i,
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                {/* Stars + label */}
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-4 h-4" style={{ color: "var(--z-color-main)" }}>
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: "var(--z-text-secondary)" }}>
                    Von 2,400+ Fahrern vertraut
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right column — Browser mockup (desktop only) ── */}
            <div className="hidden lg:block relative">
              {/* Browser chrome frame */}
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: `1px solid var(--z-border)` }}
              >
                {/* Browser address bar */}
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ background: "var(--z-bg-card)", borderColor: "var(--z-border)" }}
                >
                  <span className="h-3 w-3 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span className="h-3 w-3 rounded-full bg-green-400 flex-shrink-0" />
                  <div className="flex-1 mx-3">
                    <div
                      className="rounded-md px-3 py-0.5 text-xs text-center"
                      style={{
                        background: "white",
                        color: "var(--z-text-muted)",
                        border: `1px solid var(--z-border)`,
                      }}
                    >
                      app.zynqly.de/dashboard
                    </div>
                  </div>
                </div>

                {/* Taxi image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&auto=format&fit=crop&q=80"
                    alt="Taxi auf der Straße"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Floating earnings card */}
                  <div
                    className="absolute bottom-5 left-5 rounded-2xl px-4 py-3 shadow-xl"
                    style={{ background: "white", minWidth: 170 }}
                  >
                    <p className="text-xs font-medium" style={{ color: "var(--z-text-secondary)" }}>
                      Heutige Einnahmen
                    </p>
                    <p className="text-2xl font-bold mt-0.5 tracking-tight" style={{ color: "var(--z-text-main)" }}>
                      € 342.50
                    </p>
                    <p className="text-xs font-semibold mt-1" style={{ color: "var(--z-success)" }}>
                      +18% vs gestern
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────── Stats Bar ───────────────────── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-6 border-t"
          style={{ borderColor: "var(--z-border)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold" style={{ color: "var(--z-color-main)" }}>
                  {stat.value}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--z-text-secondary)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ─────────────────────── Footer ──────────────────────── */}
      <footer
        className="mt-auto border-t w-full"
        style={{ borderColor: "var(--z-border)", background: "var(--z-bg-page)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          {/* Top grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Brand column — full width on mobile, 1 col on desktop */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
              <Link href="/" className="inline-flex items-center flex-shrink-0">
                <Image
                  src="/Logo.svg"
                  alt="Zynqly"
                  width={200}
                  height={101}
                  className="h-11 w-auto"
                />
              </Link>
              <p className="text-sm leading-relaxed max-w-[18rem]" style={{ color: "var(--z-text-secondary)" }}>
                Das smarte Ecosystem für<br />Taxiunternehmer in Österreich.
              </p>
            </div>

            {/* Link columns */}
            {FOOTER_LINKS.map((col, i) => (
              <div
                key={col.heading}
                className={i === FOOTER_LINKS.length - 1 ? "col-span-2 lg:col-span-1" : ""}
              >
                <p
                  className="text-sm font-semibold mb-4 tracking-wide"
                  style={{ color: "var(--z-text-main)" }}
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-opacity hover:opacity-60"
                        style={{ color: "var(--z-color-main)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderColor: "var(--z-border)" }}
          >
            <p className="text-xs" style={{ color: "var(--z-text-muted)" }}>
              &copy; 2026 Zynqly GmbH. Alle Rechte vorbehalten.
            </p>
            <p className="text-xs" style={{ color: "var(--z-text-muted)" }}>
              Made by MMCU;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

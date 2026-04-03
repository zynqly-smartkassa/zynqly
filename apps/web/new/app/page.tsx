{/**
 * Main landing page (Hero Page) for Zynqly.
 * Contains 4 full-height sections presenting the features.
 */}
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-violet-50 dark:bg-violet-950/20 px-4">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all duration-300">Erlebe die Zukunft mit Zynqly</h1>
          <p className="text-xl text-muted-foreground hover:text-foreground transition-colors duration-200">
            Das ultimative Smart-Kassa Registriersystem für smarte Taxi Unternehmen.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <a href="/register" className="px-6 py-3 bg-violet-600 text-white rounded-md font-medium hover:bg-violet-700 hover:shadow-lg hover:scale-105 transition-all duration-200">
              Jetzt durchstarten
            </a>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl space-y-8 hover:shadow-2xl p-8 rounded-2xl transition-all duration-300 bg-white/40 dark:bg-slate-800/20 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text transition-all duration-300">Integrierte Navigation & Rechnungen</h2>
          <p className="text-lg text-muted-foreground text-center hover:text-foreground transition-colors duration-200">
            Plane Fahrtrouten effizient und verwalte alle Rechnungen direkt in der App. Zynqly hilft dir, Zeit und Nerven zu sparen.
          </p>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section id="stats" className="min-h-screen flex items-center justify-center bg-violet-50 dark:bg-violet-950/20 px-4">
        <div className="max-w-4xl space-y-8 text-center hover:shadow-2xl p-8 rounded-2xl transition-all duration-300 bg-white/40 dark:bg-slate-800/20 backdrop-blur-sm">
          <h2 className="text-4xl font-bold hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text transition-all duration-300">Transparente Statistiken</h2>
          <p className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-200">
            Behalte dein Netto- und Bruttoeinkommen stets im Blick. Generiere Berichte mit wenigen Klicks.
          </p>
        </div>
      </section>

      {/* 4. About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-6 hover:shadow-2xl p-8 rounded-2xl transition-all duration-300 bg-white/40 dark:bg-slate-800/20 backdrop-blur-sm">
          <h2 className="text-4xl font-bold hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text transition-all duration-300">Entwickelt für Dich</h2>
          <p className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-200">
            Zynqly ist speziell auf die Anforderungen moderner Transportunternehmen zugeschnitten, schnell, rechtssicher und einfach.
          </p>
        </div>
      </section>
    </div>
  );
}

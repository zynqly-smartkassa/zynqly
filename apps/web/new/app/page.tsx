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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Erlebe die Zukunft mit Zynqly</h1>
          <p className="text-xl text-muted-foreground">
            Das ultimative Smart-Kassa Registriersystem für smarte Taxi Unternehmen.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            {/* Get Started Button */}
            {/* Get Started Button */}
            <a href="/register" className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
              Jetzt durchstarten
            </a>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl space-y-8">
          <h2 className="text-4xl font-bold text-center">Integrierte Navigation & Rechnungen</h2>
          <p className="text-lg text-muted-foreground text-center">
            Plane Fahrtrouten effizient und verwalte alle Rechnungen direkt in der App. Zynqly hilft dir, Zeit und Nerven zu sparen.
          </p>
        </div>
      </section>

      {/* 3. Stats Section */}
      {/* Stats Section */}
      <section id="stats" className="min-h-screen flex items-center justify-center bg-violet-50 dark:bg-violet-950/20 px-4">
        <div className="max-w-4xl space-y-8 text-center">
          <h2 className="text-4xl font-bold">Transparente Statistiken</h2>
          <p className="text-lg text-muted-foreground">
            Behalte dein Netto- und Bruttoeinkommen stets im Blick. Generiere Berichte mit wenigen Klicks.
          </p>
        </div>
      </section>

      {/* 4. About Section */}
      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-bold">Entwickelt für Dich</h2>
          <p className="text-lg text-muted-foreground">
            Zynqly ist speziell auf die Anforderungen moderner Transportunternehmen zugeschnitten, schnell, rechtssicher und einfach.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function DocsPage() {
  const sections = [
    {
      title: "Erste Schritte",
      items: [
        {
          name: "Registrierung",
          description: "Registrieren Sie sich mit Ihren Geschäftsdaten und starten Sie sofort.",
        },
        {
          name: "Dashboard Überblick",
          description: "Lernen Sie die Hauptfunktionen und Navigation in Ihrer Dashboard kennen.",
        },
        {
          name: "Benutzerprofil",
          description: "Passen Sie Ihre Profileinstellungen und Präferenzen an.",
        },
      ],
    },
    {
      title: "Fahrtmanagement",
      items: [
        {
          name: "Route Planen",
          description: "Erstellen Sie effiziente Fahrtrouten mit intelligenten Empfehlungen.",
        },
        {
          name: "Fahrthistorie",
          description: "Verwalten und überprüfen Sie Ihre Fahrthistorie.",
        },
        {
          name: "Navigation",
          description: "Verwenden Sie die integrierte Navigation für optimale Streckenplanung.",
        },
      ],
    },
    {
      title: "Rechnungen & Abrechnungen",
      items: [
        {
          name: "Rechnung erstellen",
          description: "Schnell und einfach Rechnungen for Kundentransporte erstellen.",
        },
        {
          name: "Vorlagen verwalten",
          description: "Erstellen und verwalten Sie wiederkehrende Rechnungsvorlagen.",
        },
        {
          name: "Export & Druck",
          description: "Exportieren Sie Rechnungen als PDF oder drucken Sie sie direkt.",
        },
      ],
    },
    {
      title: "Berichte & Statistiken",
      items: [
        {
          name: "Einkommensberichte",
          description: "Erhalten Sie detaillierte Berichte über Ihr Netto- und Bruttoeinkommen.",
        },
        {
          name: "Fahrtstatistiken",
          description: "Analysieren Sie Ihre Fahrtdaten und Leistungskennzahlen.",
        },
        {
          name: "Datenexporte",
          description: "Exportieren Sie Ihre Daten für weitere Analysen.",
        },
      ],
    },
    {
      title: "Sicherheit & Datenschutz",
      items: [
        {
          name: "Passwort ändern",
          description: "Sichern Sie Ihr Konto mit einem starken Passwort.",
        },
        {
          name: "Zwei-Faktor-Authentifizierung",
          description: "Aktivieren Sie zusätzliche Sicherheit für Ihr Konto.",
        },
        {
          name: "Datenschutz",
          description: "Verstehen Sie, wie wir Ihre Daten schützen und verwenden.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-black dark:via-slate-950 dark:to-purple-950 py-12">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 dark:bg-violet-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dokumentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erfahren Sie, wie Sie das Beste aus Zynqly herausholen
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-6">
                {section.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-md border border-white/20 dark:border-slate-800/50 p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Benötigen Sie weitere Hilfe?
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Kontaktieren Sie Support
          </a>
        </div>
      </div>
    </div>
  );
}

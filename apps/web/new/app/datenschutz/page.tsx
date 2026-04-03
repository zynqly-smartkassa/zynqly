export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-black dark:via-slate-950 dark:to-purple-950 py-12">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 dark:bg-violet-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Datenschutzrichtlinie
            </h1>
            <p className="text-muted-foreground">
              Gültig ab 1. Januar 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-800/50 p-8 space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                1. Einleitung
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Zynqly ("Unternehmen", "wir" oder "uns") respektiert Ihre Privatsphäre und ist verpflichtet, Ihre persönlichen Daten zu schützen. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Daten sammeln, verwenden und schützen.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                2. Erfassung von Informationen
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir sammeln Informationen, die Sie freiwillig bereitstellen, einschließlich:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Persönliche Informationen (Name, E-Mail, Telefon)</li>
                <li>Geschäftsinformationen (Firmenbuchnummer, Umsatzsteuer-ID)</li>
                <li>Fahrtdaten und Routeninformationen</li>
                <li>Abrechnungsinformationen</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                3. Verwendung von Informationen
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir verwenden die erfassten Informationen für folgende Zwecke:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Bereitstellung und Verbesserung unserer Dienste</li>
                <li>Kundensupport und Kommunikation</li>
                <li>Abrechnung und Zahlungsabwicklung</li>
                <li>Einhaltung gesetzlicher Anforderungen</li>
                <li>Sicherheit und Betrugsprävention</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                4. Datensicherheit
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir implementieren branchenübliche Sicherheitsmaßnahmen, um Ihre persönlichen Daten zu schützen. Dies umfasst Verschlüsselung, sichere Server und regelmäßige Sicherheitsaudits.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                5. Ihre Rechte
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Sie haben das Recht:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Zugang zu Ihren persönlichen Daten zu erhalten</li>
                <li>Ihre Daten berichtigen oder löschen zu lassen</li>
                <li>Ihre Zustimmung zur Verarbeitung zu widerrufen</li>
                <li>Eine Kopie Ihrer Daten zu erhalten</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                6. Kontakt
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bei Fragen zu dieser Datenschutzrichtlinie kontaktieren Sie uns bitte unter:{" "}
                <a href="mailto:privacy@zynqly.com" className="text-violet-600 hover:text-violet-700 font-semibold">
                  privacy@zynqly.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

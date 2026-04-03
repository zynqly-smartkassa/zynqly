export default function AGBPage() {
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
              Allgemeine Geschäftsbedingungen
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
                1. Umfang der Dienstleistungen
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Zynqly bietet ein intelligentes Smart-Kassa Registriersystem für Taxiunternehmen an. Der Dienst umfasst Route-Planung, Rechnungsverwaltung und Statistikerfassung.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                2. Benutzerverantwortung
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Der Benutzer erklärt sich damit einverstanden:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Alle bereitgestellten Informationen sind korrekt und vollständig</li>
                <li>Das Konto nur für legitime, geschäftliche Zwecke zu nutzen</li>
                <li>Keine illegalen oder schädlichen Aktivitäten durchzuführen</li>
                <li>Die Sicherheit des Kontos zu wahren</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                3. Registrierung und Konto
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Um Zynqly zu nutzen, müssen Sie sich registrieren und ein Konto erstellen. Sie erklären sich damit einverstanden, genaue und aktuelle Informationen bereitzustellen. Sie sind allein verantwortlich für den Schutz Ihres Passworts und Kontos.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                4. Gebühren und Zahlung
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Zynqly bietet kostenlose Grundfunktionen an. Premium-Features und erweiterte Dienste können kostenpflichtig sein. Alle Gebühren werden vor der Abrechnung deutlich gemacht.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                5. Haftungsbeschränkung
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Zynqly wird "wie besehen" bereitgestellt. Wir haften nicht für Datenverlust, Geschäftsverluste oder andere indirekte Schäden, die sich aus der Nutzung unseres Dienstes ergeben.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                6. Beendigung
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Benutzer können ihr Konto jederzeit kündigen. Bei Beendigung werden Ihre Daten gemäß unserer Datenschutzrichtlinie behandelt. Zynqly behält sich das Recht vor, Konten zu sperren, die gegen diese Bedingungen verstoßen.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                7. Änderungen der Bedingungen
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir können diese AGB jederzeit aktualisieren. Wesentliche Änderungen werden dem Benutzer per E-Mail mitgeteilt. Die weitere Nutzung des Dienstes bedeutet Zustimmung zu den neuen Bedingungen.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                8. Kontakt
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bei Fragen zu diesen AGB kontaktieren Sie uns unter:{" "}
                <a href="mailto:legal@zynqly.com" className="text-violet-600 hover:text-violet-700 font-semibold">
                  legal@zynqly.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

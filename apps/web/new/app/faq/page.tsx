export default function FAQPage() {
  const faqs = [
    {
      question: "Wie kann ich mich bei Zynqly registrieren?",
      answer: "Die Registrierung ist einfach: Navigieren Sie zur Registrierungsseite, füllen Sie Ihre persönlichen Daten, Kontaktinformationen und Geschäftsdaten aus, und klicken Sie auf 'Registrieren'. Sie erhalten sofort Zugang zu Ihrer Dashboard.",
    },
    {
      question: "Welche Funktionen bietet Zynqly?",
      answer: "Zynqly bietet euch intelligente Route-Planung, Rechnungsverwaltung, transparente Statistiken für Netto- und Bruttoeinkommen, und ein benutzerfreundliches Dashboard für alle eure Geschäftstätigkeiten.",
    },
    {
      question: "Ist Zynqly kostenlos?",
      answer: "Die Registrierung und Grundfunktionen sind kostenlos. Detaillierte Preise und Premium-Features können Sie in Ihrer Dashboard oder durch eine Anfrage mit unserem Support Team erfahren.",
    },
    {
      question: "Wie sicher ist meine Daten bei Zynqly?",
      answer: "Wir nehmen Datensicherheit sehr ernst. Alle Daten werden verschlüsselt übertragen und gespeichert. Wir befolgen die DSGVO und die höchsten Sicherheitsstandards der Branche.",
    },
    {
      question: "Kann ich mein Konto später löschen?",
      answer: "Ja, Sie können Ihr Konto jederzeit löschen. Bitte kontaktieren Sie unseren Support für die Kontoverbindung und Datenlöschungsanfragen.",
    },
    {
      question: "Welche Browser werden unterstützt?",
      answer: "Zynqly funktioniert auf allen modernen Browsern (Chrome, Firefox, Safari, Edge). Wir empfehlen die neueste Version Ihres Browsers für die beste Erfahrung.",
    },
    {
      question: "Gibt es eine Mobile App?",
      answer: "Ja, Zynqly ist auch als Mobile-App für iOS und Android verfügbar. Sie können diese direkt in Ihrem App Store oder Play Store herunterladen.",
    },
    {
      question: "Wie kann ich den Support kontaktieren?",
      answer: "Sie können uns über das Kontaktformular auf unserer Website, per Email oder über den In-App Chat erreichen. Unser Support-Team ist werktags von 9:00 bis 17:00 Uhr erreichbar.",
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
            Häufig gestellte Fragen
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hier finden Sie Antworten auf die häufigsten Fragen zu Zynqly
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-md border border-white/20 dark:border-slate-800/50 p-6 hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-foreground mb-3 text-violet-600 dark:text-violet-400">
                {faq.question}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Haben Sie weitere Fragen?
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Kontaktieren Sie uns
          </a>
        </div>
      </div>
    </div>
  );
}

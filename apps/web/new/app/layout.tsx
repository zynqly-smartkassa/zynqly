import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Zynqly",
  description: "Smart register system for specific companies.",
};

/**
 * Root Layout Component - Provides the main application structure with navbar, footer, theme provider, and children routing
 * @param children - Child components to render within the layout
 * @returns React Component serving as the root layout wrapper
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navbar */}
          <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 gap-2">
              {/* Logo Left */}
              <div className="flex items-center flex-shrink-0">
                <Link href="/">
                  <Image src="/Logo.png" alt="Zynqly" width={100} height={32} className="h-10 md:h-14 w-auto" />
                </Link>
              </div>
              {/* Navigation Center - Flex Grow */}
              <nav className="hidden md:flex gap-8 text-sm font-medium flex-1 justify-center">
                <Link href="/#hero" className="relative group text-foreground">Start
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
                <Link href="/#features" className="relative group text-foreground">Features
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
                <Link href="/#stats" className="relative group text-foreground">Statistiken
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
                <Link href="/#about" className="relative group text-foreground">Über uns
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </nav>
              {/* Auth Buttons Right */}
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <Link href="/login" className="text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                  Anmelden
                </Link>
                <Link href="/register" className="text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200">
                  Registrieren
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          {/* Footer Section */}
          <footer className="border-t border-border py-12 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left">
                {/* Company Info */}
                <div className="col-span-2 md:col-span-1 flex flex-col items-start">
                  <Image src="/Logo.png" alt="Zynqly" width={200} height={64} className="h-16 md:h-20 w-auto object-contain mb-4" />
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Das intelligente Smart-Kassa Registriersystem für moderne Taxiunternehmen.
                  </p>
                </div>
                {/* Navigation */}
                <div className="col-span-1">
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-foreground">Navigation</h4>
                  <div className="flex flex-col gap-3">
                    <Link href="/#hero" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Start</Link>
                    <Link href="/#features" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Features</Link>
                    <Link href="/#stats" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Statistiken</Link>
                    <Link href="/#about" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Über uns</Link>
                  </div>
                </div>
                {/* Support */}
                <div className="col-span-1">
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-foreground">Support</h4>
                  <div className="flex flex-col gap-3">
                    <Link href="/faq" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">FAQ</Link>
                    <Link href="/docs" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Dokumentation</Link>
                    <Link href="/kontakt" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Kontakt</Link>
                  </div>
                </div>
                {/* Legal */}
                <div className="col-span-1">
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-foreground">Rechtliches</h4>
                  <div className="flex flex-col gap-3">
                    <Link href="/datenschutz" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">Datenschutz</Link>
                    <Link href="/agb" className="text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">AGB</Link>
                  </div>
                </div>
              </div>
              {/* Divider */}
              <div className="border-t border-border pt-8 text-center">
                <p className="text-xs text-muted-foreground">© 2026 Zynqly. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

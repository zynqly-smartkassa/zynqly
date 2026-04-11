
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zynqly — Die smarte Registrierkasse für Taxiunternehmer",
  description:
    "Zynqly vereint Fahrtenmanagement, Kassenführung und Rechnungsstellung in einer einzigen Plattform. Für Fahrer und Flottenmanager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

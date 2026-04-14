
import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

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
    <html lang="de" className={cn("h-full antialiased", "font-mono", jetbrainsMono.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

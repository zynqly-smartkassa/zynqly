"use client";

import { ThemeProvider } from "next-themes";
import StoreProvider from "@/redux/StoreProvider";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        
      </ThemeProvider>
    </StoreProvider>
  );
}

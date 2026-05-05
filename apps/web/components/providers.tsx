"use client";

import { ThemeProvider } from "next-themes";
import StoreProvider from "@/redux/StoreProvider";
import { TooltipProvider } from "./ui/tooltip";
import AuthProvider from "./AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <AuthProvider>
             {children}
          </AuthProvider>
         
        </TooltipProvider>
        
      </ThemeProvider>
    </StoreProvider>
  );
}

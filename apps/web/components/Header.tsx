"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ThemeToggle } from "@/components/theme-toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

     const {isMobile} = useSidebar();

  return (
       <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "var(--z-bg-glass)",
          borderColor: "var(--z-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto flex h-14 items-center justify-between gap-4">
          {/* Search */}
          <div className="flex flex-row gap-1 items-center">
            <SidebarTrigger className={`p-0 m-0 justify-start ${!isMobile ? "hidden" : ""}`}></SidebarTrigger>

            <div className="relative flex items-center w-40 sm:w-56">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="absolute left-2.5 w-4 h-4 pointer-events-none shrink-0"
                style={{ color: "var(--z-text-muted)" }}
              >
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchen..."
                className="pl-8 h-8 text-sm"
                style={{ borderColor: "var(--z-border)", background: "var(--z-bg-surface)" }}
              />
            </div>
          </div>


          {/* Right: icons + avatar */}
          <div className="flex items-center gap-1">
            {/* Dark / light mode toggle */}
            <ThemeToggle />

            {/* Notification */}
            <Button variant="ghost" size="icon" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="w-5 h-5" style={{ color: "var(--z-text-secondary)" }}>
                <path fillRule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508.75.75 0 0 0 .677-.678A3.465 3.465 0 0 0 7.19 14h5.62c0 .127-.006.252-.018.376a.75.75 0 0 0 .677.678 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a1.5 1.5 0 0 0 2.9-.001 32.4 32.4 0 0 1-2.9 0Z" clipRule="evenodd" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--z-error)" }} />
            </Button>

            {/* User dropdown */}
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 ml-1 pl-1 pr-2 py-1 rounded-full border transition-colors hover:bg-[var(--z-neutral-100)] dark:hover:bg-[var(--z-neutral-800)]"
                  style={{ borderColor: "var(--z-border)" }}>
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs font-semibold text-white" style={{ background: "var(--z-violet-500)" }}>
                      LK
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline" style={{ color: "var(--z-text-main)" }}>Leyl K.</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className="w-4 h-4" style={{ color: "var(--z-text-muted)" }}>
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Einstellungen</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Abmelden</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </div>
        </div>
      </header>
  )
}

export default Header

"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SquaresFour, ClockCounterClockwise, Receipt, Gear } from "@phosphor-icons/react"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: SquaresFour },
  { label: "Ride History", href: "/ride-history", icon: ClockCounterClockwise },
  { label: "Invoices", href: "/invoices", icon: Receipt },
  { label: "Settings", href: "/settings", icon: Gear },
]

export function AppSidebar() {
  const name = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="block w-28">
          <Image src="/Logo.svg" alt="Zynqly" width={200} height={100} className="h-14 w-full" priority />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const isActive = name === href || name.startsWith(href + "/")
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={[
                        "h-12 rounded-xl transition-colors duration-150 text-base font-medium",
                        isActive
                          ? "bg-[var(--z-violet-100)] text-[var(--z-violet-600)] font-semibold dark:bg-[var(--z-violet-800)] dark:text-[var(--z-violet-200)]"
                          : "text-[var(--z-text-secondary)] hover:bg-[var(--z-violet-50)] hover:text-[var(--z-violet-600)] dark:hover:bg-[var(--z-violet-900)] dark:hover:text-[var(--z-violet-300)]",
                      ].join(" ")}
                    >
                      <Link href={href} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 shrink-0" weight={isActive ? "fill" : "regular"} />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
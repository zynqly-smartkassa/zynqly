import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-w-0" style={{ background: "var(--z-bg-page)" }}>
        {children}
      </main>
    </SidebarProvider>
  )
}
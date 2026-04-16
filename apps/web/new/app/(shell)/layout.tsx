import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col gap-0">
        <Header></Header>
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-7" style={{ background: "var(--z-bg-page)" }}>
          {children}
        </main>
      </div>

    </SidebarProvider>
  )
}
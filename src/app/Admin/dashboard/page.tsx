"use client"

import { AppSidebar } from "@/components/Admin-components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { CategoryForm } from "@/components/Admin-components/catergory-form"
import { AdminHome } from "@/components/Admin-components/Home"
import { useState } from "react"

export default function Page() {
  const [activeView, setActiveView] = useState<string>("Admin-home")

  const renderActiveView = () => {
    switch (activeView) {
      case "Admin-home":
        return <AdminHome  />
      case "Category":
        return <CategoryForm onCancel={() => setActiveView("Admin-home")} />
      default:
        return <AdminHome  />
    }
  }
  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setActiveView}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-background mt-8 shadow">{renderActiveView()}</div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

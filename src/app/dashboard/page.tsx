"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Chart } from "@/components/charts"
import ProductForm from "@/components/product-form"
import Profile from "@/components/profile"
import { ProductList } from "@/components/Allproducts"

export default function Page() {
  const [currentView, setCurrentView] = useState("")

  const handleNavigate = (view: string) => {
    setCurrentView(view)
  }


  const renderActiveView = () => {
    switch (currentView) {
      case "home":
        return <Chart />
      case "add-product":
        return <ProductForm onCancel={() => setCurrentView("")} />
        case "profile":
          return < Profile  />
        case "Products":
          return <ProductList />
      default:
        return <Chart />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={handleNavigate} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-background mt-8 ">{renderActiveView()}</div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}


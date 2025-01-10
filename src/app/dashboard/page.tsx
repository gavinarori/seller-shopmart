"use client"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import * as React from "react"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/dot-pattern";
import { Chart } from "@/components/charts"
import ProductForm from "@/components/product-form"
import { Banner } from "@/components/banner"


export default function Page() {
  const [activeView, setActiveView] = useState<string>("home")

  const renderActiveView = () => {
    switch (activeView) {
      case "home":
        return <Chart />
      case "add-product":
        return <ProductForm onCancel={() => setActiveView("home")} />
      default:
        return <Chart />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setActiveView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Banner />
            {renderActiveView()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
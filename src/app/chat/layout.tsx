"use client"

import type React from "react"
import { useSelector } from "react-redux"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import ChatSidebar from "@/components/chat/chat-sidebar"
import { Separator } from "@/components/ui/separator"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const { userInfo } = useSelector((state: any) => state.auth)
  return (
    <div className="flex h-screen w-full bg-slate-900">
      <SidebarProvider>
      <ChatSidebar userId={userInfo._id} />
        <SidebarInset className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b ">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 " />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-lg font-semibold t">Chat Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}


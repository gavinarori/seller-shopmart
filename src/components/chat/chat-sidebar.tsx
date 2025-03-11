"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/hooks/hook"
import { get_customers } from "@/store/Reducers/chatReducer"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Users, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatSidebar({ userId }: { userId: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { toggleSidebar } = useSidebar()

  const { customers, activeCustomer } = useAppSelector((state) => state.chat)

  useEffect(() => {
    dispatch(get_customers(userId))
  }, [dispatch, userId])

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer: any) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
    
      <Sidebar >
        <SidebarHeader>
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold ">Chats</h2>
          </div>
          <div className="px-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel >Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/chat/admin" passHref>
                    <SidebarMenuButton isActive={pathname === "/chat/admin"} className="w-full">
                      <div className="flex items-center gap-3 w-full">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/images/admin.jpg" alt="Admin" />
                          <AvatarFallback className="bg-rose-600">AD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <p className="text-sm font-medium">Support Team</p>
                          <p className="text-xs  truncate">Contact admin support</p>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="">Customers</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer: any, i) => (
                    <SidebarMenuItem key={i}>
                      <Link href={`/chat/customer/${customer.fdId}`} passHref>
                        <SidebarMenuButton isActive={pathname === `/chat/customer/${customer.fdId}`} className="w-full">
                          <div className="flex items-center gap-3 w-full">
                            <div className="relative">
                              <Avatar className="h-9 w-9 border-2">
                                <AvatarImage src="/images/customer.jpg" alt={customer.name} />
                                <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {activeCustomer.some((a: any) => a.customerId === customer.fdId) && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                              )}
                            </div>
                            <div className="flex flex-col flex-1 overflow-hidden">
                              <p className="text-sm font-medium">{customer.name}</p>
                              <p className="text-xs  truncate">Click to chat</p>
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm ">No customers found</div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>All Chats</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users className="h-4 w-4 mr-2" />
                <span>Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile menu toggle button */}
      <Button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 shadow-lg bg-cyan-600 hover:bg-cyan-700"
        size="icon"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}


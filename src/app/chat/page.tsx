"use client"
import { useSelector } from "react-redux"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ChatSidebar from "@/components/chat/chat-sidebar"
import { MessageSquare, Users, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  const { userInfo } = useSelector((state: any) => state.auth)

  return (
    <SidebarProvider>
      <SidebarInset>
        <main className="flex-1 overflow-auto ">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            <div className="max-w-2xl w-full rounded-lg  shadow-lg overflow-hidden">
              <div className="p-8 text-center">
                <div className="mx-auto  w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="h-8 w-8 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold  mb-4">Welcome to your Chat Center</h2>
                <p className=" mb-6">
                  Connect with your customers and support team in real-time. Select a conversation from the sidebar to get started.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2 mb-8">
                  <div className=" p-5 rounded-lg text-left">
                    <h3 className="flex items-center text-lg font-medium  mb-2">
                      <Users className="h-5 w-5 mr-2 text-rose-600" />
                      Customer Support
                    </h3>
                    <p className=" text-sm mb-4">
                      Respond to customer inquiries and provide assistance with their orders or questions.
                    </p>
                    <div className="bg-rose-600 p-3 rounded-md text-sm  mb-3">
                      "Hello! How can I help with your recent order?"
                    </div>
                    <div className="bg-rose-600 p-3 rounded-md text-sm ">
                      "I've checked your order status and it will be delivered tomorrow."
                    </div>
                  </div>
                  
                  <div className=" p-5 rounded-lg text-left">
                    <h3 className="flex items-center text-lg font-medium  mb-2">
                      <MessageSquare className="h-5 w-5 mr-2 text-rose-600" />
                      Admin Support
                    </h3>
                    <p className=" text-sm mb-4">
                      Get help from our admin team for technical issues or account-related questions.
                    </p>
                    <div className="bg-rose-600 p-3 rounded-md text-sm  mb-3">
                      "I need help with updating my store settings."
                    </div>
                    <div className="bg-rose-600 p-3 rounded-md text-sm ">
                      "Could you help me resolve an issue with a customer order?"
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/chat/admin" passHref>
                    <Button className="bg-rose-600 ">
                      Contact Admin Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="  hover:">
                    View Recent Conversations
                  </Button>
                </div>
              </div>
              
              <div className=" px-8 py-4 text-sm ">
                <p>
                  Need help? Check out our <a href="#" className="text-rose-600 hover:underline">support documentation</a> or contact the system administrator.
                </p>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

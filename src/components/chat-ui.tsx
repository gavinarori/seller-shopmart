"use client"

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import {
  get_customers,
  messageClear,
  get_customer_message,
  send_message,
  updateMessage,
} from "@/store/Reducers/chatReducer"
import { socket } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus, Send, Settings, User } from "lucide-react"


interface Message {
  id: string;
  senderId: string;
  receverId: string;
  text: string;
  name?: string;
  timestamp: string;
}

const ChatUI = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch<any>()
  const { customerId } = useParams<{ customerId: string }>();
  const { userInfo } = useSelector((state: any) => state.auth)
  const { customers, currentCustomer, messages, successMessage, activeCustomer } = useSelector((state:any) => state.chat)
  const [receiverMessage, setReceiverMessage] = useState<any>(null)
  const [text, setText] = useState<string>("")

  useEffect(() => {
    dispatch(get_customers(userInfo._id))
  }, [dispatch, userInfo._id])

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId))
    }
  }, [customerId, dispatch])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      send_message({
        senderId: userInfo._id,
        receverId: customerId,
        text,
        name: userInfo?.shopInfo?.shopName,
      } as any)
    )
    setText("")
  }

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_seller_message", messages[messages.length - 1])
      dispatch(messageClear())
    }
  }, [successMessage, dispatch, messages])

  useEffect(() => {
    socket.on("customer_message", (msg) => {
      setReceiverMessage(msg)
    })
  }, [])

  useEffect(() => {
    if (receiverMessage) {
      if (
        customerId === receiverMessage.senderId &&
        userInfo._id === receiverMessage.receverId
      ) {
        dispatch(updateMessage(receiverMessage))
      } else {
        console.log(receiverMessage.senderName + " sent a message")
        dispatch(messageClear())
      }
    }
  }, [receiverMessage, customerId, userInfo._id, dispatch])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="w-64 border-r">
          <SidebarHeader className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chats</h2>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
            {customers.map((chat: any, index: number) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>{chat.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder-avatar.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">John Doe</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === userInfo._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === userInfo._id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-50 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={send} className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ChatUI

"use client"

import { useState } from "react"
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

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", content: "Hey there! How's it going?", timestamp: "2:30 PM" },
    {
      id: 2,
      sender: "You",
      content: "Hi John! I'm doing well, thanks for asking. How about you?",
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      sender: "John Doe",
      content: "I'm great! Just working on some new features for our dashboard.",
      timestamp: "2:32 PM",
    },
    {
      id: 4,
      sender: "You",
      content: "That sounds exciting! Can't wait to see what you come up with.",
      timestamp: "2:33 PM",
    },
  ])

  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
    }
  }

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
              {["John Doe", "Jane Smith", "Team Chat", "Project Discussion"].map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>{chat}</span>
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
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-50 mt-1 block">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex space-x-2"
            >
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
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


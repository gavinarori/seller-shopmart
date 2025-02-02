"use client"

import { useState } from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Menu, Star, Package, Paperclip, Smile, Send, HelpCircle } from "lucide-react"

export default function SellerCustomerChat() {
  const [activeChat, setActiveChat] = useState("Alice Cooper")
  const [inputMessage, setInputMessage] = useState("")

  const chats = [
    {
      name: "Alice Cooper",
      avatar: "AC",
      lastMessage: "Is the product in stock?",
      time: "12:30 PM",
      unread: 2,
      isSeller: false,
    },
    {
      name: "Bob's Electronics",
      avatar: "BE",
      lastMessage: "Your order has been shipped!",
      time: "11:45 AM",
      unread: 1,
      isSeller: true,
    },
    {
      name: "Charlie Davis",
      avatar: "CD",
      lastMessage: "Thank you for your help!",
      time: "Yesterday",
      unread: 0,
      isSeller: false,
    },
    {
      name: "Diana's Boutique",
      avatar: "DB",
      lastMessage: "New arrivals are now available",
      time: "Yesterday",
      unread: 0,
      isSeller: true,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Alice Cooper",
      content: "Hi there! I'm interested in the smartphone you have listed. Is it still available?",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      sender: "You",
      content: "Hello Alice! Yes, the smartphone is still available. Which model are you interested in?",
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      sender: "Alice Cooper",
      content: "I'm looking at the XYZ Pro model. Does it come with a warranty?",
      timestamp: "2:32 PM",
    },
    {
      id: 4,
      sender: "You",
      content:
        "Great choice! Yes, the XYZ Pro comes with a 1-year manufacturer warranty. We also offer an extended warranty if you're interested.",
      timestamp: "2:33 PM",
    },
    {
      id: 5,
      sender: "Alice Cooper",
      content: "That's good to know. What about the color options?",
      timestamp: "2:35 PM",
    },
    {
      id: 6,
      sender: "You",
      content: "We have it in Black, Silver, and Blue. All colors are currently in stock. Do you have a preference?",
      timestamp: "2:36 PM",
    },
    {
      id: 7,
      sender: "Alice Cooper",
      content: "I think I'd like the Blue one. Can you hold it for me? I'll be able to come to the store tomorrow.",
      timestamp: "2:38 PM",
    },
    {
      id: 8,
      sender: "You",
      content:
        "I'll put the Blue XYZ Pro on hold for you. We're open from 9 AM to 6 PM. Is there a specific time you'd like to come in?",
      timestamp: "2:39 PM",
    },
  ]

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      // Here you would typically send the message to your backend
      // and then update the UI. For this example, we'll just clear the input.
      setInputMessage("")
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="w-full sm:w-80 border-r">
          <SidebarHeader className="p-4 flex justify-between items-center border-b">
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold hidden sm:block">Chats</h1>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Your Store" />
                <AvatarFallback>YS</AvatarFallback>
              </Avatar>
            </div>
          </SidebarHeader>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start px-4 mb-2">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex-1">
                Customers
              </TabsTrigger>
              <TabsTrigger value="sellers" className="flex-1">
                Sellers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <SidebarContent>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {chats.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 cursor-pointer hover:bg-accent ${activeChat === chat.name ? "bg-accent" : ""}`}
                      onClick={() => setActiveChat(chat.name)}
                    >
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={chat.name} />
                        <AvatarFallback>{chat.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <Badge variant="default" className="ml-2">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </SidebarContent>
            </TabsContent>
          </Tabs>
        </Sidebar>
        <div className="flex-1 lg:pl-20 md:pl-16 flex flex-col">
          <header className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src="/placeholder-avatar-1.jpg" alt={activeChat} />
                <AvatarFallback>
                  {activeChat
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{activeChat}</h2>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Star className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Package className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <Card
                    className={`max-w-[80%] ${message.sender === "You" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <CardContent className="p-3">
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-50 mt-1 block">{message.timestamp}</span>
                    </CardContent>
                  </Card>
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
              className="flex items-center space-x-2"
            >
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button type="submit" variant="default" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}


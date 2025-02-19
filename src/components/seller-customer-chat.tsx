"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Menu,
  Paperclip,
  Smile,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_customers,
  messageClear,
  get_customer_message,
  send_message,
  updateMessage,
} from "@/store/Reducers/chatReducer";
import { socket } from "@/lib/utils";

interface Message {
  senderId: string;
  receverId?: string;
  message: string;
  senderName?: string;
}

const SellerToCustomer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { customers, messages, successMessage } = useSelector(
    (state: any) => state.chat
  );

  const dispatch = useDispatch<any>();
  const { customerId } = useParams<{ customerId: string }>();
  const [receverMessage, setReceverMessage] = useState<Message | null>(null);
  const [text, setText] = useState<string>("");
  const [activeChat, setActiveChat] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(get_customers(userInfo._id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [dispatch, customerId]);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(
      send_message({
        senderId: userInfo._id,
        receverId: customerId!,
        text,
        name: userInfo?.shopInfo?.shopName,
      } as any)
    );
    setText("");
  };

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_seller_message", messages[messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage, messages, dispatch]);

  useEffect(() => {
    socket.on("customer_message", (msg: Message) => {
      setReceverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receverMessage) {
      if (
        customerId === receverMessage.senderId &&
        userInfo._id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      } else {
        toast.success(`${receverMessage.senderName} sent a message`);
        dispatch(messageClear());
      }
    }
  }, [receverMessage, customerId, userInfo, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="w-full sm:w-80 border-r">
          <SidebarHeader className="p-4 flex justify-between items-center border-b">
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold hidden sm:block">Chats</h1>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Your Store" />
              <AvatarFallback>YS</AvatarFallback>
            </Avatar>
          </SidebarHeader>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start px-4 mb-2">
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <SidebarContent>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {customers.map((customer: any, index: number) => (
                    <div
                      key={customer.fdId}
                      className={`flex items-center p-4 cursor-pointer hover:bg-accent ${
                        activeChat === customer.name ? "bg-accent" : ""
                      }`}
                      onClick={() => setActiveChat(customer.name)}
                    >
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage
                          src={`/placeholder-avatar-${index + 1}.jpg`}
                          alt={customer.name}
                        />
                        <AvatarFallback>{customer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{customer.name}</h3>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </SidebarContent>
            </TabsContent>
          </Tabs>
        </Sidebar>

        <div className="flex-1 lg:pl-20 md:pl-16 flex flex-col">
          <header className="flex justify-center items-center p-4 border-b">
            {activeChat && <h2 className="font-semibold">{activeChat}</h2>}
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
                  <Card className="max-w-[80%]">
                    <CardContent className="p-3">
                      <p className="text-sm">{message.message}</p>
                      <span className="text-xs opacity-50 mt-1 block">
                        {message.timestamp}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={send} className="flex items-center space-x-2">
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
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
  );
};

export default SellerToCustomer;

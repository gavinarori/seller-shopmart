"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/hook"
import { messageClear, get_customer_message, send_message, updateMessage } from "@/store/Reducers/chatReducer"
import { socket } from "@/lib/utils"
import MessageDisplay from "./message-display"
import ChatInput from "@/components/chat/chat-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, MoreVertical, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomerChatContainerProps {
  customerId: string
  userId: string
  shopName: string
}

export default function CustomerChatContainer({ customerId, userId, shopName }: CustomerChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState("")
  const [receiverMessage, setReceiverMessage] = useState<any>(null)

  const dispatch = useAppDispatch()
  const { currentCustomer, messages, successMessage, activeCustomer } = useAppSelector((state) => state.chat)

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId))
    }
  }, [customerId, dispatch])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    dispatch(
      send_message({
        senderId: userId,
        receverId: customerId,
        text,
        name: shopName,
      }),
    )
    setText("")
  }

  useEffect(() => {
    socket.on("customer_message", (msg) => {
      setReceiverMessage(msg)
    })

    return () => {
      socket.off("customer_message")
    }
  }, [])

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_seller_message", messages[messages.length - 1])
      dispatch(messageClear())
    }
  }, [successMessage, messages, dispatch])

  useEffect(() => {
    if (receiverMessage) {
      if (customerId === receiverMessage.senderId && userId === receiverMessage.receverId) {
        dispatch(updateMessage(receiverMessage))
      } else {
        console.log(`${receiverMessage.senderName} sent a message`)
        dispatch(messageClear())
      }
    }
  }, [receiverMessage, customerId, userId, dispatch])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!customerId) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-4  rounded-md p-6 ">
        <MessageSquare className="h-16 w-16 " />
        <h3 className="text-xl font-medium">No conversation selected</h3>
        <p className=" text-center max-w-md">Select a customer from the sidebar to start chatting</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b ">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-green-500">
              <AvatarImage src="/images/customer.jpg" alt={currentCustomer?.name || "Customer"} />
              <AvatarFallback>{currentCustomer?.name?.charAt(0) || "C"}</AvatarFallback>
            </Avatar>
            {activeCustomer.some((a: any) => a.customerId === currentCustomer?._id) && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
            )}
          </div>
          <div>
            <h2 className="text-base font-semibold ">{currentCustomer?.name}</h2>
            <p className="text-xs ">
              {activeCustomer.some((a: any) => a.customerId === currentCustomer?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className=" h-[calc(100vh-290px)] rounded-md p-4 overflow-y-auto">
          <MessageDisplay
            messages={messages}
            currentUserId={userId}
            scrollRef={scrollRef}
            userImage="/images/seller.png"
            otherImage="/images/customer.jpg"
            isCustomerChat={true}
          />
        </div>
      </div>

      {/* Chat input */}
      <div className="p-4 border-t ">
        <ChatInput text={text} setText={setText} send={send} placeholder="Message customer..." readOnly={!customerId} />
      </div>
    </div>
  )
}


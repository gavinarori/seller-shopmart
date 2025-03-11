"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/hook"
import {
  send_message_seller_admin,
  updateAdminMessage,
  get_seller_message,
  messageClear,
} from "@/store/Reducers/chatReducer"
import { socket } from "@/lib/utils"
import MessageDisplay from "./message-display"
import ChatInput from "./chat-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"


interface AdminChatContainerProps {
  userId: string
  userName: string
  userImage: string
}

export default function AdminChatContainer({ userId, userName, userImage }: AdminChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState("")

  const dispatch = useAppDispatch()
  const { seller_admin_message, successMessage, activeAdmin } = useAppSelector((state) => state.chat)

  useEffect(() => {
    dispatch(get_seller_message())
  }, [dispatch])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    dispatch(
      send_message_seller_admin({
        senderId: userId,
        receverId: "",
        message: text,
        senderName: userName,
      }),
    )
    setText("")
  }

  useEffect(() => {
    socket.on("receved_admin_message", (msg) => {
      dispatch(updateAdminMessage(msg))
    })

    return () => {
      socket.off("receved_admin_message")
    }
  }, [dispatch])

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_message_seller_to_admin", seller_admin_message[seller_admin_message.length - 1])
      dispatch(messageClear())
    }
  }, [successMessage, seller_admin_message, dispatch])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [seller_admin_message])

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b ">
        <div className="flex items-center gap-3">
          <div className="relative">
            
            <Avatar className="h-10 w-10 border-2 border-green-500">
              <AvatarImage src="/images/admin.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {activeAdmin && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
            )}
          </div>
          <div>
            <h2 className="text-base font-semibold ">Support</h2>
            <p className="text-xs">{activeAdmin ? "Online" : "Offline"}</p>
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
        <div className="bg-background h-[calc(100vh-290px)] rounded-md p-4 overflow-y-auto">
          <MessageDisplay
            messages={seller_admin_message}
            currentUserId={userId}
            scrollRef={scrollRef}
            userImage={userImage || "/images/seller.png"}
            otherImage="/images/admin.jpg"
          />
        </div>
      </div>

      {/* Chat input */}
      <div className="p-4 border-t ">
        <ChatInput text={text} setText={setText} send={send} placeholder="Message admin support..." />
      </div>
    </div>
  )
}


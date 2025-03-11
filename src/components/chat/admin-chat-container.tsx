"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/hooks/hook"
import { send_message_seller_admin, updateAdminMessage, get_seller_message, messageClear } from "@/store/Reducers/chatReducer"
import { socket } from "@/lib/utils"
import MessageDisplay from "./message-display"
import ChatInput from "./chat-input"

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
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <div className="relative">
            <Image
              className="w-[42px] h-[42px] border-green-500 border-2 max-w-[42px] p-[2px] rounded-full"
              src="/images/admin.jpg"
              alt="Admin"
              width={42}
              height={42}
            />
            {activeAdmin && (
              <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
            )}
          </div>
          <h2 className="text-base text-white font-semibold">Support</h2>
        </div>
      </div>

      <div className="py-4">
        <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
          <MessageDisplay
            messages={seller_admin_message}
            currentUserId={userId}
            scrollRef={scrollRef}
            userImage={userImage || "/images/seller.png"}
            otherImage="/images/admin.jpg"
          />
        </div>
      </div>

      <ChatInput text={text} setText={setText} send={send} placeholder="Message admin support..." />
    </>
  )
}


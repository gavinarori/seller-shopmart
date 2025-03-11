"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/hooks/hook"
import { get_customers, messageClear, get_customer_message, send_message, updateMessage } from '../../store/Reducers/chatReducer'
import { socket } from "@/lib/utils"
import MessageDisplay from "./message-display"
import ChatInput from "@/components/chat/chat-input"

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

  return (
    <>
      {customerId ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
              <div className="relative">
                <Image
                  className="w-[42px] h-[42px] border-green-500 border-2 max-w-[42px] p-[2px] rounded-full"
                  src="/images/customer.jpg"
                  alt={currentCustomer?.name || "Customer"}
                  width={42}
                  height={42}
                />
                {activeCustomer.some((a:any) => a.customerId === currentCustomer?._id) && (
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                )}
              </div>
              <h2 className="text-base text-white font-semibold">{currentCustomer?.name}</h2>
            </div>
          </div>

          <div className="py-4">
            <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
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

          <ChatInput
            text={text}
            setText={setText}
            send={send}
            placeholder="Message customer..."
            readOnly={!customerId}
          />
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-2 text-white">
          <span>
            
          </span>
          <span>Select a customer to start chatting</span>
        </div>
      )}
    </>
  )
}


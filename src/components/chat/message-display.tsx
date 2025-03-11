import type React from "react"
import Image from "next/image"

interface MessageDisplayProps {
  messages: any[]
  currentUserId: string
  scrollRef: any
  userImage: string
  otherImage: string
  isCustomerChat?: boolean
}

export default function MessageDisplay({
  messages,
  currentUserId,
  scrollRef,
  userImage,
  otherImage,
  isCustomerChat = false,
}: MessageDisplayProps) {
  return (
    <>
      {messages.map((message, i) => {
        const isCurrentUser = isCustomerChat ? message.senderId !== currentUserId : message.senderId === currentUserId

        const messageContent = isCustomerChat ? message.message : message.message

        if (!isCurrentUser) {
          return (
            <div
              ref={i === messages.length - 1 ? scrollRef : null}
              key={i}
              className="w-full flex justify-start items-center"
            >
              <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                <div>
                  <Image
                    className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                    src={otherImage || "/placeholder.svg"}
                    alt="User"
                    width={38}
                    height={38}
                  />
                </div>
                <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                  <span>{messageContent}</span>
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div
              ref={i === messages.length - 1 ? scrollRef : null}
              key={i}
              className="w-full flex justify-end items-center"
            >
              <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                  <span>{messageContent}</span>
                </div>
                <div>
                  <Image
                    className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                    src={userImage || "/placeholder.svg"}
                    alt="User"
                    width={38}
                    height={38}
                  />
                </div>
              </div>
            </div>
          )
        }
      })}
    </>
  )
}


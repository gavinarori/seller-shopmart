import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

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
  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="">No messages yet. Start the conversation!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message, i) => {
        const isCurrentUser = isCustomerChat ? message.senderId !== currentUserId : message.senderId === currentUserId
        const messageContent = isCustomerChat ? message.message : message.message
        const timestamp = message.timestamp ? new Date(message.timestamp) : new Date()

        return (
          <div
            ref={i === messages.length - 1 ? scrollRef : null}
            key={i}
            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} group`}
          >
            <div className={`flex items-end gap-2 max-w-[75%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className={`h-8 w-8 shrink-0 ${isCurrentUser ? "ml-2" : "mr-2"}`}>
                <AvatarImage src={isCurrentUser ? userImage : otherImage} alt="User" />
                <AvatarFallback>{isCurrentUser ? "ME" : "OT"}</AvatarFallback>
              </Avatar>

              <div
                className={`
                flex flex-col 
                ${isCurrentUser ? "items-end bg-rose-600 text-white" : "items-start  text-white"}
                px-3 py-2 rounded-lg shadow-md
              `}
              >
                <p className="text-sm break-words">{messageContent}</p>
                <span
                  className={`
                  text-xs mt-1 opacity-70
                  ${isCurrentUser ? "text-blue-100" : "text-slate-400"}
                `}
                >
                  {format(timestamp, "h:mm a")}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


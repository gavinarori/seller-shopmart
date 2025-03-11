"use client"

import type React from "react"

import { PaperclipIcon, SmileIcon, SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  text: string
  setText: (text: string) => void
  send: (e: React.FormEvent) => void
  placeholder?: string
  readOnly?: boolean
}

export default function ChatInput({
  text,
  setText,
  send,
  placeholder = "Type your message...",
  readOnly = false,
}: ChatInputProps) {
  return (
    <form onSubmit={send} className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className=""
        disabled={readOnly}
      >
        <PaperclipIcon className="h-5 w-5" />
        <span className="sr-only">Attach file</span>
      </Button>

      <Input
        readOnly={readOnly}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 "
        placeholder={placeholder}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className=" "
        disabled={readOnly}
      >
        <SmileIcon className="h-5 w-5" />
        <span className="sr-only">Add emoji</span>
      </Button>

      <Button type="submit" disabled={readOnly || !text.trim()} className=" ">
        <SendIcon className="h-4 w-4 mr-2" />
        Send
      </Button>
    </form>
  )
}


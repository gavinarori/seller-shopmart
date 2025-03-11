"use client"

import type React from "react"

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
    <form onSubmit={send} className="flex gap-3">
      <input
        readOnly={readOnly}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
        type="text"
        placeholder={placeholder}
      />
      <button
        disabled={readOnly}
        className="shadow-lg bg-cyan-500 hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  )
}


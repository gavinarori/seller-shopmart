"use client"
import type React from "react"
import ChatSidebar from "@/components/chat/chat-sidebar"
import { useSelector, useDispatch } from "react-redux"


export default  function Page() {

  const { userInfo,} = useSelector((state: any) => state.auth)

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <ChatSidebar userId={userInfo._id} />
        </div>
      </div>
    </div>
  )
}


"use client"

import AdminChatContainer from "@/components/chat/admin-chat-container"
import { useSelector, useDispatch } from "react-redux"

export default  function AdminChatPage() {
    const { userInfo,} = useSelector((state: any) => state.auth)
  

  return <AdminChatContainer userId={userInfo._id} userName={userInfo?.name} userImage={userInfo?.image} />
}


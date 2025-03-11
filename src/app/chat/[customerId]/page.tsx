"use client"
import CustomerChatContainer from "@/components/chat/customer-chat-container"
import { useSelector } from "react-redux"
import { use } from "react"

export default function CustomerChatPage({ params }: { params: Promise<{ customerId: string }> }) {
    const { userInfo } = useSelector((state: any) => state.auth)
    const resolvedParams = use(params) 

    return (
        <CustomerChatContainer 
            customerId={resolvedParams.customerId} 
            userId={userInfo._id} 
            shopName={userInfo.shopInfo?.shopName} 
        />
    )
}

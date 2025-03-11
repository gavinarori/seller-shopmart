import CustomerChatContainer from "@/components/chat/customer-chat-container"
import { useSelector, useDispatch } from "react-redux"


export default async function CustomerChatPage({ params }: { params: { customerId: string } }) {
    const { userInfo,} = useSelector((state: any) => state.auth)
 


  return (
    <CustomerChatContainer customerId={params.customerId} userId={userInfo._id} shopName={userInfo.shopInfo?.shopName} />
  )
}


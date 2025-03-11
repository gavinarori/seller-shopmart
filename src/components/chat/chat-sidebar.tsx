"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/hooks/hook"
import { get_customers, } from '../../store/Reducers/chatReducer'


export default function ChatSidebar({ userId }: { userId: string }) {
  const [show, setShow] = useState(false)
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const { customers, activeCustomer } = useAppSelector((state) => state.chat)

  useEffect(() => {
    dispatch(get_customers(userId))
  }, [dispatch, userId])

  return (
    <div
      className={`w-[280px] h-full absolute z-10 ${show ? "-left-[16px]" : "-left-[336px]"} md:left-0 md:relative transition-all`}
    >
      <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto">
        <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
          <h2>Chats</h2>
          <span onClick={() => setShow(!show)} className="block cursor-pointer ">
            close
          </span>
        </div>

        {/* Admin Chat Link */}
        <Link
          href="/chat/admin"
          className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer ${pathname === "/dashboard/chat/admin" ? "bg-blue-600" : "bg-slate-700"} mb-2`}
        >
          <div className="relative">
            <Image
              className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
              src="/images/admin.jpg"
              alt="Admin"
              width={38}
              height={38}
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-base font-semibold">Support</h2>
            </div>
          </div>
        </Link>

        <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
          <h2>Customers</h2>
        </div>

        {/* Customer List */}
        {customers.map((customer:any, i) => (
          <Link
            key={i}
            href={`/chat/customer/${customer.fdId}`}
            className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer ${pathname === `/dashboard/chat/customer/${customer.fdId}` ? "bg-blue-600" : "bg-slate-700"} mb-1`}
          >
            <div className="relative">
              <Image
                className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                src="/images/customer.jpg"
                alt={customer.name}
                width={38}
                height={38}
              />
              {activeCustomer.some((a:any) => a.customerId === customer.fdId) && (
                <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
              )}
            </div>
            <div className="flex justify-center items-start flex-col w-full">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-base font-semibold">{customer.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        onClick={() => setShow(!show)}
        className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white absolute top-4 right-[-50px]"
      >
        <span>
          list
        </span>
      </div>
    </div>
  )
}


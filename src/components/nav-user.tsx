"use client"


import { Icons } from "@/components/icons/logo"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useSelector, useDispatch } from "react-redux"
import { logout } from '@/store/Reducers/authReducer'
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { Button } from "./ui/button"

export function NavUser() {
  const { isMobile } = useSidebar()

  const dispatch = useDispatch<any>()
  const { userInfo } = useSelector((state: any) => state.auth)
  const router = useRouter();
  const role = useSelector((state: any) => state.auth.role);

  const geIntials = (name:string) =>{
    const names = name.split("");
    const firstInitials = names[0]?.charAt(0).toLocaleUpperCase() || ""
    const secondIntials = names[1]?.charAt(0).toLocaleUpperCase() || ""

    return `${firstInitials}${secondIntials}`

  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
      {userInfo ? (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="h-10 w-10 cursor-pointer">
        <AvatarImage src={userInfo.image} alt={userInfo.name} />
        <AvatarFallback>{geIntials(userInfo.name)}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
      <DropdownMenuItem onClick={() => router.push("/dashboard")}>
        Dashboard
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          dispatch(logout({ navigate: router.push, role }))
          router.push("/")
        }}
      >
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
) : (
  <Link href="/login">
    <Button variant="ghost" size="icon">
      <Icons.user className="h-5 w-5" />
      <span className="sr-only">Login</span>
    </Button>
  </Link>
)}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

"use client"

import LogoSquare from "@/components/logo-square"
import Link from "next/link"
import MobileMenu from "./mobile-menu"
import Search from "./search"
import { Icons } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSelector, useDispatch } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logout } from '@/store/Reducers/authReducer'
import { useRouter } from 'next/navigation';

const menu = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "/shop" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
]

export default function Navbar() {
  const dispatch = useDispatch<any>()
  const { userInfo } = useSelector((state: any) => state.auth)
  const router = useRouter();
  const role = useSelector((state: any) => state.auth.role);

  // Create initials from first and last name
  const getInitials = (name: string) => {
    const names = name.split(" ")
    const firstInitial = names[0]?.charAt(0).toUpperCase() || ""
    const secondInitial = names[1]?.charAt(0).toUpperCase() || ""
    return `${firstInitial}${secondInitial}`
  }

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">ShopMart</div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end items-center gap-4 md:w-1/3">
          <ThemeToggle />
          {userInfo ? (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="h-10 w-10 cursor-pointer">
        <AvatarImage src={userInfo.image} alt={userInfo.name} />
        <AvatarFallback>{getInitials(userInfo.name)}</AvatarFallback>
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

        </div>
      </div>
    </nav>
  )
}

import Link from 'next/link'

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col  p-6 md:p-10">
      <Link href="/" className=" inline-flex items-center">
          <img
            src="/1.png"
            alt="Logo"
            className="h-56 w-auto"
          />
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden m-3 bg-muted rounded-xl lg:block">
        <img
          src="/woman-uses-phone-networking-downloads-song-playlist-wears-pink-headphones-sits-table-cafe-rests-after-doing-purchases-surrounded-by-shopping-bags.jpg"
          alt="Image"
          className="absolute inset-0 rounded-xl h-full w-full object-cover "
        />
      </div>
    </div>
  )
}

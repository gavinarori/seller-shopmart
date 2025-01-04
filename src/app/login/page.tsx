import Link from 'next/link'

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
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
          src="/rb_170.png"
          alt="Image"
          className="absolute inset-0 rounded-xl h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

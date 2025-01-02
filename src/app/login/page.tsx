import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden m-3 bg-muted rounded-xl lg:block">
        <img
          src="https://img.freepik.com/free-photo/cyber-monday-shopping-sales_23-2148688499.jpg?t=st=1735669348~exp=1735672948~hmac=c8edb7949a17b6de82dc499ca963f99f499030760b2a48f955acd391a31658ef&w=1380"
          alt="Image"
          className="absolute inset-0 rounded-xl h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

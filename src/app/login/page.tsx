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
      <div className="relative hidden bg-muted rounded-xl lg:block">
        <img
          src="https://img.freepik.com/free-photo/clothing-store-employee-giving-online-order-african-american-customer-standing-counter-desk-modern-boutique-shopaholic-man-buying-fashionable-merchandise-shopping-mall_482257-72233.jpg?t=st=1735666682~exp=1735670282~hmac=3ca2ed8554c7839289020dd6d8b49109078bf7ab1eceebfd251de1028987260c&w=1380"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
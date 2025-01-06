import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/dot-pattern"
import { Chart } from "@/components/charts"

export function Banner() {
  return (
    <>
      <div className="flex">
        <div className="max-w-8xl">
          <div className="relative flex flex-col md:flex-row gap-8 items-center overflow-hidden rounded-xl border bg-muted/50 p-8">
            <div className="flex-1 z-10">
              <h1 className="text-4xl font-bold text-foreground mb-4">Connect Button</h1>
              <p className="text-lg mb-8">
                A fully featured wallet connection component that allows to Connect to 500+ external 
                wallets, connect via email, phone number, passkey or social logins, Convert any wallet to a 
                ERC4337 smart wallet for gasless transactions and provides SIWE (Sign In With Ethereum)
              </p>
              
              <div className="flex gap-4 mb-12">
                <Button className="rounded-xl" variant="outline">View docs</Button>
                <Button className="rounded-xl">Book a Demo</Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center z-10">
              <img src="/download.png" alt="Connect Button Illustration" className="w-auto h-60" />
            </div>
            <DotPattern className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
            )} />
          </div>
        </div>
      </div>
    </>
  )
}


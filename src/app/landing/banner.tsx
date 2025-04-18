import { ShoppingBag, } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function Banner() {
  return (
    <div className="min-h-screen bg-background text-white">
     

      {/* Hero Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl overflow-hidden">
          {/* Circular Bubble Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large bubbles */}
            <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-gray-400/30 rounded-full"></div>
            <div className="absolute bottom-[15%] left-[25%] w-40 h-40 bg-gray-400/30 rounded-full"></div>
            <div className="absolute top-[30%] right-[25%] w-36 h-36 bg-gray-400/30 rounded-full"></div>
            <div className="absolute bottom-[30%] right-[15%] w-24 h-24 bg-gray-400/30 rounded-full"></div>

            {/* Small bubbles */}
            <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-gray-400/30 rounded-full"></div>
            <div className="absolute bottom-[10%] right-[30%] w-20 h-20 bg-gray-400/30 rounded-full"></div>
            <div className="absolute top-[40%] left-[40%] w-28 h-28 bg-gray-400/30 rounded-full"></div>
            <div className="absolute top-[60%] left-[10%] w-16 h-16 bg-gray-400/30 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-xs uppercase tracking-wider text-gray-600 mb-2">SHOPMARTSTORE</div>
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-8">Ship your store now</h1>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full text-lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/magicui/globe";

export default function CallToAction() {
  return (
    <div className="relative bg-background mx-10">
      {/* Hero Banner */}
      <div className="container mx-auto px-4 py-8 h-[700px]">
        {/* Globe Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Globe className="absolute top-10 left-0 w-full h-full bg-background" />
        </div>

        {/* Circular Bubble Elements */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-gray-400/30 rounded-full"></div>
          <div className="absolute bottom-[15%] left-[25%] w-40 h-40 bg-gray-400/30 rounded-full"></div>
          <div className="absolute top-[30%] right-[25%] w-36 h-36 bg-gray-400/30 rounded-full"></div>
          <div className="absolute bottom-[30%] right-[15%] w-24 h-24 bg-gray-400/30 rounded-full"></div>
          <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-gray-400/30 rounded-full"></div>
          <div className="absolute bottom-[10%] right-[30%] w-20 h-20 bg-gray-400/30 rounded-full"></div>
          <div className="absolute top-[40%] left-[40%] w-28 h-28 bg-gray-400/30 rounded-full"></div>
          <div className="absolute top-[60%] left-[10%] w-16 h-16 bg-gray-400/30 rounded-full"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="text-sm uppercase tracking-wider mb-4">SHOPMARTSTORE</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl dark:text-gray-700">
            Sell from anywhere. Reach the world.
          </h1>
          <p className="text-lg  mb-8 max-w-xl">
            Create your own global storefront with Shopmart.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-6 rounded-full text-lg">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Create your shop now
          </Button>
        </div>
      </div>
    </div>
  );
}

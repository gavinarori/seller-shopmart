"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingBag, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Banner() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Autoplay failed:", error)
          setIsPlaying(false)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="bg-background text-white">
      {/* Hero Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
          {/* Video Background */}
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay for better text visibility */}
         

          {/* Video Controls */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
            </Button>
          </div>

          {/* Circular Bubble Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large bubbles */}
            <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full"></div>
            <div className="absolute bottom-[15%] left-[25%] w-40 h-40 bg-white/20 backdrop-blur-sm rounded-full"></div>
            <div className="absolute top-[30%] right-[25%] w-36 h-36 bg-white/20 backdrop-blur-sm rounded-full"></div>
            <div className="absolute bottom-[30%] right-[15%] w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full"></div>

            {/* Small bubbles */}
            <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
            <div className="absolute bottom-[10%] right-[30%] w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full"></div>
            <div className="absolute top-[40%] left-[40%] w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full"></div>
            <div className="absolute top-[60%] left-[10%] w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
  <div className="text-xs uppercase tracking-wider text-white mb-2">ShopMartSellerStore</div>
  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-md">Sell Without Limits</h1>
 
  <Button className="text-white rounded-full text-lg">
    <ShoppingBag className="mr-2 h-5 w-5" />
    Launch Your Store
  </Button>
</div>

        </div>
      </div>
    </div>
  )
}

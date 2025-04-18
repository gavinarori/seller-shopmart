"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Sample data for the slider
const shows = [
  {
    id: 1,
    title: "Fashion Collection",
    image: "/front-view-smiley-woman-presenting-clothes.jpg",
    logo: "/placeholder.svg?height=100&width=200",
    provider: "Premium Store",
  },
  {
    id: 2,
    title: "Vintage Boutique",
    image: "/people-antique-store-side-view.jpg",
    logo: "/placeholder.svg?height=100&width=200",
    provider: "Artisan Market",
  },
  {
    id: 3,
    title: "Tech Gadgets",
    image:
      "/beautiful-three-welldressed-afro-american-girls-customers-with-colored-shopping-bags-mobile-phone-shop-choosing-smartphone.jpg",
    logo: "/placeholder.svg?height=100&width=200",
    provider: "Digital Hub",
  },
  {
    id: 4,
    title: "Footwear Collection",
    image: "/africanamerican-woman-shopping-shoes-store.jpg",
    logo: "/placeholder.svg?height=100&width=200",
    provider: "Style Emporium",
  },
]

export default function StoreShowSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToNext = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning])

  const goToPrev = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shows.length) % shows.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [goToNext])

  // Calculate indices for visible slides
  const nextIndex = (currentIndex + 1) % shows.length

  return (
    <div className="relative w-full min-h-screen bg-background">
      {/* Header Section */}
      <div className="pt-16 pb-8 px-4 md:px-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Top Shop Products</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
          Discover our most popular store designs that are helping businesses thrive online.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium">
            Create Your Online Store
          </Button>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-medium">
            View All Templates
          </Button>
        </div>
      </div>

      {/* Slider Section - now with relative positioning and reduced height */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main slide */}
          <div
            className={`absolute w-[70%] h-[70%] transition-all duration-500 ease-in-out ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            style={{
              transform: `translateX(${isTransitioning ? "-100%" : "0"})`,
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={shows[currentIndex].image || "/placeholder.svg"}
                alt={shows[currentIndex].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center justify-center">
                <h2 className="text-5xl md:text-7xl font-serif text-white text-center">{shows[currentIndex].title}</h2>
                <div className="mt-4">
                  <Image
                    src="/placeholder.svg?height=30&width=100"
                    alt="Apple TV+"
                    width={100}
                    height={30}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Next slide preview */}
          <div className="absolute right-0 w-[30%] h-[60%] transform translate-x-[30%] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={shows[nextIndex].image || "/placeholder.svg"}
              alt={shows[nextIndex].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-0 right-0 p-4">
              <h3 className="text-2xl font-bold text-white">{shows[nextIndex].title}</h3>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {shows.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-500"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

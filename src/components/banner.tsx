"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const bannerData = [
  {
    title: "Connect Button",
    description:
      "A fully featured wallet connection component that allows to Connect to 500+ external wallets, connect via email, phone number, passkey or social logins, Convert any wallet to a ERC4337 smart wallet for gasless transactions and provides SIWE (Sign In With Ethereum)",
    image: "/download.png",
    buttons: [
      { text: "View docs", variant: "outline" as const },
      { text: "Book a Demo", variant: "default" as const },
    ],
  },
  {
    title: "Smart Contracts",
    description:
      "Build and deploy secure smart contracts with our advanced development toolkit. Features include automated testing, security analysis, and seamless deployment across multiple chains.",
    image: "/placeholder.svg?height=240&width=320",
    buttons: [
      { text: "Learn More", variant: "outline" as const },
      { text: "Get Started", variant: "default" as const },
    ],
  },
  {
    title: "NFT Marketplace",
    description:
      "Launch your own NFT marketplace with our comprehensive solution. Includes minting, trading, and auction functionality with built-in royalty support and cross-chain compatibility.",
    image: "/placeholder.svg?height=240&width=320",
    buttons: [
      { text: "Explore", variant: "outline" as const },
      { text: "Create Now", variant: "default" as const },
    ],
  },
]

export function Banner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      clearInterval(interval)
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {bannerData.map((banner, index) => (
            <div className="flex-[0_0_100%] min-w-0" key={index}>
              <div className="relative flex flex-col lg:flex-row border bg-muted/50 p-4 sm:p-6 lg:p-8">
                <div className="flex-1 z-10 text-center lg:text-left">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-none">
                    {banner.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-0">
                    {banner.buttons.map((button, idx) => (
                      <Button key={idx} className="rounded-xl w-full sm:w-auto text-sm" variant={button.variant}>
                        {button.text}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center items-center z-10 mt-4 lg:mt-0">
                  <Image
                    src={banner.image || "/placeholder.svg"}
                    alt={`${banner.title} Illustration`}
                    width={320}
                    height={240}
                    className="w-auto h-32 sm:h-40 lg:h-48 object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-transparent opacity-75" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm pointer-events-auto",
            "hover:bg-background/90",
            "absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2",
            !canScrollPrev && "opacity-50 cursor-not-allowed",
          )}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm pointer-events-auto",
            "hover:bg-background/90",
            "absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2",
            !canScrollNext && "opacity-50 cursor-not-allowed",
          )}
          disabled={!canScrollNext}
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === selectedIndex ? "bg-primary" : "bg-muted-foreground/20",
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


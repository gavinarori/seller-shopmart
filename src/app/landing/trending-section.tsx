"use client"
import Image from "next/image"
import { ArrowRight, Star, TrendingUp } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TrendingSection() {
  const trendingStores = [
    {
      name: "Minimal Home",
      category: "Home Decor",
      image: "/interior-shot-modern-house-dining-room-with-art-wall_181624-1556.jpg",
      rating: 4.9,
      reviews: 243,
      growth: "+127%",
    },
    {
      name: "EcoWear",
      category: "Sustainable Fashion",
      image: "/eco-bag-green-grass-outdoors_392895-543351.jpg",
      rating: 4.8,
      reviews: 189,
      growth: "+95%",
    },
    {
      name: "Tech Haven",
      category: "Electronics",
      image: "/focused-woman-testing-vr-headset.jpg",
      rating: 4.7,
      reviews: 312,
      growth: "+82%",
    },
  ]

  const trendingProducts = [
    {
      name: "Eco-friendly Water Bottle",
      price: "$29.99",
      image: "/woman-dressed-comfortable-hoodie-drinks-water-hydrates-after-walking-across-sea-harbor-looks-thoughtfully-away-daydreams-about-something.jpg",
      category: "Lifestyle",
      sales: "5.2k sold this month",
    },
    {
      name: "Wireless Earbuds Pro",
      price: "$89.99",
      image: "/woman-with-earphones-medium-shot.jpg",
      category: "Electronics",
      sales: "4.8k sold this month",
    },
    {
      name: "Organic Cotton T-shirt",
      price: "$24.99",
      image: "/shirt-mockup-concept-with-plain-clothing.jpg",
      category: "Fashion",
      sales: "3.9k sold this month",
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700 mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What's popular in e-commerce</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-[600px]">
              Discover the latest trends in online stores and products that are capturing customer attention.
            </p>
          </div>
          <Tabs defaultValue="stores" className="w-full md:w-auto">
            <div className="flex flex-col md:flex-row justify-between w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="stores">Trending Stores</TabsTrigger>
                <TabsTrigger value="products">Hot Products</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="stores">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {trendingStores.map((store, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
                      <Badge className="absolute top-4 right-4 bg-black/70 hover:bg-black/70">
                        {store.growth} growth
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>{store.name}</CardTitle>
                      <CardDescription>{store.category}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{store.rating}</span>
                        <span className="text-muted-foreground ml-1">({store.reviews} reviews)</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Visit store
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {trendingProducts.map((product, index) => (
                  <Card key={index}>
                   
                      <div className="relative h-48 ">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                  
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{product.category}</Badge>
                        <span className="font-bold text-lg">{product.price}</span>
                      </div>
                      <CardTitle className="mt-2">{product.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <CardDescription>{product.sales}</CardDescription>
                      <Button size="sm">View details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            Explore all trends
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Setting up my online boutique was incredibly easy. I was able to launch within a week and sales started coming in immediately.",
      author: "Sarah Johnson",
      role: "Fashion Boutique Owner",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The analytics tools helped me understand what products were performing best, allowing me to optimize my inventory and increase profits.",
      author: "Michael Chen",
      role: "Electronics Store Owner",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "Customer support has been exceptional. Whenever I had questions, the team was there to help me every step of the way.",
      author: "Emma Rodriguez",
      role: "Handmade Crafts Seller",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Hear from our store owners</h2>
          <p className="max-w-[800px] text-lg text-muted-foreground">
            Thousands of entrepreneurs have successfully launched their online businesses with our platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <div className="absolute top-6 right-6 text-primary opacity-20">
                <Quote className="h-10 w-10" />
              </div>
              <CardContent className="pt-10">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-lg mb-6">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t pt-6">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

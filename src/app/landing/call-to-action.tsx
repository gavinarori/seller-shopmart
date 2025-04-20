import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  const benefits = [
    "No technical skills required",
    "Free 14-day trial, no credit card needed",
    "24/7 customer support",
    "Cancel anytime",
  ]

  return (
    <section className="py-20 mx-6 rounded-xl bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Ready to start selling online?
          </h2>
          <p className="max-w-[800px] text-xl mb-8 text-primary-foreground/80">
            Join thousands of successful store owners who are growing their businesses with our platform.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-10 w-full max-w-lg">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <Button size="lg" variant="secondary" className="gap-2">
            Create your store for free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

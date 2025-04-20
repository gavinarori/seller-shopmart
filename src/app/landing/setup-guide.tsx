import { Check, Store, CreditCard, BarChart, Package, Truck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SetupGuide() {
  const steps = [
    {
      icon: <Store className="h-10 w-10 text-primary" />,
      title: "Create your store",
      description:
        "Sign up and customize your store with our intuitive dashboard. Choose a domain name that represents your brand.",
      action: "Set up store",
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: "Add your products",
      description:
        "Upload product images, write compelling descriptions, and set your pricing strategy to attract customers.",
      action: "Add products",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Set up payments",
      description:
        "Connect your payment processor to start accepting credit cards, digital wallets, and other payment methods.",
      action: "Connect payments",
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "Configure shipping",
      description: "Define your shipping zones, rates, and delivery options to ensure smooth order fulfillment.",
      action: "Set up shipping",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Launch and promote",
      description:
        "Publish your store and use our marketing tools to drive traffic and convert visitors into customers.",
      action: "Launch store",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <span>Easy Setup</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            How to set up your online shop
          </h2>
          <p className="max-w-[800px] text-lg text-muted-foreground">
            Follow these simple steps to create your online store and start selling your products to customers
            worldwide.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <CardTitle className="text-xl">
                  Step {index + 1}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">{step.description}</CardDescription>
                <Button variant="outline" className="w-full">
                  {step.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 mb-4">
            <Check className="h-4 w-4" />
            <span>No technical skills required</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Ready to start selling online?</h3>
          <p className="max-w-[600px] text-muted-foreground mb-6">
            Our platform handles all the technical details so you can focus on growing your business.
          </p>
          <Button size="lg">Create your store now</Button>
        </div>
      </div>
    </section>
  )
}

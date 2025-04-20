import { Zap, Globe, CreditCard, ShieldCheck, BarChart3, Smartphone } from "lucide-react"

export function FeatureHighlights() {
  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Sell to customers worldwide with multi-language support and localized payment options.",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description: "All stores are fully responsive and optimized for the best mobile shopping experience.",
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Secure Payments",
      description: "Accept all major payment methods with PCI-compliant checkout and fraud protection.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized performance ensures your customers enjoy a fast and smooth shopping experience.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics",
      description: "Gain valuable insights with comprehensive analytics and reporting tools.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Reliable & Secure",
      description: "99.9% uptime guarantee with enterprise-grade security to protect your business.",
    },
  ]

  return (
    <section className="py-20  bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need to succeed online</h2>
          <p className="max-w-[800px] text-lg text-muted-foreground">
            Our platform provides all the tools and features to help you build, manage, and grow your online business.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-lg border bg-background hover:shadow-md transition-all duration-200"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

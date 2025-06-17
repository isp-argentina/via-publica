import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BenefitProps {
  icon: ReactNode
  title: string
  description: string
}

export function Benefit({ icon, title, description }: BenefitProps) {
  return (
    <Card className="border-2 border-primary/10 transition-all hover:border-primary/30 hover:shadow-md h-full">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

interface BenefitSectionProps {
  title: string
  description: string
  benefits: BenefitProps[]
}

export default function BenefitSection({ title, description, benefits }: BenefitSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{title}</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Benefit key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

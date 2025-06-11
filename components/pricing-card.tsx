import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  title: string
  description: string
  price: string
  period: string
  features: PricingFeature[]
  buttonText: string
  buttonLink: string
  popular?: boolean
}

export default function PricingCard({
  title,
  description,
  price,
  period,
  features,
  buttonText,
  buttonLink,
  popular = false,
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col h-full ${popular ? "border-primary shadow-lg" : ""}`}>
      {popular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">Recomendado</div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-2">{period}</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className={`mr-2 h-5 w-5 ${feature.included ? "text-primary" : "text-muted-foreground/40"}`} />
              <span className={feature.included ? "" : "text-muted-foreground/40 line-through"}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={popular ? "default" : "outline"}>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


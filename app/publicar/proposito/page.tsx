import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, Handshake, BarChart, Users, Building, MapPin, LineChart, Palette, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Publicidad con Propósito | Vía Pública",
  description: "Descubre cómo la publicidad puede promover valores positivos y beneficiar a la sociedad",
}

interface PropositoCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function PropositoCard({ icon, title, description }: PropositoCardProps) {
  return (
    <Card className="h-full border-2 border-primary/10 transition-all hover:border-primary/30 hover:shadow-md">
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

export default function PropositoPage() {
  const propositoCards = [
    {
      icon: <Megaphone className="h-6 w-6 text-primary" />,
      title: "Campañas de Sensibilización",
      description:
        "Organizamos campañas a través de diferentes medios para sensibilizar a la comunidad sobre temas de educación, salud, medio ambiente y seguridad, maximizando el impacto positivo de los espacios publicitarios.",
    },
    {
      icon: <Handshake className="h-6 w-6 text-primary" />,
      title: "Colaboración con Organizaciones Sociales",
      description:
        "Establecemos alianzas estratégicas con ONGs, instituciones educativas y otras entidades que trabajan en temas de bien común, amplificando su mensaje a través de nuestros espacios.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Demostrar Impacto Positivo",
      description:
        "Presentamos estudios de caso y datos de impacto que muestran cómo los mensajes de bien común en espacios publicitarios han generado resultados positivos en la conciencia pública.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Participación Ciudadana",
      description:
        "Invitamos a los ciudadanos a proponer mensajes que les gustaría ver en los espacios publicitarios, generando un sentido de propiedad y compromiso con el proyecto.",
    },
    {
      icon: <Building className="h-6 w-6 text-primary" />,
      title: "Colaboración con Empresas",
      description:
        "Incentivamos a empresas para que donen espacios publicitarios o contribuyan con parte de sus presupuestos para promover el bien común, obteniendo beneficios de marca por asociarse a causas sociales.",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Campañas Locales Específicas",
      description:
        "Desarrollamos campañas en comunidades locales sobre temas que les impactan directamente, adaptando el mensaje a las necesidades y particularidades de cada zona.",
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Medición y Retroalimentación",
      description:
        "Realizamos seguimiento de cómo los mensajes afectan a la comunidad a través de encuestas, datos de comportamiento y análisis de interacciones, para mejorar continuamente nuestras iniciativas.",
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "Uso Creativo de los Espacios",
      description:
        "Fomentamos el uso innovador de los espacios publicitarios, combinando arte, diseño y mensajes positivos para captar la atención del público, manteniendo un equilibrio entre estética y mensaje.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
              <Button variant="ghost" size="sm" asChild className="self-start mb-4">
                <Link href="/publicar/dueno">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Soy dueño de un cartel
                </Link>
              </Button>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Publicidad con Propósito
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                  Descubre cómo la publicidad puede ser un recordatorio constante de valores positivos que beneficien a
                  la sociedad
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                ¿Por qué hacer publicidad con propósito?
              </h2>
              <p className="text-lg text-muted-foreground">
                La publicidad con propósito va más allá de la promoción comercial; busca generar un impacto positivo en
                la sociedad. Cuando los espacios publicitarios transmiten mensajes que promueven valores, educación,
                salud o conciencia ambiental, se convierten en poderosas herramientas de transformación social.
              </p>
              <p className="text-lg text-muted-foreground">
                En Vía Pública, creemos que los espacios publicitarios tienen el potencial de ser catalizadores de
                cambio, especialmente cuando no están siendo utilizados comercialmente. A continuación, te presentamos
                las diferentes formas en que trabajamos para maximizar el impacto positivo de estos espacios.
              </p>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Nuestras Iniciativas</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Exploramos diversas formas de utilizar los espacios publicitarios para promover el bien común
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {propositoCards.map((card, index) => (
                <PropositoCard key={index} icon={card.icon} title={card.title} description={card.description} />
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Casos de Éxito</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Ejemplos reales de cómo la publicidad con propósito ha generado un impacto positivo
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Campaña de Seguridad Vial</h3>
                  <p className="text-muted-foreground mb-4">
                    En colaboración con la Agencia Nacional de Seguridad Vial, utilizamos 50 espacios publicitarios en
                    zonas de alto tráfico para difundir mensajes sobre conducción segura. Después de tres meses, se
                    registró una reducción del 15% en accidentes en las áreas circundantes.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Buenos Aires, Córdoba y Santa Fe</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Iniciativa de Reciclaje Comunitario</h3>
                  <p className="text-muted-foreground mb-4">
                    Junto a organizaciones ambientales locales, desarrollamos una campaña educativa sobre separación de
                    residuos en 30 barrios. Los puntos de reciclaje cercanos a nuestros espacios publicitarios
                    experimentaron un aumento del 40% en la cantidad de materiales reciclables recibidos.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Rosario y Mendoza</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Participation Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">¿Cómo puedes participar?</h2>
                <p className="text-muted-foreground text-lg">
                  Existen múltiples formas de sumarte a nuestra iniciativa de Publicidad con Propósito, ya sea como
                  propietario de espacios, organización social o empresa.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Como propietario</h3>
                      <p className="text-sm text-muted-foreground">
                        Dona tus espacios disponibles para causas sociales y obtén beneficios fiscales.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Handshake className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Como organización social</h3>
                      <p className="text-sm text-muted-foreground">
                        Postula tu causa para ser difundida en nuestros espacios publicitarios.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Como ciudadano</h3>
                      <p className="text-sm text-muted-foreground">
                        Propón mensajes o causas que te gustaría ver en los espacios publicitarios de tu comunidad.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-muted p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Contacta con nuestro equipo de Propósito</h3>
                <p className="text-muted-foreground mb-6">
                  Si representas a una organización social, eres propietario de espacios publicitarios o simplemente
                  quieres saber más sobre cómo participar, déjanos tus datos y nos pondremos en contacto contigo.
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link href="/contacto?tema=proposito">Contactar ahora</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Transforma la publicidad en un agente de cambio"
          description="Únete a nuestra iniciativa y convierte tus espacios publicitarios en catalizadores de valores positivos para la sociedad"
          primaryButtonText="Registrar mi espacio"
          primaryButtonLink="/registro"
          secondaryButtonText="Conocer más"
          secondaryButtonLink="/contacto?tema=proposito"
        />
      </main>
      <Footer />
    </div>
  )
}


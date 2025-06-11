import type { Metadata } from "next"
import Image from "next/image"
import { CheckCircle, Clock, Shield, Megaphone, Heart, DollarSign, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BenefitSection from "@/components/benefit-section"
import CTASection from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Publica tu Cartel | Vía Pública",
  description: "Genera ingresos publicando tu espacio publicitario en nuestra plataforma",
}

export default function DuenoPage() {
  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: "Ingresos Adicionales",
      description: "Genera ingresos recurrentes al publicar tu espacio publicitario en nuestra plataforma.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Gestión Simplificada",
      description: "Administra tus espacios, reservas y pagos desde un único panel de control intuitivo.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Seguridad Garantizada",
      description: "Verificamos a todos los anunciantes para garantizar la calidad y seriedad de las campañas.",
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
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Monetiza tu Espacio Publicitario
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                  Convierte tu cartel o espacio publicitario en una fuente de ingresos constante con Vía Pública
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <BenefitSection
          title="Beneficios para Dueños de Carteles"
          description="Descubre cómo puedes maximizar el rendimiento de tu espacio publicitario"
          benefits={benefits}
        />

        {/* El cartel no duerme Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Tu Cartel Nunca Duerme</h2>
                <p className="text-muted-foreground text-lg">
                  Cuando tu espacio publicitario está disponible, no tiene por qué estar vacío. En Vía Pública nos
                  aseguramos de que tu cartel siempre comunique.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Megaphone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Visibilidad Constante</h3>
                      <p className="text-sm text-muted-foreground">
                        Mantén tu espacio activo y visible para potenciales anunciantes en todo momento.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Impacto Social</h3>
                      <p className="text-sm text-muted-foreground">
                        Colaboramos con fundaciones que pueden utilizar tu espacio para comunicar mensajes que promuevan
                        el bien común.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mantenimiento Óptimo</h3>
                      <p className="text-sm text-muted-foreground">
                        Un espacio activo se mantiene en mejores condiciones y atrae más interés de potenciales
                        anunciantes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-background/50"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Cartel+Activo"
                  alt="Cartel publicitario activo"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Fundaciones Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Publicidad con Propósito</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Cuando tu espacio no está comercialmente ocupado, puede ser utilizado para causas sociales
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Fundaciones Asociadas</h3>
                <p className="text-muted-foreground mb-4">
                  Trabajamos con diversas fundaciones que promueven causas sociales, ambientales y educativas.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Fundaciones de ayuda a la infancia</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Organizaciones ambientales</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Campañas de salud pública</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Iniciativas educativas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Beneficios Fiscales</h3>
                <p className="text-muted-foreground mb-4">
                  Al ceder tu espacio para causas sociales, puedes acceder a beneficios fiscales y deducciones
                  impositivas.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Deducciones en impuestos municipales</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Certificados de donación</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Reducción en tasas de publicidad</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Impacto Comunitario</h3>
                <p className="text-muted-foreground mb-4">
                  Tu espacio publicitario puede generar un impacto positivo en la comunidad mientras espera su próximo
                  anunciante.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Mejora la imagen de tu espacio</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Contribuye al bienestar social</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Genera valor más allá de lo comercial</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="outline" size="lg" asChild className="group">
                <Link href="/publicar/proposito">
                  Conocer más sobre Publicidad con Propósito
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="¿Listo para monetizar tu espacio publicitario?"
          description="Regístrate hoy y comienza a generar ingresos con tu cartel publicitario"
          primaryButtonText="Registrar mi cartel"
          primaryButtonLink="/registro"
          secondaryButtonText="Ver precios"
          secondaryButtonLink="/publicar/precios"
        />
      </main>
      <Footer />
    </div>
  )
}


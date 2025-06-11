import type { Metadata } from "next"
import Image from "next/image"
import { BarChart, Users, Zap, Globe, LayoutDashboard, Shield } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BenefitSection from "@/components/benefit-section"
import CTASection from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Para Agencias | Vía Pública",
  description: "Soluciones para agencias de publicidad que gestionan múltiples espacios publicitarios",
}

export default function AgenciaPage() {
  const benefits = [
    {
      icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
      title: "Gestión Centralizada",
      description: "Administra todos tus espacios publicitarios desde un único panel de control intuitivo y potente.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Análisis Avanzado",
      description: "Accede a estadísticas detalladas y reportes de rendimiento para optimizar tus campañas.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Gestión de Clientes",
      description: "Herramientas específicas para administrar tus clientes, campañas y facturación.",
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
                  Soluciones para Agencias de Publicidad
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                  Potencia tu agencia con nuestras herramientas especializadas para la gestión de espacios publicitarios
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <BenefitSection
          title="Beneficios para Agencias"
          description="Descubre cómo nuestra plataforma puede ayudarte a gestionar y optimizar tus espacios publicitarios"
          benefits={benefits}
        />

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-background/50"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Dashboard+Agencia"
                  alt="Dashboard para agencias"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Herramientas Especializadas para Agencias
                </h2>
                <p className="text-muted-foreground text-lg">
                  Nuestra plataforma ofrece funcionalidades diseñadas específicamente para las necesidades de las
                  agencias de publicidad.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Gestión Multi-Ubicación</h3>
                      <p className="text-sm text-muted-foreground">
                        Administra espacios publicitarios en múltiples ubicaciones desde un único panel.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Automatización de Procesos</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatiza tareas repetitivas como la facturación, renovaciones y reportes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Permisos Avanzados</h3>
                      <p className="text-sm text-muted-foreground">
                        Configura diferentes niveles de acceso para tu equipo y clientes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Lo que dicen nuestros clientes</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Agencias de publicidad que ya confían en nuestra plataforma
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="italic text-muted-foreground mb-4">
                  "Desde que empezamos a utilizar Vía Pública, hemos optimizado la gestión de nuestros espacios
                  publicitarios y aumentado nuestros ingresos en un 30%."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10"></div>
                  <div>
                    <p className="font-medium">María González</p>
                    <p className="text-sm text-muted-foreground">Directora, PubliMed Argentina</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="italic text-muted-foreground mb-4">
                  "La plataforma nos ha permitido centralizar la gestión de más de 200 espacios publicitarios en todo el
                  país, simplificando enormemente nuestras operaciones."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10"></div>
                  <div>
                    <p className="font-medium">Carlos Rodríguez</p>
                    <p className="text-sm text-muted-foreground">CEO, Outdoor Media Group</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="italic text-muted-foreground mb-4">
                  "Las herramientas de análisis y reportes nos han ayudado a tomar mejores decisiones estratégicas y a
                  ofrecer un mejor servicio a nuestros clientes."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10"></div>
                  <div>
                    <p className="font-medium">Laura Martínez</p>
                    <p className="text-sm text-muted-foreground">Gerente de Operaciones, Impacto Visual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Potencia tu agencia con nuestras soluciones"
          description="Regístrate hoy y descubre cómo podemos ayudarte a optimizar la gestión de tus espacios publicitarios"
          primaryButtonText="Comenzar ahora"
          primaryButtonLink="/registro"
          secondaryButtonText="Ver planes para agencias"
          secondaryButtonLink="/publicar/precios"
        />
      </main>
      <Footer />
    </div>
  )
}


import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PricingCard from "@/components/pricing-card"
import CTASection from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Precios | Vía Pública",
  description: "Conoce nuestros planes para dueños de carteles y agencias de publicidad",
}

export default function PreciosPage() {
  const duenoFeatures = [
    { text: "Publicación de 1 espacio publicitario", included: true },
    { text: "Panel de control básico", included: true },
    { text: "Estadísticas de visualización", included: true },
    { text: "Gestión de reservas", included: true },
    { text: "Verificación de anunciantes", included: true },
    { text: "Soporte por email", included: true },
    { text: "Promoción destacada", included: false },
    { text: "Integración con sistemas de facturación", included: false },
  ]

  const duenoPremiumFeatures = [
    { text: "Publicación de hasta 5 espacios publicitarios", included: true },
    { text: "Panel de control avanzado", included: true },
    { text: "Estadísticas detalladas", included: true },
    { text: "Gestión de reservas", included: true },
    { text: "Verificación de anunciantes", included: true },
    { text: "Soporte prioritario", included: true },
    { text: "Promoción destacada", included: true },
    { text: "Integración con sistemas de facturación", included: true },
  ]

  const agenciaFeatures = [
    { text: "Publicación de hasta 20 espacios publicitarios", included: true },
    { text: "Panel de control para agencias", included: true },
    { text: "Estadísticas avanzadas", included: true },
    { text: "Gestión de clientes", included: true },
    { text: "API para integraciones", included: true },
    { text: "Soporte prioritario", included: true },
    { text: "Herramientas de facturación", included: true },
    { text: "Personalización de marca", included: false },
  ]

  const agenciaPremiumFeatures = [
    { text: "Espacios publicitarios ilimitados", included: true },
    { text: "Panel de control para agencias", included: true },
    { text: "Estadísticas avanzadas y reportes", included: true },
    { text: "Gestión de clientes y campañas", included: true },
    { text: "API completa para integraciones", included: true },
    { text: "Soporte dedicado 24/7", included: true },
    { text: "Herramientas de facturación avanzadas", included: true },
    { text: "Personalización de marca", included: true },
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
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Planes y Precios</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                  Elige el plan que mejor se adapte a tus necesidades
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing for Owners Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Para Dueños de Carteles</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Planes diseñados para propietarios individuales de espacios publicitarios
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <PricingCard
                title="Básico"
                description="Ideal para dueños de un único espacio publicitario"
                price="$2,999"
                period="por mes / por cartel"
                features={duenoFeatures}
                buttonText="Comenzar"
                buttonLink="/registro"
              />
              <PricingCard
                title="Premium"
                description="Para dueños con múltiples espacios publicitarios"
                price="$4,999"
                period="por mes / hasta 5 carteles"
                features={duenoPremiumFeatures}
                buttonText="Comenzar"
                buttonLink="/registro"
                popular={true}
              />
            </div>
          </div>
        </section>

        {/* Pricing for Agencies Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Para Agencias</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Soluciones escalables para agencias que gestionan múltiples espacios publicitarios
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <PricingCard
                title="Agencia"
                description="Para agencias pequeñas y medianas"
                price="$19,999"
                period="por mes / hasta 20 carteles"
                features={agenciaFeatures}
                buttonText="Contactar ventas"
                buttonLink="/contacto"
              />
              <PricingCard
                title="Agencia Premium"
                description="Para agencias con grandes volúmenes"
                price="$49,999"
                period="por mes / carteles ilimitados"
                features={agenciaPremiumFeatures}
                buttonText="Contactar ventas"
                buttonLink="/contacto"
                popular={true}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Preguntas Frecuentes</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Respuestas a las dudas más comunes sobre nuestros planes
              </p>
            </div>

            <div className="grid gap-6 max-w-3xl mx-auto">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
                <p className="text-muted-foreground">
                  Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo
                  ciclo de facturación.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">¿Hay algún contrato de permanencia?</h3>
                <p className="text-muted-foreground">
                  No, todos nuestros planes son mensuales y puedes cancelar en cualquier momento sin penalizaciones.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">¿Qué métodos de pago aceptan?</h3>
                <p className="text-muted-foreground">
                  Aceptamos tarjetas de crédito, transferencias bancarias y Mercado Pago. Para planes de agencia,
                  también ofrecemos facturación empresarial.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">¿Ofrecen descuentos por pago anual?</h3>
                <p className="text-muted-foreground">
                  Sí, ofrecemos un 15% de descuento para pagos anuales en todos nuestros planes. Contacta con nuestro
                  equipo de ventas para más información.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="¿Listo para comenzar?"
          description="Elige el plan que mejor se adapte a tus necesidades y comienza a monetizar tus espacios publicitarios"
          primaryButtonText="Registrarse ahora"
          primaryButtonLink="/registro"
          secondaryButtonText="Contactar ventas"
          secondaryButtonLink="/contacto"
          bgClass="bg-muted/30"
        />
      </main>
      <Footer />
    </div>
  )
}


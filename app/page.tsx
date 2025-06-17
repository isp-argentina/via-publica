import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Search, Users, CheckCircle, Clock, Shield } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSearchForm from "@/components/hero-search-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              className="w-full h-full object-cover"
              poster="/placeholder.svg?height=1080&width=1920"
              aria-hidden="true"
            >
              <source
                src="https://sjjfexdrfeimv3f6.public.blob.vercel-storage.com/assets/videos/viapublica/hero-carteles-SAr9VN3Fom6a1tc4BwJXvW9RptTbKq.mp4"
                type="video/mp4"
              />
              {/* Fallback for browsers that don't support video */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
            </video>
          </div>

          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>

          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                  Encuentra tu espacio publicitario ideal
                </h1>
                <p className="mx-auto max-w-[700px] text-white/90 text-lg md:text-xl">
                  Conectamos anunciantes con propietarios de espacios publicitarios
                </p>
              </div>

              {/* Search Form */}
              <HeroSearchForm />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">¿Por qué elegir Vía Pública?</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                Nuestra plataforma ofrece soluciones integrales para la gestión y contratación de espacios publicitarios
                en toda Argentina
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Benefit Card 1 */}
              <Card className="border-2 border-primary/10 transition-all hover:border-primary/30 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Amplio Catálogo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Accede al catálogo más completo de espacios publicitarios en Argentina, con opciones para todos los
                    presupuestos y necesidades.
                  </p>
                </CardContent>
              </Card>

              {/* Benefit Card 2 */}
              <Card className="border-2 border-primary/10 transition-all hover:border-primary/30 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Proceso Simplificado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Desde la búsqueda hasta la contratación, nuestro proceso está diseñado para ser rápido, transparente
                    y sin complicaciones.
                  </p>
                </CardContent>
              </Card>

              {/* Benefit Card 3 */}
              <Card className="border-2 border-primary/10 transition-all hover:border-primary/30 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Garantía de Calidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Todos los espacios publicitarios son verificados y cumplen con los estándares de calidad y
                    normativas vigentes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  La forma más inteligente de gestionar tu publicidad exterior
                </h2>
                <p className="text-muted-foreground text-lg">
                  Nuestra plataforma ofrece herramientas avanzadas para encontrar, analizar y contratar los mejores
                  espacios publicitarios en todo el país.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Ubicaciones Estratégicas</h3>
                      <p className="text-sm text-muted-foreground">
                        Encuentra espacios publicitarios en las mejores ubicaciones de todas las provincias argentinas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Búsqueda Avanzada</h3>
                      <p className="text-sm text-muted-foreground">
                        Filtra por tipo de estructura, dimensiones, ubicación y características específicas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Conexión Directa</h3>
                      <p className="text-sm text-muted-foreground">
                        Conecta directamente con los propietarios de espacios publicitarios a través de nuestra
                        plataforma.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg">
                    <Link href="/catalogo">Explorar Catálogo</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/planes">Ver Planes</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-background/50"></div>
                <img
                  src="/placeholder.svg?height=600&width=800&text=Plataforma+Vía+Pública"
                  alt="Plataforma Vía Pública"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

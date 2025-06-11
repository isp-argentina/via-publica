import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, ArrowLeft, Share2, Bookmark, Eye, Ruler, Tag, Info } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ImageGallery from "@/components/image-gallery"

export const metadata: Metadata = {
  title: "Detalle de Espacio Publicitario | Vía Pública",
  description: "Información detallada sobre el espacio publicitario seleccionado",
}

// Simulación de datos de imágenes desde Cloudinary
const mockImages = [
  {
    id: "img1",
    publicId: "via-publica/billboard1",
    url: "/placeholder.svg?height=600&width=1200",
    alt: "Cartel publicitario en Av. 9 de Julio - Vista frontal",
  },
  {
    id: "img2",
    publicId: "via-publica/billboard2",
    url: "/placeholder.svg?height=200&width=200",
    alt: "Cartel publicitario en Av. 9 de Julio - Vista lateral",
  },
  {
    id: "img3",
    publicId: "via-publica/billboard3",
    url: "/placeholder.svg?height=200&width=200",
    alt: "Cartel publicitario en Av. 9 de Julio - Vista nocturna",
  },
  {
    id: "img4",
    publicId: "via-publica/billboard4",
    url: "/placeholder.svg?height=200&width=200",
    alt: "Cartel publicitario en Av. 9 de Julio - Vista aérea",
  },
]

export default function BillboardDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/catalogo">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al catálogo
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-3xl font-bold">Cartel Frontal LED</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Guardar
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ImageGallery images={mockImages} />

              <Tabs defaultValue="descripcion">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                  <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
                  <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
                </TabsList>
                <TabsContent value="descripcion" className="p-4 border rounded-md mt-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Cartel Frontal LED en Av. 9 de Julio</h3>
                    <p>
                      Espacio publicitario premium ubicado en una de las avenidas más transitadas de Buenos Aires. Este
                      cartel frontal cuenta con iluminación LED de alta calidad que garantiza visibilidad las 24 horas.
                    </p>
                    <p>
                      Ideal para campañas de alto impacto visual, el cartel está estratégicamente ubicado para captar la
                      atención de miles de peatones y conductores diariamente. La zona cuenta con un flujo constante de
                      tráfico, lo que asegura una alta exposición para su marca.
                    </p>
                    <p>
                      El espacio es gestionado por Publicidad Urbana S.A., empresa con más de 15 años de experiencia en
                      el mercado publicitario argentino.
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>Visto por 243 personas en la última semana</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="especificaciones" className="p-4 border rounded-md mt-2">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Dimensiones</h4>
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-muted-foreground" />
                          <span>8m x 4m (32m²)</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Tipo de Estructura</h4>
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-muted-foreground" />
                          <span>Cartel frontal con iluminación LED</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Material</h4>
                        <span>Lona vinílica de alta resistencia</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Resolución (para LED)</h4>
                        <span>P10 (10mm de pitch)</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Visibilidad</h4>
                        <span>150m de distancia</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Tráfico Estimado</h4>
                        <span>50,000+ personas/día</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Características</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Iluminación LED</Badge>
                        <Badge>Alta Visibilidad</Badge>
                        <Badge>Doble Faz</Badge>
                        <Badge>Zona Premium</Badge>
                        <Badge>Mantenimiento Incluido</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="ubicacion" className="p-4 border rounded-md mt-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">Av. 9 de Julio 1000, CABA, Buenos Aires</span>
                    </div>
                    <div className="relative aspect-video rounded-md overflow-hidden border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9912265869477!2d-58.38386492425536!3d-34.60373887295426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sAv.%209%20de%20Julio%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1682452317182!5m2!1ses!2sar"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold">Puntos de Interés Cercanos</h4>
                        <ul className="mt-2 space-y-1">
                          <li>• Obelisco (200m)</li>
                          <li>• Teatro Colón (500m)</li>
                          <li>• Galerías Pacífico (800m)</li>
                          <li>• Metrobus 9 de Julio</li>
                          <li>• Estación de Subte Carlos Pellegrini</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">Información de la Zona</h4>
                        <ul className="mt-2 space-y-1">
                          <li>• Zona comercial y turística</li>
                          <li>• Alto tránsito peatonal</li>
                          <li>• Flujo vehicular constante</li>
                          <li>• Área de oficinas corporativas</li>
                          <li>• Zona gastronómica</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">$150,000 / mes</h3>
                    <p className="text-sm text-muted-foreground">Precio estimado (consultar disponibilidad)</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>CABA, Buenos Aires</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <span>Cartel frontal con iluminación LED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Disponible a partir del 01/05/2023</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full">Contactar al Propietario</Button>
                    <Button variant="outline" className="w-full">
                      Solicitar Información
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Propietario</h4>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src="/placeholder.svg?height=100&width=100"
                          alt="Logo de la empresa"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Publicidad Urbana S.A.</p>
                        <p className="text-sm text-muted-foreground">Miembro desde 2018</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Espacios Similares</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center border rounded-lg p-3">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Cartel similar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">Cartel LED en Puerto Madero</h4>
                      <p className="text-sm text-muted-foreground">6m x 3m • CABA</p>
                      <p className="font-medium">$130,000 / mes</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center border rounded-lg p-3">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Cartel similar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">Pantalla Digital en Recoleta</h4>
                      <p className="text-sm text-muted-foreground">5m x 4m • CABA</p>
                      <p className="font-medium">$180,000 / mes</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center border rounded-lg p-3">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Cartel similar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">Cartel Frontal en Av. Corrientes</h4>
                      <p className="text-sm text-muted-foreground">7m x 4m • CABA</p>
                      <p className="font-medium">$145,000 / mes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


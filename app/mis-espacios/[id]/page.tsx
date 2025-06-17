"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlobImageGallery from "@/components/blob-image-gallery"
import ProtectedRoute from "@/components/protected-route"

interface CartelDetalle {
  id: string
  titulo: string
  descripcion: string
  tipo: string
  provincia: string
  localidad: string
  direccion: string
  ancho: number
  alto: number
  precio: number
  caracteristicas: string
  createdAt: string
}

export default function DetalleEspacioPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [cartel, setCartel] = useState<CartelDetalle | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Aquí iría la lógica para cargar los detalles del cartel desde el backend
    // Por ahora, simulamos una respuesta
    const fetchCartel = async () => {
      try {
        setIsLoading(true)

        // Simulación de carga de datos
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo
        setCartel({
          id: params.id,
          titulo: "Cartel LED en Av. Corrientes",
          descripcion: "Espacio publicitario premium ubicado en una de las avenidas más transitadas de Buenos Aires.",
          tipo: "pantalla-led",
          provincia: "caba",
          localidad: "microcentro",
          direccion: "Av. Corrientes 1234",
          ancho: 6,
          alto: 3,
          precio: 150000,
          caracteristicas: "Iluminación LED, doble faz, alta visibilidad",
          createdAt: new Date().toISOString(),
        })
      } catch (error) {
        console.error("Error al cargar los detalles del cartel:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los detalles del espacio publicitario",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartel()
  }, [params.id])

  const handleEdit = () => {
    router.push(`/mis-espacios/${params.id}/editar`)
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar este espacio publicitario?")) {
      return
    }

    try {
      // Aquí iría la lógica para eliminar el cartel
      toast({
        title: "Éxito",
        description: "El espacio publicitario ha sido eliminado correctamente",
      })
      router.push("/mis-espacios")
    } catch (error) {
      console.error("Error al eliminar el espacio:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el espacio publicitario",
        variant: "destructive",
      })
    }
  }

  if (isLoading || !cartel) {
    return (
      <ProtectedRoute requiredPermission="canPublishBillboards">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 py-12 px-4">
            <div className="container max-w-4xl mx-auto">
              <div className="flex justify-center items-center h-64">
                <p>Cargando detalles del espacio...</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredPermission="canPublishBillboards">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Button>
                <h1 className="text-3xl font-bold">{cartel.titulo}</h1>
                <p className="text-muted-foreground">ID: {cartel.id}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-0">
                  <BlobImageGallery clienteId={user.id} cartelId={params.id} editable={true} />
                </CardContent>
              </Card>

              <Tabs defaultValue="detalles">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="detalles">Detalles</TabsTrigger>
                  <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
                  <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
                </TabsList>

                <TabsContent value="detalles" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información General</CardTitle>
                      <CardDescription>Detalles del espacio publicitario</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium">Tipo de Estructura</h3>
                          <p className="text-muted-foreground">
                            {cartel.tipo.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium">Fecha de Publicación</h3>
                          <p className="text-muted-foreground">{new Date(cartel.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium">Descripción</h3>
                        <p className="text-muted-foreground">{cartel.descripcion}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="font-medium">Ancho</h3>
                          <p className="text-muted-foreground">{cartel.ancho} metros</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Alto</h3>
                          <p className="text-muted-foreground">{cartel.alto} metros</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Área Total</h3>
                          <p className="text-muted-foreground">{cartel.ancho * cartel.alto} m²</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium">Precio Estimado</h3>
                        <p className="text-muted-foreground">${cartel.precio.toLocaleString()} ARS / mes</p>
                      </div>

                      <div>
                        <h3 className="font-medium">Características</h3>
                        <p className="text-muted-foreground">{cartel.caracteristicas}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ubicacion" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ubicación</CardTitle>
                      <CardDescription>Datos de ubicación del espacio</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium">Provincia</h3>
                          <p className="text-muted-foreground">
                            {cartel.provincia.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium">Localidad</h3>
                          <p className="text-muted-foreground">
                            {cartel.localidad.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium">Dirección</h3>
                        <p className="text-muted-foreground">{cartel.direccion}</p>
                      </div>

                      <div className="aspect-video rounded-md border overflow-hidden">
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9912265869477!2d-58.38386492425536!3d-34.60373887295426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sAv.%209%20de%20Julio%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1682452317182!5m2!1ses!2sar`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="estadisticas" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Estadísticas</CardTitle>
                      <CardDescription>Métricas de rendimiento del espacio</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center h-64">
                        <p className="text-muted-foreground">Las estadísticas estarán disponibles próximamente</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

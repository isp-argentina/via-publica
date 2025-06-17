"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { BarChart3, Eye, MessageSquare, TrendingUp, Lightbulb, Crown, Calendar, MapPin, DollarSign } from "lucide-react"

interface CartelStats {
  id: string
  titulo: string
  ubicacion: string
  visualizaciones: number
  consultas: number
  interes: number
  precio: number
  fechaPublicacion: string
}

interface Sugerencia {
  id: string
  tipo: "precio" | "ubicacion" | "descripcion" | "imagenes"
  titulo: string
  descripcion: string
  impacto: "alto" | "medio" | "bajo"
}

export default function InformesPage() {
  const { user } = useAuth()

  // Datos simulados
  const [carteles] = useState<CartelStats[]>([
    {
      id: "1",
      titulo: "Cartel LED Premium Centro",
      ubicacion: "Av. Corrientes 1234, CABA",
      visualizaciones: 1250,
      consultas: 23,
      interes: 85,
      precio: 45000,
      fechaPublicacion: "2024-01-15",
    },
    {
      id: "2",
      titulo: "Valla Publicitaria Zona Norte",
      ubicacion: "Panamericana Km 25, Vicente López",
      visualizaciones: 890,
      consultas: 12,
      interes: 67,
      precio: 32000,
      fechaPublicacion: "2024-01-20",
    },
    {
      id: "3",
      titulo: "Cartel Iluminado Shopping",
      ubicacion: "Shopping Unicenter, Martínez",
      visualizaciones: 2100,
      consultas: 45,
      interes: 92,
      precio: 78000,
      fechaPublicacion: "2024-01-10",
    },
  ])

  const [sugerencias] = useState<Sugerencia[]>([
    {
      id: "1",
      tipo: "precio",
      titulo: "Ajustar precio del Cartel LED Premium",
      descripcion:
        "El precio está 15% por encima del promedio de la zona. Considera reducirlo para aumentar consultas.",
      impacto: "alto",
    },
    {
      id: "2",
      tipo: "imagenes",
      titulo: "Agregar más fotos a la Valla Publicitaria",
      descripcion: "Los carteles con 3-4 fotos reciben 40% más consultas. Actualmente tienes solo 2 fotos.",
      impacto: "medio",
    },
    {
      id: "3",
      tipo: "descripcion",
      titulo: "Mejorar descripción del Cartel Shopping",
      descripcion: "Incluye información sobre el tráfico peatonal y horarios de mayor visibilidad.",
      impacto: "medio",
    },
  ])

  const totalVisualizaciones = carteles.reduce((sum, cartel) => sum + cartel.visualizaciones, 0)
  const totalConsultas = carteles.reduce((sum, cartel) => sum + cartel.consultas, 0)
  const promedioInteres = Math.round(carteles.reduce((sum, cartel) => sum + cartel.interes, 0) / carteles.length)

  const getImpactColor = (impacto: string) => {
    switch (impacto) {
      case "alto":
        return "bg-red-100 text-red-800"
      case "medio":
        return "bg-yellow-100 text-yellow-800"
      case "bajo":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInterestColor = (interes: number) => {
    if (interes >= 80) return "bg-green-500"
    if (interes >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <ProtectedRoute requiredPermission="canPublishBillboards">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <BarChart3 className="h-8 w-8" />
                Informes y Estadísticas
              </h1>
              <p className="text-muted-foreground mt-2">
                Analiza el rendimiento de tus carteles y obtén sugerencias para mejorar
              </p>
            </div>

            {/* Alerta de funcionalidad premium */}
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <Crown className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Próximamente:</strong> Esta funcionalidad estará disponible únicamente en el Plan Agencia.
                ¡Aprovecha el acceso gratuito mientras dure!
              </AlertDescription>
            </Alert>

            {/* Resumen General */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Visualizaciones</p>
                      <p className="text-2xl font-bold">{totalVisualizaciones.toLocaleString()}</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Consultas</p>
                      <p className="text-2xl font-bold">{totalConsultas}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Interés Promedio</p>
                      <p className="text-2xl font-bold">{promedioInteres}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Carteles Activos</p>
                      <p className="text-2xl font-bold">{carteles.length}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Estadísticas por Cartel */}
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento por Cartel</CardTitle>
                  <CardDescription>Visualizaciones, consultas e interés de cada cartel publicado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {carteles.map((cartel) => (
                    <div key={cartel.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{cartel.titulo}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {cartel.ubicacion}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Publicado: {new Date(cartel.fechaPublicacion).toLocaleDateString("es-AR")}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />${cartel.precio.toLocaleString()}/mes
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-blue-600">{cartel.visualizaciones}</p>
                          <p className="text-xs text-muted-foreground">Visualizaciones</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600">{cartel.consultas}</p>
                          <p className="text-xs text-muted-foreground">Consultas</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold">{cartel.interes}%</p>
                          <p className="text-xs text-muted-foreground">Interés</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Nivel de Interés</span>
                          <span>{cartel.interes}%</span>
                        </div>
                        <Progress value={cartel.interes} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Sugerencias de Mejora */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Sugerencias de Mejora
                  </CardTitle>
                  <CardDescription>
                    Recomendaciones personalizadas para aumentar el interés en tus carteles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sugerencias.map((sugerencia) => (
                    <div key={sugerencia.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{sugerencia.titulo}</h4>
                            <Badge className={getImpactColor(sugerencia.impacto)}>Impacto {sugerencia.impacto}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{sugerencia.descripcion}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Aplicar Sugerencia
                      </Button>
                    </div>
                  ))}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Consejo General</h4>
                    <p className="text-sm text-blue-800">
                      Los carteles con fotos de alta calidad y descripciones detalladas reciben hasta 60% más consultas.
                      ¡Mantén tu contenido actualizado!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

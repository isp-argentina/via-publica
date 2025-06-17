"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { Crown, CreditCard, CheckCircle, Star, Zap, Users } from "lucide-react"

interface PlanInfo {
  nombre: string
  tipo: "gratuito" | "premium"
  creditos: {
    total: number
    usados: number
    restantes: number
  }
  caracteristicas: string[]
  fechaVencimiento?: string
}

export default function PlanServicioPage() {
  const { user } = useAuth()
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga de información del plan
    const loadPlanInfo = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo - todos los nuevos usuarios tienen plan gratuito
        const mockPlanInfo: PlanInfo = {
          nombre: "Plan Gratuito",
          tipo: "gratuito",
          creditos: {
            total: 5,
            usados: 2,
            restantes: 3,
          },
          caracteristicas: [
            "5 créditos para publicar carteles",
            "Panel de control básico",
            "Estadísticas de visualización",
            "Gestión de consultas",
            "Soporte por email",
          ],
        }

        setPlanInfo(mockPlanInfo)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar la información del plan",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPlanInfo()
  }, [])

  const creditosUsadosPercentage = planInfo ? (planInfo.creditos.usados / planInfo.creditos.total) * 100 : 0

  if (!user) {
    return (
      <ProtectedRoute requiredPermission="canPublishBillboards">
        <div>Cargando...</div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredPermission="canPublishBillboards">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Crown className="h-8 w-8 text-primary" />
                Mi Plan de Servicio
              </h1>
              <p className="text-muted-foreground mt-2">Gestiona tu plan actual y conoce los beneficios disponibles</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Cargando información del plan...</p>
              </div>
            ) : planInfo ? (
              <div className="space-y-6">
                {/* Plan Actual */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {planInfo.tipo === "gratuito" ? (
                            <Star className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <Crown className="h-5 w-5 text-purple-500" />
                          )}
                          {planInfo.nombre}
                        </CardTitle>
                        <CardDescription>Tu plan actual</CardDescription>
                      </div>
                      <Badge
                        className={
                          planInfo.tipo === "gratuito" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                        }
                      >
                        {planInfo.tipo === "gratuito" ? "Gratuito" : "Premium"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Créditos */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Créditos para publicar carteles</h3>
                        <span className="text-sm text-muted-foreground">
                          {planInfo.creditos.restantes} de {planInfo.creditos.total} disponibles
                        </span>
                      </div>
                      <Progress value={creditosUsadosPercentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Usados: {planInfo.creditos.usados}</span>
                        <span>Restantes: {planInfo.creditos.restantes}</span>
                      </div>
                    </div>

                    {/* Características del plan */}
                    <div>
                      <h3 className="font-medium mb-3">Características incluidas</h3>
                      <div className="grid gap-2">
                        {planInfo.caracteristicas.map((caracteristica, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{caracteristica}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {planInfo.creditos.restantes === 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <Zap className="h-4 w-4" />
                          <span className="font-medium">¡Te quedaste sin créditos!</span>
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">
                          Actualiza a un plan premium para seguir publicando carteles sin límites.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Planes Disponibles */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Planes Disponibles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Plan Básico Premium */}
                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          Plan Básico Premium
                        </CardTitle>
                        <CardDescription>Ideal para propietarios individuales</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">
                          $9,999 <span className="text-lg font-normal text-muted-foreground">/ mes</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Hasta 10 carteles publicados</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Panel de control avanzado</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Estadísticas detalladas</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Promoción destacada</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Soporte prioritario</span>
                          </div>
                        </div>

                        <Button className="w-full">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Actualizar Plan
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Plan Agencia */}
                    <Card className="border-2 border-purple-200 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-100 text-purple-800">Más Popular</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-purple-500" />
                          Plan Agencia
                        </CardTitle>
                        <CardDescription>Para agencias y múltiples espacios</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">
                          $24,999 <span className="text-lg font-normal text-muted-foreground">/ mes</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Carteles ilimitados</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Panel de control para agencias</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Gestión de múltiples clientes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">API para integraciones</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Soporte dedicado 24/7</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Personalización de marca</span>
                          </div>
                        </div>

                        <Button className="w-full">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Actualizar Plan
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Historial de Facturación */}
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Facturación</CardTitle>
                    <CardDescription>Tus últimas transacciones y facturas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No tienes historial de facturación aún</p>
                      <p className="text-sm">Cuando actualices tu plan, verás tus facturas aquí</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Crown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No se pudo cargar la información del plan</h3>
                  <p className="text-muted-foreground mb-6">
                    Hubo un problema al cargar los detalles de tu plan de servicio
                  </p>
                  <Button onClick={() => window.location.reload()}>Intentar nuevamente</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

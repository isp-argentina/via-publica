"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { MessageSquare, Search, Filter, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"

interface Mensaje {
  id: string
  cartelTitulo: string
  cartelId: string
  propietario: string
  asunto: string
  mensaje: string
  fechaEnvio: string
  estado: "enviado" | "leido" | "respondido"
  respuesta?: string
  fechaRespuesta?: string
}

export default function MensajesPage() {
  const { user } = useAuth()
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [filteredMensajes, setFilteredMensajes] = useState<Mensaje[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")

  useEffect(() => {
    // Simular carga de mensajes
    const loadMensajes = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo
        const mockMensajes: Mensaje[] = [
          {
            id: "1",
            cartelTitulo: "Cartel LED en Av. Corrientes",
            cartelId: "1",
            propietario: "Publicidad Urbana S.A.",
            asunto: "Consulta sobre disponibilidad",
            mensaje:
              "Hola, me interesa conocer la disponibilidad de este espacio para una campaña de 3 meses. ¿Podrían enviarme más información sobre precios y condiciones?",
            fechaEnvio: "2024-01-15T10:30:00Z",
            estado: "respondido",
            respuesta:
              "Hola! Gracias por tu consulta. El espacio está disponible para los próximos 3 meses. Te envío la información detallada por email.",
            fechaRespuesta: "2024-01-15T14:20:00Z",
          },
          {
            id: "2",
            cartelTitulo: "Valla en Palermo",
            cartelId: "2",
            propietario: "Outdoor Media Group",
            asunto: "Solicitud de cotización",
            mensaje:
              "Buenos días, necesito una cotización para una campaña publicitaria de 2 meses en este espacio. La campaña sería para una marca de ropa deportiva.",
            fechaEnvio: "2024-01-12T09:15:00Z",
            estado: "leido",
          },
          {
            id: "3",
            cartelTitulo: "Marquesina en Recoleta",
            cartelId: "3",
            propietario: "Impacto Visual",
            asunto: "Consulta sobre especificaciones técnicas",
            mensaje:
              "Hola, me gustaría conocer las especificaciones técnicas de esta marquesina, especialmente sobre la iluminación y los formatos de archivo que aceptan.",
            fechaEnvio: "2024-01-10T16:45:00Z",
            estado: "enviado",
          },
        ]

        setMensajes(mockMensajes)
        setFilteredMensajes(mockMensajes)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los mensajes",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMensajes()
  }, [])

  useEffect(() => {
    // Filtrar mensajes
    const filtered = mensajes.filter((mensaje) => {
      const matchesSearch =
        mensaje.cartelTitulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mensaje.propietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mensaje.asunto.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "todos" || mensaje.estado === filterStatus

      return matchesSearch && matchesStatus
    })

    // Ordenar por fecha más reciente
    filtered.sort((a, b) => new Date(b.fechaEnvio).getTime() - new Date(a.fechaEnvio).getTime())

    setFilteredMensajes(filtered)
  }, [mensajes, searchTerm, filterStatus])

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "enviado":
        return <Clock className="h-4 w-4" />
      case "leido":
        return <Eye className="h-4 w-4" />
      case "respondido":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "enviado":
        return "bg-yellow-100 text-yellow-800"
      case "leido":
        return "bg-blue-100 text-blue-800"
      case "respondido":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "enviado":
        return "Enviado"
      case "leido":
        return "Leído"
      case "respondido":
        return "Respondido"
      default:
        return "Desconocido"
    }
  }

  if (!user) {
    return (
      <ProtectedRoute requiredPermission="canContactOwners">
        <div>Cargando...</div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredPermission="canContactOwners">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-primary" />
                Mis Mensajes
              </h1>
              <p className="text-muted-foreground mt-2">
                Historial de consultas enviadas a propietarios de espacios publicitarios
              </p>
            </div>

            {/* Filtros y búsqueda */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar mensajes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="enviado">Enviados</SelectItem>
                        <SelectItem value="leido">Leídos</SelectItem>
                        <SelectItem value="respondido">Respondidos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Cargando mensajes...</p>
              </div>
            ) : filteredMensajes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {searchTerm || filterStatus !== "todos" ? "No se encontraron mensajes" : "No tienes mensajes aún"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || filterStatus !== "todos"
                      ? "Intenta con otros términos de búsqueda o filtros"
                      : "Cuando contactes a propietarios de espacios publicitarios, tus mensajes aparecerán aquí"}
                  </p>
                  <Button asChild>
                    <Link href="/catalogo">Explorar Catálogo</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Mostrando {filteredMensajes.length} de {mensajes.length} mensajes
                </div>

                <div className="space-y-4">
                  {filteredMensajes.map((mensaje) => (
                    <Card key={mensaje.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              <Link
                                href={`/catalogo/${mensaje.cartelId}`}
                                className="hover:text-primary transition-colors"
                              >
                                {mensaje.cartelTitulo}
                              </Link>
                            </CardTitle>
                            <CardDescription>
                              Para: {mensaje.propietario} • {mensaje.asunto}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getEstadoColor(mensaje.estado)}>
                              {getEstadoIcon(mensaje.estado)}
                              <span className="ml-1">{getEstadoText(mensaje.estado)}</span>
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Tu mensaje:</h4>
                          <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">{mensaje.mensaje}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Enviado el{" "}
                            {new Date(mensaje.fechaEnvio).toLocaleDateString("es-AR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {mensaje.respuesta && (
                          <div>
                            <h4 className="font-medium mb-2">Respuesta:</h4>
                            <p className="text-sm bg-primary/5 p-3 rounded-md border-l-4 border-primary">
                              {mensaje.respuesta}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Respondido el{" "}
                              {mensaje.fechaRespuesta &&
                                new Date(mensaje.fechaRespuesta).toLocaleDateString("es-AR", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/catalogo/${mensaje.cartelId}`}>Ver Espacio</Link>
                          </Button>
                          {mensaje.estado === "respondido" && (
                            <Button variant="outline" size="sm">
                              Responder
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

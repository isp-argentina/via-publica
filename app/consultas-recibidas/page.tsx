"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { MessageSquare, Search, Filter, Clock, CheckCircle, Reply, Eye } from "lucide-react"

interface ConsultaRecibida {
  id: string
  cartelTitulo: string
  cartelId: string
  consultante: {
    nombre: string
    email: string
    telefono?: string
  }
  asunto: string
  mensaje: string
  fechaConsulta: string
  estado: "nueva" | "leida" | "respondida"
  respuesta?: string
  fechaRespuesta?: string
}

export default function ConsultasRecibidasPage() {
  const { user } = useAuth()
  const [consultas, setConsultas] = useState<ConsultaRecibida[]>([])
  const [filteredConsultas, setFilteredConsultas] = useState<ConsultaRecibida[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todas")
  const [selectedConsulta, setSelectedConsulta] = useState<ConsultaRecibida | null>(null)
  const [respuesta, setRespuesta] = useState("")
  const [isResponding, setIsResponding] = useState(false)

  useEffect(() => {
    // Simular carga de consultas
    const loadConsultas = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo
        const mockConsultas: ConsultaRecibida[] = [
          {
            id: "1",
            cartelTitulo: "Cartel LED en Av. Corrientes",
            cartelId: "1",
            consultante: {
              nombre: "María González",
              email: "maria@empresa.com",
              telefono: "11-1234-5678",
            },
            asunto: "Consulta sobre disponibilidad",
            mensaje:
              "Hola, me interesa conocer la disponibilidad de este espacio para una campaña de 3 meses. ¿Podrían enviarme más información sobre precios y condiciones?",
            fechaConsulta: "2024-01-15T10:30:00Z",
            estado: "nueva",
          },
          {
            id: "2",
            cartelTitulo: "Valla en Palermo",
            cartelId: "2",
            consultante: {
              nombre: "Carlos Rodríguez",
              email: "carlos@agencia.com",
              telefono: "11-9876-5432",
            },
            asunto: "Solicitud de cotización",
            mensaje:
              "Buenos días, necesito una cotización para una campaña publicitaria de 2 meses en este espacio. La campaña sería para una marca de ropa deportiva.",
            fechaConsulta: "2024-01-12T09:15:00Z",
            estado: "respondida",
            respuesta:
              "Hola Carlos, gracias por tu consulta. Te envío la cotización por email. El precio para 2 meses sería de $240,000. Quedamos a disposición para cualquier consulta adicional.",
            fechaRespuesta: "2024-01-12T14:20:00Z",
          },
          {
            id: "3",
            cartelTitulo: "Marquesina en Recoleta",
            cartelId: "3",
            consultante: {
              nombre: "Ana Martínez",
              email: "ana@startup.com",
            },
            asunto: "Consulta sobre especificaciones técnicas",
            mensaje:
              "Hola, me gustaría conocer las especificaciones técnicas de esta marquesina, especialmente sobre la iluminación y los formatos de archivo que aceptan.",
            fechaConsulta: "2024-01-10T16:45:00Z",
            estado: "leida",
          },
        ]

        setConsultas(mockConsultas)
        setFilteredConsultas(mockConsultas)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las consultas",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadConsultas()
  }, [])

  useEffect(() => {
    // Filtrar consultas
    const filtered = consultas.filter((consulta) => {
      const matchesSearch =
        consulta.cartelTitulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consulta.consultante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consulta.asunto.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "todas" || consulta.estado === filterStatus

      return matchesSearch && matchesStatus
    })

    // Ordenar por fecha más reciente
    filtered.sort((a, b) => new Date(b.fechaConsulta).getTime() - new Date(a.fechaConsulta).getTime())

    setFilteredConsultas(filtered)
  }, [consultas, searchTerm, filterStatus])

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "nueva":
        return <MessageSquare className="h-4 w-4" />
      case "leida":
        return <Eye className="h-4 w-4" />
      case "respondida":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "nueva":
        return <Badge className="bg-red-100 text-red-800">Nueva</Badge>
      case "leida":
        return <Badge className="bg-blue-100 text-blue-800">Leída</Badge>
      case "respondida":
        return <Badge className="bg-green-100 text-green-800">Respondida</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const handleMarcarComoLeida = async (id: string) => {
    try {
      setConsultas((prev) =>
        prev.map((consulta) =>
          consulta.id === id && consulta.estado === "nueva" ? { ...consulta, estado: "leida" as const } : consulta,
        ),
      )
    } catch (error) {
      console.error("Error al marcar como leída:", error)
    }
  }

  const handleResponder = async () => {
    if (!selectedConsulta || !respuesta.trim()) {
      toast({
        title: "Error",
        description: "Debes escribir una respuesta",
        variant: "destructive",
      })
      return
    }

    setIsResponding(true)

    try {
      // Aquí iría la lógica para enviar la respuesta
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setConsultas((prev) =>
        prev.map((consulta) =>
          consulta.id === selectedConsulta.id
            ? {
                ...consulta,
                estado: "respondida" as const,
                respuesta,
                fechaRespuesta: new Date().toISOString(),
              }
            : consulta,
        ),
      )

      toast({
        title: "Respuesta enviada",
        description: "Tu respuesta ha sido enviada correctamente",
      })

      setSelectedConsulta(null)
      setRespuesta("")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la respuesta",
        variant: "destructive",
      })
    } finally {
      setIsResponding(false)
    }
  }

  if (!user) {
    return (
      <ProtectedRoute requiredPermission="canViewInquiries">
        <div>Cargando...</div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredPermission="canViewInquiries">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-primary" />
                Consultas Recibidas
              </h1>
              <p className="text-muted-foreground mt-2">
                Gestiona las consultas que recibiste sobre tus carteles publicitarios
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
                        placeholder="Buscar consultas..."
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
                        <SelectItem value="todas">Todas</SelectItem>
                        <SelectItem value="nueva">Nuevas</SelectItem>
                        <SelectItem value="leida">Leídas</SelectItem>
                        <SelectItem value="respondida">Respondidas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Cargando consultas...</p>
              </div>
            ) : filteredConsultas.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {searchTerm || filterStatus !== "todas" ? "No se encontraron consultas" : "No tienes consultas aún"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || filterStatus !== "todas"
                      ? "Intenta con otros términos de búsqueda o filtros"
                      : "Cuando los usuarios consulten sobre tus carteles, las verás aquí"}
                  </p>
                  <Button asChild>
                    <Link href="/mis-carteles">Ver mis carteles</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Mostrando {filteredConsultas.length} de {consultas.length} consultas
                </div>

                <div className="space-y-4">
                  {filteredConsultas.map((consulta) => (
                    <Card key={consulta.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              <Link
                                href={`/mis-carteles/${consulta.cartelId}`}
                                className="hover:text-primary transition-colors"
                              >
                                {consulta.cartelTitulo}
                              </Link>
                            </CardTitle>
                            <CardDescription>
                              De: {consulta.consultante.nombre} ({consulta.consultante.email}) • {consulta.asunto}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">{getEstadoBadge(consulta.estado)}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Mensaje:</h4>
                          <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">{consulta.mensaje}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Recibido el{" "}
                            {new Date(consulta.fechaConsulta).toLocaleDateString("es-AR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {consulta.respuesta && (
                          <div>
                            <h4 className="font-medium mb-2">Tu respuesta:</h4>
                            <p className="text-sm bg-primary/5 p-3 rounded-md border-l-4 border-primary">
                              {consulta.respuesta}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Respondido el{" "}
                              {consulta.fechaRespuesta &&
                                new Date(consulta.fechaRespuesta).toLocaleDateString("es-AR", {
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
                          {consulta.estado === "nueva" && (
                            <Button variant="outline" size="sm" onClick={() => handleMarcarComoLeida(consulta.id)}>
                              <Eye className="mr-1 h-3 w-3" />
                              Marcar como leída
                            </Button>
                          )}
                          {consulta.estado !== "respondida" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedConsulta(consulta)
                                    setRespuesta("")
                                    if (consulta.estado === "nueva") {
                                      handleMarcarComoLeida(consulta.id)
                                    }
                                  }}
                                >
                                  <Reply className="mr-1 h-3 w-3" />
                                  Responder
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Responder consulta</DialogTitle>
                                  <DialogDescription>
                                    Respuesta para {consulta.consultante.nombre} sobre "{consulta.cartelTitulo}"
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Mensaje original:</h4>
                                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                                      {consulta.mensaje}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <label htmlFor="respuesta" className="text-sm font-medium">
                                      Tu respuesta:
                                    </label>
                                    <Textarea
                                      id="respuesta"
                                      placeholder="Escribe tu respuesta aquí..."
                                      value={respuesta}
                                      onChange={(e) => setRespuesta(e.target.value)}
                                      rows={6}
                                    />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setSelectedConsulta(null)}>
                                      Cancelar
                                    </Button>
                                    <Button onClick={handleResponder} disabled={isResponding}>
                                      {isResponding ? "Enviando..." : "Enviar Respuesta"}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/mis-carteles/${consulta.cartelId}`}>Ver cartel</Link>
                          </Button>
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

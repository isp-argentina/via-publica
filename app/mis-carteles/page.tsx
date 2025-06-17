"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { PlusCircle, Search, Filter, MapPin, Ruler, Eye, Edit, Trash2 } from "lucide-react"

interface Cartel {
  id: string
  titulo: string
  descripcion: string
  tipo: string
  ubicacion: string
  dimensiones: string
  precio?: number
  disponibilidad: "disponible" | "consultar"
  estado: "activo" | "pausado" | "revision"
  imagen: string
  fechaCreacion: string
  vistas: number
  consultas: number
}

export default function MisCartelesPage() {
  const { user } = useAuth()
  const [carteles, setCarteles] = useState<Cartel[]>([])
  const [filteredCarteles, setFilteredCarteles] = useState<Cartel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")

  useEffect(() => {
    // Simular carga de carteles
    const loadCarteles = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo
        const mockCarteles: Cartel[] = [
          {
            id: "1",
            titulo: "Cartel LED en Av. Corrientes",
            descripcion: "Espacio publicitario premium ubicado en una de las avenidas más transitadas de Buenos Aires.",
            tipo: "Cartel LED",
            ubicacion: "Microcentro, CABA",
            dimensiones: "6m x 3m",
            precio: 150000,
            disponibilidad: "disponible",
            estado: "activo",
            imagen: "/placeholder.svg?height=200&width=300",
            fechaCreacion: "2024-01-15",
            vistas: 243,
            consultas: 12,
          },
          {
            id: "2",
            titulo: "Valla en Palermo",
            descripcion: "Valla publicitaria en zona comercial de Palermo con alta visibilidad.",
            tipo: "Valla Publicitaria",
            ubicacion: "Palermo, CABA",
            dimensiones: "12m x 2.5m",
            disponibilidad: "consultar",
            estado: "activo",
            imagen: "/placeholder.svg?height=200&width=300",
            fechaCreacion: "2024-01-10",
            vistas: 156,
            consultas: 8,
          },
          {
            id: "3",
            titulo: "Marquesina en Recoleta",
            descripcion: "Marquesina en parada de colectivo en zona premium de Recoleta.",
            tipo: "Marquesina",
            ubicacion: "Recoleta, CABA",
            dimensiones: "1.2m x 1.8m",
            precio: 80000,
            disponibilidad: "disponible",
            estado: "revision",
            imagen: "/placeholder.svg?height=200&width=300",
            fechaCreacion: "2024-01-05",
            vistas: 89,
            consultas: 3,
          },
        ]

        setCarteles(mockCarteles)
        setFilteredCarteles(mockCarteles)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los carteles",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCarteles()
  }, [])

  useEffect(() => {
    // Filtrar carteles
    const filtered = carteles.filter((cartel) => {
      const matchesSearch =
        cartel.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cartel.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cartel.tipo.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "todos" || cartel.estado === filterStatus

      return matchesSearch && matchesStatus
    })

    // Ordenar por fecha más reciente
    filtered.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())

    setFilteredCarteles(filtered)
  }, [carteles, searchTerm, filterStatus])

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "pausado":
        return <Badge className="bg-yellow-100 text-yellow-800">Pausado</Badge>
      case "revision":
        return <Badge className="bg-blue-100 text-blue-800">En Revisión</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const handleDeleteCartel = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este cartel?")) {
      return
    }

    try {
      // Aquí iría la lógica para eliminar el cartel
      setCarteles((prev) => prev.filter((cartel) => cartel.id !== id))
      toast({
        title: "Cartel eliminado",
        description: "El cartel ha sido eliminado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el cartel",
        variant: "destructive",
      })
    }
  }

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
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Mis Carteles</h1>
                <p className="text-muted-foreground mt-2">Gestiona tus carteles publicitarios publicados</p>
              </div>
              <Button asChild>
                <Link href="/publicar-cartel">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Publicar Cartel
                </Link>
              </Button>
            </div>

            {/* Filtros y búsqueda */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar carteles..."
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
                        <SelectItem value="activo">Activos</SelectItem>
                        <SelectItem value="pausado">Pausados</SelectItem>
                        <SelectItem value="revision">En Revisión</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Cargando carteles...</p>
              </div>
            ) : filteredCarteles.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <PlusCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {searchTerm || filterStatus !== "todos"
                      ? "No se encontraron carteles"
                      : "No tienes carteles publicados"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || filterStatus !== "todos"
                      ? "Intenta con otros términos de búsqueda o filtros"
                      : "Publica tu primer cartel para comenzar a generar ingresos"}
                  </p>
                  <Button asChild>
                    <Link href="/publicar-cartel">Publicar mi primer cartel</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Mostrando {filteredCarteles.length} de {carteles.length} carteles
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCarteles.map((cartel) => (
                    <Card key={cartel.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={cartel.imagen || "/placeholder.svg"}
                          alt={cartel.titulo}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">{getEstadoBadge(cartel.estado)}</div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{cartel.titulo}</CardTitle>
                        <CardDescription className="line-clamp-2">{cartel.descripcion}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{cartel.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ruler className="h-4 w-4" />
                          <span>{cartel.dimensiones}</span>
                        </div>
                        {cartel.precio && (
                          <div className="text-lg font-semibold text-primary">
                            ${cartel.precio.toLocaleString()} / mes
                          </div>
                        )}
                        {cartel.disponibilidad === "consultar" && (
                          <div className="text-sm font-medium text-blue-600">Precio a consultar</div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{cartel.vistas} vistas</span>
                          </div>
                          <div>{cartel.consultas} consultas</div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/mis-carteles/${cartel.id}/editar`}>
                            <Edit className="mr-1 h-3 w-3" />
                            Editar
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/mis-carteles/${cartel.id}`}>Ver</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCartel(cartel.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </CardFooter>
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

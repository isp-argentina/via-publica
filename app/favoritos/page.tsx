"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { Heart, Search, Filter, MapPin, Ruler, Tag } from "lucide-react"

interface FavoritoItem {
  id: string
  titulo: string
  tipo: string
  ubicacion: string
  dimensiones: string
  precio: number
  imagen: string
  fechaAgregado: string
}

export default function FavoritosPage() {
  const { user } = useAuth()
  const [favoritos, setFavoritos] = useState<FavoritoItem[]>([])
  const [filteredFavoritos, setFilteredFavoritos] = useState<FavoritoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("fecha-desc")

  useEffect(() => {
    // Simular carga de favoritos
    const loadFavoritos = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo
        const mockFavoritos: FavoritoItem[] = [
          {
            id: "1",
            titulo: "Cartel LED en Av. Corrientes",
            tipo: "Pantalla LED",
            ubicacion: "Microcentro, CABA",
            dimensiones: "6m x 3m",
            precio: 150000,
            imagen: "/placeholder.svg?height=200&width=300",
            fechaAgregado: "2024-01-15",
          },
          {
            id: "2",
            titulo: "Valla en Palermo",
            tipo: "Valla Publicitaria",
            ubicacion: "Palermo, CABA",
            dimensiones: "12m x 2.5m",
            precio: 120000,
            imagen: "/placeholder.svg?height=200&width=300",
            fechaAgregado: "2024-01-10",
          },
          {
            id: "3",
            titulo: "Marquesina en Recoleta",
            tipo: "Marquesina",
            ubicacion: "Recoleta, CABA",
            dimensiones: "1.2m x 1.8m",
            precio: 80000,
            imagen: "/placeholder.svg?height=200&width=300",
            fechaAgregado: "2024-01-05",
          },
        ]

        setFavoritos(mockFavoritos)
        setFilteredFavoritos(mockFavoritos)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los favoritos",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadFavoritos()
  }, [])

  useEffect(() => {
    // Filtrar y ordenar favoritos
    const filtered = favoritos.filter(
      (favorito) =>
        favorito.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        favorito.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        favorito.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Ordenar
    switch (sortBy) {
      case "fecha-desc":
        filtered.sort((a, b) => new Date(b.fechaAgregado).getTime() - new Date(a.fechaAgregado).getTime())
        break
      case "fecha-asc":
        filtered.sort((a, b) => new Date(a.fechaAgregado).getTime() - new Date(b.fechaAgregado).getTime())
        break
      case "precio-asc":
        filtered.sort((a, b) => a.precio - b.precio)
        break
      case "precio-desc":
        filtered.sort((a, b) => b.precio - a.precio)
        break
      case "titulo":
        filtered.sort((a, b) => a.titulo.localeCompare(b.titulo))
        break
    }

    setFilteredFavoritos(filtered)
  }, [favoritos, searchTerm, sortBy])

  const handleRemoveFavorito = async (id: string) => {
    try {
      // Aquí iría la lógica para eliminar de favoritos en el backend
      setFavoritos((prev) => prev.filter((fav) => fav.id !== id))
      toast({
        title: "Eliminado de favoritos",
        description: "El espacio ha sido eliminado de tus favoritos",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar de favoritos",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <ProtectedRoute requiredPermission="canSaveFavorites">
        <div>Cargando...</div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredPermission="canSaveFavorites">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Heart className="h-8 w-8 text-red-500" />
                Mis Favoritos
              </h1>
              <p className="text-muted-foreground mt-2">
                Espacios publicitarios que has guardado para revisar más tarde
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
                        placeholder="Buscar en favoritos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fecha-desc">Más recientes</SelectItem>
                        <SelectItem value="fecha-asc">Más antiguos</SelectItem>
                        <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                        <SelectItem value="titulo">Título A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Cargando favoritos...</p>
              </div>
            ) : filteredFavoritos.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {searchTerm ? "No se encontraron resultados" : "No tienes favoritos aún"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm
                      ? "Intenta con otros términos de búsqueda"
                      : "Explora nuestro catálogo y guarda los espacios que más te interesen"}
                  </p>
                  <Button asChild>
                    <Link href="/catalogo">Explorar Catálogo</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Mostrando {filteredFavoritos.length} de {favoritos.length} favoritos
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavoritos.map((favorito) => (
                    <Card key={favorito.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={favorito.imagen || "/placeholder.svg"}
                          alt={favorito.titulo}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full"
                          onClick={() => handleRemoveFavorito(favorito.id)}
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{favorito.titulo}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{favorito.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ruler className="h-4 w-4" />
                          <span>{favorito.dimensiones}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Tag className="h-4 w-4" />
                          <span>{favorito.tipo}</span>
                        </div>
                        <div className="text-lg font-semibold text-primary">
                          ${favorito.precio.toLocaleString()} / mes
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Agregado el {new Date(favorito.fechaAgregado).toLocaleDateString("es-AR")}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/catalogo/${favorito.id}`}>Ver Detalles</Link>
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

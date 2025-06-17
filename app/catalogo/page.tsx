import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BillboardFilters from "@/components/billboard-filters"

export const metadata: Metadata = {
  title: "Catálogo de Espacios Publicitarios | Vía Pública",
  description: "Explora nuestro catálogo completo de espacios publicitarios en Argentina",
}

export default function CatalogoPage({
  searchParams,
}: {
  searchParams?: {
    provincia?: string
    localidad?: string
    tipo?: string
  }
}) {
  // Aquí podrías usar los searchParams para filtrar los resultados
  // Por ejemplo: const filteredResults = filterBillboards(searchParams);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="w-full md:w-1/4">
              <BillboardFilters initialFilters={searchParams} />
            </div>
            <div className="w-full md:w-3/4 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold">Catálogo de Espacios</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Ordenar por:</span>
                  <Select defaultValue="relevancia">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevancia">Relevancia</SelectItem>
                      <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="tamano-asc">Tamaño: Menor a Mayor</SelectItem>
                      <SelectItem value="tamano-desc">Tamaño: Mayor a Menor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mostrar filtros aplicados si existen */}
              {(searchParams?.provincia || searchParams?.localidad || searchParams?.tipo) && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h2 className="text-sm font-medium mb-2">Filtros aplicados:</h2>
                  <div className="flex flex-wrap gap-2">
                    {searchParams?.provincia && (
                      <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Provincia: {searchParams.provincia.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    )}
                    {searchParams?.localidad && (
                      <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Localidad: {searchParams.localidad.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    )}
                    {searchParams?.tipo && (
                      <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Tipo: {searchParams.tipo.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    )}
                    <Button variant="ghost" size="sm" asChild className="text-xs h-6">
                      <Link href="/catalogo">Limpiar filtros</Link>
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Billboard Card 1 */}
                <Card className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Cartel publicitario en Av. 9 de Julio"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Cartel Frontal LED</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ubicación:</span>
                      <span className="text-sm font-medium">CABA, Buenos Aires</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensiones:</span>
                      <span className="text-sm font-medium">8m x 4m</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/catalogo/1">Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Billboard Card 2 */}
                <Card className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Pantalla LED en Microcentro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Pantalla LED Digital</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ubicación:</span>
                      <span className="text-sm font-medium">Microcentro, CABA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensiones:</span>
                      <span className="text-sm font-medium">6m x 3m</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/catalogo/2">Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Billboard Card 3 */}
                <Card className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Valla publicitaria en obra en construcción"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Valla en Obra</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ubicación:</span>
                      <span className="text-sm font-medium">Palermo, CABA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensiones:</span>
                      <span className="text-sm font-medium">12m x 2.5m</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/catalogo/3">Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Billboard Card 4 */}
                <Card className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Marquesina en parada de colectivo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Marquesina en Parada</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ubicación:</span>
                      <span className="text-sm font-medium">Recoleta, CABA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensiones:</span>
                      <span className="text-sm font-medium">1.2m x 1.8m</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/catalogo/4">Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Billboard Card 5 */}
                <Card className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Cartel columna en avenida"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Cartel Columna</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ubicación:</span>
                      <span className="text-sm font-medium">Córdoba Capital, Córdoba</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensiones:</span>
                      <span className="text-sm font-medium">3m x 6m</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/catalogo/5">Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Billboard Card 6 */}
                <Card className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Pantalla LED en centro comercial"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Pantalla LED Interior</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ubicación:</span>
                      <span className="text-sm font-medium">Rosario, Santa Fe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensiones:</span>
                      <span className="text-sm font-medium">4m x 2.5m</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/catalogo/6">Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="mx-1">
                  1
                </Button>
                <Button variant="outline" className="mx-1">
                  2
                </Button>
                <Button variant="outline" className="mx-1">
                  3
                </Button>
                <Button variant="outline" className="mx-1">
                  4
                </Button>
                <Button variant="outline" className="mx-1">
                  5
                </Button>
                <Button variant="outline" className="mx-1">
                  ...
                </Button>
                <Button variant="outline" className="mx-1">
                  10
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

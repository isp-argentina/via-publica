"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlobImageGallery from "@/components/blob-image-gallery"
import ProtectedRoute from "@/components/protected-route"

export default function PublicarEspacioPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  // Verificar que el usuario esté autenticado y tenga permisos
  if (!user) {
    return (
      <ProtectedRoute requiredPermission="canPublishBillboards">
        <div>Cargando...</div>
      </ProtectedRoute>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Aquí iría la lógica para enviar los datos del formulario
      // junto con las URLs de las imágenes al backend

      toast({
        title: "Éxito",
        description: "Tu espacio publicitario ha sido publicado correctamente",
      })

      // Redirigir al usuario a la página de sus espacios
      router.push("/mis-espacios")
    } catch (error) {
      console.error("Error al publicar el espacio:", error)
      toast({
        title: "Error",
        description: "No se pudo publicar el espacio publicitario",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImagesChange = (urls: string[]) => {
    setImageUrls(urls)
  }

  return (
    <ProtectedRoute requiredPermission="canPublishBillboards">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Publicar Espacio Publicitario</h1>
              <p className="text-muted-foreground mt-2">
                Completa el formulario para publicar tu espacio publicitario en nuestra plataforma
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Datos básicos de tu espacio publicitario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título</Label>
                      <Input id="titulo" name="titulo" placeholder="Ej: Cartel LED en Av. Corrientes" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Estructura</Label>
                      <Select name="tipo" required>
                        <SelectTrigger id="tipo">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cartel-frontal">Cartel Frontal</SelectItem>
                          <SelectItem value="cartel-columna">Cartel Columna</SelectItem>
                          <SelectItem value="pantalla-led">Pantalla LED</SelectItem>
                          <SelectItem value="valla">Valla Publicitaria</SelectItem>
                          <SelectItem value="marquesina">Marquesina</SelectItem>
                          <SelectItem value="toldo">Toldo/Awning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      placeholder="Describe tu espacio publicitario, ubicación, características, etc."
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                  <CardDescription>Datos de ubicación del espacio publicitario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provincia">Provincia</Label>
                      <Select name="provincia" required>
                        <SelectTrigger id="provincia">
                          <SelectValue placeholder="Seleccionar provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buenos-aires">Buenos Aires</SelectItem>
                          <SelectItem value="caba">Ciudad Autónoma de Buenos Aires</SelectItem>
                          <SelectItem value="cordoba">Córdoba</SelectItem>
                          <SelectItem value="santa-fe">Santa Fe</SelectItem>
                          <SelectItem value="mendoza">Mendoza</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="localidad">Localidad</Label>
                      <Input id="localidad" name="localidad" placeholder="Ej: Palermo" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" name="direccion" placeholder="Ej: Av. Corrientes 1234" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitud">Latitud</Label>
                      <Input id="latitud" name="latitud" placeholder="Ej: -34.603722" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitud">Longitud</Label>
                      <Input id="longitud" name="longitud" placeholder="Ej: -58.381592" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codigo-postal">Código Postal</Label>
                      <Input id="codigo-postal" name="codigoPostal" placeholder="Ej: C1043AAT" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Características</CardTitle>
                  <CardDescription>Especificaciones técnicas del espacio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ancho">Ancho (metros)</Label>
                      <Input id="ancho" name="ancho" type="number" step="0.01" placeholder="Ej: 6" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alto">Alto (metros)</Label>
                      <Input id="alto" name="alto" type="number" step="0.01" placeholder="Ej: 3" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="precio">Precio Estimado (ARS/mes)</Label>
                      <Input id="precio" name="precio" type="number" placeholder="Ej: 150000" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caracteristicas">Características Adicionales</Label>
                    <Textarea
                      id="caracteristicas"
                      name="caracteristicas"
                      placeholder="Ej: Iluminación LED, doble faz, alta visibilidad, etc."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Imágenes</CardTitle>
                  <CardDescription>Sube imágenes de tu espacio publicitario (máx. 3MB por imagen)</CardDescription>
                </CardHeader>
                <CardContent>
                  <BlobImageGallery
                    clienteId={user.id}
                    cartelId="nuevo" // Esto se actualizará con el ID real después de crear el cartel
                    editable={true}
                    onImagesChange={handleImagesChange}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Se recomienda subir al menos 3 imágenes de diferentes ángulos y en buena calidad
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting || imageUrls.length === 0}>
                  {isSubmitting ? "Publicando..." : "Publicar Espacio"}
                </Button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

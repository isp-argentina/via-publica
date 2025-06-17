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
import ProtectedRoute from "@/components/protected-route"
import CaracteristicasSelector from "@/components/caracteristicas-selector"
import DisponibilidadSelector from "@/components/disponibilidad-selector"
import MultiImageUploader from "@/components/multi-image-uploader"
import { ArrowLeft } from "lucide-react"

export default function PublicarCartelPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estados del formulario
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")

  // Especificaciones
  const [ancho, setAncho] = useState("")
  const [alto, setAlto] = useState("")
  const [tipoEstructura, setTipoEstructura] = useState("")
  const [material, setMaterial] = useState("")
  const [resolucion, setResolucion] = useState("")
  const [visibilidad, setVisibilidad] = useState("")
  const [traficoEstimado, setTraficoEstimado] = useState("")

  // Ubicación
  const [direccion, setDireccion] = useState("")
  const [localidad, setLocalidad] = useState("")
  const [provincia, setProvincia] = useState("")

  // Características
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState<string[]>([])

  // Disponibilidad y precio
  const [disponibilidad, setDisponibilidad] = useState<"disponible" | "consultar">("disponible")
  const [precio, setPrecio] = useState("")

  // Imágenes
  const [images, setImages] = useState<any[]>([])

  const caracteristicasOptions = [
    { id: "iluminado", label: "Iluminado", description: "Cuenta con iluminación LED" },
    { id: "alta-visibilidad", label: "Alta Visibilidad", description: "Ubicación estratégica con gran exposición" },
    { id: "doble-faz", label: "Doble Faz", description: "Visible desde ambos lados" },
    { id: "zona-premium", label: "Zona Premium", description: "Ubicado en zona comercial de alto tráfico" },
    { id: "digital", label: "Digital", description: "Pantalla digital programable" },
    { id: "interactivo", label: "Interactivo", description: "Permite interacción con usuarios" },
    { id: "mantenimiento-incluido", label: "Mantenimiento Incluido", description: "Incluye servicio de mantenimiento" },
    { id: "instalacion-incluida", label: "Instalación Incluida", description: "Incluye servicio de instalación" },
  ]

  const provincias = [
    { value: "buenos-aires", label: "Buenos Aires" },
    { value: "caba", label: "Ciudad Autónoma de Buenos Aires" },
    { value: "cordoba", label: "Córdoba" },
    { value: "santa-fe", label: "Santa Fe" },
    { value: "mendoza", label: "Mendoza" },
    { value: "tucuman", label: "Tucumán" },
  ]

  const tiposEstructura = [
    { value: "cartel-frontal", label: "Cartel Frontal" },
    { value: "cartel-columna", label: "Cartel Columna" },
    { value: "cartel-led", label: "Cartel LED" },
    { value: "pantalla-led", label: "Pantalla LED" },
    { value: "valla", label: "Valla Publicitaria" },
    { value: "marquesina", label: "Marquesina" },
    { value: "toldo", label: "Toldo/Awning" },
  ]

  const materiales = [
    { value: "lona-vinilica", label: "Lona Vinílica" },
    { value: "acrilico", label: "Acrílico" },
    { value: "aluminio", label: "Aluminio" },
    { value: "led", label: "Pantalla LED" },
    { value: "vidrio", label: "Vidrio" },
    { value: "pvc", label: "PVC" },
  ]

  const resoluciones = [
    { value: "p10", label: "P10 (10mm de pitch)" },
    { value: "p8", label: "P8 (8mm de pitch)" },
    { value: "p6", label: "P6 (6mm de pitch)" },
    { value: "p4", label: "P4 (4mm de pitch)" },
    { value: "p3", label: "P3 (3mm de pitch)" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Debes subir al menos una imagen del cartel",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar los datos al backend
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulación

      toast({
        title: "¡Cartel publicado exitosamente!",
        description: "Tu cartel ha sido publicado y está disponible en el catálogo",
      })

      router.push("/mis-carteles")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo publicar el cartel. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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
          <div className="container max-w-4xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
              <h1 className="text-3xl font-bold">Publicar Cartel</h1>
              <p className="text-muted-foreground mt-2">
                Completa la información de tu cartel para publicarlo en nuestra plataforma
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información General */}
              <Card>
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Datos básicos de tu cartel publicitario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      placeholder="Ej: Cartel LED en Av. Corrientes"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción *</Label>
                    <Textarea
                      id="descripcion"
                      placeholder="Describe tu cartel, ubicación, características destacadas, etc."
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Especificaciones */}
              <Card>
                <CardHeader>
                  <CardTitle>Especificaciones</CardTitle>
                  <CardDescription>Detalles técnicos del cartel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ancho">Ancho (metros) *</Label>
                      <Input
                        id="ancho"
                        type="number"
                        step="0.01"
                        placeholder="Ej: 6"
                        value={ancho}
                        onChange={(e) => setAncho(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alto">Alto (metros) *</Label>
                      <Input
                        id="alto"
                        type="number"
                        step="0.01"
                        placeholder="Ej: 3"
                        value={alto}
                        onChange={(e) => setAlto(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tipo-estructura">Tipo de Estructura *</Label>
                      <Select value={tipoEstructura} onValueChange={setTipoEstructura} required>
                        <SelectTrigger id="tipo-estructura">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposEstructura.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material">Material *</Label>
                      <Select value={material} onValueChange={setMaterial} required>
                        <SelectTrigger id="material">
                          <SelectValue placeholder="Seleccionar material" />
                        </SelectTrigger>
                        <SelectContent>
                          {materiales.map((mat) => (
                            <SelectItem key={mat.value} value={mat.value}>
                              {mat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {(tipoEstructura === "cartel-led" || tipoEstructura === "pantalla-led") && (
                    <div className="space-y-2">
                      <Label htmlFor="resolucion">Resolución *</Label>
                      <Select value={resolucion} onValueChange={setResolucion} required>
                        <SelectTrigger id="resolucion">
                          <SelectValue placeholder="Seleccionar resolución" />
                        </SelectTrigger>
                        <SelectContent>
                          {resoluciones.map((res) => (
                            <SelectItem key={res.value} value={res.value}>
                              {res.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="visibilidad">Visibilidad *</Label>
                      <Input
                        id="visibilidad"
                        placeholder="Ej: 150m de distancia"
                        value={visibilidad}
                        onChange={(e) => setVisibilidad(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trafico">Tráfico Estimado *</Label>
                      <Input
                        id="trafico"
                        placeholder="Ej: 50,000+ personas/día"
                        value={traficoEstimado}
                        onChange={(e) => setTraficoEstimado(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Características */}
              <Card>
                <CardHeader>
                  <CardTitle>Características</CardTitle>
                  <CardDescription>Selecciona las características que aplican a tu cartel</CardDescription>
                </CardHeader>
                <CardContent>
                  <CaracteristicasSelector
                    caracteristicas={caracteristicasOptions}
                    selectedCaracteristicas={selectedCaracteristicas}
                    onSelectionChange={setSelectedCaracteristicas}
                  />
                </CardContent>
              </Card>

              {/* Ubicación */}
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                  <CardDescription>Datos de ubicación del cartel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección *</Label>
                    <Input
                      id="direccion"
                      placeholder="Ej: Av. Corrientes 1234"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provincia">Provincia *</Label>
                      <Select value={provincia} onValueChange={setProvincia} required>
                        <SelectTrigger id="provincia">
                          <SelectValue placeholder="Seleccionar provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          {provincias.map((prov) => (
                            <SelectItem key={prov.value} value={prov.value}>
                              {prov.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="localidad">Localidad *</Label>
                      <Input
                        id="localidad"
                        placeholder="Ej: Microcentro"
                        value={localidad}
                        onChange={(e) => setLocalidad(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disponibilidad y Precio */}
              <Card>
                <CardHeader>
                  <CardTitle>Disponibilidad y Precio</CardTitle>
                  <CardDescription>Define cómo quieres manejar la disponibilidad y el precio</CardDescription>
                </CardHeader>
                <CardContent>
                  <DisponibilidadSelector
                    disponibilidad={disponibilidad}
                    precio={precio}
                    onDisponibilidadChange={setDisponibilidad}
                    onPrecioChange={setPrecio}
                  />
                </CardContent>
              </Card>

              {/* Imágenes */}
              <Card>
                <CardHeader>
                  <CardTitle>Imágenes</CardTitle>
                  <CardDescription>Sube hasta 4 imágenes de tu cartel (máx. 3MB cada una)</CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUploader maxImages={4} onImagesChange={setImages} />
                </CardContent>
              </Card>

              {/* Botones de acción */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publicando..." : "Publicar Cartel"}
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

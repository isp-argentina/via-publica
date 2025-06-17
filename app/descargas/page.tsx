"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { Download, Search, FileText, Video, ImageIcon, FileArchive, Eye, DollarSign } from "lucide-react"

interface DescargaItem {
  id: string
  nombre: string
  tipo: "video" | "imagen" | "documento" | "archivo"
  descripcion: string
  precio: number
  esGratuito: boolean
  fechaSubida: string
  descargas: number
  url: string
}

export default function DescargasPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  // Datos simulados de archivos descargables
  const [descargas] = useState<DescargaItem[]>([
    {
      id: "1",
      nombre: "Video Institucional Vía Pública 2024",
      tipo: "video",
      descripcion: "Video promocional oficial de la plataforma Vía Pública con casos de éxito y testimonios",
      precio: 0,
      esGratuito: true,
      fechaSubida: "2024-01-15",
      descargas: 245,
      url: "/downloads/video-institucional-2024.mp4",
    },
    {
      id: "2",
      nombre: "Logo Vía Pública - Pack Completo",
      tipo: "archivo",
      descripcion: "Pack completo con logos en diferentes formatos (PNG, SVG, AI) y variaciones de color",
      precio: 0,
      esGratuito: true,
      fechaSubida: "2024-01-10",
      descargas: 189,
      url: "/downloads/logo-pack-viapublica.zip",
    },
    {
      id: "3",
      nombre: "Guía de Mejores Prácticas Publicitarias",
      tipo: "documento",
      descripcion: "Manual completo con estrategias y consejos para maximizar el impacto de tus campañas publicitarias",
      precio: 2500,
      esGratuito: false,
      fechaSubida: "2024-01-20",
      descargas: 67,
      url: "/downloads/guia-mejores-practicas.pdf",
    },
    {
      id: "4",
      nombre: "Plantillas de Diseño para Carteles",
      tipo: "archivo",
      descripcion: "Colección de plantillas profesionales en formato PSD y AI para crear diseños impactantes",
      precio: 4900,
      esGratuito: false,
      fechaSubida: "2024-01-18",
      descargas: 34,
      url: "/downloads/plantillas-diseno.zip",
    },
    {
      id: "5",
      nombre: "Estudio de Mercado Publicitario 2024",
      tipo: "documento",
      descripción: "Análisis completo del mercado publicitario argentino con tendencias y proyecciones",
      precio: 7500,
      esGratuito: false,
      fechaSubida: "2024-01-12",
      descargas: 23,
      url: "/downloads/estudio-mercado-2024.pdf",
    },
    {
      id: "6",
      nombre: "Imágenes Stock para Publicidad",
      tipo: "imagen",
      descripcion: "Colección de 50 imágenes de alta resolución libres de derechos para uso publicitario",
      precio: 3200,
      esGratuito: false,
      fechaSubida: "2024-01-08",
      descargas: 78,
      url: "/downloads/imagenes-stock.zip",
    },
  ])

  const filteredDescargas = descargas.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "imagen":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case "documento":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "archivo":
        return <FileArchive className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const handleDownload = (item: DescargaItem) => {
    if (item.esGratuito) {
      // Simular descarga gratuita
      window.open(item.url, "_blank")
    } else {
      // Redirigir a página de pago o mostrar modal de compra
      alert(`Para descargar "${item.nombre}" necesitas realizar el pago de $${item.precio.toLocaleString()}`)
    }
  }

  const handlePreview = (item: DescargaItem) => {
    alert(`Vista previa de: ${item.nombre}`)
  }

  return (
    <ProtectedRoute requiredPermission="canPublishBillboards">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Download className="h-8 w-8" />
                Centro de Descargas
              </h1>
              <p className="text-muted-foreground mt-2">
                Accede a recursos exclusivos, plantillas y materiales para potenciar tu negocio publicitario
              </p>
            </div>

            {/* Buscador */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar recursos, plantillas, videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Recursos</p>
                      <p className="text-2xl font-bold">{descargas.length}</p>
                    </div>
                    <FileArchive className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Recursos Gratuitos</p>
                      <p className="text-2xl font-bold">{descargas.filter((d) => d.esGratuito).length}</p>
                    </div>
                    <Download className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Descargas</p>
                      <p className="text-2xl font-bold">{descargas.reduce((sum, item) => sum + item.descargas, 0)}</p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Descargas */}
            <div className="grid gap-6">
              {filteredDescargas.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-gray-100 rounded-lg">{getIconByType(item.tipo)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{item.nombre}</h3>
                            {item.esGratuito ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Gratuito
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-blue-200 text-blue-800">
                                ${item.precio.toLocaleString()}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{item.descripcion}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Subido: {new Date(item.fechaSubida).toLocaleDateString("es-AR")}</span>
                            <span>•</span>
                            <span>{item.descargas} descargas</span>
                            <span>•</span>
                            <span className="capitalize">{item.tipo}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handlePreview(item)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Vista Previa
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(item)}
                          className={item.esGratuito ? "" : "bg-blue-600 hover:bg-blue-700"}
                        >
                          {item.esGratuito ? (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </>
                          ) : (
                            <>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Comprar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDescargas.length === 0 && (
              <div className="text-center py-12">
                <FileArchive className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron recursos</h3>
                <p className="text-muted-foreground">
                  Intenta con otros términos de búsqueda o explora todas las categorías disponibles
                </p>
              </div>
            )}

            {/* Información adicional */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Información sobre Descargas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Recursos Gratuitos</h4>
                    <p className="text-sm text-muted-foreground">
                      Todos los usuarios registrados pueden acceder a recursos básicos como logos, videos
                      institucionales y guías introductorias sin costo alguno.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recursos Premium</h4>
                    <p className="text-sm text-muted-foreground">
                      Los recursos premium incluyen plantillas profesionales, estudios de mercado y materiales
                      exclusivos desarrollados por nuestro equipo de expertos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

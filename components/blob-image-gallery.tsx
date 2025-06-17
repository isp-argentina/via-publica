"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { ChevronLeft, ChevronRight, Maximize2, X, Trash2 } from "lucide-react"
import Image from "next/image"
import ImageUploader from "./image-uploader"

interface BlobImageGalleryProps {
  clienteId: string
  cartelId?: string
  editable?: boolean
  onImagesChange?: (images: string[]) => void
}

export default function BlobImageGallery({
  clienteId,
  cartelId,
  editable = false,
  onImagesChange,
}: BlobImageGalleryProps) {
  const [images, setImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  // Cargar imágenes al montar el componente
  useEffect(() => {
    fetchImages()
  }, [clienteId, cartelId])

  const fetchImages = async () => {
    try {
      setIsLoading(true)

      // Construir la URL con los parámetros
      let url = `/api/upload?clienteId=${clienteId}`
      if (cartelId) url += `&cartelId=${cartelId}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Error al cargar las imágenes")
      }

      const data = await response.json()
      setImages(data.images || [])

      // Notificar cambio de imágenes
      if (onImagesChange) onImagesChange(data.images || [])
    } catch (error) {
      console.error("Error al cargar las imágenes:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las imágenes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleDeleteImage = async (url: string, index: number) => {
    try {
      setIsDeleting(true)

      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Error al eliminar la imagen")
      }

      // Actualizar el estado local
      const newImages = [...images]
      newImages.splice(index, 1)
      setImages(newImages)

      // Ajustar el índice actual si es necesario
      if (currentImageIndex >= newImages.length) {
        setCurrentImageIndex(Math.max(0, newImages.length - 1))
      }

      // Notificar cambio de imágenes
      if (onImagesChange) onImagesChange(newImages)

      toast({
        title: "Éxito",
        description: "Imagen eliminada correctamente",
      })
    } catch (error) {
      console.error("Error al eliminar la imagen:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la imagen",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUploadComplete = (imageUrl: string) => {
    // Actualizar el estado local
    const newImages = [...images, imageUrl]
    setImages(newImages)

    // Establecer la nueva imagen como la actual
    setCurrentImageIndex(newImages.length - 1)

    // Notificar cambio de imágenes
    if (onImagesChange) onImagesChange(newImages)
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="w-full aspect-video rounded-lg" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="aspect-square rounded-md" />
          ))}
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return editable ? (
      <ImageUploader clienteId={clienteId} cartelId={cartelId} onUploadComplete={handleUploadComplete} />
    ) : (
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center justify-center text-muted-foreground min-h-[200px]">
          <p>No hay imágenes disponibles</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="relative aspect-video rounded-lg overflow-hidden border">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`Imagen ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>

          {editable && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute bottom-2 left-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
              onClick={() => handleDeleteImage(images[currentImageIndex], currentImageIndex)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`Imagen ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-4 gap-2">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer group ${
              index === currentImageIndex ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image src={imageUrl || "/placeholder.svg"} alt={`Miniatura ${index + 1}`} fill className="object-cover" />

            {editable && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteImage(imageUrl, index)
                }}
                disabled={isDeleting}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}

        {editable && (
          <div className="aspect-square rounded-md border-2 border-dashed border-muted-foreground/20 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
            <ImageUploader
              clienteId={clienteId}
              cartelId={cartelId}
              onUploadComplete={handleUploadComplete}
              className="border-0 shadow-none"
            />
          </div>
        )}
      </div>
    </div>
  )
}

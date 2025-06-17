"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

interface ImageGalleryProps {
  images: {
    id: string
    url: string
    alt: string
  }[]
  onRemoveImage?: (id: string) => void
  editable?: boolean
}

export default function ImageGallery({ images, onRemoveImage, editable = false }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  const handleImageLoad = (id: string) => {
    setIsLoading((prev) => ({ ...prev, [id]: false }))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (images.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center justify-center text-muted-foreground min-h-[200px]">
          <p>No hay imágenes disponibles</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="relative aspect-video rounded-lg overflow-hidden border">
          <Image
            src={images[currentImageIndex].url || "/placeholder.svg"}
            alt={images[currentImageIndex].alt}
            fill
            className="object-cover"
            onLoadStart={() => setIsLoading({ ...isLoading, [images[currentImageIndex].id]: true })}
            onLoad={() => handleImageLoad(images[currentImageIndex].id)}
          />
          {isLoading[images[currentImageIndex].id] && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
              <Skeleton className="h-full w-full" />
            </div>
          )}
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
        </div>

        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={images[currentImageIndex].url || "/placeholder.svg"}
              alt={images[currentImageIndex].alt}
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
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
              index === currentImageIndex ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              onLoadStart={() => setIsLoading({ ...isLoading, [image.id]: true })}
              onLoad={() => handleImageLoad(image.id)}
            />
            {isLoading[image.id] && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                <Skeleton className="h-full w-full" />
              </div>
            )}
            {editable && onRemoveImage && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveImage(image.id)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

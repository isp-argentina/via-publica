"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageFile {
  id: string
  file: File
  preview: string
}

interface MultiImageUploaderProps {
  maxImages?: number
  onImagesChange: (images: ImageFile[]) => void
  className?: string
}

export default function MultiImageUploader({ maxImages = 4, onImagesChange, className }: MultiImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const maxSize = 3 * 1024 * 1024 // 3MB

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `El archivo ${file.name} excede el tamaño máximo de 3MB`,
      }
    }

    if (!file.type.startsWith("image/")) {
      return {
        valid: false,
        error: `El archivo ${file.name} no es una imagen válida`,
      }
    }

    return { valid: true }
  }

  const handleFiles = (files: FileList) => {
    const newImages: ImageFile[] = []
    const errors: string[] = []

    Array.from(files).forEach((file) => {
      if (images.length + newImages.length >= maxImages) {
        errors.push(`Máximo ${maxImages} imágenes permitidas`)
        return
      }

      const validation = validateFile(file)
      if (!validation.valid) {
        errors.push(validation.error!)
        return
      }

      const imageFile: ImageFile = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
      }

      newImages.push(imageFile)
    })

    if (errors.length > 0) {
      toast({
        title: "Error al subir imágenes",
        description: errors.join(", "),
        variant: "destructive",
      })
    }

    if (newImages.length > 0) {
      const updatedImages = [...images, ...newImages]
      setImages(updatedImages)
      onImagesChange(updatedImages)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id)
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview)
    }

    const updatedImages = images.filter((img) => img.id !== id)
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Área de subida */}
        <Card>
          <CardContent className="p-4">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Arrastra y suelta o haz clic para subir imágenes</h3>
                <p className="text-sm text-muted-foreground">
                  Máximo {maxImages} imágenes • JPG, PNG o WebP • Máx. 3MB cada una
                </p>
                <p className="text-xs text-muted-foreground">
                  {images.length} de {maxImages} imágenes subidas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vista previa de imágenes */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  <Image src={image.preview || "/placeholder.svg"} alt="Vista previa" fill className="object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{image.file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

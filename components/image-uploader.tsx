"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { BlobService } from "@/lib/blob-service"

interface ImageUploaderProps {
  clienteId: string
  cartelId?: string
  onUploadComplete?: (imageUrl: string) => void
  onUploadError?: (error: string) => void
  className?: string
}

export default function ImageUploader({
  clienteId,
  cartelId,
  onUploadComplete,
  onUploadError,
  className,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    // Validar el archivo
    const validation = BlobService.validateFile(file)
    if (!validation.valid) {
      toast({
        title: "Error",
        description: validation.error,
        variant: "destructive",
      })
      if (onUploadError) onUploadError(validation.error || "Error de validación")
      return
    }

    // Mostrar vista previa
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Iniciar la subida
    setIsUploading(true)
    setProgress(0)

    try {
      // Crear FormData
      const formData = new FormData()
      formData.append("file", file)
      if (cartelId) formData.append("cartelId", cartelId)

      // Simular progreso (ya que fetch no proporciona progreso real)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Enviar la solicitud
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al subir la imagen")
      }

      setProgress(100)

      // Obtener la URL de la imagen subida
      const data = await response.json()

      // Notificar que la subida se completó
      if (onUploadComplete) onUploadComplete(data.url)

      toast({
        title: "Éxito",
        description: "Imagen subida correctamente",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })

      if (onUploadError) onUploadError(errorMessage)

      // Limpiar la vista previa
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
      setProgress(0)

      // Limpiar el input de archivo
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleCancel = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        {!previewUrl ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <h3 className="text-lg font-medium">Arrastra y suelta o haz clic para subir</h3>
              <p className="text-sm text-muted-foreground">Soporta imágenes JPG, PNG o WebP (máx. 3MB)</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image src={previewUrl || "/placeholder.svg"} alt="Vista previa" fill className="object-cover" />
            </div>
            {isUploading ? (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subiendo...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

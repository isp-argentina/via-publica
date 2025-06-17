"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { BlobService } from "@/lib/blob-service"

interface UseBlobStorageOptions {
  clienteId: string
  cartelId?: string
  onUploadComplete?: (url: string) => void
  onDeleteComplete?: (url: string) => void
  onError?: (error: string) => void
}

export function useBlobStorage({
  clienteId,
  cartelId,
  onUploadComplete,
  onDeleteComplete,
  onError,
}: UseBlobStorageOptions) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadImage = async (file: File, customFilename?: string) => {
    try {
      setIsUploading(true)
      setProgress(0)

      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Subir la imagen
      const result = await BlobService.uploadImage({
        clienteId,
        file,
        filename: customFilename,
        cartelId,
      })

      clearInterval(progressInterval)
      setProgress(100)

      // Notificar éxito
      if (onUploadComplete) onUploadComplete(result.url)

      toast({
        title: "Éxito",
        description: "Imagen subida correctamente",
      })

      return result.url
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })

      if (onError) onError(errorMessage)
      return null
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  const deleteImage = async (url: string) => {
    try {
      setIsDeleting(true)

      // Eliminar la imagen
      await BlobService.deleteImage({ url })

      // Notificar éxito
      if (onDeleteComplete) onDeleteComplete(url)

      toast({
        title: "Éxito",
        description: "Imagen eliminada correctamente",
      })

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })

      if (onError) onError(errorMessage)
      return false
    } finally {
      setIsDeleting(false)
    }
  }

  const listImages = async () => {
    try {
      return await BlobService.listImages({ clienteId, cartelId })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })

      if (onError) onError(errorMessage)
      return []
    }
  }

  return {
    uploadImage,
    deleteImage,
    listImages,
    isUploading,
    isDeleting,
    progress,
  }
}

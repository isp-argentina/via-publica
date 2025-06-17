import { put, del, list, type PutBlobResult } from "@vercel/blob"

// Constantes
const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB en bytes
const ROOT_FOLDER = "via-publica"
const CARTELES_FOLDER = "carteles"

// Tipos
export interface UploadImageOptions {
  clienteId: string
  file: File
  filename?: string
  cartelId?: string
}

export interface DeleteImageOptions {
  url: string
}

export interface ListImagesOptions {
  clienteId: string
  cartelId?: string
}

/**
 * Servicio para manejar operaciones con Vercel Blob
 */
export const BlobService = {
  /**
   * Valida si un archivo cumple con los requisitos
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `El archivo excede el tamaño máximo permitido de 3MB. Tamaño actual: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
      }
    }

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      return {
        valid: false,
        error: "El archivo debe ser una imagen",
      }
    }

    return { valid: true }
  },

  /**
   * Sube una imagen al almacenamiento de Vercel Blob
   */
  async uploadImage({ clienteId, file, filename, cartelId }: UploadImageOptions): Promise<PutBlobResult> {
    // Validar el archivo
    const validation = this.validateFile(file)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // Generar un nombre de archivo único si no se proporciona uno
    const finalFilename = filename || `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    // Construir la ruta de almacenamiento
    let pathname = `${ROOT_FOLDER}/${CARTELES_FOLDER}/${clienteId}`

    // Si se proporciona un ID de cartel, añadirlo a la ruta
    if (cartelId) {
      pathname += `/${cartelId}`
    }

    pathname += `/${finalFilename}`

    // Subir el archivo a Vercel Blob
    return await put(pathname, file, {
      access: "public",
      addRandomSuffix: false, // Usamos nuestro propio sistema de nombres únicos
      contentType: file.type,
    })
  },

  /**
   * Elimina una imagen del almacenamiento de Vercel Blob
   */
  async deleteImage({ url }: DeleteImageOptions): Promise<void> {
    await del(url)
  },

  /**
   * Lista las imágenes de un cliente o cartel específico
   */
  async listImages({ clienteId, cartelId }: ListImagesOptions): Promise<string[]> {
    let prefix = `${ROOT_FOLDER}/${CARTELES_FOLDER}/${clienteId}`

    if (cartelId) {
      prefix += `/${cartelId}`
    }

    const { blobs } = await list({ prefix })
    return blobs.map((blob) => blob.url)
  },
}

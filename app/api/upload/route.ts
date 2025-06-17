import { type NextRequest, NextResponse } from "next/server"
import { BlobService } from "@/lib/blob-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener el ID del cliente (usuario)
    const clienteId = session.user.id

    // Obtener el formulario de datos
    const formData = await request.formData()
    const file = formData.get("file") as File
    const cartelId = formData.get("cartelId") as string

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 })
    }

    // Validar el archivo
    const validation = BlobService.validateFile(file)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Subir la imagen
    const result = await BlobService.uploadImage({
      clienteId,
      file,
      cartelId,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error al subir la imagen:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener la URL de la imagen a eliminar
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No se proporcionó la URL de la imagen" }, { status: 400 })
    }

    // Eliminar la imagen
    await BlobService.deleteImage({ url })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar la imagen:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener el ID del cliente (usuario)
    const clienteId = session.user.id

    // Obtener el ID del cartel (opcional)
    const { searchParams } = new URL(request.url)
    const cartelId = searchParams.get("cartelId")

    // Listar las imágenes
    const images = await BlobService.listImages({
      clienteId,
      cartelId: cartelId || undefined,
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error al listar las imágenes:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

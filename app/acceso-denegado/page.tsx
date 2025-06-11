import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-destructive/10 rounded-full">
              <ShieldAlert className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-8">
            No tienes permisos suficientes para acceder a esta página. Si crees que esto es un error, por favor contacta
            con el administrador.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contacto">Contactar soporte</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


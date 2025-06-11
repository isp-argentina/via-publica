"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="p-4 bg-destructive/10 rounded-full mb-6">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Error crítico</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Ha ocurrido un error crítico en la aplicación. Estamos trabajando para solucionarlo.
          </p>
          <Button onClick={() => reset()}>Intentar nuevamente</Button>
        </div>
      </body>
    </html>
  )
}


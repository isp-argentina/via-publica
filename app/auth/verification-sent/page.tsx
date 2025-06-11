"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import { Mail, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function VerificationSentPage() {
  const { resendVerification, error: authError, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const [error, setError] = useState<string | null>(null)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (!email) {
      router.push("/auth/login")
    }
  }, [email, router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendVerification = async () => {
    if (countdown > 0) return

    setError(null)
    setResendSuccess(false)

    try {
      await resendVerification(email)
      setResendSuccess(true)
      setCountdown(60) // 60 segundos de espera para reenviar
    } catch (err) {
      setError("Error al reenviar el email de verificación")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Verifica tu Email</CardTitle>
            <CardDescription className="text-center">
              Hemos enviado un enlace de verificación a <strong>{email}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación para activar tu cuenta.
            </p>

            {resendSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-600">
                  Hemos enviado un nuevo enlace de verificación a tu email.
                </AlertDescription>
              </Alert>
            )}

            {(error || authError) && (
              <Alert variant="destructive">
                <AlertDescription>{error || authError}</AlertDescription>
              </Alert>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={handleResendVerification}
              disabled={isLoading || countdown > 0}
            >
              {countdown > 0 ? `Reenviar email (${countdown}s)` : "No recibí el email, reenviar"}
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button asChild variant="link" className="w-full">
              <Link href="/auth/login" className="flex items-center justify-center">
                Ir a iniciar sesión
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}


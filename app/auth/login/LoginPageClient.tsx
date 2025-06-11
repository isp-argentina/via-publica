"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import { useEmailValidator, usePhoneValidator, usePasswordValidator } from "@/components/form-validators"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoginPageClient() {
  const { login, error: authError, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("email")
  const [rememberMe, setRememberMe] = useState(false)

  // Validadores
  const {
    email,
    handleChange: handleEmailChange,
    isValid: isEmailValid,
    errorMessage: emailErrorMessage,
  } = useEmailValidator()

  const {
    phone,
    handleChange: handlePhoneChange,
    isValid: isPhoneValid,
    errorMessage: phoneErrorMessage,
  } = usePhoneValidator()

  const {
    password,
    handlePasswordChange,
    isValid: isPasswordValid,
    errorMessage: passwordErrorMessage,
  } = usePasswordValidator()

  const [error, setError] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validar campos
    if (!isEmailValid || !isPasswordValid) {
      setError("Por favor, corrija los errores en el formulario")
      return
    }

    try {
      await login(email, password)
      router.push("/")
    } catch (err) {
      setError("Error al iniciar sesión. Verifique sus credenciales.")
    }
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validar campos
    if (!isPhoneValid || !isPasswordValid) {
      setError("Por favor, corrija los errores en el formulario")
      return
    }

    try {
      // En un caso real, aquí llamaríamos a una función de login con teléfono
      // Por ahora, simulamos un error
      setError("Inicio de sesión con teléfono no implementado")
    } catch (err) {
      setError("Error al iniciar sesión. Verifique sus credenciales.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="telefono">Teléfono</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleEmailLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={handleEmailChange}
                      className={!isEmailValid ? "border-red-500" : ""}
                      required
                    />
                    {!isEmailValid && <p className="text-sm text-red-500">{emailErrorMessage}</p>}
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between space-x-4 pt-2.5">
                      <Label htmlFor="password">Contraseña</Label>
                      <Link href="/auth/reset-password" className="text-sm text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={!isPasswordValid ? "border-red-500" : ""}
                      required
                    />
                    {!isPasswordValid && <p className="text-sm text-red-500">{passwordErrorMessage}</p>}
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Recordarme
                    </Label>
                  </div>

                  {(error || authError) && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error || authError}</AlertDescription>
                    </Alert>
                  )}

                  <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="telefono" className="space-y-4">
                <form onSubmit={handlePhoneLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="1123456789"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={!isPhoneValid ? "border-red-500" : ""}
                      required
                    />
                    {!isPhoneValid && <p className="text-sm text-red-500">{phoneErrorMessage}</p>}
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between space-x-4 pt-2.5">
                      <Label htmlFor="password-phone">Contraseña</Label>
                      <Link href="/auth/reset-password" className="text-sm text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input
                      id="password-phone"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={!isPasswordValid ? "border-red-500" : ""}
                      required
                    />
                    {!isPasswordValid && <p className="text-sm text-red-500">{passwordErrorMessage}</p>}
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="remember-phone"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember-phone" className="text-sm">
                      Recordarme
                    </Label>
                  </div>

                  {(error || authError) && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error || authError}</AlertDescription>
                    </Alert>
                  )}

                  <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">O continuar con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Facebook</Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Regístrate
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}


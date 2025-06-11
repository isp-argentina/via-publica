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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/auth-context"
import { useEmailValidator, usePhoneValidator, usePasswordValidator } from "@/components/form-validators"
import PasswordRequirements from "@/components/password-requirements"
import { SelectableCard } from "@/components/selectable-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { UserRole, ClienteType } from "@/types/auth"
import { User, Building2, Users } from "lucide-react"

export default function RegisterPageClient() {
  const { register, error: authError, isLoading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState<string | null>(null)

  // Datos del paso 1
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)

  // Validadores
  const {
    email,
    handleChange: handleEmailChange,
    isValid: isEmailValid,
    errorMessage: emailError,
  } = useEmailValidator()

  const {
    password,
    confirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    isValid: isPasswordValid,
    isMatchValid: isPasswordMatchValid,
    errorMessage: passwordError,
    matchErrorMessage: passwordMatchError,
  } = usePasswordValidator(true)

  // Datos del paso 2
  const [role, setRole] = useState<UserRole>("usuario")
  const [clienteType, setClienteType] = useState<ClienteType>(null)

  const {
    phone,
    handleChange: handlePhoneChange,
    isValid: isPhoneValid,
    errorMessage: phoneError,
  } = usePhoneValidator()

  // Datos de ubicación
  const [provincia, setProvincia] = useState("")
  const [localidad, setLocalidad] = useState("")

  // Simulación de datos para las opciones de selección
  const provincias = [
    { value: "buenos-aires", label: "Buenos Aires" },
    { value: "caba", label: "Ciudad Autónoma de Buenos Aires" },
    { value: "cordoba", label: "Córdoba" },
    { value: "santa-fe", label: "Santa Fe" },
    { value: "mendoza", label: "Mendoza" },
    { value: "tucuman", label: "Tucumán" },
  ]

  const localidades = {
    "buenos-aires": [
      { value: "la-plata", label: "La Plata" },
      { value: "mar-del-plata", label: "Mar del Plata" },
      { value: "quilmes", label: "Quilmes" },
    ],
    caba: [
      { value: "palermo", label: "Palermo" },
      { value: "recoleta", label: "Recoleta" },
      { value: "belgrano", label: "Belgrano" },
      { value: "microcentro", label: "Microcentro" },
      { value: "san-telmo", label: "San Telmo" },
    ],
    cordoba: [
      { value: "cordoba-capital", label: "Córdoba Capital" },
      { value: "villa-carlos-paz", label: "Villa Carlos Paz" },
      { value: "rio-cuarto", label: "Río Cuarto" },
    ],
    "santa-fe": [
      { value: "rosario", label: "Rosario" },
      { value: "santa-fe-capital", label: "Santa Fe Capital" },
      { value: "venado-tuerto", label: "Venado Tuerto" },
    ],
    mendoza: [
      { value: "mendoza-capital", label: "Mendoza Capital" },
      { value: "godoy-cruz", label: "Godoy Cruz" },
      { value: "san-rafael", label: "San Rafael" },
    ],
    tucuman: [
      { value: "san-miguel", label: "San Miguel de Tucumán" },
      { value: "yerba-buena", label: "Yerba Buena" },
    ],
  }

  // Función para obtener las localidades según la provincia seleccionada
  const getLocalidades = () => {
    if (!provincia) return []
    return localidades[provincia as keyof typeof localidades] || []
  }

  // Función para validar el paso 1
  const validateStep1 = () => {
    if (!firstName.trim()) {
      setError("El nombre es requerido")
      return false
    }

    if (!lastName.trim()) {
      setError("El apellido es requerido")
      return false
    }

    if (!isEmailValid) {
      setError(emailError || "Email inválido")
      return false
    }

    if (!isPasswordValid) {
      setError(passwordError || "Contraseña inválida")
      return false
    }

    if (!isPasswordMatchValid) {
      setError(passwordMatchError || "Las contraseñas no coinciden")
      return false
    }

    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones")
      return false
    }

    return true
  }

  // Función para validar el paso 2
  const validateStep2 = () => {
    if (role === "cliente" && !clienteType) {
      setError("Debes seleccionar si eres cliente particular o agencia")
      return false
    }

    if (!isPhoneValid) {
      setError(phoneError || "Teléfono inválido")
      return false
    }

    if (!provincia) {
      setError("Debes seleccionar una provincia")
      return false
    }

    if (!localidad) {
      setError("Debes seleccionar una localidad")
      return false
    }

    return true
  }

  // Función para avanzar al paso 2
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (validateStep1()) {
      setCurrentStep(2)
    }
  }

  // Función para completar el registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateStep2()) {
      return
    }

    try {
      await register({
        name: `${firstName} ${lastName}`,
        email,
        password,
        role,
        clienteType: role === "cliente" ? clienteType : null,
        phone,
      })

      // Mostrar mensaje de éxito y redirigir
      router.push("/auth/verification-sent?email=" + encodeURIComponent(email))
    } catch (err) {
      setError("Error al registrar el usuario")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Crear una cuenta</CardTitle>
            <CardDescription>
              {currentStep === 1 ? "Completa tus datos personales para registrarte" : "Configura tu tipo de cuenta"}
            </CardDescription>
          </CardHeader>

          {currentStep === 1 ? (
            // Paso 1: Datos personales y credenciales
            <form onSubmit={handleContinue}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nombre</Label>
                    <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Apellido</Label>
                    <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>

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
                  {!isEmailValid && <p className="text-sm text-red-500">{emailError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={!isPasswordValid ? "border-red-500" : ""}
                    required
                  />
                  {!isPasswordValid && <p className="text-sm text-red-500">{passwordError}</p>}
                  <PasswordRequirements password={password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={!isPasswordMatchValid ? "border-red-500" : ""}
                    required
                  />
                  {!isPasswordMatchValid && <p className="text-sm text-red-500">{passwordMatchError}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={acceptMarketing}
                      onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      Deseo recibir novedades y ofertas por email
                    </Label>
                  </div>
                </div>

                {(error || authError) && (
                  <Alert variant="destructive">
                    <AlertDescription>{error || authError}</AlertDescription>
                  </Alert>
                )}

                <Button className="w-full" type="submit" disabled={isLoading}>
                  Continuar
                </Button>
              </CardContent>
            </form>
          ) : (
            // Paso 2: Selección de rol y datos adicionales
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Tipo de cuenta</Label>
                  <div className="grid gap-3">
                    <SelectableCard
                      id="usuario"
                      title="Usuario"
                      description="Busco espacios publicitarios"
                      icon={<User className="h-5 w-5 text-primary" />}
                      selected={role === "usuario"}
                      onClick={() => setRole("usuario")}
                    />
                    <SelectableCard
                      id="cliente"
                      title="Cliente"
                      description="Tengo espacios publicitarios"
                      icon={<Building2 className="h-5 w-5 text-primary" />}
                      selected={role === "cliente"}
                      onClick={() => setRole("cliente")}
                    />
                  </div>
                </div>

                {role === "cliente" && (
                  <div className="space-y-3">
                    <Label>Tipo de cliente</Label>
                    <div className="grid gap-3">
                      <SelectableCard
                        id="dueno"
                        title="Cliente Particular"
                        description="Soy dueño directo de espacios publicitarios"
                        icon={<User className="h-5 w-5 text-primary" />}
                        selected={clienteType === "dueno"}
                        onClick={() => setClienteType("dueno")}
                      />
                      <SelectableCard
                        id="agencia"
                        title="Empresa / Agencia de Publicidad"
                        description="Representamos múltiples espacios publicitarios"
                        icon={<Users className="h-5 w-5 text-primary" />}
                        selected={clienteType === "agencia"}
                        onClick={() => setClienteType("agencia")}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono de contacto</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1123456789"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={!isPhoneValid ? "border-red-500" : ""}
                    required
                  />
                  {!isPhoneValid && <p className="text-sm text-red-500">{phoneError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provincia">Provincia</Label>
                  <Select
                    value={provincia}
                    onValueChange={(value) => {
                      setProvincia(value)
                      setLocalidad("") // Resetear localidad al cambiar provincia
                    }}
                  >
                    <SelectTrigger id="provincia">
                      <SelectValue placeholder="Seleccionar provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      {provincias.map((prov) => (
                        <SelectItem key={prov.value} value={prov.value}>
                          {prov.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="localidad">Localidad</Label>
                  <Select value={localidad} onValueChange={setLocalidad} disabled={!provincia}>
                    <SelectTrigger id="localidad">
                      <SelectValue placeholder="Seleccionar localidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {getLocalidades().map((loc) => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(error || authError) && (
                  <Alert variant="destructive">
                    <AlertDescription>{error || authError}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="sm:flex-1" onClick={() => setCurrentStep(1)} type="button">
                    Volver
                  </Button>
                  <Button className="sm:flex-1" type="submit" disabled={isLoading}>
                    Finalizar Registro
                  </Button>
                </div>
              </CardContent>
            </form>
          )}

          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}


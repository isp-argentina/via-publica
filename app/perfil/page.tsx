"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { useEmailValidator, usePhoneValidator } from "@/components/form-validators"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { User, Calendar } from "lucide-react"

export default function PerfilPage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Estados para los campos editables
  const [firstName, setFirstName] = useState(user?.name.split(" ")[0] || "")
  const [lastName, setLastName] = useState(user?.name.split(" ").slice(1).join(" ") || "")
  const [provincia, setProvincia] = useState("")
  const [localidad, setLocalidad] = useState("")
  const [bio, setBio] = useState("")

  // Validadores
  const {
    email,
    setEmail,
    handleChange: handleEmailChange,
    isValid: isEmailValid,
    errorMessage: emailError,
  } = useEmailValidator()

  const {
    phone,
    setPhone,
    handleChange: handlePhoneChange,
    isValid: isPhoneValid,
    errorMessage: phoneError,
  } = usePhoneValidator()

  // Inicializar valores cuando el usuario esté disponible
  useState(() => {
    if (user) {
      setEmail(user.email)
      setPhone(user.phone || "")
    }
  })

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

  const getLocalidades = () => {
    if (!provincia) return []
    return localidades[provincia as keyof typeof localidades] || []
  }

  const handleSave = async () => {
    if (!isEmailValid || !isPhoneValid) {
      toast({
        title: "Error",
        description: "Por favor, corrige los errores en el formulario",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      // Aquí iría la lógica para actualizar el perfil en el backend
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulación

      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido guardados correctamente",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Restaurar valores originales
    if (user) {
      setFirstName(user.name.split(" ")[0] || "")
      setLastName(user.name.split(" ").slice(1).join(" ") || "")
      setEmail(user.email)
      setPhone(user.phone || "")
    }
    setIsEditing(false)
  }

  if (!user) {
    return (
      <ProtectedRoute requiredPermission="canViewCatalog">
        <div>Cargando...</div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredPermission="canViewCatalog">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Mi Perfil</h1>
              <p className="text-muted-foreground mt-2">Gestiona tu información personal y preferencias de cuenta</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Información Personal
                      </CardTitle>
                      <CardDescription>Actualiza tus datos personales y de contacto</CardDescription>
                    </div>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Editar
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      disabled={!isEditing}
                      className={!isEmailValid && isEditing ? "border-red-500" : ""}
                    />
                    {!isEmailValid && isEditing && <p className="text-sm text-red-500">{emailError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      disabled={!isEditing}
                      className={!isPhoneValid && isEditing ? "border-red-500" : ""}
                    />
                    {!isPhoneValid && isEditing && <p className="text-sm text-red-500">{phoneError}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provincia">Provincia</Label>
                      <Select value={provincia} onValueChange={setProvincia} disabled={!isEditing}>
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
                      <Select value={localidad} onValueChange={setLocalidad} disabled={!isEditing || !provincia}>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía (opcional)</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Cuéntanos un poco sobre ti..."
                      rows={3}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar Cambios"}
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Información de la Cuenta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Tipo de Usuario</Label>
                      <p className="text-sm text-muted-foreground">
                        {user.role === "usuario"
                          ? "Usuario Estándar"
                          : user.role === "cliente"
                            ? user.clienteType === "dueno"
                              ? "Propietario de Espacios"
                              : "Agencia de Publicidad"
                            : "Administrador"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Miembro desde</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("es-AR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Estado del Email</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.emailVerified ? "✅ Verificado" : "⚠️ Pendiente de verificación"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

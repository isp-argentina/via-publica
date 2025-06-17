"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { Building2, Upload, Shield, CheckCircle, Info, Crown } from "lucide-react"

export default function MiAgenciaPage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [agencyName, setAgencyName] = useState("Agencia Suarez SA")
  const [agencyDescription, setAgencyDescription] = useState("")
  const [agencyLogo, setAgencyLogo] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "La imagen debe ser menor a 2MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setAgencyLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Aquí iría la lógica para actualizar los datos de la agencia
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Datos actualizados",
        description: "La información de tu agencia ha sido guardada correctamente",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la información",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleRequestVerification = () => {
    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud de verificación ha sido enviada. Te contactaremos pronto.",
    })
  }

  return (
    <ProtectedRoute requiredPermission="canPublishBillboards">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Building2 className="h-8 w-8" />
                Mi Agencia
              </h1>
              <p className="text-muted-foreground mt-2">
                Gestiona la información de tu agencia y mejora tu presencia profesional
              </p>
            </div>

            {/* Alerta de funcionalidad premium */}
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <Crown className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Próximamente:</strong> Esta funcionalidad estará disponible únicamente en el Plan Agencia.
                ¡Aprovecha el acceso gratuito mientras dure!
              </AlertDescription>
            </Alert>

            <div className="grid gap-6">
              {/* Información de la Agencia */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Información de la Agencia
                        {isVerified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Verificada
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>Esta información aparecerá en todos tus carteles publicados</CardDescription>
                    </div>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Editar
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo de la Agencia */}
                  <div className="space-y-4">
                    <Label>Logo de la Agencia</Label>
                    <div className="flex items-center gap-4">
                      {agencyLogo ? (
                        <div className="relative">
                          <img
                            src={agencyLogo || "/placeholder.svg"}
                            alt="Logo de la agencia"
                            className="w-20 h-20 rounded-lg object-cover border"
                          />
                          {isEditing && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => setAgencyLogo(null)}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      {isEditing && (
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                            id="logo-upload"
                          />
                          <Label htmlFor="logo-upload" className="cursor-pointer">
                            <Button variant="outline" asChild>
                              <span>Subir Logo</span>
                            </Button>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">Máximo 2MB. Formatos: JPG, PNG, GIF</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nombre de la Agencia */}
                  <div className="space-y-2">
                    <Label htmlFor="agencyName">Nombre de la Agencia</Label>
                    <Input
                      id="agencyName"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Ej: Agencia Suarez SA"
                    />
                    <p className="text-xs text-muted-foreground">
                      Este nombre aparecerá en lugar de tu nombre personal en todos los carteles
                    </p>
                  </div>

                  {/* Descripción */}
                  <div className="space-y-2">
                    <Label htmlFor="agencyDescription">Descripción (opcional)</Label>
                    <Textarea
                      id="agencyDescription"
                      value={agencyDescription}
                      onChange={(e) => setAgencyDescription(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Describe tu agencia y servicios..."
                      rows={3}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar Cambios"}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Verificación de Agencia */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verificación de Agencia
                  </CardTitle>
                  <CardDescription>
                    Obtén la insignia de "Agencia Verificada" para generar más confianza
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isVerified ? (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Beneficios de la Verificación:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Insignia de "Agencia Verificada" en todos tus carteles</li>
                          <li>• Mayor confianza de los usuarios</li>
                          <li>• Prioridad en los resultados de búsqueda</li>
                          <li>• Acceso a estadísticas avanzadas</li>
                        </ul>
                      </div>
                      <Button onClick={handleRequestVerification} className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Solicitar Verificación
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        El proceso de verificación puede tomar de 3 a 5 días hábiles
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-800">¡Agencia Verificada!</h3>
                      <p className="text-green-600">Tu agencia ha sido verificada exitosamente</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Información Actual del Usuario */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Vista Previa
                  </CardTitle>
                  <CardDescription>Así aparecerá tu información en los carteles publicados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                    {agencyLogo ? (
                      <img
                        src={agencyLogo || "/placeholder.svg"}
                        alt="Logo"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{agencyName}</p>
                      {isVerified && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verificada
                        </Badge>
                      )}
                      {agencyDescription && <p className="text-sm text-muted-foreground mt-1">{agencyDescription}</p>}
                    </div>
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

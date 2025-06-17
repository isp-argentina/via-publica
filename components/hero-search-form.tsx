"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function HeroSearchForm() {
  const router = useRouter()
  const [provincia, setProvincia] = useState<string>("")
  const [localidad, setLocalidad] = useState<string>("")
  const [tipoEstructura, setTipoEstructura] = useState<string>("")

  // Simulación de datos para las opciones de selección
  const provincias = [
    { value: "buenos-aires", label: "Buenos Aires" },
    { value: "caba", label: "Ciudad Autónoma de Buenos Aires" },
    { value: "cordoba", label: "Córdoba" },
    { value: "santa-fe", label: "Santa Fe" },
    { value: "mendoza", label: "Mendoza" },
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
  }

  const tiposEstructura = [
    { value: "cartel-frontal", label: "Cartel Frontal" },
    { value: "cartel-columna", label: "Cartel Columna" },
    { value: "pantalla-led", label: "Pantalla LED" },
    { value: "valla", label: "Valla Publicitaria" },
    { value: "marquesina", label: "Marquesina" },
    { value: "toldo", label: "Toldo/Awning" },
  ]

  // Función para obtener las localidades según la provincia seleccionada
  const getLocalidades = () => {
    if (!provincia) return []
    return localidades[provincia as keyof typeof localidades] || []
  }

  // Función para manejar la búsqueda
  const handleSearch = () => {
    // Construir los parámetros de búsqueda
    const params = new URLSearchParams()

    if (provincia) params.append("provincia", provincia)
    if (localidad) params.append("localidad", localidad)
    if (tipoEstructura) params.append("tipo", tipoEstructura)

    // Redirigir al catálogo con los filtros aplicados
    router.push(`/catalogo?${params.toString()}`)
  }

  return (
    <Card className="w-full max-w-4xl shadow-lg border-2 border-primary/10 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="provincia" className="text-sm font-medium text-left block">
              Provincia
            </label>
            <Select value={provincia} onValueChange={setProvincia}>
              <SelectTrigger id="provincia" aria-label="Seleccionar provincia">
                <SelectValue placeholder="Seleccionar" />
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
            <label htmlFor="localidad" className="text-sm font-medium text-left block">
              Localidad
            </label>
            <Select value={localidad} onValueChange={setLocalidad} disabled={!provincia}>
              <SelectTrigger id="localidad" aria-label="Seleccionar localidad">
                <SelectValue placeholder="Seleccionar" />
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

          <div className="space-y-2">
            <label htmlFor="tipo-estructura" className="text-sm font-medium text-left block">
              Tipo de Estructura
            </label>
            <Select value={tipoEstructura} onValueChange={setTipoEstructura}>
              <SelectTrigger id="tipo-estructura" aria-label="Seleccionar tipo de estructura">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {tiposEstructura.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button className="w-full h-10" onClick={handleSearch} size="lg">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

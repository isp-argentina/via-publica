"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BillboardFiltersProps {
  initialFilters?: {
    provincia?: string
    localidad?: string
    tipo?: string
  }
}

export default function BillboardFilters({ initialFilters }: BillboardFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 300000])
  const [sizeRange, setSizeRange] = useState([0, 50])
  const [provincia, setProvincia] = useState(initialFilters?.provincia || "")
  const [localidad, setLocalidad] = useState(initialFilters?.localidad || "")

  // Tipos de estructura como checkboxes
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>(() => {
    if (initialFilters?.tipo) {
      return [initialFilters.tipo]
    }
    return []
  })

  // Características como checkboxes
  const [caracteristicas, setCaracteristicas] = useState<string[]>([])

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

  // Manejar cambio en tipos de estructura
  const handleTipoChange = (tipo: string, checked: boolean) => {
    if (checked) {
      setTiposSeleccionados([...tiposSeleccionados, tipo])
    } else {
      setTiposSeleccionados(tiposSeleccionados.filter((t) => t !== tipo))
    }
  }

  // Manejar cambio en características
  const handleCaracteristicaChange = (caracteristica: string, checked: boolean) => {
    if (checked) {
      setCaracteristicas([...caracteristicas, caracteristica])
    } else {
      setCaracteristicas(caracteristicas.filter((c) => c !== caracteristica))
    }
  }

  // Aplicar filtros
  const aplicarFiltros = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Actualizar parámetros
    if (provincia) params.set("provincia", provincia)
    else params.delete("provincia")

    if (localidad) params.set("localidad", localidad)
    else params.delete("localidad")

    if (tiposSeleccionados.length === 1) {
      params.set("tipo", tiposSeleccionados[0])
    } else if (tiposSeleccionados.length > 1) {
      params.set("tipos", tiposSeleccionados.join(","))
    } else {
      params.delete("tipo")
      params.delete("tipos")
    }

    if (caracteristicas.length > 0) {
      params.set("caracteristicas", caracteristicas.join(","))
    } else {
      params.delete("caracteristicas")
    }

    params.set("precioMin", priceRange[0].toString())
    params.set("precioMax", priceRange[1].toString())

    params.set("tamanoMin", sizeRange[0].toString())
    params.set("tamanoMax", sizeRange[1].toString())

    // Redirigir con los filtros aplicados
    router.push(`/catalogo?${params.toString()}`)
  }

  // Limpiar filtros
  const limpiarFiltros = () => {
    setProvincia("")
    setLocalidad("")
    setTiposSeleccionados([])
    setCaracteristicas([])
    setPriceRange([0, 300000])
    setSizeRange([0, 50])

    router.push("/catalogo")
  }

  // Efecto para actualizar localidad cuando cambia la provincia
  useEffect(() => {
    setLocalidad("")
  }, [provincia])

  return (
    <div className="bg-card border rounded-lg p-4 sticky top-20">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>

      <Accordion type="multiple" defaultValue={["ubicacion", "tipo", "precio", "tamano", "caracteristicas"]}>
        <AccordionItem value="ubicacion">
          <AccordionTrigger>Ubicación</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia</Label>
                <Select value={provincia} onValueChange={setProvincia}>
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
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tipo">
          <AccordionTrigger>Tipo de Estructura</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="carteles"
                  checked={tiposSeleccionados.includes("cartel-frontal")}
                  onCheckedChange={(checked) => handleTipoChange("cartel-frontal", checked as boolean)}
                />
                <Label htmlFor="carteles">Carteles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pantallas"
                  checked={tiposSeleccionados.includes("pantalla-led")}
                  onCheckedChange={(checked) => handleTipoChange("pantalla-led", checked as boolean)}
                />
                <Label htmlFor="pantallas">Pantallas LED</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marquesinas"
                  checked={tiposSeleccionados.includes("marquesina")}
                  onCheckedChange={(checked) => handleTipoChange("marquesina", checked as boolean)}
                />
                <Label htmlFor="marquesinas">Marquesinas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vallas"
                  checked={tiposSeleccionados.includes("valla")}
                  onCheckedChange={(checked) => handleTipoChange("valla", checked as boolean)}
                />
                <Label htmlFor="vallas">Vallas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="columnas"
                  checked={tiposSeleccionados.includes("cartel-columna")}
                  onCheckedChange={(checked) => handleTipoChange("cartel-columna", checked as boolean)}
                />
                <Label htmlFor="columnas">Columnas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="frontales"
                  checked={tiposSeleccionados.includes("frontal")}
                  onCheckedChange={(checked) => handleTipoChange("frontal", checked as boolean)}
                />
                <Label htmlFor="frontales">Frontales</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="toldos"
                  checked={tiposSeleccionados.includes("toldo")}
                  onCheckedChange={(checked) => handleTipoChange("toldo", checked as boolean)}
                />
                <Label htmlFor="toldos">Toldos y Awnings</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precio">
          <AccordionTrigger>Precio Estimado</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 300000]}
                max={300000}
                step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <div className="border rounded px-2 py-1 text-sm">${priceRange[0].toLocaleString()}</div>
                <div className="border rounded px-2 py-1 text-sm">${priceRange[1].toLocaleString()}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tamano">
          <AccordionTrigger>Tamaño (m²)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 50]} max={50} step={1} value={sizeRange} onValueChange={setSizeRange} />
              <div className="flex items-center justify-between">
                <div className="border rounded px-2 py-1 text-sm">{sizeRange[0]} m²</div>
                <div className="border rounded px-2 py-1 text-sm">{sizeRange[1]} m²</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="caracteristicas">
          <AccordionTrigger>Características</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="iluminacion"
                  checked={caracteristicas.includes("iluminacion")}
                  onCheckedChange={(checked) => handleCaracteristicaChange("iluminacion", checked as boolean)}
                />
                <Label htmlFor="iluminacion">Iluminación LED</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alta-visibilidad"
                  checked={caracteristicas.includes("alta-visibilidad")}
                  onCheckedChange={(checked) => handleCaracteristicaChange("alta-visibilidad", checked as boolean)}
                />
                <Label htmlFor="alta-visibilidad">Alta Visibilidad</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="digital"
                  checked={caracteristicas.includes("digital")}
                  onCheckedChange={(checked) => handleCaracteristicaChange("digital", checked as boolean)}
                />
                <Label htmlFor="digital">Digital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interactivo"
                  checked={caracteristicas.includes("interactivo")}
                  onCheckedChange={(checked) => handleCaracteristicaChange("interactivo", checked as boolean)}
                />
                <Label htmlFor="interactivo">Interactivo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="doble-faz"
                  checked={caracteristicas.includes("doble-faz")}
                  onCheckedChange={(checked) => handleCaracteristicaChange("doble-faz", checked as boolean)}
                />
                <Label htmlFor="doble-faz">Doble Faz</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-2">
        <Button className="w-full" onClick={aplicarFiltros}>
          Aplicar Filtros
        </Button>
        <Button variant="outline" className="w-full" onClick={limpiarFiltros}>
          Limpiar Filtros
        </Button>
      </div>
    </div>
  )
}

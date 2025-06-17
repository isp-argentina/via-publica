"use client"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface CaracteristicaOption {
  id: string
  label: string
  description?: string
}

interface CaracteristicasSelectorProps {
  caracteristicas: CaracteristicaOption[]
  selectedCaracteristicas: string[]
  onSelectionChange: (selected: string[]) => void
  className?: string
}

export default function CaracteristicasSelector({
  caracteristicas,
  selectedCaracteristicas,
  onSelectionChange,
  className,
}: CaracteristicasSelectorProps) {
  const handleToggle = (caracteristicaId: string) => {
    const newSelection = selectedCaracteristicas.includes(caracteristicaId)
      ? selectedCaracteristicas.filter((id) => id !== caracteristicaId)
      : [...selectedCaracteristicas, caracteristicaId]

    onSelectionChange(newSelection)
  }

  return (
    <div className={className}>
      <Label className="text-base font-medium">Características</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        {caracteristicas.map((caracteristica) => (
          <div key={caracteristica.id} className="flex items-start space-x-2">
            <Checkbox
              id={caracteristica.id}
              checked={selectedCaracteristicas.includes(caracteristica.id)}
              onCheckedChange={() => handleToggle(caracteristica.id)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor={caracteristica.id}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {caracteristica.label}
              </Label>
              {caracteristica.description && (
                <p className="text-xs text-muted-foreground">{caracteristica.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

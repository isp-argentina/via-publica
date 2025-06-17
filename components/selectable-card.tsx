"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface SelectableCardProps {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  selected: boolean
  onClick: () => void
  className?: string
}

export function SelectableCard({ id, title, description, icon, selected, onClick, className }: SelectableCardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer rounded-lg border-2 p-4 transition-all",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-muted bg-background hover:border-muted/80 hover:bg-muted/10",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {icon && <div className="mt-1">{icon}</div>}
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border",
            selected ? "border-primary bg-primary text-primary-foreground" : "border-muted",
          )}
        >
          {selected && <Check className="h-3 w-3" />}
        </div>
      </div>
    </div>
  )
}

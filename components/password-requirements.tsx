import { Check, X } from "lucide-react"

interface PasswordRequirementsProps {
  password: string
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  // Validaciones individuales
  const validations = [
    { test: password.length >= 8, text: "Al menos 8 caracteres" },
    { test: /[A-Z]/.test(password), text: "Al menos una letra mayúscula" },
    { test: /[a-z]/.test(password), text: "Al menos una letra minúscula" },
    { test: /\d/.test(password), text: "Al menos un número" },
    { test: /[@$!%*?&]/.test(password), text: "Al menos un carácter especial (@$!%*?&)" },
  ]

  return (
    <div className="mt-2 text-sm">
      <p className="font-medium mb-1">La contraseña debe tener:</p>
      <ul className="space-y-1">
        {validations.map((validation, index) => (
          <li key={index} className="flex items-center gap-2">
            {validation.test ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
            <span className={validation.test ? "text-green-600" : "text-muted-foreground"}>{validation.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

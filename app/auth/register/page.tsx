import type { Metadata } from "next"
import RegisterPageClient from "./RegisterPageClient"

export const metadata: Metadata = {
  title: "Registro | Vía Pública",
  description: "Crea una cuenta en Vía Pública",
}

export default function RegisterPage() {
  return <RegisterPageClient />
}

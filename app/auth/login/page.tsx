import type { Metadata } from "next"
import LoginPageClient from "./LoginPageClient"

export const metadata: Metadata = {
  title: "Iniciar Sesión | Vía Pública",
  description: "Accede a tu cuenta en Vía Pública",
}

export default function LoginPage() {
  return <LoginPageClient />
}

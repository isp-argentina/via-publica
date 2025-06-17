"use client"

import { useAuth } from "@/context/auth-context"
import type { RolePermissions } from "@/types/auth"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  requiredPermission: keyof RolePermissions
  fallbackPath?: string
}

export default function ProtectedRoute({
  children,
  requiredPermission,
  fallbackPath = "/auth/login",
}: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(fallbackPath)
    } else if (!isLoading && user && !hasPermission(requiredPermission)) {
      router.push("/acceso-denegado")
    }
  }, [user, isLoading, hasPermission, requiredPermission, router, fallbackPath])

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (!user || !hasPermission(requiredPermission)) {
    return null
  }

  return <>{children}</>
}

"use client"

import { useAuth } from "@/context/auth-context"
import { usePermissions } from "@/hooks/use-permissions"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Settings, FileText, MessageSquare, PlusCircle, LayoutDashboard } from "lucide-react"

export default function UserAccountNav() {
  const { user, logout } = useAuth()
  const permissions = usePermissions()

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" asChild>
          <Link href="/auth/login">Iniciar Sesión</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/register">Registrarse</Link>
        </Button>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/perfil">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>

          {permissions.canSaveFavorites && (
            <DropdownMenuItem asChild>
              <Link href="/favoritos">
                <FileText className="mr-2 h-4 w-4" />
                <span>Mis Favoritos</span>
              </Link>
            </DropdownMenuItem>
          )}

          {permissions.canPublishBillboards && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/mis-espacios">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Mis Espacios</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/publicar-espacio">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Publicar Espacio</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {permissions.canViewInquiries && (
            <DropdownMenuItem asChild>
              <Link href="/consultas">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Consultas Recibidas</span>
              </Link>
            </DropdownMenuItem>
          )}

          {permissions.canAccessAdminPanel && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Settings className="mr-2 h-4 w-4" />
                <span>Panel de Administración</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


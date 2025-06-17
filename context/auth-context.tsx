"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type AuthState,
  type User,
  type UserRole,
  type ClienteType,
  ROLE_PERMISSIONS,
  type RolePermissions,
} from "@/types/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    name: string
    email: string
    password: string
    role: UserRole
    clienteType?: ClienteType
    phone?: string
  }) => Promise<void>
  logout: () => void
  hasPermission: (permission: keyof RolePermissions) => boolean
  verifyEmail: (token: string) => Promise<void>
  resendVerification: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    // Aquí cargaríamos el usuario desde localStorage o una cookie al iniciar la app
    const loadUser = async () => {
      try {
        // Simulación de carga de usuario desde localStorage
        const savedUser = localStorage.getItem("viapublica_user")

        if (savedUser) {
          const user = JSON.parse(savedUser) as User
          setAuthState({
            user,
            isLoading: false,
            error: null,
          })
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: "Error al cargar la sesión",
        })
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setAuthState({ ...authState, isLoading: true, error: null })

    try {
      // Usuarios de prueba con diferentes roles
      const testUsers = {
        "usuario@test.com": {
          id: "user-123",
          name: "Ana García",
          email: "usuario@test.com",
          role: "usuario" as UserRole,
          emailVerified: true,
          createdAt: new Date(),
        },
        "cliente@test.com": {
          id: "client-456",
          name: "Carlos Mendoza",
          email: "cliente@test.com",
          role: "cliente" as UserRole,
          clienteType: "dueno" as ClienteType,
          phone: "+54 11 1234-5678",
          emailVerified: true,
          createdAt: new Date(),
        },
        "agencia@test.com": {
          id: "agency-789",
          name: "María López",
          email: "agencia@test.com",
          role: "cliente" as UserRole,
          clienteType: "agencia" as ClienteType,
          phone: "+54 11 9876-5432",
          emailVerified: true,
          createdAt: new Date(),
        },
        "admin@test.com": {
          id: "admin-999",
          name: "Roberto Admin",
          email: "admin@test.com",
          role: "administrador" as UserRole,
          phone: "+54 11 5555-5555",
          emailVerified: true,
          createdAt: new Date(),
        },
      }

      // Verificar si es un usuario de prueba
      const testUser = testUsers[email as keyof typeof testUsers]

      if (testUser && password === "Test123!") {
        // Guardar en localStorage
        localStorage.setItem("viapublica_user", JSON.stringify(testUser))

        setAuthState({
          user: testUser,
          isLoading: false,
          error: null,
        })
      } else {
        // Credenciales incorrectas
        setAuthState({
          ...authState,
          isLoading: false,
          error: "Credenciales incorrectas",
        })
      }
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "Error al iniciar sesión",
      })
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    role: UserRole
    clienteType?: ClienteType
    phone?: string
  }) => {
    setAuthState({ ...authState, isLoading: true, error: null })

    try {
      // Aquí iría la lógica real de registro con el backend
      // Por ahora, simulamos una respuesta exitosa

      // Simulación de respuesta del servidor
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        clienteType: userData.clienteType,
        phone: userData.phone,
        emailVerified: false, // Por defecto, el email no está verificado
        createdAt: new Date(),
      }

      // En un entorno real, aquí enviaríamos el email de verificación

      // No guardamos en localStorage hasta que el email esté verificado
      // Solo simulamos el registro exitoso

      setAuthState({
        user: null, // No iniciamos sesión automáticamente
        isLoading: false,
        error: null,
      })

      return Promise.resolve()
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "Error al registrar el usuario",
      })
      return Promise.reject(error)
    }
  }

  const verifyEmail = async (token: string) => {
    setAuthState({ ...authState, isLoading: true, error: null })

    try {
      // Aquí iría la lógica real de verificación de email con el backend
      // Por ahora, simulamos una respuesta exitosa

      // Simulación: el token es válido
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      })

      return Promise.resolve()
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "Error al verificar el email",
      })
      return Promise.reject(error)
    }
  }

  const resendVerification = async (email: string) => {
    setAuthState({ ...authState, isLoading: true, error: null })

    try {
      // Aquí iría la lógica real de reenvío de verificación con el backend
      // Por ahora, simulamos una respuesta exitosa

      setAuthState({
        ...authState,
        isLoading: false,
        error: null,
      })

      return Promise.resolve()
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "Error al reenviar la verificación",
      })
      return Promise.reject(error)
    }
  }

  const logout = () => {
    // Eliminar del localStorage
    localStorage.removeItem("viapublica_user")

    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    })
  }

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!authState.user) return false

    const userRole = authState.user.role
    return ROLE_PERMISSIONS[userRole][permission]
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        hasPermission,
        verifyEmail,
        resendVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

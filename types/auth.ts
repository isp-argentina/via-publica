export type UserRole = "usuario" | "cliente" | "administrador"
export type ClienteType = "dueno" | "agencia" | null

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  clienteType?: ClienteType
  phone?: string
  emailVerified: boolean
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface RolePermissions {
  canViewCatalog: boolean
  canSaveFavorites: boolean
  canContactOwners: boolean
  canPublishBillboards: boolean
  canEditBillboards: boolean
  canViewInquiries: boolean
  canManageUsers: boolean
  canManageRoles: boolean
  canAccessAdminPanel: boolean
  canViewStatistics: boolean
  canManageAvailability: boolean
  canDefinePricing: boolean
  canAuditMessages: boolean
  canViewGlobalMetrics: boolean
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  usuario: {
    canViewCatalog: true,
    canSaveFavorites: true,
    canContactOwners: true,
    canPublishBillboards: false,
    canEditBillboards: false,
    canViewInquiries: false,
    canManageUsers: false,
    canManageRoles: false,
    canAccessAdminPanel: false,
    canViewStatistics: false,
    canManageAvailability: false,
    canDefinePricing: false,
    canAuditMessages: false,
    canViewGlobalMetrics: false,
  },
  cliente: {
    canViewCatalog: true,
    canSaveFavorites: true,
    canContactOwners: true,
    canPublishBillboards: true,
    canEditBillboards: true,
    canViewInquiries: true,
    canManageUsers: false,
    canManageRoles: false,
    canAccessAdminPanel: false,
    canViewStatistics: true,
    canManageAvailability: true,
    canDefinePricing: true,
    canAuditMessages: false,
    canViewGlobalMetrics: false,
  },
  administrador: {
    canViewCatalog: true,
    canSaveFavorites: true,
    canContactOwners: true,
    canPublishBillboards: true,
    canEditBillboards: true,
    canViewInquiries: true,
    canManageUsers: true,
    canManageRoles: true,
    canAccessAdminPanel: true,
    canViewStatistics: true,
    canManageAvailability: true,
    canDefinePricing: true,
    canAuditMessages: true,
    canViewGlobalMetrics: true,
  },
}

// Validación de contraseña
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const passwordRequirements = [
  "Al menos 8 caracteres",
  "Al menos una letra mayúscula",
  "Al menos una letra minúscula",
  "Al menos un número",
  "Al menos un carácter especial (@$!%*?&)",
]

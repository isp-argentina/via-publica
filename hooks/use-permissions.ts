"use client"

import { useAuth } from "@/context/auth-context"

export function usePermissions() {
  const { hasPermission } = useAuth()

  return {
    canViewCatalog: hasPermission("canViewCatalog"),
    canSaveFavorites: hasPermission("canSaveFavorites"),
    canContactOwners: hasPermission("canContactOwners"),
    canPublishBillboards: hasPermission("canPublishBillboards"),
    canEditBillboards: hasPermission("canEditBillboards"),
    canViewInquiries: hasPermission("canViewInquiries"),
    canManageUsers: hasPermission("canManageUsers"),
    canManageRoles: hasPermission("canManageRoles"),
    canAccessAdminPanel: hasPermission("canAccessAdminPanel"),
  }
}


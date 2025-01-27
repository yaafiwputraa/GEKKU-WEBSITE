"use client"

import { useRequireAuth } from "@/lib/auth/auth-utils"

interface ProtectedProps {
  children: React.ReactNode
}

export function Protected({ children }: ProtectedProps) {
  const isAuthenticated = useRequireAuth()

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
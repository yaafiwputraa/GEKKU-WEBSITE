// lib/types/auth.ts
export type Role = 'SUPERADMIN' | 'ADMIN' | 'CUSTOMER'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  image?: string
  address?: string
  phone?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}
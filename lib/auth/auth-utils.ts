"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useRequireAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirect=" + window.location.pathname)
    }
  }, [status, router])

  return status === "authenticated"
}

export function useRequireAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN") {
      router.push("/")
    }
  }, [status, session, router])

  return status === "authenticated" && (session?.user?.role === "ADMIN" || session?.user?.role === "SUPERADMIN")
}


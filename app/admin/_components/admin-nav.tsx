"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from "lucide-react"

const adminRoutes = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
    superadminOnly: true,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="grid items-start gap-2">
      <div className="grid gap-1 px-2">
        {adminRoutes.map((route) => {
          const Icon = route.icon

          if (route.superadminOnly && session?.user?.role !== "SUPERADMIN") {
            return null
          }

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`
                flex items-center gap-2 px-3 py-2 text-sm font-light rounded-md transition-colors
                ${pathname === route.href ? "bg-secondary" : "hover:bg-secondary/50"}
              `}
            >
              <Icon className="h-4 w-4" />
              {route.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}


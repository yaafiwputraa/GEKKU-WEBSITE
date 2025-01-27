import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <nav className="grid items-start gap-2">
            <h2 className="text-lg font-semibold tracking-tight">Admin Dashboard</h2>
            <div className="grid gap-1 pt-2">
              <a href="/admin" className="text-sm font-light hover:underline">
                Overview
              </a>
              <a href="/admin/products" className="text-sm font-light hover:underline">
                Products
              </a>
              <a href="/admin/orders" className="text-sm font-light hover:underline">
                Orders
              </a>
              {session.user.role === "SUPERADMIN" && (
                <a href="/admin/users" className="text-sm font-light hover:underline">
                  Users
                </a>
              )}
            </div>
          </nav>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}


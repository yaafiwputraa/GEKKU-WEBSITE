"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Menu, Search, ShoppingCart, User, Heart, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart/cart-sheet"
import { UserMenu } from "./user-menu"

export function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPERADMIN"

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        if (currentScrollY > 100) {
          setVisible(false)
        }
      } else {
        setVisible(true)
      }

      setScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-gray-900/95 backdrop-blur-sm" : "bg-transparent"}`}
    >
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>GEKKU</SheetTitle>
              <SheetDescription>Navigation Menu</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              <Link href="/" className="text-sm font-light">
                Home
              </Link>
              <Link href="/products" className="text-sm font-light">
                Products
              </Link>
              <Link href="/about" className="text-sm font-light">
                About
              </Link>
              {status === "authenticated" && (
                <>
                  <Link href="/wishlist" className="text-sm font-light">
                    Wishlist
                  </Link>
                  <Link href="/orders" className="text-sm font-light">
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="text-sm font-light">
                      Admin Dashboard
                    </Link>
                  )}
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="ml-4 lg:ml-0">
          <img src="/gekkuid.webp" alt="GEKKU" className="h-12 w-12" />
        </Link>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden lg:block">
          <Link
            href="/"
            className={`text-sm font-light transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-sm font-light transition-colors hover:text-primary ${
              pathname === "/products" ? "text-primary" : "text-white"
            }`}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`text-sm font-light transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-white"
            }`}
          >
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          {status === "authenticated" && (
            <>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="text-white">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>
              <CartSheet />
            </>
          )}
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
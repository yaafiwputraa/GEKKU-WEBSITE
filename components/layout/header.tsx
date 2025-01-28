"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Menu, Search, ShoppingCart, User, Heart, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  const isHomePage = pathname === "/"

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

  const textColorClass = isHomePage ? "text-white" : "text-gray-800"
  const bgColorClass = isHomePage 
    ? (scrolled ? "bg-gray-900/95 backdrop-blur-sm" : "bg-transparent")
    : (scrolled ? "bg-white/95 backdrop-blur-sm" : "bg-white")

  const getLinkClass = (path: string) => {
    const isActive = pathname === path
    return `text-sm font-light transition-colors relative
    ${isActive 
      ? "text-[#fc3003]" 
      : isHomePage ? "text-white hover:text-white/70" : "text-gray-800 hover:text-[#fc3003]"}
    before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 
    before:bg-[#fc3003] before:transition-all before:duration-300 hover:before:w-full`
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${bgColorClass}`}
    >
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className={`h-6 w-6 ${textColorClass}`} />
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
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/products" className={getLinkClass("/products")}>
            Products
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className={textColorClass}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          {status === "authenticated" && (
            <>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className={textColorClass}>
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>
              <CartSheet />
            </>
          )}
          <UserMenu isHomePage={isHomePage} />
        </div>
      </div>
    </header>
  )
}
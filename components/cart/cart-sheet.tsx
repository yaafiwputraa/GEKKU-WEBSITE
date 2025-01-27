"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"
import type { CartItem } from "@/lib/types/product"
import { CartItemCard } from "./cart-item-card"

export function CartSheet() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  useEffect(() => {
    async function fetchCartItems() {
      if (!session?.user) return

      try {
        const response = await fetch("/api/cart")
        if (!response.ok) throw new Error()
        const items = await response.json()
        setCartItems(items)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load cart items.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartItems()
  }, [session])

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      })

      if (!response.ok) throw new Error()

      const updatedItem = await response.json()
      setCartItems((items) =>
        items.map((item) => (item.product.id === productId ? { ...item, quantity: updatedItem.quantity } : item)),
      )
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveItem = async (productId: string) => {
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error()

      setCartItems((items) => items.filter((item) => item.product.id !== productId))

      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (!session) {
      router.push("/login?redirect=/checkout")
      setIsOpen(false)
      return
    }
    router.push("/checkout")
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>Review your items before checkout</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 my-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <CartItemCard
                key={item.product.id}
                item={item}
                onUpdateQuantity={(quantity) => handleUpdateQuantity(item.product.id, quantity)}
                onRemove={() => handleRemoveItem(item.product.id)}
              />
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter>
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}


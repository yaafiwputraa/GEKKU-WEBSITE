// components/products/product-card.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleAuthAction = (action: string) => {
    if (status !== "authenticated") {
      router.push(`/login?redirect=${window.location.pathname}`)
      toast({
        title: "Authentication Required",
        description: `Please login to ${action} this item.`,
        variant: "default",
      })
      return false
    }
    return true
  }

  const handleAddToCart = async () => {
    if (!handleAuthAction("add to cart")) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })

      if (!response.ok) throw new Error()

      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToWishlist = async () => {
    if (!handleAuthAction("add to wishlist")) return

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      })

      if (!response.ok) throw new Error()

      toast({
        title: "Added to Wishlist",
        description: "Item has been added to your wishlist.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#EAEAE6]">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-2 font-light">
        <h3 className="text-lg">{product.name}</h3>
        <p className="text-sm text-zinc-600">Kode Produk: {product.id}</p>
        <p className="text-sm text-zinc-600">Material: PLA Fillament</p>
        <p className="text-lg">Rp {product.price.toLocaleString("id-ID")}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-[#2C2C2C] hover:bg-[#1A1A1A] text-white font-light rounded-none"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            "Adding to Cart..."
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
// app/wishlist/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Protected } from "@/components/ui/protected"
import { WishlistItemCard } from "@/components/wishlist/wishlist-item-card"
import { toast } from "@/hooks/use-toast"
import type { Product } from "@prisma/client"

interface WishlistItem {
  id: string
  product: Product
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWishlistItems()
  }, [])

  const fetchWishlistItems = async () => {
    try {
      const response = await fetch("/api/wishlist")
      if (!response.ok) throw new Error()
      const data = await response.json()
      setItems(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load wishlist items.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveItem = async (productId: string) => {
    try {
      const response = await fetch(`/api/wishlist?id=${productId}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error('Failed to remove item');

      setItems((currentItems) =>
        currentItems.filter((item) => item.product.id !== productId)
      );

      toast({
        title: "Success",
        description: "Item removed from wishlist"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item"
      });
    }
  }

  return (
    <Protected>
      <div className="container py-16">
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-light tracking-tight">Wishlist</h1>
          <p className="text-muted-foreground">Your saved items</p>
        </div>
        
        <div className="divide-y">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">
              Loading wishlist...
            </p>
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your wishlist is empty
            </p>
          ) : (
            items.map((item) => (
              <WishlistItemCard
                key={item.id}
                product={item.product}
                onRemove={() => handleRemoveItem(item.product.id)}
              />
            ))
          )}
        </div>
      </div>
    </Protected>
  )
}
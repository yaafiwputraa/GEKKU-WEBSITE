// components/wishlist/wishlist-button.tsx
"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface WishlistButtonProps {
  productId: string
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToWishlist = async () => {
    if (!session) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to your wishlist",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) throw new Error()

      toast({
        title: "Success",
        description: "Item added to wishlist",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleAddToWishlist}
      disabled={isLoading}
    >
      <Heart className="h-5 w-5" />
      <span className="sr-only">Add to wishlist</span>
    </Button>
  )
}
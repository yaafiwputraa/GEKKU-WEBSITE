// components/wishlist/wishlist-item-card.tsx
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@prisma/client"

interface WishlistItemCardProps {
  product: Product
  onRemove: () => void
}

export function WishlistItemCard({ product, onRemove }: WishlistItemCardProps) {
  return (
    <div className="flex gap-4 py-4">
      <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-md">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
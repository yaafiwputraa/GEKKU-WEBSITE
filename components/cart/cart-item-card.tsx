// componennts/cart/cart-item-card.tsx
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/lib/types/product"

interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="flex gap-4 py-4">
      <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-md">
        <Image
          src={item.product.images[0] || "/placeholder.svg"}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">Rp {item.product.price.toLocaleString("id-ID")}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{item.quantity}</span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(item.quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


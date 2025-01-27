import { Protected } from "../../components/ui/protected"

export default function CartPage() {
  return (
    <Protected>
      <div className="container py-16">
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-light tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground">
            Review your items before checkout
          </p>
        </div>
        {/* Cart content will be added here */}
        <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
      </div>
    </Protected>
  )
}


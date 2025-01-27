// app/products/page.tsx
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/products/product-card"

export const revalidate = 3600 // Revalidate every hour

export default async function ProductsPage() {
  // Fetch products from database
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      images: true,
      stockQuantity: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    }
  })

  return (
    <div className="container py-16">
      <div className="space-y-4 mb-8">
        <h1 className="text-2xl font-light tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Browse our collection of aesthetic room lights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
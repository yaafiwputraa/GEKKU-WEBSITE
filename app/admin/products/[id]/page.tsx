import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductForm } from "../_components/product-form"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">Make changes to your product</p>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
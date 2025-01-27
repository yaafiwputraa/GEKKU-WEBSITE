// lib/types/product.ts
export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    images: string[]
    stockQuantity: number
    tags: string[]
    createdAt: string
    updatedAt: string
  }
  
  export interface CartItem {
    id: string
    cartId: string
    productId: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
      images: string[]
    }
    createdAt: string
    updatedAt: string
  }
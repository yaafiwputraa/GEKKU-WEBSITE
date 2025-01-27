// app/api/cart/[productId]/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../../auth/[...nextauth]/route"

// Update cart item quantity
export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { quantity } = body

    if (quantity < 1) {
      return new NextResponse("Invalid quantity", { status: 400 })
    }

    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    })

    if (!cart) {
      return new NextResponse("Cart not found", { status: 404 })
    }

    // Update cart item
    const updatedItem = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: params.productId,
        },
      },
      data: { quantity },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("[CART_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

// Delete cart item
export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    })

    if (!cart) {
      return new NextResponse("Cart not found", { status: 404 })
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: params.productId,
        },
      },
    })

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error("[CART_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}


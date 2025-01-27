// app/api/wishlist/[productId]/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

    await prisma.wishlistItem.deleteMany({
      where: {
        productId: params.productId,
        wishlist: {
          userId: session.user.id
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}
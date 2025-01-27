// app/api/wishlist/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../auth/[...nextauth]/route"

// Get wishlist items
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          orderBy: { createdAt: "desc" },
          include: { product: true }
        }
      }
    });

    const response = NextResponse.json(wishlist?.items || []);
    
    // Stronger cache control
    response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    response.headers.set('CDN-Cache-Control', 'no-cache');
    
    return response;
  } catch (error) {
    console.error("[WISHLIST_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Add to wishlist
export async function POST(req: Request) {
    try {
      const session = await getServerSession(authOptions)
      if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 })
      }
  
      const body = await req.json()
      const { productId } = body
  
      let wishlist = await prisma.wishlist.findUnique({
        where: { userId: session.user.id },
      })
  
      if (!wishlist) {
        wishlist = await prisma.wishlist.create({
          data: { userId: session.user.id },
        })
      }
  
      const existingItem = await prisma.wishlistItem.findFirst({
        where: {
          wishlist: { userId: session.user.id },
          productId,
        },
      })
  
      if (existingItem) {
        return NextResponse.json(existingItem)
      }
  
      const wishlistItem = await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId,
        },
      })
  
      return NextResponse.json(wishlistItem)
    } catch (error) {
      console.error("[WISHLIST_POST]", error)
      return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

    const url = new URL(req.url)
    const productId = url.searchParams.get('id')
    if (!productId) return new NextResponse("Product ID required", { status: 400 })

    await prisma.wishlistItem.deleteMany({
      where: {
        wishlist: { userId: session.user.id },
        productId: productId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
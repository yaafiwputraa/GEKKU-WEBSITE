import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return new NextResponse("Missing fields", { status: 400 })
    }

    const exist = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (exist) {
      return new NextResponse("Email already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log("[REGISTRATION_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create superadmin
  const hashedPassword = await bcrypt.hash('Admin123!@#', 10)
  
  const superadmin = await prisma.user.upsert({
    where: { email: 'admin@gekku.com' },
    update: {},
    create: {
      email: 'admin@gekku.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  })

  // Create sample products
  const products = await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Kurage Coffee',
        description: 'A coffee-colored table lamp inspired by jellyfish',
        price: 299000,
        category: 'Table Lamp',
        images: ['/placeholder.svg'],
        stockQuantity: 10,
        tags: ['coffee', 'table lamp', 'jellyfish'],
      },
      {
        name: 'Kurage White Series',
        description: 'A pristine white table lamp inspired by jellyfish',
        price: 299000,
        category: 'Table Lamp',
        images: ['/placeholder.svg'],
        stockQuantity: 15,
        tags: ['white', 'table lamp', 'jellyfish'],
      },
      {
        name: 'Kurage Brown',
        description: 'A brown-colored table lamp inspired by jellyfish',
        price: 299000,
        category: 'Table Lamp',
        images: ['/placeholder.svg'],
        stockQuantity: 12,
        tags: ['brown', 'table lamp', 'jellyfish'],
      },
    ],
  })

  console.log('Seeding completed:')
  console.log('Superadmin created:', superadmin.email)
  console.log('Products created:', products.count)
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import Link from "next/link"
import { ArrowRight, ShoppingBag, Zap, Leaf, Truck } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Kept unchanged as requested */}
      <section className="hero-section relative h-[600px] pt-16 flex items-center justify-center bg-[#2C2C2C] text-white">
        <div className="absolute inset-0">
          <div className="hero-image" />
          <div className="hero-image" />
        </div>
        <div className="relative z-10 container text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-wider">Illuminate Your Space</h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light">
            Discover our collection of aesthetic room lights that blend Japanese inspiration with modern design
            sensibilities.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white bg-transparent hover:bg-[#fc3003] hover:text-white hover:border-[#fc3003]"
          >
            <Link href="/products">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h2 className="text-3xl font-light text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <ShoppingBag className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Handcrafted Design</h3>
                <p className="text-muted-foreground">
                  Each piece is carefully designed and crafted with attention to detail, ensuring the highest quality.
                </p>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <Leaf className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-semibold">Sustainable Materials</h3>
                <p className="text-muted-foreground">
                  We use eco-friendly materials and sustainable practices to minimize environmental impact.
                </p>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <Truck className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-semibold">Free Shipping</h3>
                <p className="text-muted-foreground">
                  Enjoy free shipping on all orders within Indonesia. Safe and timely delivery guaranteed.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-light text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-light text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <p className="italic mb-4">
                "The quality of these lights is exceptional. They've transformed my living room!"
              </p>
              <p className="font-semibold">- Sarah K.</p>
            </Card>
            <Card className="p-6">
              <p className="italic mb-4">"I love the sustainable approach. Beautiful products with a conscience."</p>
              <p className="font-semibold">- Alex M.</p>
            </Card>
            <Card className="p-6">
              <p className="italic mb-4">"The customer service is top-notch. They went above and beyond to help me."</p>
              <p className="font-semibold">- Liam T.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-light">Stay Illuminated</h2>
            <p className="text-lg">
              Subscribe to our newsletter for exclusive offers, design tips, and new product releases
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1 min-w-0" />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
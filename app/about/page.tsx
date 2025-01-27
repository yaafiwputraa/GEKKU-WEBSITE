import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-light tracking-tight">About GEKKU</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Bringing aesthetic illumination to your living spaces through Japanese-inspired design
        </p>
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-light">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            GEKKU was born from a passion for combining aesthetic beauty with functional lighting. Founded in
            Jakarta, Indonesia, we draw inspiration from Japanese minimalism and contemporary design principles to
            create lighting solutions that transform spaces.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our journey began with a simple idea: to create lighting that not only illuminates but also adds character
            to your space. Today, we continue to innovate and create unique pieces that reflect our commitment to
            quality and design excellence.
          </p>
        </div>
        <div className="aspect-video bg-[#F5F5F0]">
          <img src="https://images.unsplash.com/photo-1579618215542-2ed5e10b65ed?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="GEKKU Design Workshop" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-light text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-light">Quality</h3>
            <p className="text-muted-foreground">
              We use premium materials and maintain strict quality control in our production process
            </p>
          </div>
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-light">Sustainability</h3>
            <p className="text-muted-foreground">
              Our commitment to eco-friendly practices guides every decision we make
            </p>
          </div>
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-light">Innovation</h3>
            <p className="text-muted-foreground">
              We continuously explore new designs and technologies to improve our products
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-light text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="aspect-square bg-[#F5F5F0] rounded-full w-48 mx-auto overflow-hidden">
              <img src="/placeholder.svg" alt="Team Member" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-light">John Doe</h3>
              <p className="text-muted-foreground">Founder & Creative Director</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="aspect-square bg-[#F5F5F0] rounded-full w-48 mx-auto overflow-hidden">
              <img src="/placeholder.svg" alt="Team Member" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-light">Jane Smith</h3>
              <p className="text-muted-foreground">Head of Design</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="aspect-square bg-[#F5F5F0] rounded-full w-48 mx-auto overflow-hidden">
              <img src="/placeholder.svg" alt="Team Member" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-light">Mike Johnson</h3>
              <p className="text-muted-foreground">Production Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-2xl font-light">Get in Touch</h2>
        <p className="text-muted-foreground">
          Have questions about our products or interested in collaborating? We'd love to hear from you.
        </p>
        <Button size="lg">Contact Us</Button>
      </section>
    </div>
  )
}
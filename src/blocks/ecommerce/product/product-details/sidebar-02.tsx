"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  badge?: string
}

interface HeaderProps {
  brand: string
  name: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  original?: string
  discount?: string
}

interface DescriptionProps {
  text: string
}

interface SidebarCardProps {
  title: string
  features: { icon: LucideIcon; title: string; description: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
  </div>
)

const Header = ({ brand, name }: HeaderProps) => (
  <div className="space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
    <h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
  </div>
)

const Rating = ({ rating, reviews }: RatingProps) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="font-medium">{rating}</span>
    <span className="text-sm text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
  </div>
)

const Price = ({ current, original, discount }: PriceProps) => (
  <div className="flex items-center gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
    {discount && <Badge variant="destructive">{discount}</Badge>}
  </div>
)

const Description = ({ text }: DescriptionProps) => (
  <p className="text-muted-foreground leading-relaxed">{text}</p>
)

const SidebarCard = ({ title, features }: SidebarCardProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {features.map((feature, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex-shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <feature.icon className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{feature.title}</p>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

const Actions = ({ buttons }: ActionsProps) => (
  <div className="flex gap-3">
    {buttons.map((btn, i) => (
      <Button key={i} variant={btn.variant || "default"} size="lg" className={`gap-2 ${i === 0 ? "flex-1" : ""}`} asChild>
        <Link href={btn.href}>
          {btn.icon && <btn.icon className="size-4" />}
          {btn.label}
        </Link>
      </Button>
    ))}
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <div className="grid @md:grid-cols-2 gap-8">
            <ProductImage
              src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800"
              alt="Wireless earbuds"
              badge="Best Seller"
            />

            <div className="flex flex-col gap-5">
              <Header brand="Sony" name="WF-1000XM5" />

              <Rating rating={5} reviews={8921} />

              <Price current="$299" original="$329" discount="-9%" />

              <Separator />

              <Description
                text="The world's best noise canceling truly wireless earbuds. Featuring the new Integrated Processor V2 for unparalleled audio quality and noise canceling performance."
              />

              <Actions
                buttons={[
                  { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                  { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
                ]}
              />
            </div>
          </div>

          {/* Right sidebar */}
          <aside>
            <SidebarCard
              title="Why Buy From Us"
              features={[
                { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
                { icon: Shield, title: "2-Year Warranty", description: "Full coverage included" },
                { icon: RotateCcw, title: "30-Day Returns", description: "Easy returns policy" },
              ]}
            />
          </aside>
        </div>
      </div>
    </section>
  )
}

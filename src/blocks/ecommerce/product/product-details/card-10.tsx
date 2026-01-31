"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Award, Leaf, Recycle, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
}

interface HeaderProps {
  brand: string
  name: string
  tagline: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  original?: string
}

interface CertificationCardsProps {
  certifications: { icon: LucideIcon; title: string; issuer: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="space-y-2">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
    <h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground">{tagline}</p>
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

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const CertificationCards = ({ certifications }: CertificationCardsProps) => (
  <div className="space-y-3">
    <p className="font-medium text-sm">Certifications & Sustainability</p>
    <div className="grid grid-cols-3 gap-3">
      {certifications.map((cert, i) => (
        <Card key={i} className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-3 text-center">
            <cert.icon className="size-6 mx-auto mb-1 text-primary" />
            <p className="font-medium text-xs">{cert.title}</p>
            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
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
        <div className="grid @lg:grid-cols-2 gap-8">
          {/* Product image */}
          <ProductImage
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800"
            alt="Sustainable clothing"
          />

          {/* Details with certification cards */}
          <div className="flex flex-col gap-5">
            <Header
              brand="Patagonia"
              name="Better Sweater® Jacket"
              tagline="Made with 100% recycled polyester fleece"
            />

            <Rating rating={5} reviews={8765} />

            <Price current="$139" original="$159" />

            <Separator />

            <p className="text-muted-foreground leading-relaxed">
              Our classic fleece jacket made with 100% recycled polyester. Fair Trade Certified™ sewn, which means the people who made it earned a premium for their labor.
            </p>

            <CertificationCards
              certifications={[
                { icon: Award, title: "Fair Trade", issuer: "Certified™" },
                { icon: Leaf, title: "bluesign®", issuer: "Approved" },
                { icon: Recycle, title: "Recycled", issuer: "100% Polyester" },
              ]}
            />

            <Actions
              buttons={[
                { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

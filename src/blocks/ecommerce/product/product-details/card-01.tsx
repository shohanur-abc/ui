"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, type LucideIcon } from "lucide-react"
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
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-3 left-3">{badge}</Badge>}
  </div>
)

const Header = ({ brand, name }: HeaderProps) => (
  <div className="space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
    <h1 className="text-xl @sm:text-2xl font-bold tracking-tight">{name}</h1>
  </div>
)

const Rating = ({ rating, reviews }: RatingProps) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="text-sm text-muted-foreground">({reviews.toLocaleString()})</span>
  </div>
)

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-2">
    <span className="text-2xl font-bold text-primary">{current}</span>
    {original && <span className="text-sm text-muted-foreground line-through">{original}</span>}
  </div>
)

const Description = ({ text }: DescriptionProps) => (
  <p className="text-sm text-muted-foreground line-clamp-2">{text}</p>
)

const Actions = ({ buttons }: ActionsProps) => (
  <div className="flex gap-2">
    {buttons.map((btn, i) => (
      <Button key={i} variant={btn.variant || "default"} size="sm" className={`gap-2 ${i === 0 ? "flex-1" : ""}`} asChild>
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
        <div className="flex justify-center">
          <Card className="max-w-sm w-full bg-card/50 backdrop-blur border-muted">
            <CardHeader className="p-4">
              <ProductImage
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                alt="Smart watch"
                badge="New"
              />
            </CardHeader>
            <CardContent className="px-4 pb-2 space-y-3">
              <Header brand="Apple" name="Apple Watch Series 9" />
              <Rating rating={5} reviews={12543} />
              <Price current="$399" original="$449" />
              <Description
                text="The most advanced Apple Watch yet with the powerful S9 chip, brighter display, and new Double Tap gesture."
              />
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-2">
              <Actions
                buttons={[
                  { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                  { label: "", href: "#wishlist", icon: Heart, variant: "outline" },
                ]}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

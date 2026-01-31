"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Check, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MasonryGridProps {
  images: { src: string; alt: string; height: "short" | "tall" | "normal" }[]
}

interface HeaderProps {
  category: string
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

interface FeaturesProps {
  features: string[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const MasonryGrid = ({ images }: MasonryGridProps) => (
  <div className="grid grid-cols-2 gap-2">
    <div className="space-y-2">
      {images.filter((_, i) => i % 2 === 0).map((image, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-xl bg-muted ${image.height === "tall" ? "aspect-[3/4]" : image.height === "short" ? "aspect-[4/3]" : "aspect-square"}`}
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
    <div className="space-y-2 pt-8">
      {images.filter((_, i) => i % 2 === 1).map((image, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-xl bg-muted ${image.height === "tall" ? "aspect-[3/4]" : image.height === "short" ? "aspect-[4/3]" : "aspect-square"}`}
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  </div>
)

const Header = ({ category, name }: HeaderProps) => (
  <div className="space-y-2">
    <Badge variant="secondary">{category}</Badge>
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

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const Features = ({ features }: FeaturesProps) => (
  <div className="space-y-2">
    {features.map((feature, i) => (
      <div key={i} className="flex items-center gap-2 text-sm">
        <Check className="size-4 text-primary" />
        <span>{feature}</span>
      </div>
    ))}
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
        <div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
          {/* Masonry grid */}
          <MasonryGrid
            images={[
              { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600", alt: "Jacket front", height: "tall" },
              { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600", alt: "Jacket detail", height: "normal" },
              { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600", alt: "Jacket back", height: "short" },
              { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600", alt: "Jacket styled", height: "tall" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header category="Outerwear" name="Arc'teryx Beta LT Jacket" />

            <Rating rating={5} reviews={4521} />

            <Price current="$575" original="$650" />

            <Separator />

            <Features
              features={[
                "GORE-TEX with Paclite Plus Technology",
                "Waterproof and highly breathable",
                "Helmet-compatible StormHood",
                "Articulated construction for mobility",
                "Lightweight and packable design",
                "Reinforced high-wear areas",
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

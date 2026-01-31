"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Ruler, Palette, Package, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ThreeColumnGridProps {
  images: { src: string; alt: string }[]
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

interface DetailsCardsProps {
  details: { icon: LucideIcon; label: string; value: string }[]
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ThreeColumnGrid = ({ images }: ThreeColumnGridProps) => (
  <div className="grid grid-cols-3 gap-2">
    {images.map((image, i) => (
      <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
    ))}
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

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const DetailsCards = ({ details }: DetailsCardsProps) => (
  <div className="grid grid-cols-3 gap-3">
    {details.map((detail, i) => (
      <Card key={i} className="bg-muted/30 border-muted text-center">
        <CardContent className="p-4">
          <detail.icon className="size-5 mx-auto mb-2 text-primary" />
          <p className="text-xs text-muted-foreground">{detail.label}</p>
          <p className="font-medium text-sm">{detail.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const Description = ({ text }: DescriptionProps) => (
  <p className="text-muted-foreground leading-relaxed">{text}</p>
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
          {/* Three column grid */}
          <ThreeColumnGrid
            images={[
              { src: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=400", alt: "Shoe front" },
              { src: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=400", alt: "Shoe side" },
              { src: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=400", alt: "Shoe back" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header brand="Allbirds" name="Tree Runners" />

            <Rating rating={5} reviews={8921} />

            <Price current="$98" original="$110" />

            <Separator />

            <DetailsCards
              details={[
                { icon: Ruler, label: "Fit", value: "True to size" },
                { icon: Palette, label: "Colors", value: "12 options" },
                { icon: Package, label: "Weight", value: "214g" },
              ]}
            />

            <Description
              text="Our everyday sneaker, made from eucalyptus tree fiber for a breathable, silky-smooth feel. The sustainably sourced materials create a shoe that's lightweight, soft, and cool on your feet."
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

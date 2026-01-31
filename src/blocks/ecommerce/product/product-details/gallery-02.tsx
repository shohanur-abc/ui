"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, ZoomIn, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MasonryGalleryProps {
  images: { src: string; alt: string; span?: "tall" | "wide" }[]
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

interface HighlightsProps {
  items: { label: string; value: string }[]
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const MasonryGallery = ({ images }: MasonryGalleryProps) => (
  <div className="grid grid-cols-2 gap-2">
    {images.map((img, i) => (
      <div
        key={i}
        className={`relative overflow-hidden rounded-xl bg-muted group cursor-pointer ${
          img.span === "tall" ? "row-span-2 aspect-[1/2]" : img.span === "wide" ? "col-span-2 aspect-[2/1]" : "aspect-square"
        }`}
      >
        <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    ))}
  </div>
)

const Header = ({ category, name }: HeaderProps) => (
  <div className="space-y-2">
    <Badge variant="outline">{category}</Badge>
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

const Highlights = ({ items }: HighlightsProps) => (
  <div className="grid grid-cols-2 gap-3">
    {items.map((item, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className="font-medium text-sm">{item.value}</p>
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
          {/* Masonry Gallery */}
          <MasonryGallery
            images={[
              { src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600", alt: "Sneaker front", span: "tall" },
              { src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", alt: "Sneaker side" },
              { src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", alt: "Sneaker detail" },
              { src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800", alt: "Sneaker pair", span: "wide" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              category="Limited Edition"
              name="Air Max Velocity Pro"
            />

            <Rating rating={5} reviews={2341} />

            <Price current="$189" original="$229" />

            <Separator />

            <Highlights
              items={[
                { label: "Upper", value: "Flyknit Mesh" },
                { label: "Sole", value: "React Foam" },
                { label: "Weight", value: "280g" },
                { label: "Drop", value: "10mm" },
              ]}
            />

            <Description
              text="The Air Max Velocity Pro combines cutting-edge technology with iconic design. Featuring a breathable Flyknit upper and responsive React foam cushioning for all-day comfort and performance."
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

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Move3D, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface View360GalleryProps {
  mainImage: { src: string; alt: string }
  angles: { src: string; label: string }[]
}

interface HeaderProps {
  brand: string
  name: string
  model: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  financing?: string
}

interface DimensionsProps {
  dimensions: { label: string; value: string }[]
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const View360Gallery = ({ mainImage, angles }: View360GalleryProps) => (
  <div className="space-y-4">
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 group">
      <Image src={mainImage.src} alt={mainImage.alt} fill className="object-contain p-8" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm">
        <Move3D className="size-4 text-primary" />
        <span className="text-sm font-medium">Drag to rotate</span>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {angles.map((angle, i) => (
        <div key={i} className="relative">
          <div className={`relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer ring-2 transition-all ${i === 0 ? "ring-primary" : "ring-transparent hover:ring-primary/50"}`}>
            <Image src={angle.src} alt={angle.label} fill className="object-contain p-2" />
          </div>
          <span className="block text-xs text-center text-muted-foreground mt-1">{angle.label}</span>
        </div>
      ))}
    </div>
  </div>
)

const Header = ({ brand, name, model }: HeaderProps) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <Badge variant="secondary">{brand}</Badge>
      <span className="text-xs text-muted-foreground">{model}</span>
    </div>
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

const Price = ({ current, financing }: PriceProps) => (
  <div className="space-y-1">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {financing && <p className="text-sm text-muted-foreground">{financing}</p>}
  </div>
)

const Dimensions = ({ dimensions }: DimensionsProps) => (
  <div className="grid grid-cols-2 gap-3">
    {dimensions.map((dim, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{dim.label}</p>
          <p className="font-medium text-sm">{dim.value}</p>
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
          {/* 360 Gallery */}
          <View360Gallery
            mainImage={{ src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800", alt: "Modern sofa" }}
            angles={[
              { src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200", label: "Front" },
              { src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200", label: "Side" },
              { src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200", label: "Back" },
              { src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200", label: "Detail" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              brand="IKEA"
              name="SÖDERHAMN 3-Seat Sofa"
              model="SKU: 494.521.73"
            />

            <Rating rating={4} reviews={2341} />

            <Price current="$1,299" financing="Or $108.25/mo for 12 months" />

            <Separator />

            <Dimensions
              dimensions={[
                { label: "Width", value: "186 cm" },
                { label: "Depth", value: "99 cm" },
                { label: "Height", value: "83 cm" },
                { label: "Seat height", value: "40 cm" },
              ]}
            />

            <Description
              text="SÖDERHAMN is a modular sofa with a timeless, casual design. The deep, low seat and the soft cushions provide outstanding comfort. Mix sections to create a sofa in the shape and size that works best for your home."
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

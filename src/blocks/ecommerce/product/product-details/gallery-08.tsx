"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, ImageIcon, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LightboxGalleryProps {
  main: { src: string; alt: string }
  grid: { src: string; alt: string }[]
  moreCount: number
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

interface VariantSelectorProps {
  label: string
  variants: { name: string; price?: string; selected?: boolean }[]
}

interface FeatureGridProps {
  features: { label: string; value: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const LightboxGallery = ({ main, grid, moreCount }: LightboxGalleryProps) => (
  <div className="grid grid-cols-3 gap-2">
    <div className="col-span-2 row-span-2 relative aspect-square overflow-hidden rounded-xl bg-muted group cursor-pointer">
      <Image src={main.src} alt={main.alt} fill className="object-cover" />
    </div>
    {grid.slice(0, 2).map((img, i) => (
      <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-muted cursor-pointer group">
        <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform group-hover:scale-105" />
      </div>
    ))}
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted cursor-pointer group">
      <Image src={grid[2]?.src || main.src} alt="More images" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
        <ImageIcon className="size-6 mb-1" />
        <span className="text-sm font-medium">+{moreCount}</span>
      </div>
    </div>
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

const VariantSelector = ({ label, variants }: VariantSelectorProps) => (
  <div className="space-y-3">
    <p className="text-sm font-medium">{label}</p>
    <div className="flex flex-wrap gap-2">
      {variants.map((variant, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
            variant.selected ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"
          }`}
        >
          {variant.name}
          {variant.price && <span className="text-xs text-muted-foreground ml-1">{variant.price}</span>}
        </button>
      ))}
    </div>
  </div>
)

const FeatureGrid = ({ features }: FeatureGridProps) => (
  <div className="grid grid-cols-2 gap-2">
    {features.map((feature, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{feature.label}</p>
          <p className="font-medium text-sm">{feature.value}</p>
        </CardContent>
      </Card>
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
          {/* Lightbox Gallery */}
          <LightboxGallery
            main={{ src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800", alt: "Bag main" }}
            grid={[
              { src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400", alt: "Bag side" },
              { src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400", alt: "Bag inside" },
              { src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400", alt: "Bag detail" },
            ]}
            moreCount={8}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Badge className="w-fit">Bestseller</Badge>

            <Header brand="Coach" name="Tabby Shoulder Bag 26" />

            <Rating rating={5} reviews={3892} />

            <Price current="$395" original="$495" discount="-20%" />

            <Separator />

            <VariantSelector
              label="Color"
              variants={[
                { name: "Black", selected: true },
                { name: "Tan" },
                { name: "Red" },
                { name: "Navy" },
              ]}
            />

            <FeatureGrid
              features={[
                { label: "Material", value: "Pebble Leather" },
                { label: "Dimensions", value: "26 × 17 × 8 cm" },
                { label: "Strap Drop", value: "56 cm (adjustable)" },
                { label: "Closure", value: "Signature turnlock" },
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

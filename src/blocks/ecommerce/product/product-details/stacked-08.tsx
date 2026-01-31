"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Cpu, HardDrive, Monitor, Battery, type LucideIcon } from "lucide-react"
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
  tagline: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  original?: string
  savings?: string
}

interface TechSpecsProps {
  specs: { icon: LucideIcon; name: string; value: string }[]
}

interface FeaturesListProps {
  features: string[]
}

interface ComparisonTableProps {
  models: { name: string; specs: string[]; price: string; current?: boolean }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
  <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4" variant="destructive">{badge}</Badge>}
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="text-center space-y-2">
    <Badge variant="secondary">{brand}</Badge>
    <h1 className="text-3xl @sm:text-4xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tagline}</p>
  </div>
)

const Rating = ({ rating, reviews }: RatingProps) => (
  <div className="flex items-center justify-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="font-medium text-lg">{rating}</span>
    <span className="text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
  </div>
)

const Price = ({ current, original, savings }: PriceProps) => (
  <div className="text-center">
    <div className="flex items-baseline justify-center gap-3">
      <span className="text-4xl font-bold text-primary">{current}</span>
      {original && <span className="text-xl text-muted-foreground line-through">{original}</span>}
    </div>
    {savings && <Badge variant="destructive" className="mt-2">{savings}</Badge>}
  </div>
)

const TechSpecs = ({ specs }: TechSpecsProps) => (
  <div className="grid grid-cols-2 @sm:grid-cols-4 gap-3">
    {specs.map((spec, i) => (
      <Card key={i} className="bg-muted/30 border-muted text-center">
        <CardContent className="p-4">
          <spec.icon className="size-6 mx-auto mb-2 text-primary" />
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{spec.name}</p>
          <p className="font-bold">{spec.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const FeaturesList = ({ features }: FeaturesListProps) => (
  <div className="space-y-3">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">Key Features</p>
    <div className="flex flex-wrap justify-center gap-2">
      {features.map((feature, i) => (
        <Badge key={i} variant="outline" className="text-sm px-4 py-2">
          {feature}
        </Badge>
      ))}
    </div>
  </div>
)

const ComparisonTable = ({ models }: ComparisonTableProps) => (
  <div className="space-y-3">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">Compare Models</p>
    <div className="grid @sm:grid-cols-3 gap-3">
      {models.map((model, i) => (
        <Card key={i} className={`${model.current ? "border-primary ring-2 ring-primary/20" : "border-muted"} bg-muted/30`}>
          <CardContent className="p-4 text-center">
            {model.current && <Badge className="mb-2">Selected</Badge>}
            <p className="font-bold">{model.name}</p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              {model.specs.map((spec, j) => (
                <li key={j}>{spec}</li>
              ))}
            </ul>
            <p className="font-bold text-primary mt-3">{model.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

const Actions = ({ buttons }: ActionsProps) => (
  <div className="flex justify-center gap-4">
    {buttons.map((btn, i) => (
      <Button key={i} variant={btn.variant || "default"} size="lg" className="gap-2 px-8" asChild>
        <Link href={btn.href}>
          {btn.icon && <btn.icon className="size-5" />}
          {btn.label}
        </Link>
      </Button>
    ))}
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-5xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="flex flex-col gap-10">
          {/* Image */}
          <ProductImage
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200"
            alt="MacBook Pro"
            badge="NEW"
          />

          {/* Header */}
          <Header
            brand="Apple"
            name="MacBook Pro 16-inch"
            tagline="Supercharged by M3 Max. For the most demanding workflows."
          />

          {/* Rating */}
          <Rating rating={5} reviews={4521} />

          <Separator />

          {/* Price */}
          <Price current="$3,499" original="$3,999" savings="Save $500" />

          {/* Tech specs */}
          <TechSpecs
            specs={[
              { icon: Cpu, name: "Chip", value: "M3 Max" },
              { icon: HardDrive, name: "Storage", value: "1TB SSD" },
              { icon: Monitor, name: "Display", value: "16.2\" XDR" },
              { icon: Battery, name: "Battery", value: "22 hours" },
            ]}
          />

          {/* Features */}
          <FeaturesList
            features={[
              "40-core GPU",
              "48GB Unified Memory",
              "ProMotion 120Hz",
              "6 Speakers",
              "1080p Webcam",
              "MagSafe 3",
              "3x Thunderbolt 4",
              "HDMI 2.1",
              "SDXC Slot",
            ]}
          />

          {/* Comparison */}
          <ComparisonTable
            models={[
              { name: "MacBook Pro 14\"", specs: ["M3 Pro", "512GB", "18 hours"], price: "$1,999" },
              { name: "MacBook Pro 16\"", specs: ["M3 Max", "1TB", "22 hours"], price: "$3,499", current: true },
              { name: "MacBook Pro 16\" Max", specs: ["M3 Max", "2TB", "22 hours"], price: "$4,499" },
            ]}
          />

          <Separator />

          {/* Actions */}
          <Actions
            buttons={[
              { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
              { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

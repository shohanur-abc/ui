"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Dumbbell, Timer, Zap, Check, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  badges: string[]
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
  perServing?: string
}

interface StatsProps {
  stats: { icon: LucideIcon; value: string; label: string }[]
}

interface FlavorsProps {
  flavors: { name: string; selected?: boolean }[]
}

interface SizesProps {
  sizes: { label: string; price: string; selected?: boolean }[]
}

interface BenefitsProps {
  benefits: string[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt, badges }: ProductImageProps) => (
  <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-950/30 dark:to-purple-950/30">
    <Image src={src} alt={alt} fill className="object-cover" />
    <div className="absolute top-4 left-4 flex gap-2">
      {badges.map((badge, i) => (
        <Badge key={i} variant={i === 0 ? "destructive" : "secondary"}>{badge}</Badge>
      ))}
    </div>
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="text-center space-y-2">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
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

const Price = ({ current, original, perServing }: PriceProps) => (
  <div className="text-center">
    <div className="flex items-baseline justify-center gap-3">
      <span className="text-4xl font-bold text-primary">{current}</span>
      {original && <span className="text-xl text-muted-foreground line-through">{original}</span>}
    </div>
    {perServing && <p className="text-sm text-muted-foreground mt-1">{perServing}</p>}
  </div>
)

const Stats = ({ stats }: StatsProps) => (
  <div className="grid grid-cols-3 gap-3">
    {stats.map((stat, i) => (
      <Card key={i} className="bg-muted/30 border-muted text-center">
        <CardContent className="p-4">
          <stat.icon className="size-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const Flavors = ({ flavors }: FlavorsProps) => (
  <div className="space-y-3">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">Flavor</p>
    <div className="flex flex-wrap justify-center gap-2">
      {flavors.map((flavor, i) => (
        <Button key={i} variant={flavor.selected ? "default" : "outline"} size="sm">
          {flavor.name}
        </Button>
      ))}
    </div>
  </div>
)

const Sizes = ({ sizes }: SizesProps) => (
  <div className="space-y-3">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">Size</p>
    <div className="flex justify-center gap-3">
      {sizes.map((size, i) => (
        <Button key={i} variant={size.selected ? "default" : "outline"} className="flex-col h-auto py-3 px-6">
          <span className="font-medium">{size.label}</span>
          <span className="text-xs opacity-75">{size.price}</span>
        </Button>
      ))}
    </div>
  </div>
)

const Benefits = ({ benefits }: BenefitsProps) => (
  <div className="space-y-3">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">Benefits</p>
    <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
      {benefits.map((benefit, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <Check className="size-4 text-primary shrink-0" />
          <span>{benefit}</span>
        </div>
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
      <div className="max-w-4xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="flex flex-col gap-10">
          {/* Image */}
          <ProductImage
            src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800"
            alt="Protein powder"
            badges={["Best Seller", "Athlete Choice"]}
          />

          {/* Header */}
          <Header
            brand="Optimum Nutrition"
            name="Gold Standard 100% Whey"
            tagline="The world's #1 selling whey protein powder"
          />

          {/* Rating */}
          <Rating rating={5} reviews={78432} />

          <Separator />

          {/* Price */}
          <Price current="$79.99" original="$99.99" perServing="$1.14 per serving" />

          {/* Stats */}
          <Stats
            stats={[
              { icon: Dumbbell, value: "24g", label: "Protein" },
              { icon: Zap, value: "5.5g", label: "BCAAs" },
              { icon: Timer, value: "4g", label: "Glutamine" },
            ]}
          />

          {/* Flavors */}
          <Flavors
            flavors={[
              { name: "Double Rich Chocolate", selected: true },
              { name: "Vanilla Ice Cream" },
              { name: "Cookies & Cream" },
              { name: "Strawberry Banana" },
              { name: "Mocha Cappuccino" },
            ]}
          />

          {/* Sizes */}
          <Sizes
            sizes={[
              { label: "2 lb", price: "$39.99" },
              { label: "5 lb", price: "$79.99", selected: true },
              { label: "10 lb", price: "$139.99" },
            ]}
          />

          {/* Benefits */}
          <Benefits
            benefits={[
              "Builds lean muscle",
              "Fast absorption",
              "Low in fat & sugar",
              "Mixes instantly",
              "Great taste",
              "NSF certified",
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

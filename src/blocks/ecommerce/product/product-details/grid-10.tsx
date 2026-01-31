"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Clock, Flame, Users, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SquareGridProps {
  images: { src: string; alt: string; badge?: string }[]
}

interface HeaderProps {
  category: string
  name: string
  tagline: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  serves: string
}

interface StatsProps {
  stats: { icon: LucideIcon; label: string; value: string }[]
}

interface IngredientsProps {
  count: number
  preview: string[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const SquareGrid = ({ images }: SquareGridProps) => (
  <div className="grid grid-cols-3 gap-2">
    {images.map((image, i) => (
      <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
        {image.badge && (
          <Badge className="absolute top-2 left-2 text-xs">{image.badge}</Badge>
        )}
      </div>
    ))}
  </div>
)

const Header = ({ category, name, tagline }: HeaderProps) => (
  <div className="space-y-2">
    <Badge variant="secondary">{category}</Badge>
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

const Price = ({ current, serves }: PriceProps) => (
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold text-primary">{current}</span>
    <span className="text-muted-foreground">({serves})</span>
  </div>
)

const Stats = ({ stats }: StatsProps) => (
  <div className="grid grid-cols-3 gap-2">
    {stats.map((stat, i) => (
      <Card key={i} className="bg-muted/30 border-muted text-center">
        <CardContent className="p-3">
          <stat.icon className="size-4 mx-auto mb-1 text-primary" />
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="font-medium text-sm">{stat.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const Ingredients = ({ count, preview }: IngredientsProps) => (
  <div className="space-y-2">
    <p className="font-medium text-sm">{count} Fresh Ingredients</p>
    <div className="flex flex-wrap gap-2">
      {preview.map((ingredient, i) => (
        <Badge key={i} variant="outline">{ingredient}</Badge>
      ))}
      <Badge variant="outline">+{count - preview.length} more</Badge>
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
        <div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
          {/* Square grid */}
          <SquareGrid
            images={[
              { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400", alt: "Dish 1", badge: "Chef's Pick" },
              { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400", alt: "Dish 2" },
              { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400", alt: "Dish 3" },
              { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400", alt: "Dish 4" },
              { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400", alt: "Dish 5" },
              { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400", alt: "Dish 6" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              category="Meal Kit"
              name="Thai Green Curry Kit"
              tagline="Authentic flavors, ready in 30 minutes"
            />

            <Rating rating={5} reviews={4521} />

            <Price current="$24.99" serves="Serves 4" />

            <Separator />

            <Stats
              stats={[
                { icon: Clock, label: "Prep Time", value: "30 min" },
                { icon: Flame, label: "Spice Level", value: "Medium" },
                { icon: Users, label: "Servings", value: "4 people" },
              ]}
            />

            <Ingredients
              count={12}
              preview={["Chicken", "Coconut Milk", "Thai Basil", "Bamboo Shoots", "Bell Peppers"]}
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

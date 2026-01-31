"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Maximize2, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SplitCarouselProps {
  leftImages: { src: string; alt: string }[]
  rightImages: { src: string; alt: string }[]
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
  original?: string
  discount?: string
}

interface QuickSpecsProps {
  specs: { label: string; value: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const SplitCarousel = ({ leftImages, rightImages }: SplitCarouselProps) => (
  <div className="grid grid-cols-2 gap-2">
    <div className="space-y-2">
      {leftImages.map((image, i) => (
        <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted group cursor-pointer">
          <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform group-hover:scale-105" />
          <Button variant="secondary" size="icon" className="absolute bottom-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
    <div className="space-y-2">
      {rightImages.map((image, i) => (
        <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted group cursor-pointer">
          <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform group-hover:scale-105" />
          <Button variant="secondary" size="icon" className="absolute bottom-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
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

const Price = ({ current, original, discount }: PriceProps) => (
  <div className="flex items-center gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
    {discount && <Badge variant="destructive">{discount}</Badge>}
  </div>
)

const QuickSpecs = ({ specs }: QuickSpecsProps) => (
  <div className="grid grid-cols-2 gap-2">
    {specs.map((spec, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{spec.label}</p>
          <p className="font-medium text-sm">{spec.value}</p>
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
          {/* Split carousel */}
          <SplitCarousel
            leftImages={[
              { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", alt: "Fitness gear front" },
              { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", alt: "Fitness gear detail" },
            ]}
            rightImages={[
              { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", alt: "Fitness gear side" },
              { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", alt: "Fitness gear in use" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              category="Fitness Equipment"
              name="Bowflex SelectTech 552 Dumbbells"
              tagline="Replace 15 sets of weights with one adjustable dumbbell"
            />

            <Rating rating={5} reviews={8923} />

            <Price current="$449" original="$549" discount="-$100" />

            <Separator />

            <QuickSpecs
              specs={[
                { label: "Weight Range", value: "5-52.5 lbs" },
                { label: "Adjustments", value: "15 settings" },
                { label: "Change Time", value: "< 1 second" },
                { label: "Warranty", value: "2 years" },
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

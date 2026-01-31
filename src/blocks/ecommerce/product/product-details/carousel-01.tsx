"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CarouselImageProps {
  images: { src: string; alt: string }[]
  currentIndex: number
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
  discount?: string
}

interface CarouselControlsProps {
  total: number
  current: number
}

interface QuickStatsProps {
  stats: { label: string; value: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const CarouselImage = ({ images, currentIndex }: CarouselImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
    <Image src={images[currentIndex].src} alt={images[currentIndex].alt} fill className="object-cover" />
    <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm">
      <ChevronLeft className="size-5" />
    </Button>
    <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm">
      <ChevronRight className="size-5" />
    </Button>
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="space-y-2">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
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

const CarouselControls = ({ total, current }: CarouselControlsProps) => (
  <div className="flex justify-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        className={`size-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
      />
    ))}
  </div>
)

const QuickStats = ({ stats }: QuickStatsProps) => (
  <div className="grid grid-cols-2 gap-3">
    {stats.map((stat, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="font-medium">{stat.value}</p>
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
          {/* Carousel */}
          <div className="space-y-4">
            <CarouselImage
              images={[
                { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", alt: "Watch front" },
                { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", alt: "Watch side" },
                { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", alt: "Watch back" },
              ]}
              currentIndex={0}
            />
            <CarouselControls total={3} current={0} />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              brand="Apple"
              name="Apple Watch Ultra 2"
              tagline="The most rugged and capable Apple Watch ever"
            />

            <Rating rating={5} reviews={8923} />

            <Price current="$799" original="$849" discount="-$50" />

            <Separator />

            <QuickStats
              stats={[
                { label: "Case Size", value: "49mm" },
                { label: "Water Resistance", value: "100m" },
                { label: "Battery Life", value: "36 hours" },
                { label: "Display", value: "Always-On" },
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

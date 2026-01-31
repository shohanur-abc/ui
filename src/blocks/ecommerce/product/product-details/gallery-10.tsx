"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Layers, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LayeredGalleryProps {
  layers: { src: string; label: string; description: string }[]
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
}

interface TechSpecsProps {
  specs: { label: string; value: string }[]
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const LayeredGallery = ({ layers }: LayeredGalleryProps) => (
  <div className="space-y-4">
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/30 dark:to-purple-950/30">
      <Image src={layers[0].src} alt={layers[0].label} fill className="object-contain p-8" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm">
        <Layers className="size-4 text-primary" />
        <span className="text-sm font-medium">{layers[0].label}</span>
        <span className="text-xs text-muted-foreground ml-auto">{layers[0].description}</span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {layers.slice(1).map((layer, i) => (
        <Card key={i} className="bg-muted/30 border-muted cursor-pointer hover:border-primary/50 transition-colors">
          <CardContent className="p-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-background/50 mb-2">
              <Image src={layer.src} alt={layer.label} fill className="object-contain p-2" />
            </div>
            <p className="text-xs font-medium">{layer.label}</p>
            <p className="text-xs text-muted-foreground">{layer.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
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

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const TechSpecs = ({ specs }: TechSpecsProps) => (
  <div className="grid grid-cols-2 gap-2">
    {specs.map((spec, i) => (
      <div key={i} className="p-3 rounded-lg bg-muted/30 border border-muted">
        <p className="text-xs text-muted-foreground">{spec.label}</p>
        <p className="font-medium text-sm">{spec.value}</p>
      </div>
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
          {/* Layered Gallery */}
          <LayeredGallery
            layers={[
              { src: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800", label: "Full Assembly", description: "Complete mattress system" },
              { src: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=300", label: "Cooling Cover", description: "Breathable fabric" },
              { src: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=300", label: "Memory Foam", description: "2\" comfort layer" },
              { src: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=300", label: "Support Core", description: "8\" pocketed coils" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Badge className="w-fit">Award Winner</Badge>

            <Header
              brand="DreamCloud"
              name="Premier Rest Hybrid Mattress"
              tagline="Luxury hotel comfort for your home"
            />

            <Rating rating={5} reviews={12847} />

            <Price current="$1,299" original="$1,899" />

            <Separator />

            <TechSpecs
              specs={[
                { label: "Height", value: "14 inches" },
                { label: "Firmness", value: "Medium (6/10)" },
                { label: "Trial Period", value: "365 nights" },
                { label: "Warranty", value: "Lifetime" },
              ]}
            />

            <Description
              text="Experience the perfect balance of plush comfort and supportive structure. Our hybrid design combines premium memory foam with individually wrapped coils for pressure relief and minimal motion transfer."
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

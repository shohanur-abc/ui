"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface HeroImageProps {
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
  discount?: string
}

interface FeatureCardsProps {
  features: { icon: LucideIcon; title: string; description: string }[]
}

interface SpecsListProps {
  specs: { label: string; value: string }[]
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const HeroImage = ({ src, alt, badge }: HeroImageProps) => (
  <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4" variant="destructive">{badge}</Badge>}
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="space-y-2 text-center">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">{name}</h1>
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

const Price = ({ current, original, discount }: PriceProps) => (
  <div className="flex items-center justify-center gap-4">
    <span className="text-4xl font-bold text-primary">{current}</span>
    {original && <span className="text-xl text-muted-foreground line-through">{original}</span>}
    {discount && <Badge variant="destructive" className="text-sm">{discount}</Badge>}
  </div>
)

const FeatureCards = ({ features }: FeatureCardsProps) => (
  <div className="grid @sm:grid-cols-3 gap-4">
    {features.map((feature, i) => (
      <Card key={i} className="bg-muted/30 border-muted text-center">
        <CardContent className="p-6 flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-primary/10">
            <feature.icon className="size-6 text-primary" />
          </div>
          <p className="font-medium">{feature.title}</p>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const SpecsList = ({ specs }: SpecsListProps) => (
  <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
    {specs.map((spec, i) => (
      <div key={i} className="text-center p-4 rounded-xl bg-muted/30">
        <p className="text-sm text-muted-foreground">{spec.label}</p>
        <p className="font-bold text-lg">{spec.value}</p>
      </div>
    ))}
  </div>
)

const Description = ({ text }: DescriptionProps) => (
  <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">{text}</p>
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
      <div className="max-w-6xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="flex flex-col gap-10">
          {/* Hero image */}
          <HeroImage
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
            alt="Smart TV"
            badge="NEW"
          />

          {/* Header */}
          <Header
            brand="Samsung"
            name="Crystal UHD 4K Smart TV"
            tagline="Experience breathtaking picture quality with over one billion shades of color"
          />

          {/* Rating */}
          <Rating rating={5} reviews={12453} />

          {/* Price */}
          <Price current="$799" original="$999" discount="20% OFF" />

          <Separator />

          {/* Features */}
          <FeatureCards
            features={[
              { icon: Truck, title: "Free Delivery", description: "2-5 business days" },
              { icon: Shield, title: "2-Year Warranty", description: "Full coverage" },
              { icon: RotateCcw, title: "Easy Returns", description: "30-day policy" },
            ]}
          />

          {/* Specs */}
          <SpecsList
            specs={[
              { label: "Screen Size", value: "65 inch" },
              { label: "Resolution", value: "4K UHD" },
              { label: "Refresh Rate", value: "120Hz" },
              { label: "Smart Platform", value: "Tizen OS" },
            ]}
          />

          {/* Description */}
          <Description
            text="The Crystal Processor 4K transforms everything you watch into stunning 4K. See lifelike color and shading with PurColor technology. With Motion Xcelerator, you can get smooth action on the fastest scenes, even at 4K 120Hz. Plus, the Crystal UHD Smart TV syncs with your devices for total control."
          />

          {/* Actions */}
          <Actions
            buttons={[
              { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
              { label: "Save for Later", href: "#wishlist", icon: Heart, variant: "outline" },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

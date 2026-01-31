"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Palette, Ruler, Package, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
}

interface HeaderProps {
  designer: string
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

interface SpecCardsProps {
  specs: { icon: LucideIcon; title: string; value: string }[]
}

interface MaterialInfoProps {
  materials: { name: string; percentage: number }[]
}

interface CareInstructionsProps {
  instructions: string[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

const Header = ({ designer, name, tagline }: HeaderProps) => (
  <div className="text-center space-y-2">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{designer}</p>
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

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline justify-center gap-3">
    <span className="text-4xl font-bold text-primary">{current}</span>
    {original && <span className="text-xl text-muted-foreground line-through">{original}</span>}
  </div>
)

const SpecCards = ({ specs }: SpecCardsProps) => (
  <div className="grid @sm:grid-cols-3 gap-4">
    {specs.map((spec, i) => (
      <Card key={i} className="bg-muted/30 border-muted text-center">
        <CardContent className="p-5">
          <spec.icon className="size-6 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">{spec.title}</p>
          <p className="font-bold">{spec.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const MaterialInfo = ({ materials }: MaterialInfoProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Material Composition</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {materials.map((material, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{material.name}</span>
              <span className="font-medium">{material.percentage}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${material.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const CareInstructions = ({ instructions }: CareInstructionsProps) => (
  <div className="space-y-3">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">Care Instructions</p>
    <div className="flex flex-wrap justify-center gap-2">
      {instructions.map((instruction, i) => (
        <Badge key={i} variant="outline" className="text-sm px-4 py-2">
          {instruction}
        </Badge>
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
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200"
            alt="Designer sofa"
          />

          {/* Header */}
          <Header
            designer="Herman Miller"
            name="Eames Lounge Chair"
            tagline="An icon of modern design, combining comfort and elegance"
          />

          {/* Rating */}
          <Rating rating={5} reviews={1892} />

          <Separator />

          {/* Price */}
          <Price current="$5,495" original="$6,200" />

          {/* Specs */}
          <SpecCards
            specs={[
              { icon: Ruler, title: "Dimensions", value: "33\"W x 33\"D x 33\"H" },
              { icon: Palette, title: "Colors Available", value: "12 Options" },
              { icon: Package, title: "Assembly", value: "White Glove" },
            ]}
          />

          {/* Materials */}
          <MaterialInfo
            materials={[
              { name: "Premium Italian Leather", percentage: 65 },
              { name: "Solid Walnut Wood", percentage: 25 },
              { name: "Aluminum Base", percentage: 10 },
            ]}
          />

          {/* Care instructions */}
          <CareInstructions
            instructions={[
              "Dust weekly",
              "Condition leather monthly",
              "Avoid direct sunlight",
              "Use coasters",
              "Professional cleaning recommended",
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

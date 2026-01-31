"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Zap, Battery, Bluetooth, Volume2, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  badge?: string
}

interface ProductTitleProps {
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

interface SpecGridProps {
  specs: { icon: LucideIcon; label: string; value: string }[]
}

interface ComparisonTableProps {
  models: { name: string; price: string; features: string[]; recommended?: boolean }[]
}

interface PackageContentsProps {
  items: string[]
}

interface WarrantyInfoProps {
  coverage: string
  period: string
  details: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
  </div>
)

const ProductTitle = ({ brand, name, tagline }: ProductTitleProps) => (
  <div className="space-y-1">
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

const SpecGrid = ({ specs }: SpecGridProps) => (
  <div className="grid grid-cols-2 gap-3">
    {specs.map((spec, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3 flex items-center gap-3">
          <spec.icon className="size-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">{spec.label}</p>
            <p className="font-medium text-sm">{spec.value}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const ComparisonTable = ({ models }: ComparisonTableProps) => (
  <div className="grid gap-3">
    {models.map((model, i) => (
      <Card key={i} className={model.recommended ? "border-primary bg-primary/5" : "bg-muted/30 border-muted"}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-medium">{model.name}</p>
              <p className="text-sm text-primary font-bold">{model.price}</p>
            </div>
            {model.recommended && <Badge>Recommended</Badge>}
          </div>
          <div className="flex flex-wrap gap-1">
            {model.features.map((feature, j) => (
              <Badge key={j} variant="secondary" className="text-xs">{feature}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const PackageContents = ({ items }: PackageContentsProps) => (
  <ul className="grid grid-cols-2 gap-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-center gap-2 text-sm">
        <span className="size-1.5 rounded-full bg-primary" />
        {item}
      </li>
    ))}
  </ul>
)

const WarrantyInfo = ({ coverage, period, details }: WarrantyInfoProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-medium">{coverage}</p>
        <Badge variant="outline">{period}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{details}</p>
    </CardContent>
  </Card>
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
          {/* Image */}
          <ProductImage
            src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800"
            alt="Wireless earbuds"
            badge="New Release"
          />

          {/* Content */}
          <div className="flex flex-col gap-5">
            <ProductTitle
              brand="AudioPro"
              name="NovaSound Ultra Wireless Earbuds"
              tagline="Premium true wireless with spatial audio"
            />

            <Rating rating={5} reviews={5847} />

            <Price current="$249" original="$299" />

            <SpecGrid
              specs={[
                { icon: Battery, label: "Battery", value: "40h total" },
                { icon: Bluetooth, label: "Connectivity", value: "BT 5.3" },
                { icon: Volume2, label: "ANC", value: "Hybrid" },
                { icon: Zap, label: "Charging", value: "Fast + Wireless" },
              ]}
            />

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="compare" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="compare">Compare</TabsTrigger>
                <TabsTrigger value="package">In the Box</TabsTrigger>
                <TabsTrigger value="warranty">Warranty</TabsTrigger>
              </TabsList>

              <TabsContent value="compare" className="mt-4">
                <ComparisonTable
                  models={[
                    { name: "NovaSound Lite", price: "$149", features: ["30h battery", "BT 5.2", "Basic ANC"] },
                    { name: "NovaSound Ultra", price: "$249", features: ["40h battery", "BT 5.3", "Hybrid ANC", "Spatial Audio"], recommended: true },
                    { name: "NovaSound Pro", price: "$349", features: ["60h battery", "BT 5.3", "Adaptive ANC", "Hi-Res Audio", "Titanium"] },
                  ]}
                />
              </TabsContent>

              <TabsContent value="package" className="mt-4">
                <PackageContents
                  items={[
                    "NovaSound Ultra earbuds",
                    "Wireless charging case",
                    "USB-C cable",
                    "Silicone ear tips (S/M/L)",
                    "Foam ear tips (S/M/L)",
                    "Quick start guide",
                    "Carrying pouch",
                    "Warranty card",
                  ]}
                />
              </TabsContent>

              <TabsContent value="warranty" className="mt-4 space-y-3">
                <WarrantyInfo
                  coverage="Standard Warranty"
                  period="2 Years"
                  details="Covers manufacturing defects and hardware malfunctions under normal use conditions."
                />
                <WarrantyInfo
                  coverage="Extended Protection"
                  period="+1 Year"
                  details="Add accidental damage coverage for $29.99. Includes water damage and drops."
                />
              </TabsContent>
            </Tabs>

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

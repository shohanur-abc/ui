"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Ruler, Scale, Palette, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductDisplayProps {
  src: string
  alt: string
  badge?: string
}

interface HeaderProps {
  designer: string
  name: string
  collection: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  original?: string
}

interface DimensionTableProps {
  dimensions: { label: string; value: string }[]
}

interface ColorSwatchesProps {
  colors: { name: string; hex: string; available: boolean }[]
}

interface MaterialInfoProps {
  materials: { name: string; description: string; icon: LucideIcon }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductDisplay = ({ src, alt, badge }: ProductDisplayProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
  </div>
)

const Header = ({ designer, name, collection }: HeaderProps) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <p className="text-sm text-primary font-medium">{designer}</p>
      <span className="text-muted-foreground">•</span>
      <Badge variant="outline">{collection}</Badge>
    </div>
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
    <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
  </div>
)

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const DimensionTable = ({ dimensions }: DimensionTableProps) => (
  <div className="grid grid-cols-2 gap-3">
    {dimensions.map((dim, i) => (
      <div key={i} className="p-3 rounded-lg bg-muted/30 border border-muted">
        <p className="text-xs text-muted-foreground">{dim.label}</p>
        <p className="font-medium">{dim.value}</p>
      </div>
    ))}
  </div>
)

const ColorSwatches = ({ colors }: ColorSwatchesProps) => (
  <div className="space-y-3">
    <p className="font-medium text-sm">Available Colors</p>
    <div className="flex flex-wrap gap-3">
      {colors.map((color, i) => (
        <div
          key={i}
          className={`flex flex-col items-center gap-1 ${!color.available ? "opacity-40" : ""}`}
        >
          <div
            className="size-10 rounded-full ring-2 ring-offset-2 ring-offset-background ring-transparent hover:ring-primary transition-all cursor-pointer"
            style={{ backgroundColor: color.hex }}
          />
          <span className="text-xs text-muted-foreground">{color.name}</span>
        </div>
      ))}
    </div>
  </div>
)

const MaterialInfo = ({ materials }: MaterialInfoProps) => (
  <div className="space-y-3">
    {materials.map((mat, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <mat.icon className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{mat.name}</p>
            <p className="text-xs text-muted-foreground">{mat.description}</p>
          </div>
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
          {/* Image */}
          <ProductDisplay
            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800"
            alt="Modern chair"
            badge="Designer Pick"
          />

          {/* Content */}
          <div className="flex flex-col gap-5">
            <Header
              designer="Herman Miller"
              name="Eames Lounge Chair Replica"
              collection="Mid-Century Modern"
            />

            <Rating rating={5} reviews={1892} />

            <Price current="$1,299" original="$1,599" />

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="dimensions" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>

              <TabsContent value="dimensions" className="mt-4">
                <DimensionTable
                  dimensions={[
                    { label: "Overall Width", value: "84 cm / 33\"" },
                    { label: "Overall Depth", value: "85 cm / 33.5\"" },
                    { label: "Overall Height", value: "82 cm / 32\"" },
                    { label: "Seat Height", value: "38 cm / 15\"" },
                    { label: "Seat Width", value: "54 cm / 21\"" },
                    { label: "Weight", value: "28 kg / 62 lbs" },
                  ]}
                />
              </TabsContent>

              <TabsContent value="colors" className="mt-4">
                <ColorSwatches
                  colors={[
                    { name: "Black", hex: "#1a1a1a", available: true },
                    { name: "Brown", hex: "#8B4513", available: true },
                    { name: "Tan", hex: "#D2B48C", available: true },
                    { name: "White", hex: "#F5F5F5", available: true },
                    { name: "Navy", hex: "#000080", available: false },
                    { name: "Forest", hex: "#228B22", available: false },
                  ]}
                />
              </TabsContent>

              <TabsContent value="materials" className="mt-4">
                <MaterialInfo
                  materials={[
                    {
                      name: "Premium Italian Leather",
                      description: "Full-grain aniline leather sourced from Italian tanneries, naturally ages beautifully over time.",
                      icon: Palette,
                    },
                    {
                      name: "7-Layer Plywood Shell",
                      description: "Precision-molded plywood with walnut veneer, crafted using original specifications.",
                      icon: Scale,
                    },
                    {
                      name: "Die-Cast Aluminum Base",
                      description: "Heavy-gauge aluminum base with swivel mechanism, hand-polished to a mirror finish.",
                      icon: Ruler,
                    },
                  ]}
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

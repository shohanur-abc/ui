"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Check, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
}

interface ProductHeaderProps {
  brand: string
  name: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  original?: string
}

interface TabContentBlockProps {
  title: string
  content: string
}

interface FeatureListProps {
  features: string[]
}

interface SpecTableProps {
  specs: { label: string; value: string }[]
}

interface CTAProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

const ProductHeader = ({ brand, name }: ProductHeaderProps) => (
  <div className="space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
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

const TabContentBlock = ({ title, content }: TabContentBlockProps) => (
  <div className="space-y-3">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
  </div>
)

const FeatureList = ({ features }: FeatureListProps) => (
  <ul className="space-y-2">
    {features.map((feature, i) => (
      <li key={i} className="flex items-center gap-2 text-sm">
        <Check className="size-4 text-primary" />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
)

const SpecTable = ({ specs }: SpecTableProps) => (
  <div className="space-y-2">
    {specs.map((spec, i) => (
      <div key={i} className="flex justify-between py-2 border-b border-muted last:border-0">
        <span className="text-sm text-muted-foreground">{spec.label}</span>
        <span className="text-sm font-medium">{spec.value}</span>
      </div>
    ))}
  </div>
)

const CTA = ({ buttons }: CTAProps) => (
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
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
            alt="Premium product"
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Badge className="w-fit">Bestseller</Badge>

            <ProductHeader brand="LuxeTech" name="Premium Smart Watch Pro" />

            <Rating rating={5} reviews={2847} />

            <Price current="$399" original="$499" />

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <TabContentBlock
                  title="About this product"
                  content="Experience the future of wearable technology with our Premium Smart Watch Pro. Crafted with precision engineering and premium materials, this smartwatch combines cutting-edge features with timeless design.

The stunning AMOLED display delivers vibrant colors and deep blacks, while the titanium case ensures durability without compromising on style."
                />
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <FeatureList
                  features={[
                    "1.4\" AMOLED Always-On Display",
                    "50+ Sports Modes with Auto-Detection",
                    "Advanced Health Monitoring (SpO2, ECG, Sleep)",
                    "7-Day Battery Life with Fast Charging",
                    "5ATM Water Resistance",
                    "GPS + GLONASS Navigation",
                    "NFC Payments Support",
                    "Voice Assistant Integration",
                  ]}
                />
              </TabsContent>

              <TabsContent value="specs" className="mt-4">
                <SpecTable
                  specs={[
                    { label: "Display", value: "1.4\" AMOLED 454x454" },
                    { label: "Battery", value: "420mAh (7 days)" },
                    { label: "Connectivity", value: "Bluetooth 5.2, WiFi, NFC" },
                    { label: "Sensors", value: "Heart Rate, SpO2, Accelerometer" },
                    { label: "Water Resistance", value: "5ATM (50m)" },
                    { label: "Weight", value: "42g (without strap)" },
                  ]}
                />
              </TabsContent>
            </Tabs>

            <CTA
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

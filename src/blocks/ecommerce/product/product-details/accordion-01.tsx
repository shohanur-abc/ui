"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Check, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
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
}

interface AccordionSectionProps {
  items: { id: string; title: string; content: string }[]
}

interface FeatureListProps {
  features: string[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
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

const AccordionSection = ({ items }: AccordionSectionProps) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((item) => (
      <AccordionItem key={item.id} value={item.id}>
        <AccordionTrigger className="text-sm font-medium">{item.title}</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
          {item.content}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)

const FeatureList = ({ features }: FeatureListProps) => (
  <ul className="grid gap-2">
    {features.map((feature, i) => (
      <li key={i} className="flex items-center gap-2 text-sm">
        <Check className="size-4 text-primary" />
        {feature}
      </li>
    ))}
  </ul>
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
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
            alt="Premium watch"
            badge="New Arrival"
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              brand="Chrono Elite"
              name="Titanium Chronograph Pro"
              tagline="Swiss-made precision timepiece"
            />

            <Rating rating={5} reviews={2341} />

            <Price current="$1,899" original="$2,299" />

            <Separator />

            <FeatureList
              features={[
                "Swiss automatic movement",
                "Sapphire crystal glass",
                "100m water resistance",
                "Titanium case and bracelet",
              ]}
            />

            <AccordionSection
              items={[
                {
                  id: "description",
                  title: "Description",
                  content: "The Titanium Chronograph Pro represents the pinnacle of Swiss watchmaking. Featuring a precision automatic movement, this timepiece combines classic elegance with modern durability. The lightweight titanium construction ensures comfort for all-day wear."
                },
                {
                  id: "specifications",
                  title: "Specifications",
                  content: "Movement: Swiss Automatic • Case: 42mm Titanium • Crystal: Sapphire with AR coating • Water Resistance: 100m • Power Reserve: 48 hours • Bracelet: Titanium with deployant clasp"
                },
                {
                  id: "shipping",
                  title: "Shipping & Returns",
                  content: "Free expedited shipping on all orders. Full refund within 30 days. 5-year international warranty included."
                },
                {
                  id: "care",
                  title: "Care Instructions",
                  content: "Clean with a soft, lint-free cloth. Avoid exposure to extreme temperatures. Service every 4-5 years to maintain accuracy."
                },
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

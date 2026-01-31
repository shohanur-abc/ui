"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Sparkles, Droplets, Leaf, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
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
  size: string
}

interface BenefitsProps {
  benefits: { icon: LucideIcon; title: string; description: string }[]
}

interface IngredientsProps {
  ingredients: { name: string; benefit: string }[]
}

interface HowToUseProps {
  steps: { step: number; instruction: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <div className="flex justify-center">
    <div className="relative w-72 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-950/30 dark:to-rose-950/30">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="text-center space-y-2">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
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

const Price = ({ current, original, size }: PriceProps) => (
  <div className="text-center">
    <div className="flex items-baseline justify-center gap-3">
      <span className="text-4xl font-bold text-primary">{current}</span>
      {original && <span className="text-xl text-muted-foreground line-through">{original}</span>}
    </div>
    <p className="text-sm text-muted-foreground mt-1">{size}</p>
  </div>
)

const Benefits = ({ benefits }: BenefitsProps) => (
  <div className="grid @sm:grid-cols-3 gap-4">
    {benefits.map((benefit, i) => (
      <Card key={i} className="bg-muted/30 border-muted text-center">
        <CardContent className="p-5">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <benefit.icon className="size-6 text-primary" />
          </div>
          <p className="font-medium">{benefit.title}</p>
          <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const Ingredients = ({ ingredients }: IngredientsProps) => (
  <div className="space-y-4">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">Key Ingredients</p>
    <div className="grid @sm:grid-cols-2 gap-3">
      {ingredients.map((ingredient, i) => (
        <div key={i} className="p-4 rounded-xl bg-muted/30 border border-muted">
          <p className="font-medium">{ingredient.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{ingredient.benefit}</p>
        </div>
      ))}
    </div>
  </div>
)

const HowToUse = ({ steps }: HowToUseProps) => (
  <div className="space-y-4">
    <p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">How To Use</p>
    <div className="max-w-xl mx-auto space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold text-sm">
            {step.step}
          </div>
          <p className="text-muted-foreground pt-1">{step.instruction}</p>
        </div>
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
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
            alt="Skincare serum"
          />

          {/* Header */}
          <Header
            brand="The Ordinary"
            name="Hyaluronic Acid 2% + B5"
            tagline="Multi-depth hydration serum with vitamin B5"
          />

          {/* Rating */}
          <Rating rating={5} reviews={15234} />

          <Separator />

          {/* Price */}
          <Price current="$8.90" size="30ml / 1 fl oz" />

          {/* Benefits */}
          <Benefits
            benefits={[
              { icon: Droplets, title: "Deep Hydration", description: "Penetrates multiple skin layers" },
              { icon: Sparkles, title: "Plumps Skin", description: "Reduces fine lines appearance" },
              { icon: Leaf, title: "Vegan & Clean", description: "No parabens or sulfates" },
            ]}
          />

          {/* Ingredients */}
          <Ingredients
            ingredients={[
              { name: "Hyaluronic Acid", benefit: "Attracts and retains moisture in the skin" },
              { name: "Vitamin B5", benefit: "Enhances hydration and helps skin heal" },
              { name: "Sodium Hyaluronate", benefit: "Low molecular weight for deeper penetration" },
              { name: "Panthenol", benefit: "Soothes and protects the skin barrier" },
            ]}
          />

          {/* How to use */}
          <HowToUse
            steps={[
              { step: 1, instruction: "Apply to clean, slightly damp skin in the AM and PM." },
              { step: 2, instruction: "Use a few drops and pat gently into skin." },
              { step: 3, instruction: "Follow with your favorite moisturizer or oil." },
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

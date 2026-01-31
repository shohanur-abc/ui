"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, ShoppingCart, Heart, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GalleryProps {
  main: { src: string; alt: string }
  thumbnails: { src: string; alt: string }[]
}

interface HeaderProps {
  brand: string
  name: string
}

interface RatingBreakdownProps {
  average: number
  total: number
  breakdown: { stars: number; percentage: number }[]
}

interface PriceProps {
  current: string
  original?: string
}

interface NutritionAccordionProps {
  sections: { id: string; title: string; items: { label: string; value: string; percent?: number }[] }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const Gallery = ({ main, thumbnails }: GalleryProps) => (
  <div className="space-y-3">
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30">
      <Image src={main.src} alt={main.alt} fill className="object-contain p-8" />
    </div>
    <div className="grid grid-cols-4 gap-2">
      {thumbnails.map((thumb, i) => (
        <div key={i} className={`relative aspect-square overflow-hidden rounded-lg bg-muted ring-2 transition-all cursor-pointer ${i === 0 ? "ring-primary" : "ring-transparent hover:ring-primary/50"}`}>
          <Image src={thumb.src} alt={thumb.alt} fill className="object-contain p-2" />
        </div>
      ))}
    </div>
  </div>
)

const Header = ({ brand, name }: HeaderProps) => (
  <div className="space-y-1">
    <Badge variant="secondary">{brand}</Badge>
    <h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
  </div>
)

const RatingBreakdown = ({ average, total, breakdown }: RatingBreakdownProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-4">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold">{average}</p>
          <div className="flex gap-0.5 my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-3 ${i < Math.floor(average) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{total.toLocaleString()} reviews</p>
        </div>
        <div className="flex-1 space-y-1">
          {breakdown.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs w-3">{item.stars}</span>
              <Progress value={item.percentage} className="flex-1 h-1.5" />
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
)

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const NutritionAccordion = ({ sections }: NutritionAccordionProps) => (
  <Accordion type="multiple" defaultValue={["nutrition"]} className="w-full">
    {sections.map((section) => (
      <AccordionItem key={section.id} value={section.id}>
        <AccordionTrigger className="text-sm font-medium">{section.title}</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-muted/50 last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.value}</span>
                  {item.percent !== undefined && (
                    <span className="text-xs text-muted-foreground">{item.percent}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
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
          {/* Gallery */}
          <Gallery
            main={{ src: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=800", alt: "Protein powder" }}
            thumbnails={[
              { src: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=200", alt: "Front" },
              { src: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=200", alt: "Nutrition" },
              { src: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=200", alt: "Scoop" },
              { src: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=200", alt: "Ingredients" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header brand="Organic Valley" name="Plant-Based Protein Powder" />

            <RatingBreakdown
              average={4.8}
              total={5892}
              breakdown={[
                { stars: 5, percentage: 75 },
                { stars: 4, percentage: 18 },
                { stars: 3, percentage: 5 },
                { stars: 2, percentage: 1 },
                { stars: 1, percentage: 1 },
              ]}
            />

            <Price current="$42" original="$52" />

            <NutritionAccordion
              sections={[
                {
                  id: "nutrition",
                  title: "Nutrition Facts (per serving)",
                  items: [
                    { label: "Calories", value: "120", percent: undefined },
                    { label: "Protein", value: "24g", percent: 48 },
                    { label: "Total Carbs", value: "4g", percent: 1 },
                    { label: "Fiber", value: "2g", percent: 7 },
                    { label: "Sugar", value: "1g", percent: undefined },
                    { label: "Fat", value: "2g", percent: 3 },
                  ],
                },
                {
                  id: "ingredients",
                  title: "Ingredients",
                  items: [
                    { label: "Pea Protein Isolate", value: "Primary" },
                    { label: "Brown Rice Protein", value: "Secondary" },
                    { label: "Natural Flavors", value: "Added" },
                    { label: "Stevia Leaf Extract", value: "Sweetener" },
                  ],
                },
                {
                  id: "allergens",
                  title: "Allergen Information",
                  items: [
                    { label: "Contains", value: "None" },
                    { label: "May contain traces of", value: "Tree nuts, soy" },
                    { label: "Facility", value: "Gluten-free certified" },
                  ],
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

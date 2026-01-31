"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Cpu, Battery, Monitor, Wifi, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductShowcaseProps {
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

interface QuickSpecsProps {
  specs: { icon: LucideIcon; label: string; value: string }[]
}

interface TechAccordionProps {
  sections: { id: string; title: string; specs: { label: string; value: string }[] }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductShowcase = ({ src, alt, badge }: ProductShowcaseProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
    <Image src={src} alt={alt} fill className="object-contain p-12" />
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

const QuickSpecs = ({ specs }: QuickSpecsProps) => (
  <div className="grid grid-cols-2 gap-3">
    {specs.map((spec, i) => (
      <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
        <spec.icon className="size-5 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground">{spec.label}</p>
          <p className="text-sm font-medium">{spec.value}</p>
        </div>
      </div>
    ))}
  </div>
)

const TechAccordion = ({ sections }: TechAccordionProps) => (
  <Accordion type="single" collapsible className="w-full">
    {sections.map((section) => (
      <AccordionItem key={section.id} value={section.id}>
        <AccordionTrigger className="text-sm font-medium">{section.title}</AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            {section.specs.map((spec, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-muted/50 last:border-0">
                <span className="text-sm text-muted-foreground">{spec.label}</span>
                <span className="text-sm font-medium">{spec.value}</span>
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
          {/* Image */}
          <ProductShowcase
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
            alt="Laptop"
            badge="M3 Pro Chip"
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              brand="Apple"
              name="MacBook Pro 14-inch"
              tagline="Supercharged for pros"
            />

            <Rating rating={5} reviews={12847} />

            <Price current="$1,999" original="$2,199" />

            <Separator />

            <QuickSpecs
              specs={[
                { icon: Cpu, label: "Chip", value: "Apple M3 Pro" },
                { icon: Monitor, label: "Display", value: "14.2\" Liquid Retina XDR" },
                { icon: Battery, label: "Battery", value: "Up to 18 hours" },
                { icon: Wifi, label: "Wireless", value: "Wi-Fi 6E" },
              ]}
            />

            <TechAccordion
              sections={[
                {
                  id: "display",
                  title: "Display",
                  specs: [
                    { label: "Size", value: "14.2 inches" },
                    { label: "Resolution", value: "3024 x 1964 pixels" },
                    { label: "Technology", value: "Liquid Retina XDR" },
                    { label: "Refresh Rate", value: "ProMotion up to 120Hz" },
                    { label: "Brightness", value: "1000 nits sustained, 1600 peak" },
                  ],
                },
                {
                  id: "performance",
                  title: "Performance",
                  specs: [
                    { label: "CPU Cores", value: "12-core (6P + 6E)" },
                    { label: "GPU Cores", value: "18-core" },
                    { label: "Neural Engine", value: "16-core" },
                    { label: "Memory", value: "18GB Unified" },
                    { label: "Storage", value: "512GB SSD" },
                  ],
                },
                {
                  id: "connectivity",
                  title: "Connectivity & Ports",
                  specs: [
                    { label: "Thunderbolt", value: "3 ports (USB-C)" },
                    { label: "HDMI", value: "1 port (supports 8K)" },
                    { label: "SD Card", value: "SDXC slot" },
                    { label: "MagSafe", value: "MagSafe 3 charging" },
                    { label: "Audio", value: "3.5mm headphone jack" },
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

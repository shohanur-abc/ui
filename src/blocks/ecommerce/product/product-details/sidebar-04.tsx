"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Star, ShoppingCart, Heart, Cpu, HardDrive, Monitor, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
}

interface ConfigSidebarProps {
  configs: { icon: LucideIcon; label: string; options: { value: string; price?: string }[] }[]
}

interface HeaderProps {
  brand: string
  name: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  label: string
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

const ConfigSidebar = ({ configs }: ConfigSidebarProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-6 space-y-6">
      {configs.map((config, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-2">
            <config.icon className="size-4 text-primary" />
            <Label className="font-medium">{config.label}</Label>
          </div>
          <RadioGroup defaultValue={config.options[0].value}>
            {config.options.map((option, j) => (
              <div key={j} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={option.value} id={`${config.label}-${j}`} />
                  <Label htmlFor={`${config.label}-${j}`} className="text-sm cursor-pointer">{option.value}</Label>
                </div>
                {option.price && <span className="text-xs text-muted-foreground">{option.price}</span>}
              </div>
            ))}
          </RadioGroup>
          {i < configs.length - 1 && <Separator />}
        </div>
      ))}
    </CardContent>
  </Card>
)

const Header = ({ brand, name }: HeaderProps) => (
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
    <span className="text-sm text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
  </div>
)

const Price = ({ current, label }: PriceProps) => (
  <div className="space-y-1">
    <p className="text-sm text-muted-foreground">{label}</p>
    <span className="text-3xl font-bold text-primary">{current}</span>
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
        <div className="grid @lg:grid-cols-[1fr_320px] gap-8">
          {/* Main content */}
          <div className="space-y-6">
            <ProductImage
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200"
              alt="MacBook Pro"
            />

            <div className="flex flex-col gap-5">
              <Header brand="Apple" name="MacBook Pro 16&quot; M3 Pro" />

              <Rating rating={5} reviews={4521} />

              <Price current="From $2,499" label="Starting at" />

              <Separator />

              <Description
                text="The most advanced Mac laptop for demanding workflows. The M3 Pro chip delivers exceptional performance for professional workflows and creative tasks with industry-leading power efficiency."
              />

              <Actions
                buttons={[
                  { label: "Add to Bag", href: "#cart", icon: ShoppingCart },
                  { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
                ]}
              />
            </div>
          </div>

          {/* Config sidebar */}
          <aside>
            <ConfigSidebar
              configs={[
                {
                  icon: Cpu,
                  label: "Chip",
                  options: [
                    { value: "M3 Pro (11-core)", price: "+$0" },
                    { value: "M3 Pro (12-core)", price: "+$200" },
                    { value: "M3 Max (14-core)", price: "+$500" },
                  ],
                },
                {
                  icon: HardDrive,
                  label: "Memory",
                  options: [
                    { value: "18GB Unified Memory", price: "+$0" },
                    { value: "36GB Unified Memory", price: "+$200" },
                    { value: "48GB Unified Memory", price: "+$400" },
                  ],
                },
                {
                  icon: Monitor,
                  label: "Storage",
                  options: [
                    { value: "512GB SSD", price: "+$0" },
                    { value: "1TB SSD", price: "+$200" },
                    { value: "2TB SSD", price: "+$400" },
                  ],
                },
              ]}
            />
          </aside>
        </div>
      </div>
    </section>
  )
}

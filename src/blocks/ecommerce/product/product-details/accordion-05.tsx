"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Ruler, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GalleryProps {
  images: { src: string; alt: string }[]
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

interface SizeSelectorProps {
  sizes: { name: string; available: boolean }[]
}

interface StyleAccordionProps {
  sections: { id: string; title: string; content: string | string[] }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const Gallery = ({ images }: GalleryProps) => (
  <div className="grid grid-cols-2 gap-2">
    {images.map((img, i) => (
      <div key={i} className={`relative overflow-hidden rounded-xl bg-muted ${i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"}`}>
        <Image src={img.src} alt={img.alt} fill className="object-cover" />
      </div>
    ))}
  </div>
)

const Header = ({ designer, name, collection }: HeaderProps) => (
  <div className="space-y-2">
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

const SizeSelector = ({ sizes }: SizeSelectorProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">Select Size</p>
      <Button variant="link" size="sm" className="gap-1 h-auto p-0">
        <Ruler className="size-3" />
        Size Guide
      </Button>
    </div>
    <div className="grid grid-cols-5 gap-2">
      {sizes.map((size, i) => (
        <button
          key={i}
          disabled={!size.available}
          className={`p-2 rounded-lg border text-sm font-medium transition-all ${
            size.available
              ? "border-muted hover:border-primary/50"
              : "border-muted/50 text-muted-foreground/50 cursor-not-allowed"
          }`}
        >
          {size.name}
        </button>
      ))}
    </div>
  </div>
)

const StyleAccordion = ({ sections }: StyleAccordionProps) => (
  <Accordion type="single" collapsible defaultValue="description" className="w-full">
    {sections.map((section) => (
      <AccordionItem key={section.id} value={section.id}>
        <AccordionTrigger className="text-sm font-medium">{section.title}</AccordionTrigger>
        <AccordionContent>
          {Array.isArray(section.content) ? (
            <ul className="space-y-1">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="size-1 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
          )}
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
            images={[
              { src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800", alt: "Dress front" },
              { src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", alt: "Dress side" },
              { src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", alt: "Dress back" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              designer="Reformation"
              name="Juliette Midi Dress"
              collection="Spring 2026"
            />

            <Rating rating={5} reviews={1892} />

            <Price current="$278" original="$348" />

            <Separator />

            <SizeSelector
              sizes={[
                { name: "XS", available: true },
                { name: "S", available: true },
                { name: "M", available: true },
                { name: "L", available: false },
                { name: "XL", available: true },
              ]}
            />

            <StyleAccordion
              sections={[
                {
                  id: "description",
                  title: "Description",
                  content: "The Juliette dress is a fitted midi dress with a sweetheart neckline and adjustable straps. Made from our signature deadstock fabric, it's a sustainable choice that doesn't compromise on style. The side slit adds a touch of elegance while allowing for easy movement.",
                },
                {
                  id: "details",
                  title: "Product Details",
                  content: [
                    "Sweetheart neckline",
                    "Adjustable spaghetti straps",
                    "Invisible back zipper",
                    "Side slit at hem",
                    "Midi length (43\" from shoulder)",
                    "Fitted throughout with slight flare at hem",
                  ],
                },
                {
                  id: "materials",
                  title: "Materials & Care",
                  content: [
                    "95% Viscose, 5% Elastane",
                    "Dry clean recommended",
                    "Made from deadstock fabric",
                    "Designed and made in Los Angeles",
                  ],
                },
                {
                  id: "sustainability",
                  title: "Sustainability",
                  content: "This dress is made from deadstock fabric, saving an estimated 2,894 gallons of water compared to conventional production. We're committed to reducing fashion's environmental impact one garment at a time.",
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

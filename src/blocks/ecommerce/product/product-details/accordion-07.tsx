"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, HelpCircle, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
}

interface HeaderProps {
  category: string
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

interface FAQAccordionProps {
  faqs: { id: string; question: string; answer: string }[]
}

interface QuickInfoProps {
  items: { label: string; value: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

const Header = ({ category, name, tagline }: HeaderProps) => (
  <div className="space-y-2">
    <Badge variant="secondary">{category}</Badge>
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

const FAQAccordion = ({ faqs }: FAQAccordionProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <HelpCircle className="size-4 text-primary" />
      <p className="font-medium text-sm">Frequently Asked Questions</p>
    </div>
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-sm font-medium text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)

const QuickInfo = ({ items }: QuickInfoProps) => (
  <div className="grid grid-cols-2 gap-2">
    {items.map((item, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className="font-medium text-sm">{item.value}</p>
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
          <ProductImage
            src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800"
            alt="Wireless earbuds"
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              category="Audio"
              name="NovaSound Pro Wireless Earbuds"
              tagline="Premium true wireless with spatial audio"
            />

            <Rating rating={5} reviews={8934} />

            <Price current="$249" original="$299" />

            <Separator />

            <QuickInfo
              items={[
                { label: "Battery Life", value: "40 hours total" },
                { label: "Noise Cancellation", value: "Hybrid ANC" },
                { label: "Connectivity", value: "Bluetooth 5.3" },
                { label: "Water Resistance", value: "IPX5" },
              ]}
            />

            <FAQAccordion
              faqs={[
                {
                  id: "faq-1",
                  question: "How long does the battery last?",
                  answer: "The earbuds provide up to 8 hours of playback on a single charge. The charging case adds an additional 32 hours, for a total of 40 hours. A 10-minute quick charge gives you 2 hours of listening time.",
                },
                {
                  id: "faq-2",
                  question: "Are they compatible with my device?",
                  answer: "The NovaSound Pro works with any Bluetooth-enabled device, including iPhone, Android phones, tablets, laptops, and gaming consoles. They also support multipoint connection to switch between two devices.",
                },
                {
                  id: "faq-3",
                  question: "Can I use just one earbud?",
                  answer: "Yes! Each earbud can be used independently. The earbuds automatically detect when you're using one or both and adjust the audio accordingly.",
                },
                {
                  id: "faq-4",
                  question: "How do I clean them?",
                  answer: "Use a soft, dry lint-free cloth for the exterior. For ear tips, remove them and wash with mild soap and water. Let them dry completely before reattaching. Never use liquids on the earbuds themselves.",
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

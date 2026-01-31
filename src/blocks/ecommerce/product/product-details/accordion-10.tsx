"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Gamepad2, Monitor, Clock, Users, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GameCoverProps {
  src: string
  alt: string
  badges: string[]
}

interface HeaderProps {
  publisher: string
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

interface GameInfoCardsProps {
  info: { icon: LucideIcon; label: string; value: string }[]
}

interface GameDetailsAccordionProps {
  sections: { id: string; title: string; content: string | string[] }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const GameCover = ({ src, alt, badges }: GameCoverProps) => (
  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900">
    <Image src={src} alt={alt} fill className="object-cover" />
    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
      {badges.map((badge, i) => (
        <Badge key={i} variant={i === 0 ? "default" : "secondary"}>{badge}</Badge>
      ))}
    </div>
  </div>
)

const Header = ({ publisher, name, tagline }: HeaderProps) => (
  <div className="space-y-2">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{publisher}</p>
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

const GameInfoCards = ({ info }: GameInfoCardsProps) => (
  <div className="grid grid-cols-2 gap-2">
    {info.map((item, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-3 flex items-center gap-2">
          <item.icon className="size-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-medium text-sm">{item.value}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const GameDetailsAccordion = ({ sections }: GameDetailsAccordionProps) => (
  <Accordion type="single" collapsible defaultValue="about" className="w-full">
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
          {/* Cover */}
          <GameCover
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800"
            alt="Game cover"
            badges={["New Release", "Action RPG"]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              publisher="Epic Games"
              name="Cosmic Odyssey: Reborn"
              tagline="An epic adventure across the stars"
            />

            <Rating rating={5} reviews={45892} />

            <Price current="$59.99" original="$69.99" />

            <Separator />

            <GameInfoCards
              info={[
                { icon: Gamepad2, label: "Platform", value: "PC, PS5, Xbox" },
                { icon: Monitor, label: "Graphics", value: "4K HDR" },
                { icon: Clock, label: "Playtime", value: "60+ hours" },
                { icon: Users, label: "Multiplayer", value: "Up to 4 co-op" },
              ]}
            />

            <GameDetailsAccordion
              sections={[
                {
                  id: "about",
                  title: "About This Game",
                  content: "Embark on an epic journey through the cosmos in Cosmic Odyssey: Reborn. As Commander Nova, you'll explore uncharted galaxies, forge alliances with alien civilizations, and uncover ancient mysteries that threaten the fabric of reality itself. Featuring stunning visuals, deep RPG mechanics, and a gripping narrative.",
                },
                {
                  id: "features",
                  title: "Key Features",
                  content: [
                    "Explore 50+ unique planets and moons",
                    "Deep character customization with 8 classes",
                    "Real-time tactical combat system",
                    "Branching storyline with multiple endings",
                    "Seamless 4-player co-op campaign",
                    "New Game+ with enhanced challenges",
                  ],
                },
                {
                  id: "requirements",
                  title: "System Requirements",
                  content: [
                    "OS: Windows 11 64-bit",
                    "Processor: Intel i7-12700 / AMD Ryzen 7 5800X",
                    "Memory: 16 GB RAM",
                    "Graphics: RTX 3070 / RX 6800 XT",
                    "Storage: 100 GB SSD",
                    "DirectX: Version 12",
                  ],
                },
              ]}
            />

            <Actions
              buttons={[
                { label: "Buy Now", href: "#cart", icon: ShoppingCart },
                { label: "Wishlist", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

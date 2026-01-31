"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Play, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MediaCarouselProps {
  items: { type: "image" | "video"; src: string; alt: string; thumbnail?: string }[]
  currentIndex: number
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
  discount?: string
}

interface FeatureTagsProps {
  tags: string[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const MediaCarousel = ({ items, currentIndex }: MediaCarouselProps) => {
  const current = items[currentIndex]
  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
        {current.type === "video" ? (
          <div className="relative w-full h-full">
            <Image src={current.thumbnail || current.src} alt={current.alt} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button size="icon" variant="secondary" className="size-16 rounded-full">
                <Play className="size-8 fill-current" />
              </Button>
            </div>
          </div>
        ) : (
          <Image src={current.src} alt={current.alt} fill className="object-cover" />
        )}
        <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm">
          <ChevronLeft className="size-5" />
        </Button>
        <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm">
          <ChevronRight className="size-5" />
        </Button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {items.map((item, i) => (
          <div
            key={i}
            className={`relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg cursor-pointer border-2 transition-colors ${i === currentIndex ? "border-primary" : "border-transparent hover:border-primary/50"}`}
          >
            <Image src={item.thumbnail || item.src} alt={item.alt} fill className="object-cover" />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="size-4 fill-white text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

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

const Price = ({ current, original, discount }: PriceProps) => (
  <div className="flex items-center gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
    {discount && <Badge variant="destructive">{discount}</Badge>}
  </div>
)

const FeatureTags = ({ tags }: FeatureTagsProps) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, i) => (
      <Badge key={i} variant="outline">{tag}</Badge>
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
          {/* Media carousel */}
          <MediaCarousel
            items={[
              { type: "video", src: "https://example.com/video.mp4", alt: "Product video", thumbnail: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800" },
              { type: "image", src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800", alt: "Front view" },
              { type: "image", src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800", alt: "Side view" },
              { type: "image", src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800", alt: "Detail view" },
            ]}
            currentIndex={0}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              brand="DJI"
              name="Mavic 3 Pro"
              tagline="Triple-camera system with 4/3 CMOS Hasselblad camera"
            />

            <Rating rating={5} reviews={3421} />

            <Price current="$2,199" original="$2,499" discount="-12%" />

            <Separator />

            <FeatureTags
              tags={[
                "4K/120fps Video",
                "46-min Flight Time",
                "15km Range",
                "Omnidirectional Sensing",
                "Apple ProRes",
                "D-Log M",
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

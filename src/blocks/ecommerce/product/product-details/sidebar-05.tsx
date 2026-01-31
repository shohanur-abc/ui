"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductGalleryProps {
  images: { src: string; alt: string }[]
}

interface RelatedSidebarProps {
  title: string
  products: { src: string; name: string; price: string }[]
}

interface HeaderProps {
  category: string
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

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductGallery = ({ images }: ProductGalleryProps) => (
  <div className="grid grid-cols-2 gap-2">
    {images.map((image, i) => (
      <div key={i} className={`relative overflow-hidden rounded-xl bg-muted ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}>
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
    ))}
  </div>
)

const RelatedSidebar = ({ title, products }: RelatedSidebarProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold">{title}</h3>
    <div className="space-y-3">
      {products.map((product, i) => (
        <Card key={i} className="bg-muted/30 border-muted overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="relative size-20 flex-shrink-0 bg-muted">
                <Image src={product.src} alt={product.name} fill className="object-cover" />
              </div>
              <div className="py-2 pr-3">
                <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                <p className="text-sm text-primary font-semibold">{product.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

const Header = ({ category, name }: HeaderProps) => (
  <div className="space-y-2">
    <Badge variant="secondary">{category}</Badge>
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

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
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
        <div className="grid @lg:grid-cols-[1fr_280px] gap-8">
          {/* Main content */}
          <div className="grid @md:grid-cols-2 gap-8">
            <ProductGallery
              images={[
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", alt: "Headphones main" },
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", alt: "Headphones detail" },
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", alt: "Headphones case" },
              ]}
            />

            <div className="flex flex-col gap-5">
              <Header category="Over-Ear Headphones" name="Bose QuietComfort Ultra" />

              <Rating rating={5} reviews={5621} />

              <Price current="$429" original="$479" />

              <Separator />

              <Description
                text="World-class noise cancellation with spatial audio. The most immersive audio experience for music, calls, and everything in between with all-day comfort."
              />

              <Actions
                buttons={[
                  { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                  { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
                ]}
              />
            </div>
          </div>

          {/* Related sidebar */}
          <aside>
            <RelatedSidebar
              title="Complete Your Setup"
              products={[
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", name: "Bose Headphone Case", price: "$39" },
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", name: "Replacement Ear Cushions", price: "$29" },
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", name: "Audio Cable 3.5mm", price: "$19" },
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", name: "Wireless Charger Stand", price: "$49" },
              ]}
            />
          </aside>
        </div>
      </div>
    </section>
  )
}

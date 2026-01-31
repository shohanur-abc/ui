"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, ArrowRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
}

interface CategorySidebarProps {
  categories: { name: string; count: number; href: string }[]
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
  original?: string
  discount?: string
}

interface TagsProps {
  tags: string[]
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

const CategorySidebar = ({ categories }: CategorySidebarProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-5">
      <h3 className="font-semibold mb-4">Browse Categories</h3>
      <nav className="space-y-1">
        {categories.map((category, i) => (
          <Link
            key={i}
            href={category.href}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
          >
            <span className="text-sm">{category.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{category.count}</span>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </nav>
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

const Price = ({ current, original, discount }: PriceProps) => (
  <div className="flex items-center gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
    {discount && <Badge variant="destructive">{discount}</Badge>}
  </div>
)

const Tags = ({ tags }: TagsProps) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, i) => (
      <Badge key={i} variant="outline">{tag}</Badge>
    ))}
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
        <div className="grid @lg:grid-cols-[240px_1fr] gap-8">
          {/* Left category sidebar */}
          <aside>
            <CategorySidebar
              categories={[
                { name: "All Cameras", count: 156, href: "#cameras" },
                { name: "Mirrorless", count: 78, href: "#mirrorless" },
                { name: "DSLR", count: 45, href: "#dslr" },
                { name: "Point & Shoot", count: 33, href: "#point-shoot" },
                { name: "Action Cameras", count: 28, href: "#action" },
                { name: "Film Cameras", count: 12, href: "#film" },
              ]}
            />
          </aside>

          {/* Main content */}
          <div className="grid @md:grid-cols-2 gap-8">
            <ProductImage
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"
              alt="Canon camera"
            />

            <div className="flex flex-col gap-5">
              <Header brand="Canon" name="EOS R6 Mark II" />

              <Rating rating={5} reviews={1234} />

              <Price current="$2,499" original="$2,699" discount="-7%" />

              <Separator />

              <Tags tags={["Full Frame", "24.2 MP", "4K 60p", "Up to 40 fps", "IBIS"]} />

              <Description
                text="The EOS R6 Mark II camera is built for creators who want a versatile full-frame camera that can do it all. With improved autofocus, higher resolution, and faster continuous shooting."
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
      </div>
    </section>
  )
}

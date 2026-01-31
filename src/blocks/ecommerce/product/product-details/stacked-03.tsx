"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Star, ShoppingCart, Heart, ThumbsUp, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductBannerProps {
  src: string
  alt: string
  badge?: string
}

interface HeaderProps {
  brand: string
  name: string
}

interface RatingSummaryProps {
  average: number
  total: number
  breakdown: { stars: number; count: number }[]
}

interface PriceProps {
  current: string
  original?: string
  discount?: string
}

interface FeaturedReviewProps {
  author: string
  avatar: string
  rating: number
  title: string
  content: string
  helpful: number
  date: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductBanner = ({ src, alt, badge }: ProductBannerProps) => (
  <div className="relative aspect-[3/1] overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4" variant="destructive">{badge}</Badge>}
  </div>
)

const Header = ({ brand, name }: HeaderProps) => (
  <div className="text-center space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
    <h1 className="text-3xl @sm:text-4xl font-bold tracking-tight">{name}</h1>
  </div>
)

const RatingSummary = ({ average, total, breakdown }: RatingSummaryProps) => {
  const maxCount = Math.max(...breakdown.map((b) => b.count))
  return (
    <Card className="bg-muted/30 border-muted">
      <CardContent className="p-6">
        <div className="grid @sm:grid-cols-[auto_1fr] gap-8">
          <div className="text-center @sm:text-left">
            <div className="text-5xl font-bold text-primary">{average}</div>
            <div className="flex justify-center @sm:justify-start mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-5 ${i < average ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{total.toLocaleString()} reviews</p>
          </div>
          <div className="space-y-2">
            {breakdown.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm w-3">{b.stars}</span>
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <Progress value={(b.count / maxCount) * 100} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground w-12">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const Price = ({ current, original, discount }: PriceProps) => (
  <div className="flex items-center justify-center gap-4">
    <span className="text-4xl font-bold text-primary">{current}</span>
    {original && <span className="text-xl text-muted-foreground line-through">{original}</span>}
    {discount && <Badge variant="destructive">{discount}</Badge>}
  </div>
)

const FeaturedReview = ({ author, avatar, rating, title, content, helpful, date }: FeaturedReviewProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="relative size-12 rounded-full overflow-hidden bg-muted">
          <Image src={avatar} alt={author} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{author}</p>
            <Badge variant="secondary" className="text-xs">Featured Review</Badge>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground leading-relaxed">{content}</p>
      <div className="flex items-center gap-2 mt-4">
        <ThumbsUp className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{helpful} people found this helpful</span>
      </div>
    </CardContent>
  </Card>
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
          {/* Banner */}
          <ProductBanner
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200"
            alt="Premium headphones"
            badge="BESTSELLER"
          />

          {/* Header */}
          <Header
            brand="Sony"
            name="WH-1000XM5 Wireless Headphones"
          />

          {/* Rating summary */}
          <RatingSummary
            average={5}
            total={24689}
            breakdown={[
              { stars: 5, count: 18234 },
              { stars: 4, count: 4521 },
              { stars: 3, count: 1234 },
              { stars: 2, count: 456 },
              { stars: 1, count: 244 },
            ]}
          />

          {/* Price */}
          <Price current="$348" original="$400" discount="Save $52" />

          <Separator />

          {/* Featured review */}
          <FeaturedReview
            author="Sarah Mitchell"
            avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
            rating={5}
            title="The best noise-cancelling headphones I've ever owned"
            content="After trying numerous brands and models over the years, these Sony headphones have completely exceeded my expectations. The noise cancellation is incredibly effective, blocking out everything from airplane engines to office chatter. The sound quality is phenomenal with rich bass and crystal-clear highs. Battery life is outstanding – I can use them for over a week on a single charge. The comfort level is unmatched, even during long listening sessions."
            helpful={1234}
            date="2 weeks ago"
          />

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

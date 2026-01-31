"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Clock, Calendar, Bell, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  badge?: string
}

interface CountdownSidebarProps {
  title: string
  subtitle: string
  endDate: string
  timeLeft: { days: number; hours: number; minutes: number; seconds: number }
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

interface StockInfoProps {
  inStock: number
  sold: number
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && <Badge className="absolute top-4 left-4" variant="destructive">{badge}</Badge>}
  </div>
)

const CountdownSidebar = ({ title, subtitle, endDate, timeLeft }: CountdownSidebarProps) => (
  <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
    <CardHeader className="pb-2 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="size-5 text-primary animate-pulse" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="grid grid-cols-4 gap-2 text-center mb-4">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Mins" },
          { value: timeLeft.seconds, label: "Secs" },
        ].map((item, i) => (
          <div key={i} className="bg-background/50 rounded-lg p-2">
            <div className="text-2xl font-bold text-primary">{item.value.toString().padStart(2, "0")}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Calendar className="size-3" />
        <span>Ends {endDate}</span>
      </div>
      <Button className="w-full mt-4 gap-2" variant="outline" size="sm">
        <Bell className="size-4" />
        Notify Me
      </Button>
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

const StockInfo = ({ inStock, sold }: StockInfoProps) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">Available</span>
      <span className="font-medium">{inStock} units</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full"
        style={{ width: `${(sold / (sold + inStock)) * 100}%` }}
      />
    </div>
    <p className="text-xs text-muted-foreground text-center">{sold} sold</p>
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
            <ProductImage
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800"
              alt="Smart watch"
              badge="Flash Sale"
            />

            <div className="flex flex-col gap-5">
              <Header brand="Apple" name="Apple Watch Ultra 2" />

              <Rating rating={5} reviews={8432} />

              <Price current="$699" original="$799" discount="-12%" />

              <Separator />

              <StockInfo inStock={23} sold={177} />

              <Description
                text="The most rugged and capable Apple Watch ever. With precision dual-frequency GPS, up to 36 hours of battery life, and a corrosion-resistant titanium case."
              />

              <Actions
                buttons={[
                  { label: "Buy Now", href: "#cart", icon: ShoppingCart },
                  { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
                ]}
              />
            </div>
          </div>

          {/* Countdown sidebar */}
          <aside>
            <CountdownSidebar
              title="Limited Time Offer"
              subtitle="Don't miss this exclusive deal!"
              endDate="Dec 31, 2024"
              timeLeft={{ days: 2, hours: 14, minutes: 32, seconds: 45 }}
            />
          </aside>
        </div>
      </div>
    </section>
  )
}

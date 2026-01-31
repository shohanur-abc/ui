import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Check, Package, Zap, Sparkles, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MediaBlockProps {
  src: string
  alt: string
  className?: string
}

interface TitleBlockProps {
  badge: string
  name: string
  description: string
}

interface RatingBlockProps {
  rating: number
  reviews: number
  sold: string
}

interface PriceBlockProps {
  price: string
  comparePrice: string
  discount: string
}

interface FeatureListProps {
  features: string[]
}

interface HighlightCardProps {
  icon: LucideIcon
  value: string
  label: string
}

interface ColorSelectorProps {
  colors: { name: string; hex: string; selected?: boolean }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const MediaBlock = ({ src, alt, className }: MediaBlockProps) => (
  <div className={`relative overflow-hidden rounded-xl bg-muted/30 ${className}`}>
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

const TitleBlock = ({ badge, name, description }: TitleBlockProps) => (
  <div className="space-y-3">
    <Badge variant="secondary">{badge}</Badge>
    <h1 className="text-2xl @xl:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground">{description}</p>
  </div>
)

const RatingBlock = ({ rating, reviews, sold }: RatingBlockProps) => (
  <div className="flex flex-wrap items-center gap-4 text-sm">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
      <span className="ml-1 font-medium">{rating}</span>
    </div>
    <span className="text-muted-foreground">{reviews.toLocaleString()} reviews</span>
    <span className="text-muted-foreground">{sold} sold</span>
  </div>
)

const PriceBlock = ({ price, comparePrice, discount }: PriceBlockProps) => (
  <div className="flex items-center gap-3">
    <span className="text-3xl font-bold text-primary">{price}</span>
    <span className="text-lg text-muted-foreground line-through">{comparePrice}</span>
    <Badge variant="destructive">{discount}</Badge>
  </div>
)

const FeatureList = ({ features }: FeatureListProps) => (
  <ul className="space-y-2">
    {features.map((feature, i) => (
      <li key={i} className="flex items-center gap-2 text-sm">
        <Check className="size-4 text-primary" />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
)

const HighlightCard = ({ icon: Icon, value, label }: HighlightCardProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-4 text-center">
      <Icon className="size-6 text-primary mx-auto mb-2" />
      <p className="font-bold text-lg">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
)

const ColorSelector = ({ colors }: ColorSelectorProps) => (
  <div className="space-y-2">
    <span className="text-sm font-medium">Color</span>
    <div className="flex gap-2">
      {colors.map((color, i) => (
        <button
          key={i}
          title={color.name}
          className={`size-8 rounded-full border-2 transition-all ${
            color.selected ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-muted-foreground"
          }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
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
        <div className="grid @lg:grid-cols-12 gap-4">
          {/* Left Column - Main Image */}
          <div className="@lg:col-span-5 @lg:row-span-3">
            <MediaBlock
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
              alt="Premium headphones"
              className="aspect-square @lg:h-full"
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="@lg:col-span-7 @lg:row-span-2 flex flex-col gap-5 p-6 rounded-xl bg-card border">
            <TitleBlock
              badge="Premium Audio"
              name="StudioMax Pro Wireless Headphones"
              description="Experience unparalleled sound quality with our flagship noise-cancelling wireless headphones featuring premium drivers and 60-hour battery life."
            />

            <RatingBlock rating={5} reviews={4892} sold="25K+" />

            <PriceBlock price="$349" comparePrice="$499" discount="-30%" />

            <Separator />

            <div className="grid @sm:grid-cols-2 gap-6">
              <FeatureList
                features={[
                  "Active noise cancellation",
                  "60-hour battery life",
                  "Hi-Res Audio certified",
                  "Multipoint connection",
                ]}
              />
              <ColorSelector
                colors={[
                  { name: "Midnight Black", hex: "#1a1a1a", selected: true },
                  { name: "Silver", hex: "#C0C0C0" },
                  { name: "Navy Blue", hex: "#1e3a5f" },
                ]}
              />
            </div>

            <Actions
              buttons={[
                { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />
          </div>

          {/* Bottom Row - Highlight Cards */}
          <div className="@lg:col-span-7 grid grid-cols-3 gap-4">
            <HighlightCard icon={Package} value="60h" label="Battery Life" />
            <HighlightCard icon={Zap} value="40dB" label="Noise Reduction" />
            <HighlightCard icon={Sparkles} value="Hi-Res" label="Audio Quality" />
          </div>
        </div>
      </div>
    </section>
  )
}

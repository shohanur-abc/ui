import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Truck, Shield, Award, Clock, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BentoImageProps {
  src: string
  alt: string
  size?: "large" | "medium" | "small"
}

interface ProductTitleProps {
  name: string
  tagline: string
}

interface RatingProps {
  stars: number
  count: number
}

interface PriceProps {
  current: string
  original?: string
}

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

interface VariantButtonProps {
  options: { label: string; active?: boolean }[]
}

interface CTAProps {
  primary: { label: string; href: string; icon?: LucideIcon }
  secondary: { label: string; href: string; icon?: LucideIcon }
}

const BentoImage = ({ src, alt, size = "large" }: BentoImageProps) => (
  <div className={`relative overflow-hidden rounded-xl bg-muted/30 ${
    size === "large" ? "aspect-square @lg:aspect-auto @lg:h-full" :
    size === "medium" ? "aspect-video" : "aspect-square"
  }`}>
    <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 hover:scale-105" />
  </div>
)

const ProductTitle = ({ name, tagline }: ProductTitleProps) => (
  <div>
    <h1 className="text-2xl @lg:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground mt-1">{tagline}</p>
  </div>
)

const Rating = ({ stars, count }: RatingProps) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < stars ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="text-sm font-medium">{stars}</span>
    <span className="text-sm text-muted-foreground">({count} reviews)</span>
  </div>
)

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="bg-muted/30 border-muted h-full">
    <CardContent className="p-4 flex items-start gap-3">
      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
        <Icon className="size-5 text-primary" />
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
)

const VariantButtons = ({ options }: VariantButtonProps) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt, i) => (
      <button
        key={i}
        className={`px-4 py-2 text-sm border rounded-lg transition-all ${
          opt.active ? "border-primary bg-primary/10" : "hover:border-primary"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
)

const CTA = ({ primary, secondary }: CTAProps) => (
  <div className="flex gap-3">
    <Button size="lg" className="flex-1 gap-2" asChild>
      <Link href={primary.href}>
        {primary.icon && <primary.icon className="size-4" />}
        {primary.label}
      </Link>
    </Button>
    <Button size="lg" variant="outline" className="gap-2" asChild>
      <Link href={secondary.href}>
        {secondary.icon && <secondary.icon className="size-4" />}
        {secondary.label}
      </Link>
    </Button>
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-3 @lg:grid-rows-[auto_auto_auto] gap-4">
          {/* Main Image - spans 2 columns and 2 rows */}
          <div className="@lg:col-span-2 @lg:row-span-2">
            <BentoImage
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
              alt="Premium product showcase"
              size="large"
            />
          </div>

          {/* Product Info Card */}
          <div className="@lg:row-span-1 flex flex-col gap-4 p-6 rounded-xl bg-card border">
            <Badge className="w-fit">New Arrival</Badge>
            <ProductTitle name="Precision Timepiece X1" tagline="Swiss Automatic Movement" />
            <Rating stars={5} count={2847} />
            <Price current="$499" original="$699" />
            <VariantButtons
              options={[
                { label: "Silver", active: true },
                { label: "Gold" },
                { label: "Rose Gold" },
              ]}
            />
            <CTA
              primary={{ label: "Add to Cart", href: "#cart", icon: ShoppingCart }}
              secondary={{ label: "Save", href: "#save", icon: Heart }}
            />
          </div>

          {/* Small Image */}
          <div className="hidden @lg:block">
            <BentoImage
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
              alt="Product detail view"
              size="small"
            />
          </div>

          {/* Feature Cards Row */}
          <div className="@lg:col-span-3 grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
            <FeatureCard icon={Truck} title="Free Shipping" description="On orders over $100" />
            <FeatureCard icon={Shield} title="2-Year Warranty" description="Full coverage included" />
            <FeatureCard icon={Award} title="Certified Authentic" description="100% genuine product" />
            <FeatureCard icon={Clock} title="Same-Day Dispatch" description="Order before 2pm" />
          </div>
        </div>
      </div>
    </section>
  )
}

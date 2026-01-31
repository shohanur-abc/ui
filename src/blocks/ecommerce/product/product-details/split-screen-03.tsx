import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Zap, Shield, Package, Clock, ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface HeroImageProps {
  src: string
  alt: string
  badge?: string
}

interface ProductHeaderProps {
  category: string
  title: string
  subtitle: string
}

interface RatingDisplayProps {
  rating: number
  reviews: number
  sold: string
}

interface PricingProps {
  price: string
  compareAt?: string
  badge?: string
}

interface HighlightProps {
  items: { icon: LucideIcon; title: string; description: string }[]
}

interface SpecItemProps {
  label: string
  value: string
}

interface CTAGroupProps {
  primary: { label: string; href: string; icon?: LucideIcon }
  secondary: { label: string; href: string; icon?: LucideIcon }
}

const HeroImage = ({ src, alt, badge }: HeroImageProps) => (
  <div className="relative aspect-square @lg:aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badge && (
      <div className="absolute top-4 left-4">
        <Badge className="bg-primary/90 backdrop-blur-sm text-sm px-3 py-1">{badge}</Badge>
      </div>
    )}
    <div className="absolute bottom-4 right-4">
      <Button variant="secondary" size="icon" className="rounded-full backdrop-blur-sm bg-background/80">
        <Heart className="size-5" />
      </Button>
    </div>
  </div>
)

const ProductHeader = ({ category, title, subtitle }: ProductHeaderProps) => (
  <div className="space-y-2">
    <p className="text-sm text-primary font-medium">{category}</p>
    <h1 className="text-3xl @xl:text-4xl @2xl:text-5xl font-bold tracking-tight">{title}</h1>
    <p className="text-lg text-muted-foreground">{subtitle}</p>
  </div>
)

const RatingDisplay = ({ rating, reviews, sold }: RatingDisplayProps) => (
  <div className="flex flex-wrap items-center gap-4 text-sm">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
      <span className="ml-1 font-medium">{rating}</span>
    </div>
    <Separator orientation="vertical" className="h-4" />
    <span className="text-muted-foreground">{reviews.toLocaleString()} reviews</span>
    <Separator orientation="vertical" className="h-4" />
    <span className="text-muted-foreground">{sold} sold</span>
  </div>
)

const Pricing = ({ price, compareAt, badge }: PricingProps) => (
  <div className="flex items-center gap-4">
    <span className="text-4xl @xl:text-5xl font-bold text-primary">{price}</span>
    {compareAt && <span className="text-xl text-muted-foreground line-through">{compareAt}</span>}
    {badge && <Badge variant="destructive">{badge}</Badge>}
  </div>
)

const Highlights = ({ items }: HighlightProps) => (
  <div className="grid grid-cols-2 gap-3">
    {items.map((item, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <item.icon className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const SpecList = ({ items }: { items: SpecItemProps[] }) => (
  <div className="space-y-2">
    {items.map((item, i) => (
      <div key={i} className="flex justify-between py-2 border-b border-muted last:border-0">
        <span className="text-sm text-muted-foreground">{item.label}</span>
        <span className="text-sm font-medium">{item.value}</span>
      </div>
    ))}
  </div>
)

const CTAGroup = ({ primary, secondary }: CTAGroupProps) => (
  <div className="flex flex-col @sm:flex-row gap-3">
    <Button size="lg" className="flex-1 gap-2" asChild>
      <Link href={primary.href}>
        {primary.icon && <primary.icon className="size-5" />}
        {primary.label}
      </Link>
    </Button>
    <Button size="lg" variant="outline" className="flex-1 gap-2" asChild>
      <Link href={secondary.href}>
        {secondary.icon && <secondary.icon className="size-5" />}
        {secondary.label}
      </Link>
    </Button>
  </div>
)

const ViewMoreLink = ({ text, href }: { text: string; href: string }) => (
  <Link href={href} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
    {text}
    <ChevronRight className="size-4" />
  </Link>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12 items-start">
          {/* Image Section */}
          <div className="@lg:sticky @lg:top-8">
            <HeroImage
              src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800"
              alt="Wireless earbuds in charging case"
              badge="Best Seller"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-6">
            <ProductHeader
              category="Premium Audio"
              title="ProSound Elite Buds"
              subtitle="True Wireless Noise Cancelling Earbuds"
            />

            <RatingDisplay rating={5} reviews={12847} sold="50K+" />

            <Pricing price="$199" compareAt="$299" badge="33% OFF" />

            <Separator />

            <Highlights
              items={[
                { icon: Zap, title: "40hr Battery", description: "With charging case" },
                { icon: Shield, title: "IPX7 Rated", description: "Water resistant" },
                { icon: Package, title: "Free Shipping", description: "Orders over $50" },
                { icon: Clock, title: "Same Day", description: "Express delivery" },
              ]}
            />

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Specifications</h3>
                <ViewMoreLink text="View all specs" href="#specs" />
              </div>
              <SpecList
                items={[
                  { label: "Driver Size", value: "12mm Dynamic" },
                  { label: "Frequency Response", value: "20Hz - 20kHz" },
                  { label: "ANC", value: "Hybrid Active" },
                  { label: "Connectivity", value: "Bluetooth 5.3" },
                ]}
              />
            </div>

            <CTAGroup
              primary={{ label: "Buy Now", href: "#checkout", icon: Zap }}
              secondary={{ label: "Add to Cart", href: "#cart", icon: ShoppingCart }}
            />

            <p className="text-xs text-center text-muted-foreground">
              30-day money-back guarantee • 2-year warranty included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

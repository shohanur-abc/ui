import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Dumbbell, Timer, Flame, TrendingUp, Check, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GalleryGridProps {
  images: { src: string; alt: string }[]
}

interface TitleSectionProps {
  tag: string
  name: string
  subtitle: string
}

interface RatingDisplayProps {
  rating: number
  reviews: number
  recommendation: number
}

interface PricingSectionProps {
  sizes: { size: string; price: string; selected?: boolean }[]
}

interface BenefitGridProps {
  benefits: { icon: LucideIcon; title: string; description: string }[]
}

interface FlavorSelectorProps {
  flavors: { name: string; color: string; selected?: boolean }[]
}

interface CTAGroupProps {
  primary: { label: string; href: string; icon?: LucideIcon }
  secondary: { label: string; href: string; icon?: LucideIcon }
}

interface TrustBadgesProps {
  badges: string[]
}

const GalleryGrid = ({ images }: GalleryGridProps) => (
  <div className="grid grid-cols-3 gap-2">
    <div className="col-span-3 relative aspect-[3/2] overflow-hidden rounded-xl bg-muted">
      <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
    </div>
    {images.slice(1, 4).map((img, i) => (
      <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image src={img.src} alt={img.alt} fill className="object-cover" />
      </div>
    ))}
  </div>
)

const TitleSection = ({ tag, name, subtitle }: TitleSectionProps) => (
  <div className="space-y-2">
    <Badge variant="secondary">{tag}</Badge>
    <h1 className="text-2xl @lg:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
)

const RatingDisplay = ({ rating, reviews, recommendation }: RatingDisplayProps) => (
  <div className="flex flex-wrap items-center gap-4 text-sm">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="font-medium">{rating}</span>
    <span className="text-muted-foreground">{reviews.toLocaleString()} reviews</span>
    <Badge variant="outline" className="text-green-600 border-green-600/30">{recommendation}% recommend</Badge>
  </div>
)

const PricingSection = ({ sizes }: PricingSectionProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">Select Size</span>
    <div className="grid grid-cols-3 gap-2">
      {sizes.map((size, i) => (
        <button
          key={i}
          className={`p-4 text-center border rounded-xl transition-all ${
            size.selected ? "border-primary bg-primary/10" : "hover:border-primary"
          }`}
        >
          <p className="font-bold">{size.size}</p>
          <p className="text-sm text-primary">{size.price}</p>
        </button>
      ))}
    </div>
  </div>
)

const BenefitGrid = ({ benefits }: BenefitGridProps) => (
  <div className="grid grid-cols-2 gap-3">
    {benefits.map((benefit, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <benefit.icon className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{benefit.title}</p>
            <p className="text-xs text-muted-foreground">{benefit.description}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const FlavorSelector = ({ flavors }: FlavorSelectorProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">Flavor</span>
    <div className="flex flex-wrap gap-2">
      {flavors.map((flavor, i) => (
        <button
          key={i}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all ${
            flavor.selected ? "border-primary bg-primary/10" : "hover:border-primary"
          }`}
        >
          <span className="size-3 rounded-full" style={{ backgroundColor: flavor.color }} />
          <span className="text-sm">{flavor.name}</span>
        </button>
      ))}
    </div>
  </div>
)

const CTAGroup = ({ primary, secondary }: CTAGroupProps) => (
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

const TrustBadges = ({ badges }: TrustBadgesProps) => (
  <div className="flex flex-wrap justify-center gap-4">
    {badges.map((badge, i) => (
      <span key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Check className="size-4 text-green-500" />
        {badge}
      </span>
    ))}
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-2 gap-6">
          {/* Left: Gallery */}
          <GalleryGrid
            images={[
              { src: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800", alt: "Protein powder main" },
              { src: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400", alt: "Protein scoop" },
              { src: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400", alt: "Protein shake" },
              { src: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400", alt: "Nutrition label" },
            ]}
          />

          {/* Right: Product Info */}
          <div className="flex flex-col gap-5">
            <TitleSection
              tag="Bestseller"
              name="Elite Whey Protein Isolate"
              subtitle="100% grass-fed whey protein with 27g protein per serving. Zero fillers, zero artificial ingredients."
            />

            <RatingDisplay rating={5} reviews={8472} recommendation={97} />

            <Separator />

            <PricingSection
              sizes={[
                { size: "1 lb", price: "$34.99" },
                { size: "2 lb", price: "$59.99", selected: true },
                { size: "5 lb", price: "$129.99" },
              ]}
            />

            <FlavorSelector
              flavors={[
                { name: "Chocolate", color: "#5D3A29", selected: true },
                { name: "Vanilla", color: "#F3E5AB" },
                { name: "Strawberry", color: "#FF6B6B" },
                { name: "Unflavored", color: "#E5E5E5" },
              ]}
            />

            <BenefitGrid
              benefits={[
                { icon: Dumbbell, title: "27g Protein", description: "Per serving" },
                { icon: Timer, title: "Fast Absorbing", description: "Within 30 min" },
                { icon: Flame, title: "Low Calorie", description: "Only 120 cal" },
                { icon: TrendingUp, title: "Muscle Growth", description: "Proven results" },
              ]}
            />

            <CTAGroup
              primary={{ label: "Add to Cart", href: "#cart", icon: ShoppingCart }}
              secondary={{ label: "Save", href: "#wishlist", icon: Heart }}
            />

            <TrustBadges
              badges={["Third-party tested", "NSF Certified", "30-day guarantee"]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Leaf, Droplets, Wind, Sun, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductImageStackProps {
  images: { src: string; alt: string }[]
}

interface CategoryTagProps {
  category: string
  subcategory: string
}

interface ProductNameProps {
  name: string
  tagline: string
}

interface RatingStripProps {
  rating: number
  reviews: number
}

interface DynamicPriceProps {
  current: string
  original: string
  savings: string
}

interface BenefitGridProps {
  items: { icon: LucideIcon; title: string }[]
}

interface QuantityInputProps {
  label: string
  min: number
  max: number
  value: number
}

interface ScentSelectorProps {
  scents: { name: string; description: string; selected?: boolean }[]
}

interface ActionButtonsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" | "secondary" }[]
}

interface TrustSignalsProps {
  signals: string[]
}

const ProductImageStack = ({ images }: ProductImageStackProps) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="col-span-2 relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
      <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
    </div>
    {images.slice(1, 3).map((img, i) => (
      <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image src={img.src} alt={img.alt} fill className="object-cover" />
      </div>
    ))}
  </div>
)

const CategoryTag = ({ category, subcategory }: CategoryTagProps) => (
  <div className="flex items-center gap-2 text-sm">
    <Badge variant="outline">{category}</Badge>
    <span className="text-muted-foreground">/</span>
    <span className="text-muted-foreground">{subcategory}</span>
  </div>
)

const ProductName = ({ name, tagline }: ProductNameProps) => (
  <div className="space-y-1">
    <h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">{name}</h1>
    <p className="text-lg text-muted-foreground">{tagline}</p>
  </div>
)

const RatingStrip = ({ rating, reviews }: RatingStripProps) => (
  <div className="flex items-center gap-3">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="text-sm font-medium">{rating.toFixed(1)}</span>
    <span className="text-sm text-muted-foreground">•</span>
    <span className="text-sm text-muted-foreground">{reviews.toLocaleString()} reviews</span>
  </div>
)

const DynamicPrice = ({ current, original, savings }: DynamicPriceProps) => (
  <div className="flex flex-wrap items-center gap-4">
    <span className="text-3xl @xl:text-4xl font-bold text-primary">{current}</span>
    <span className="text-lg text-muted-foreground line-through">{original}</span>
    <Badge variant="secondary" className="text-green-600">{savings}</Badge>
  </div>
)

const BenefitGrid = ({ items }: BenefitGridProps) => (
  <div className="grid grid-cols-4 gap-2">
    {items.map((item, i) => (
      <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 text-center">
        <item.icon className="size-5 text-primary" />
        <span className="text-xs font-medium">{item.title}</span>
      </div>
    ))}
  </div>
)

const QuantityInput = ({ label, min, max, value }: QuantityInputProps) => (
  <div className="space-y-2">
    <span className="text-sm font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <select
        defaultValue={value}
        className="px-4 py-2 border rounded-lg bg-background text-sm"
      >
        {Array.from({ length: max - min + 1 }).map((_, i) => (
          <option key={i} value={min + i}>{min + i}</option>
        ))}
      </select>
      <span className="text-sm text-muted-foreground">units</span>
    </div>
  </div>
)

const ScentSelector = ({ scents }: ScentSelectorProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">Select Fragrance</span>
    <div className="grid gap-2">
      {scents.map((scent, i) => (
        <Card
          key={i}
          className={`cursor-pointer transition-all ${scent.selected ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
        >
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{scent.name}</p>
              <p className="text-xs text-muted-foreground">{scent.description}</p>
            </div>
            {scent.selected && (
              <div className="size-4 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs">✓</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

const ActionButtons = ({ buttons }: ActionButtonsProps) => (
  <div className="flex gap-3">
    {buttons.map((btn, i) => (
      <Button
        key={i}
        variant={btn.variant || "default"}
        size="lg"
        className={`gap-2 ${i === 0 ? "flex-1" : ""}`}
        asChild
      >
        <Link href={btn.href}>
          {btn.icon && <btn.icon className="size-4" />}
          {btn.label}
        </Link>
      </Button>
    ))}
  </div>
)

const TrustSignals = ({ signals }: TrustSignalsProps) => (
  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
    {signals.map((signal, i) => (
      <span key={i} className="flex items-center gap-1">
        <span className="size-1.5 rounded-full bg-green-500" />
        {signal}
      </span>
    ))}
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
          {/* Images */}
          <ProductImageStack
            images={[
              { src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800", alt: "Skincare product main" },
              { src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400", alt: "Skincare product texture" },
              { src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400", alt: "Skincare product ingredients" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <CategoryTag category="Skincare" subcategory="Serums" />

            <ProductName
              name="Hydra-Glow Vitamin C Serum"
              tagline="Brightening & Anti-Aging Formula"
            />

            <RatingStrip rating={4.9} reviews={3847} />

            <DynamicPrice current="$68" original="$85" savings="Save 20%" />

            <Separator />

            <BenefitGrid
              items={[
                { icon: Leaf, title: "Organic" },
                { icon: Droplets, title: "Hydrating" },
                { icon: Wind, title: "Lightweight" },
                { icon: Sun, title: "SPF Boost" },
              ]}
            />

            <ScentSelector
              scents={[
                { name: "Citrus Fresh", description: "Uplifting orange and lemon notes", selected: true },
                { name: "Unscented", description: "Fragrance-free for sensitive skin" },
                { name: "Lavender Calm", description: "Relaxing botanical blend" },
              ]}
            />

            <QuantityInput label="Quantity" min={1} max={10} value={1} />

            <ActionButtons
              buttons={[
                { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                { label: "Wishlist", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />

            <Separator />

            <TrustSignals
              signals={[
                "Cruelty-free",
                "Vegan",
                "Dermatologist tested",
                "30-day guarantee",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

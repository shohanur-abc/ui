import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Palette, Ruler, Layers, ArrowRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface HeroImageProps {
  src: string
  alt: string
  overlay?: string
}

interface ProductBreadcrumbProps {
  items: { label: string; href: string }[]
}

interface TitleSectionProps {
  name: string
  collection: string
}

interface RatingBadgeProps {
  rating: number
  count: number
}

interface PricingRowProps {
  price: string
  comparePrice?: string
  badge?: string
}

interface SwatchSelectorProps {
  label: string
  swatches: { name: string; color: string; selected?: boolean }[]
}

interface DimensionSelectorProps {
  label: string
  options: { value: string; unit: string }[]
}

interface DescriptionTextProps {
  text: string
}

interface MaterialListProps {
  items: { icon: LucideIcon; name: string; detail: string }[]
}

interface CTARowProps {
  items: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const HeroImage = ({ src, alt, overlay }: HeroImageProps) => (
  <div className="relative aspect-square @lg:aspect-[4/5] overflow-hidden rounded-2xl">
    <Image src={src} alt={alt} fill className="object-cover" />
    {overlay && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
        <p className="absolute bottom-6 left-6 text-white/90 text-sm font-medium">{overlay}</p>
      </div>
    )}
  </div>
)

const ProductBreadcrumb = ({ items }: ProductBreadcrumbProps) => (
  <nav className="flex items-center gap-2 text-sm text-muted-foreground">
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-2">
        {i > 0 && <span>/</span>}
        <Link href={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
      </span>
    ))}
  </nav>
)

const TitleSection = ({ name, collection }: TitleSectionProps) => (
  <div className="space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{collection}</p>
    <h1 className="text-3xl @xl:text-4xl @2xl:text-5xl font-bold tracking-tight">{name}</h1>
  </div>
)

const RatingBadge = ({ rating, count }: RatingBadgeProps) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="text-sm font-medium">{rating}</span>
    <span className="text-sm text-muted-foreground">({count})</span>
  </div>
)

const PricingRow = ({ price, comparePrice, badge }: PricingRowProps) => (
  <div className="flex items-center gap-4">
    <span className="text-3xl @xl:text-4xl font-bold">{price}</span>
    {comparePrice && <span className="text-xl text-muted-foreground line-through">{comparePrice}</span>}
    {badge && <Badge variant="destructive">{badge}</Badge>}
  </div>
)

const SwatchSelector = ({ label, swatches }: SwatchSelectorProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">{label}</span>
    <div className="flex gap-2">
      {swatches.map((swatch, i) => (
        <button
          key={i}
          title={swatch.name}
          className={`size-10 rounded-full border-2 transition-all ${swatch.selected ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-muted-foreground"}`}
          style={{ backgroundColor: swatch.color }}
        />
      ))}
    </div>
  </div>
)

const DimensionSelector = ({ label, options }: DimensionSelectorProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt, i) => (
        <button
          key={i}
          className="px-4 py-2 text-sm border rounded-lg hover:border-primary transition-colors"
        >
          {opt.value} <span className="text-muted-foreground">{opt.unit}</span>
        </button>
      ))}
    </div>
  </div>
)

const DescriptionText = ({ text }: DescriptionTextProps) => (
  <p className="text-muted-foreground leading-relaxed">{text}</p>
)

const MaterialList = ({ items }: MaterialListProps) => (
  <div className="grid @sm:grid-cols-3 gap-4">
    {items.map((item, i) => (
      <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/30">
        <item.icon className="size-6 text-primary" />
        <p className="font-medium text-sm">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.detail}</p>
      </div>
    ))}
  </div>
)

const CTARow = ({ items }: CTARowProps) => (
  <div className="flex gap-3">
    {items.map((item, i) => (
      <Button
        key={i}
        variant={item.variant || "default"}
        size="lg"
        className={`gap-2 ${i === 0 ? "flex-1" : ""}`}
        asChild
      >
        <Link href={item.href}>
          {item.icon && <item.icon className="size-4" />}
          {item.label}
        </Link>
      </Button>
    ))}
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-2 gap-8 @xl:gap-16">
          {/* Image */}
          <HeroImage
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
            alt="Modern minimalist sofa"
            overlay="Handcrafted in Italy"
          />

          {/* Content */}
          <div className="flex flex-col gap-5">
            <ProductBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Furniture", href: "/furniture" },
                { label: "Sofas", href: "/furniture/sofas" },
              ]}
            />

            <TitleSection
              name="Milano Modular Sofa"
              collection="Artisan Collection"
            />

            <RatingBadge rating={5} count={486} />

            <PricingRow price="$2,499" comparePrice="$3,199" badge="22% OFF" />

            <Separator />

            <DescriptionText
              text="A masterpiece of contemporary design, the Milano Modular Sofa combines luxurious Italian leather with a minimalist silhouette. Each piece is handcrafted by skilled artisans using traditional techniques passed down through generations."
            />

            <SwatchSelector
              label="Leather Color"
              swatches={[
                { name: "Cognac", color: "#8B4513", selected: true },
                { name: "Black", color: "#1a1a1a" },
                { name: "Cream", color: "#F5F5DC" },
                { name: "Navy", color: "#1a2f4a" },
              ]}
            />

            <DimensionSelector
              label="Configuration"
              options={[
                { value: "2", unit: "seater" },
                { value: "3", unit: "seater" },
                { value: "L", unit: "shape" },
                { value: "U", unit: "shape" },
              ]}
            />

            <Separator />

            <MaterialList
              items={[
                { icon: Palette, name: "Full Grain Leather", detail: "Premium Italian" },
                { icon: Ruler, name: "Dimensions", detail: "220 × 95 × 80 cm" },
                { icon: Layers, name: "Frame", detail: "Solid Oak Wood" },
              ]}
            />

            <CTARow
              items={[
                { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />

            <Link href="#details" className="inline-flex items-center gap-1 text-sm text-primary hover:underline self-start">
              View full specifications
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

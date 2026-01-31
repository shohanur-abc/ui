import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Leaf, Droplets, Sun, Wind, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductVisualProps {
  src: string
  alt: string
  overlay?: string
}

interface TitleAreaProps {
  badges: string[]
  name: string
  subtitle: string
}

interface RatingSectionProps {
  rating: number
  count: number
}

interface PriceAreaProps {
  price: string
  perUnit: string
}

interface BenefitCardProps {
  icon: LucideIcon
  title: string
  description: string
}

interface SizeSelectorProps {
  sizes: { label: string; price: string; selected?: boolean }[]
}

interface ActionAreaProps {
  primary: { label: string; href: string; icon?: LucideIcon }
  secondary: { label: string; href: string; icon?: LucideIcon }
}

interface IngredientListProps {
  ingredients: string[]
}

const ProductVisual = ({ src, alt, overlay }: ProductVisualProps) => (
  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30">
    <Image src={src} alt={alt} fill className="object-cover" />
    {overlay && (
      <div className="absolute bottom-4 left-4 right-4">
        <Badge className="bg-white/90 text-green-800 dark:bg-black/70 dark:text-green-300">{overlay}</Badge>
      </div>
    )}
  </div>
)

const TitleArea = ({ badges, name, subtitle }: TitleAreaProps) => (
  <div className="space-y-3">
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, i) => (
        <Badge key={i} variant="secondary">{badge}</Badge>
      ))}
    </div>
    <h1 className="text-2xl @xl:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
)

const RatingSection = ({ rating, count }: RatingSectionProps) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="font-medium">{rating}</span>
    <span className="text-sm text-muted-foreground">({count.toLocaleString()} reviews)</span>
  </div>
)

const PriceArea = ({ price, perUnit }: PriceAreaProps) => (
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold text-primary">{price}</span>
    <span className="text-muted-foreground">/ {perUnit}</span>
  </div>
)

const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => (
  <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50 dark:border-green-800/30">
    <CardContent className="p-4 flex items-start gap-3">
      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
        <Icon className="size-4 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
)

const SizeSelector = ({ sizes }: SizeSelectorProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">Size</span>
    <div className="flex flex-wrap gap-2">
      {sizes.map((size, i) => (
        <button
          key={i}
          className={`px-4 py-3 text-center border rounded-xl transition-all ${
            size.selected ? "border-primary bg-primary/10" : "hover:border-primary"
          }`}
        >
          <p className="font-medium text-sm">{size.label}</p>
          <p className="text-xs text-muted-foreground">{size.price}</p>
        </button>
      ))}
    </div>
  </div>
)

const ActionArea = ({ primary, secondary }: ActionAreaProps) => (
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

const IngredientList = ({ ingredients }: IngredientListProps) => (
  <div className="space-y-2">
    <span className="text-sm font-medium">Key Ingredients</span>
    <div className="flex flex-wrap gap-2">
      {ingredients.map((ingredient, i) => (
        <Badge key={i} variant="outline" className="bg-transparent">{ingredient}</Badge>
      ))}
    </div>
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-12 gap-6">
          {/* Product Image */}
          <div className="@lg:col-span-5 @lg:row-span-2">
            <ProductVisual
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"
              alt="Organic skincare product"
              overlay="100% Organic • Cruelty Free"
            />
          </div>

          {/* Product Info */}
          <div className="@lg:col-span-7 flex flex-col gap-5 p-6 rounded-xl bg-card border">
            <TitleArea
              badges={["Organic", "Vegan", "Award Winner"]}
              name="Botanical Renewal Face Serum"
              subtitle="A luxurious blend of plant-powered actives designed to restore radiance and hydration. Suitable for all skin types."
            />

            <RatingSection rating={5} count={2847} />

            <PriceArea price="$78" perUnit="30ml" />

            <Separator />

            <SizeSelector
              sizes={[
                { label: "15ml", price: "$45" },
                { label: "30ml", price: "$78", selected: true },
                { label: "50ml", price: "$110" },
              ]}
            />

            <IngredientList
              ingredients={["Hyaluronic Acid", "Vitamin C", "Niacinamide", "Bakuchiol", "Squalane"]}
            />

            <ActionArea
              primary={{ label: "Add to Cart", href: "#cart", icon: ShoppingCart }}
              secondary={{ label: "Save", href: "#wishlist", icon: Heart }}
            />
          </div>

          {/* Benefit Cards */}
          <div className="@lg:col-span-7 grid @sm:grid-cols-2 @lg:grid-cols-4 gap-3">
            <BenefitCard icon={Leaf} title="Natural" description="Plant-based formula" />
            <BenefitCard icon={Droplets} title="Hydrating" description="24hr moisture" />
            <BenefitCard icon={Sun} title="Brightening" description="Vitamin C complex" />
            <BenefitCard icon={Wind} title="Lightweight" description="Fast absorbing" />
          </div>
        </div>
      </div>
    </section>
  )
}

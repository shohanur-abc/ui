import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Home, Ruler, Palette, Package, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface RoomSceneProps {
  src: string
  alt: string
  tag?: string
}

interface ProductTitleProps {
  collection: string
  name: string
  description: string
}

interface ReviewScoreProps {
  rating: number
  count: number
}

interface PricingProps {
  price: string
  comparePrice?: string
}

interface DimensionCardProps {
  icon: LucideIcon
  label: string
  value: string
}

interface FinishSelectorProps {
  finishes: { name: string; image: string; selected?: boolean }[]
}

interface QuantitySelectorProps {
  label: string
  value: number
  max: number
}

interface OrderButtonsProps {
  primary: { label: string; href: string }
  secondary: { label: string; href: string; icon?: LucideIcon }
}

const RoomScene = ({ src, alt, tag }: RoomSceneProps) => (
  <div className="relative aspect-[4/3] @lg:aspect-square overflow-hidden rounded-xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {tag && (
      <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground">{tag}</Badge>
    )}
  </div>
)

const ProductTitle = ({ collection, name, description }: ProductTitleProps) => (
  <div className="space-y-2">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{collection}</p>
    <h1 className="text-2xl @xl:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground">{description}</p>
  </div>
)

const ReviewScore = ({ rating, count }: ReviewScoreProps) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="font-medium">{rating}</span>
    <span className="text-sm text-muted-foreground">({count} reviews)</span>
  </div>
)

const Pricing = ({ price, comparePrice }: PricingProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold">{price}</span>
    {comparePrice && <span className="text-lg text-muted-foreground line-through">{comparePrice}</span>}
  </div>
)

const DimensionCard = ({ icon: Icon, label, value }: DimensionCardProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-3 text-center">
      <Icon className="size-5 text-primary mx-auto mb-1" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </CardContent>
  </Card>
)

const FinishSelector = ({ finishes }: FinishSelectorProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">Wood Finish</span>
    <div className="flex gap-2">
      {finishes.map((finish, i) => (
        <button
          key={i}
          className={`relative size-12 rounded-lg overflow-hidden border-2 transition-all ${
            finish.selected ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-muted-foreground"
          }`}
          title={finish.name}
        >
          <Image src={finish.image} alt={finish.name} fill className="object-cover" />
        </button>
      ))}
    </div>
  </div>
)

const QuantitySelector = ({ label, value, max }: QuantitySelectorProps) => (
  <div className="space-y-2">
    <span className="text-sm font-medium">{label}</span>
    <select defaultValue={value} className="w-full px-4 py-2 border rounded-lg bg-background">
      {Array.from({ length: max }).map((_, i) => (
        <option key={i} value={i + 1}>{i + 1}</option>
      ))}
    </select>
  </div>
)

const OrderButtons = ({ primary, secondary }: OrderButtonsProps) => (
  <div className="flex gap-3">
    <Button size="lg" className="flex-1" asChild>
      <Link href={primary.href}>{primary.label}</Link>
    </Button>
    <Button size="lg" variant="outline" className="gap-2" asChild>
      <Link href={secondary.href}>
        {secondary.icon && <secondary.icon className="size-4" />}
        {secondary.label}
      </Link>
    </Button>
  </div>
)

const SmallImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-3 gap-4">
          {/* Main Room Scene */}
          <div className="@lg:col-span-2 @lg:row-span-2">
            <RoomScene
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
              alt="Sofa in living room"
              tag="As seen in room"
            />
          </div>

          {/* Product Info Card */}
          <div className="@lg:col-span-1 @lg:row-span-3 flex flex-col gap-4 p-6 rounded-xl bg-card border">
            <ProductTitle
              collection="Scandinavian Collection"
              name="Bergen Modular Sectional Sofa"
              description="Handcrafted solid oak frame with premium performance fabric upholstery. Designed for modern living spaces."
            />

            <ReviewScore rating={5} count={312} />

            <Pricing price="$2,899" comparePrice="$3,499" />

            <Separator />

            <div className="grid grid-cols-4 gap-2">
              <DimensionCard icon={Ruler} label="Width" value='112"' />
              <DimensionCard icon={Ruler} label="Depth" value='40"' />
              <DimensionCard icon={Ruler} label="Height" value='34"' />
              <DimensionCard icon={Package} label="Weight" value="180 lb" />
            </div>

            <FinishSelector
              finishes={[
                { name: "Natural Oak", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100", selected: true },
                { name: "Walnut", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100" },
                { name: "White Oak", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100" },
                { name: "Black", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100" },
              ]}
            />

            <QuantitySelector label="Quantity" value={1} max={5} />

            <OrderButtons
              primary={{ label: "Add to Cart", href: "#cart" }}
              secondary={{ label: "Save", href: "#wishlist", icon: Heart }}
            />

            <p className="text-xs text-muted-foreground text-center">
              Free white glove delivery • 30-day returns • 5-year warranty
            </p>
          </div>

          {/* Thumbnail Gallery */}
          <div className="@lg:col-span-2 grid grid-cols-4 gap-4">
            <SmallImage src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" alt="Sofa front view" />
            <SmallImage src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" alt="Sofa side view" />
            <SmallImage src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" alt="Sofa detail" />
            <SmallImage src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" alt="Sofa fabric" />
          </div>
        </div>
      </div>
    </section>
  )
}

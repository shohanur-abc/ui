import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Gem, Award, Shield, Package, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LuxuryImageProps {
  src: string
  alt: string
}

interface CollectionHeaderProps {
  collection: string
  name: string
  description: string
}

interface PremiumPriceProps {
  price: string
  currency: string
}

interface RatingProps {
  stars: number
  count: number
}

interface LuxuryFeatureProps {
  icon: LucideIcon
  title: string
  description: string
}

interface MaterialBadgesProps {
  materials: string[]
}

interface ActionButtonsProps {
  primary: { label: string; href: string; icon?: LucideIcon }
  secondary: { label: string; href: string; icon?: LucideIcon }
}

const LuxuryImage = ({ src, alt }: LuxuryImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100/20 to-orange-100/20">
    <Image src={src} alt={alt} fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
  </div>
)

const CollectionHeader = ({ collection, name, description }: CollectionHeaderProps) => (
  <div className="space-y-3">
    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">{collection}</Badge>
    <h1 className="text-3xl @xl:text-4xl font-bold tracking-tight font-serif">{name}</h1>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
)

const PremiumPrice = ({ price, currency }: PremiumPriceProps) => (
  <div className="flex items-baseline gap-2">
    <span className="text-sm text-muted-foreground">{currency}</span>
    <span className="text-4xl font-bold tracking-tight">{price}</span>
  </div>
)

const Rating = ({ stars, count }: RatingProps) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < stars ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="text-sm text-muted-foreground">({count} reviews)</span>
  </div>
)

const LuxuryFeature = ({ icon: Icon, title, description }: LuxuryFeatureProps) => (
  <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-muted">
    <CardContent className="p-4 text-center">
      <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
        <Icon className="size-6 text-primary" />
      </div>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
)

const MaterialBadges = ({ materials }: MaterialBadgesProps) => (
  <div className="flex flex-wrap gap-2">
    {materials.map((material, i) => (
      <Badge key={i} variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400">
        {material}
      </Badge>
    ))}
  </div>
)

const ActionButtons = ({ primary, secondary }: ActionButtonsProps) => (
  <div className="flex gap-3">
    <Button size="lg" className="flex-1 gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" asChild>
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
        <div className="grid @lg:grid-cols-12 gap-6">
          {/* Main Image */}
          <div className="@lg:col-span-6 @lg:row-span-3">
            <LuxuryImage
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800"
              alt="Luxury jewelry piece"
            />
          </div>

          {/* Product Info */}
          <div className="@lg:col-span-6 flex flex-col gap-5 p-6 rounded-xl bg-card border">
            <CollectionHeader
              collection="Maison Lumière"
              name="Étoile Diamond Necklace"
              description="A masterpiece of haute joaillerie, featuring 18K white gold adorned with 47 brilliant-cut diamonds totaling 3.2 carats. Each stone is hand-selected for exceptional clarity and fire."
            />

            <Rating stars={5} count={89} />

            <PremiumPrice currency="USD" price="12,500" />

            <MaterialBadges materials={["18K White Gold", "VVS Diamonds", "Handcrafted"]} />

            <ActionButtons
              primary={{ label: "Purchase", href: "#checkout", icon: ShoppingCart }}
              secondary={{ label: "Save", href: "#wishlist", icon: Heart }}
            />
          </div>

          {/* Feature Cards */}
          <div className="@lg:col-span-6 grid grid-cols-2 @sm:grid-cols-4 gap-4">
            <LuxuryFeature icon={Gem} title="VVS Quality" description="Certified diamonds" />
            <LuxuryFeature icon={Award} title="Certified" description="GIA authenticated" />
            <LuxuryFeature icon={Shield} title="Insured" description="Full coverage" />
            <LuxuryFeature icon={Package} title="Luxury Box" description="Premium packaging" />
          </div>
        </div>
      </div>
    </section>
  )
}

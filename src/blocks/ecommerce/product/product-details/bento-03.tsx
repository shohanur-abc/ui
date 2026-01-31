import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Cpu, Battery, Smartphone, Camera, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ImageCellProps {
  src: string
  alt: string
  label?: string
}

interface ProductHeaderProps {
  brand: string
  name: string
  variant: string
}

interface RatingRowProps {
  rating: number
  reviews: number
}

interface PriceRowProps {
  price: string
  original?: string
  financing?: string
}

interface SpecCardProps {
  icon: LucideIcon
  label: string
  value: string
}

interface StorageSelectorProps {
  options: { size: string; price: string; selected?: boolean }[]
}

interface ActionRowProps {
  actions: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ImageCell = ({ src, alt, label }: ImageCellProps) => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted group">
    <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
    {label && (
      <div className="absolute bottom-3 left-3">
        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">{label}</Badge>
      </div>
    )}
  </div>
)

const ProductHeader = ({ brand, name, variant }: ProductHeaderProps) => (
  <div className="space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
    <h1 className="text-2xl @xl:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground">{variant}</p>
  </div>
)

const RatingRow = ({ rating, reviews }: RatingRowProps) => (
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

const PriceRow = ({ price, original, financing }: PriceRowProps) => (
  <div className="space-y-1">
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-bold">{price}</span>
      {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
    </div>
    {financing && <p className="text-sm text-muted-foreground">{financing}</p>}
  </div>
)

const SpecCard = ({ icon: Icon, label, value }: SpecCardProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-3 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="size-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-sm">{value}</p>
      </div>
    </CardContent>
  </Card>
)

const StorageSelector = ({ options }: StorageSelectorProps) => (
  <div className="space-y-2">
    <span className="text-sm font-medium">Storage</span>
    <div className="grid grid-cols-3 gap-2">
      {options.map((opt, i) => (
        <button
          key={i}
          className={`p-3 text-center border rounded-lg transition-all ${
            opt.selected ? "border-primary bg-primary/10" : "hover:border-primary"
          }`}
        >
          <p className="font-medium text-sm">{opt.size}</p>
          <p className="text-xs text-muted-foreground">{opt.price}</p>
        </button>
      ))}
    </div>
  </div>
)

const ActionRow = ({ actions }: ActionRowProps) => (
  <div className="flex gap-3">
    {actions.map((action, i) => (
      <Button key={i} variant={action.variant || "default"} size="lg" className={`gap-2 ${i === 0 ? "flex-1" : ""}`} asChild>
        <Link href={action.href}>
          {action.icon && <action.icon className="size-4" />}
          {action.label}
        </Link>
      </Button>
    ))}
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @xl:grid-rows-[repeat(4,auto)]">
          {/* Main Product Image */}
          <div className="@xl:col-span-2 @xl:row-span-4 aspect-square @xl:aspect-auto">
            <ImageCell
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
              alt="Smartphone front view"
              label="360° View"
            />
          </div>

          {/* Product Info */}
          <div className="@xl:col-span-2 @xl:row-span-2 flex flex-col gap-4 p-6 rounded-xl bg-card border">
            <ProductHeader
              brand="TechPro"
              name="Galaxy Ultra X Pro"
              variant="5G | 256GB | Titanium Gray"
            />

            <RatingRow rating={5} reviews={12847} />

            <PriceRow
              price="$1,199"
              original="$1,399"
              financing="or $49.96/mo for 24 months"
            />

            <StorageSelector
              options={[
                { size: "128GB", price: "$999" },
                { size: "256GB", price: "$1,199", selected: true },
                { size: "512GB", price: "$1,399" },
              ]}
            />

            <ActionRow
              actions={[
                { label: "Buy Now", href: "#checkout", icon: ShoppingCart },
                { label: "Wishlist", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />
          </div>

          {/* Spec Cards Grid */}
          <div className="@xl:col-span-2 @xl:row-span-2 grid grid-cols-2 gap-4">
            <SpecCard icon={Cpu} label="Processor" value="Snapdragon 8 Gen 3" />
            <SpecCard icon={Battery} label="Battery" value="5000mAh" />
            <SpecCard icon={Smartphone} label="Display" value='6.8" AMOLED 120Hz' />
            <SpecCard icon={Camera} label="Camera" value="200MP + 50MP + 12MP" />
          </div>

          {/* Bottom Image Grid */}
          <div className="@md:col-span-2 @xl:col-span-4 grid grid-cols-4 gap-4">
            <div className="aspect-square">
              <ImageCell src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400" alt="Phone back view" />
            </div>
            <div className="aspect-square">
              <ImageCell src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400" alt="Phone camera detail" />
            </div>
            <div className="aspect-square">
              <ImageCell src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400" alt="Phone in hand" />
            </div>
            <div className="aspect-square">
              <ImageCell src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400" alt="Phone accessories" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

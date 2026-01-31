import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, ShoppingCart, Heart, Minus, Plus, Share2, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductGalleryProps {
  images: { src: string; alt: string }[]
}

interface ProductInfoProps {
  brand: string
  name: string
  sku: string
}

interface ProductPriceProps {
  current: string
  original?: string
  savings?: string
}

interface ProductRatingProps {
  value: number
  count: number
}

interface ProductDescriptionProps {
  text: string
}

interface ColorOptionProps {
  colors: { name: string; value: string; available: boolean }[]
}

interface SizeOptionProps {
  sizes: { label: string; available: boolean }[]
}

interface QuantityControlProps {
  min: number
  max: number
  value: number
}

interface ActionButtonsProps {
  items: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" | "secondary" }[]
}

const ProductGallery = ({ images }: ProductGalleryProps) => (
  <div className="flex flex-col gap-4">
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted/30">
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        className="object-cover"
      />
    </div>
    <div className="grid grid-cols-4 gap-2">
      {images.slice(0, 4).map((img, i) => (
        <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted/30 cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all">
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  </div>
)

const ProductInfo = ({ brand, name, sku }: ProductInfoProps) => (
  <div className="space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
    <h1 className="text-2xl @sm:text-3xl @xl:text-4xl font-bold tracking-tight">{name}</h1>
    <p className="text-xs text-muted-foreground">SKU: {sku}</p>
  </div>
)

const ProductRating = ({ value, count }: ProductRatingProps) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < value ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="text-sm font-medium">{value.toFixed(1)}</span>
    <span className="text-sm text-muted-foreground">({count} reviews)</span>
  </div>
)

const ProductPrice = ({ current, original, savings }: ProductPriceProps) => (
  <div className="space-y-1">
    <div className="flex items-baseline gap-3">
      <span className="text-3xl @xl:text-4xl font-bold">{current}</span>
      {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
    </div>
    {savings && <p className="text-sm text-green-500 font-medium">{savings}</p>}
  </div>
)

const ProductDescription = ({ text }: ProductDescriptionProps) => (
  <p className="text-muted-foreground leading-relaxed">{text}</p>
)

const ColorOptions = ({ colors }: ColorOptionProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">Color</span>
    <div className="flex gap-2">
      {colors.map((color, i) => (
        <button
          key={i}
          disabled={!color.available}
          title={color.name}
          className="size-8 rounded-full border-2 border-transparent ring-2 ring-muted hover:ring-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  </div>
)

const SizeOptions = ({ sizes }: SizeOptionProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Size</span>
      <button className="text-xs text-primary hover:underline">Size Guide</button>
    </div>
    <RadioGroup className="flex flex-wrap gap-2" defaultValue={sizes.find(s => s.available)?.label}>
      {sizes.map((size, i) => (
        <label
          key={i}
          className={`flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer transition-all hover:border-primary ${!size.available ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          <RadioGroupItem value={size.label} disabled={!size.available} className="sr-only" />
          <span className="text-sm">{size.label}</span>
        </label>
      ))}
    </RadioGroup>
  </div>
)

const QuantityControl = ({ min, max, value }: QuantityControlProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">Quantity</span>
    <div className="inline-flex items-center border rounded-lg">
      <button className="p-2 hover:bg-muted transition-colors" aria-label="Decrease quantity">
        <Minus className="size-4" />
      </button>
      <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">{value}</span>
      <button className="p-2 hover:bg-muted transition-colors" aria-label="Increase quantity">
        <Plus className="size-4" />
      </button>
    </div>
    <p className="text-xs text-muted-foreground">Max {max} per order</p>
  </div>
)

const ActionButtons = ({ items }: ActionButtonsProps) => (
  <div className="flex flex-col @sm:flex-row gap-3">
    {items.map((item, i) => (
      <Button key={i} variant={item.variant || "default"} size="lg" className="gap-2 flex-1" asChild>
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
          {/* Gallery */}
          <ProductGallery
            images={[
              { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", alt: "Red sneaker side view" },
              { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", alt: "Red sneaker top view" },
              { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", alt: "Red sneaker back view" },
              { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", alt: "Red sneaker detail" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <ProductInfo
                brand="Nike"
                name="Air Max 270 React"
                sku="NKE-AM270R-RED"
              />
              <Button variant="ghost" size="icon" className="shrink-0">
                <Share2 className="size-5" />
              </Button>
            </div>

            <ProductRating value={4.5} count={2847} />

            <ProductPrice current="$149.99" original="$189.99" savings="You save $40.00 (21%)" />

            <Separator />

            <ProductDescription text="Experience ultimate comfort with the Nike Air Max 270 React. Featuring a large Max Air unit in the heel and React foam in the forefoot, these sneakers deliver exceptional cushioning for all-day wear." />

            <ColorOptions
              colors={[
                { name: "Red", value: "#ef4444", available: true },
                { name: "Blue", value: "#3b82f6", available: true },
                { name: "Black", value: "#171717", available: true },
                { name: "White", value: "#fafafa", available: false },
              ]}
            />

            <SizeOptions
              sizes={[
                { label: "US 7", available: true },
                { label: "US 8", available: true },
                { label: "US 9", available: false },
                { label: "US 10", available: true },
                { label: "US 11", available: true },
                { label: "US 12", available: false },
              ]}
            />

            <QuantityControl min={1} max={5} value={1} />

            <ActionButtons
              items={[
                { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />

            <div className="flex items-center gap-2">
              <Badge variant="secondary">Free Shipping</Badge>
              <Badge variant="secondary">Easy Returns</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

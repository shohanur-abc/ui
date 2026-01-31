import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Bookmark, ZoomIn, Package, Timer, Sparkles, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ZoomableImageProps {
  src: string
  alt: string
}

interface TagListProps {
  tags: string[]
}

interface HeadingProps {
  title: string
  edition?: string
}

interface RatingCompactProps {
  stars: number
  reviews: string
}

interface PriceTagProps {
  sale: string
  regular: string
  ends?: string
}

interface DescriptionBlockProps {
  text: string
}

interface FeatureHighlightProps {
  items: { icon: LucideIcon; label: string; value: string }[]
}

interface SizeChartProps {
  sizes: { size: string; stock: "in" | "low" | "out" }[]
}

interface ButtonGroupProps {
  buttons: { text: string; href: string; icon?: LucideIcon; primary?: boolean }[]
}

const ZoomableImage = ({ src, alt }: ZoomableImageProps) => (
  <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted/30">
    <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
    <button className="absolute bottom-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
      <ZoomIn className="size-5" />
    </button>
  </div>
)

const TagList = ({ tags }: TagListProps) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((tag, i) => (
      <Badge key={i} variant="outline" className="text-xs font-normal">{tag}</Badge>
    ))}
  </div>
)

const Heading = ({ title, edition }: HeadingProps) => (
  <div>
    <h1 className="text-2xl @sm:text-3xl @xl:text-4xl font-bold tracking-tight">{title}</h1>
    {edition && <p className="text-primary font-medium mt-1">{edition}</p>}
  </div>
)

const RatingCompact = ({ stars, reviews }: RatingCompactProps) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < stars ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="text-sm text-muted-foreground">{reviews}</span>
  </div>
)

const PriceTag = ({ sale, regular, ends }: PriceTagProps) => (
  <div className="space-y-1">
    <div className="flex items-center gap-3">
      <span className="text-3xl @xl:text-4xl font-bold text-primary">{sale}</span>
      <span className="text-lg text-muted-foreground line-through">{regular}</span>
    </div>
    {ends && (
      <div className="flex items-center gap-1.5 text-sm text-destructive">
        <Timer className="size-4" />
        <span>{ends}</span>
      </div>
    )}
  </div>
)

const DescriptionBlock = ({ text }: DescriptionBlockProps) => (
  <p className="text-muted-foreground leading-relaxed">{text}</p>
)

const FeatureHighlight = ({ items }: FeatureHighlightProps) => (
  <div className="grid grid-cols-3 gap-4 text-center">
    {items.map((item, i) => (
      <div key={i} className="space-y-1">
        <div className="inline-flex p-2 rounded-full bg-primary/10">
          <item.icon className="size-5 text-primary" />
        </div>
        <p className="text-sm font-medium">{item.value}</p>
        <p className="text-xs text-muted-foreground">{item.label}</p>
      </div>
    ))}
  </div>
)

const SizeChart = ({ sizes }: SizeChartProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Select Size</span>
      <button className="text-xs text-primary hover:underline">Size Guide</button>
    </div>
    <div className="grid grid-cols-5 gap-2">
      {sizes.map((item, i) => (
        <button
          key={i}
          disabled={item.stock === "out"}
          className={`py-2 text-sm border rounded-lg transition-all ${
            item.stock === "out" 
              ? "opacity-40 cursor-not-allowed line-through" 
              : item.stock === "low"
                ? "border-yellow-500/50 hover:border-yellow-500"
                : "hover:border-primary"
          }`}
        >
          {item.size}
        </button>
      ))}
    </div>
    <p className="text-xs text-muted-foreground">
      <span className="inline-block size-2 rounded-full bg-yellow-500 mr-1" /> Low stock
    </p>
  </div>
)

const ButtonGroup = ({ buttons }: ButtonGroupProps) => (
  <div className="flex gap-3">
    {buttons.map((btn, i) => (
      <Button 
        key={i} 
        variant={btn.primary ? "default" : "outline"} 
        size="lg" 
        className={`gap-2 ${btn.primary ? "flex-1" : ""}`}
        asChild
      >
        <Link href={btn.href}>
          {btn.icon && <btn.icon className="size-4" />}
          {btn.text}
        </Link>
      </Button>
    ))}
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-[1fr_1.2fr] gap-8 @xl:gap-12">
          {/* Image */}
          <ZoomableImage
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"
            alt="Premium jacket product photo"
          />

          {/* Info */}
          <div className="flex flex-col gap-5">
            <TagList tags={["Outerwear", "Sustainable", "Premium"]} />

            <Heading 
              title="Alpine Summit Technical Jacket" 
              edition="Limited Winter Collection" 
            />

            <RatingCompact stars={5} reviews="2,847 reviews" />

            <PriceTag 
              sale="$289" 
              regular="$449" 
              ends="Sale ends in 23:45:12" 
            />

            <Separator />

            <DescriptionBlock 
              text="Engineered for extreme conditions, the Alpine Summit jacket features 3-layer GORE-TEX construction, 800-fill down insulation, and fully taped seams. Ready for any adventure from urban commutes to mountain expeditions." 
            />

            <FeatureHighlight
              items={[
                { icon: Package, label: "Weight", value: "650g" },
                { icon: Sparkles, label: "Fill Power", value: "800 FP" },
                { icon: Timer, label: "Water Rating", value: "20k mm" },
              ]}
            />

            <Separator />

            <SizeChart
              sizes={[
                { size: "XS", stock: "in" },
                { size: "S", stock: "low" },
                { size: "M", stock: "in" },
                { size: "L", stock: "in" },
                { size: "XL", stock: "out" },
              ]}
            />

            <ButtonGroup
              buttons={[
                { text: "Add to Cart", href: "#cart", icon: ShoppingCart, primary: true },
                { text: "Save", href: "#save", icon: Bookmark },
              ]}
            />

            <p className="text-xs text-muted-foreground text-center">
              Free shipping on orders over $150 • Easy 30-day returns
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

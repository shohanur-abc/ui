import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, ShoppingCart, Heart, MessageCircle, ThumbsUp, ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FullBleedImageProps {
  src: string
  alt: string
  badges?: string[]
}

interface ProductHeaderProps {
  brand: string
  name: string
}

interface RatingWithPhotosProps {
  rating: number
  reviews: number
  photos: number
}

interface PriceBlockProps {
  price: string
  originalPrice?: string
  memberPrice?: string
}

interface QuickSpecsProps {
  specs: { label: string; value: string }[]
}

interface TopReviewProps {
  author: { name: string; avatar: string; initials: string }
  rating: number
  title: string
  content: string
  helpful: number
  date: string
}

interface VariantPickerProps {
  label: string
  variants: { name: string; inStock: boolean }[]
}

interface ActionStackProps {
  actions: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" | "ghost" }[]
}

const FullBleedImage = ({ src, alt, badges }: FullBleedImageProps) => (
  <div className="relative aspect-square @lg:aspect-[5/6] overflow-hidden rounded-2xl bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" />
    {badges && badges.length > 0 && (
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {badges.map((badge, i) => (
          <Badge key={i} className="w-fit">{badge}</Badge>
        ))}
      </div>
    )}
  </div>
)

const ProductHeader = ({ brand, name }: ProductHeaderProps) => (
  <div className="space-y-1">
    <Link href="#brand" className="text-sm text-primary font-medium hover:underline uppercase tracking-wider">
      {brand}
    </Link>
    <h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight leading-tight">{name}</h1>
  </div>
)

const RatingWithPhotos = ({ rating, reviews, photos }: RatingWithPhotosProps) => (
  <div className="flex flex-wrap items-center gap-4">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
      <span className="ml-1 font-medium">{rating}</span>
    </div>
    <Link href="#reviews" className="text-sm text-muted-foreground hover:text-foreground">
      {reviews.toLocaleString()} reviews
    </Link>
    <Link href="#photos" className="text-sm text-primary hover:underline">
      {photos} customer photos
    </Link>
  </div>
)

const PriceBlock = ({ price, originalPrice, memberPrice }: PriceBlockProps) => (
  <div className="space-y-1">
    <div className="flex items-baseline gap-3">
      <span className="text-3xl @xl:text-4xl font-bold">{price}</span>
      {originalPrice && <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>}
    </div>
    {memberPrice && (
      <p className="text-sm">
        <Badge variant="secondary" className="mr-2">Member</Badge>
        <span className="text-primary font-medium">{memberPrice}</span>
      </p>
    )}
  </div>
)

const QuickSpecs = ({ specs }: QuickSpecsProps) => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
    {specs.map((spec, i) => (
      <div key={i} className="flex justify-between py-1.5 border-b border-muted text-sm">
        <span className="text-muted-foreground">{spec.label}</span>
        <span className="font-medium">{spec.value}</span>
      </div>
    ))}
  </div>
)

const TopReview = ({ author, rating, title, content, helpful, date }: TopReviewProps) => (
  <Card className="bg-muted/30 border-muted">
    <CardContent className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
              ))}
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ThumbsUp className="size-3" />
          {helpful} found helpful
        </span>
        <button className="flex items-center gap-1 hover:text-foreground">
          <MessageCircle className="size-3" />
          Reply
        </button>
      </div>
    </CardContent>
  </Card>
)

const VariantPicker = ({ label, variants }: VariantPickerProps) => (
  <div className="space-y-3">
    <span className="text-sm font-medium">{label}</span>
    <div className="flex flex-wrap gap-2">
      {variants.map((v, i) => (
        <button
          key={i}
          disabled={!v.inStock}
          className={`px-4 py-2 text-sm border rounded-lg transition-all ${!v.inStock ? "opacity-40 cursor-not-allowed" : "hover:border-primary"}`}
        >
          {v.name}
        </button>
      ))}
    </div>
  </div>
)

const ActionStack = ({ actions }: ActionStackProps) => (
  <div className="flex flex-col gap-2">
    {actions.map((action, i) => (
      <Button key={i} variant={action.variant || "default"} size="lg" className="w-full gap-2" asChild>
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
        <div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
          {/* Image */}
          <FullBleedImage
            src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"
            alt="Premium sneakers"
            badges={["Bestseller", "Trending"]}
          />

          {/* Content */}
          <div className="flex flex-col gap-5">
            <ProductHeader
              brand="Velocity Athletics"
              name="CloudRunner Pro Elite Running Shoes"
            />

            <RatingWithPhotos rating={5} reviews={8247} photos={432} />

            <PriceBlock price="$189" originalPrice="$229" memberPrice="$169.99 with membership" />

            <Separator />

            <QuickSpecs
              specs={[
                { label: "Weight", value: "8.2 oz" },
                { label: "Drop", value: "8mm" },
                { label: "Cushioning", value: "Max" },
                { label: "Surface", value: "Road" },
              ]}
            />

            <VariantPicker
              label="Select Size"
              variants={[
                { name: "US 7", inStock: true },
                { name: "US 8", inStock: true },
                { name: "US 9", inStock: false },
                { name: "US 10", inStock: true },
                { name: "US 11", inStock: true },
                { name: "US 12", inStock: true },
              ]}
            />

            <ActionStack
              actions={[
                { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                { label: "Add to Wishlist", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Featured Review</h3>
                <Link href="#reviews" className="text-sm text-primary hover:underline flex items-center gap-1">
                  All reviews <ChevronRight className="size-4" />
                </Link>
              </div>
              <TopReview
                author={{
                  name: "Michael R.",
                  avatar: "https://avatars.githubusercontent.com/u/252440198?v=4",
                  initials: "MR",
                }}
                rating={5}
                title="Best running shoes I've ever owned"
                content="These shoes are incredible. The cushioning is perfect and they feel like running on clouds. After 200+ miles, they still look and feel great."
                helpful={847}
                date="Jan 28, 2026"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

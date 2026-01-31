"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, ShoppingCart, Heart, Quote, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserGeneratedGalleryProps {
  product: { src: string; alt: string }
  userPhotos: { src: string; alt: string; user: string }[]
}

interface HeaderProps {
  brand: string
  name: string
  tagline: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  original?: string
}

interface TestimonialProps {
  quote: string
  author: { name: string; avatar: string; initials: string }
  verified: boolean
}

interface DescriptionProps {
  text: string
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const UserGeneratedGallery = ({ product, userPhotos }: UserGeneratedGalleryProps) => (
  <div className="space-y-4">
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
      <Image src={product.src} alt={product.alt} fill className="object-cover" />
    </div>
    <div>
      <p className="text-sm font-medium mb-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-green-500" />
        Customer photos
      </p>
      <div className="grid grid-cols-4 gap-2">
        {userPhotos.map((photo, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted group cursor-pointer">
            <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-xs text-white font-medium">@{photo.user}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="space-y-2">
    <Badge variant="outline">{brand}</Badge>
    <h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-muted-foreground">{tagline}</p>
  </div>
)

const Rating = ({ rating, reviews }: RatingProps) => (
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

const Price = ({ current, original }: PriceProps) => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold text-primary">{current}</span>
    {original && <span className="text-lg text-muted-foreground line-through">{original}</span>}
  </div>
)

const Testimonial = ({ quote, author, verified }: TestimonialProps) => (
  <div className="p-4 rounded-xl bg-muted/30 border border-muted">
    <Quote className="size-5 text-primary mb-2" />
    <p className="text-sm italic mb-3">&ldquo;{quote}&rdquo;</p>
    <div className="flex items-center gap-2">
      <Avatar className="size-8">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{author.name}</p>
        {verified && <p className="text-xs text-green-500">Verified Buyer</p>}
      </div>
    </div>
  </div>
)

const Description = ({ text }: DescriptionProps) => (
  <p className="text-muted-foreground leading-relaxed">{text}</p>
)

const Actions = ({ buttons }: ActionsProps) => (
  <div className="flex gap-3">
    {buttons.map((btn, i) => (
      <Button key={i} variant={btn.variant || "default"} size="lg" className={`gap-2 ${i === 0 ? "flex-1" : ""}`} asChild>
        <Link href={btn.href}>
          {btn.icon && <btn.icon className="size-4" />}
          {btn.label}
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
          {/* User Generated Gallery */}
          <UserGeneratedGallery
            product={{ src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800", alt: "Yoga mat" }}
            userPhotos={[
              { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200", alt: "User photo 1", user: "sarah_yoga" },
              { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200", alt: "User photo 2", user: "mindful_mike" },
              { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200", alt: "User photo 3", user: "zen_life" },
              { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200", alt: "User photo 4", user: "yogini_emma" },
            ]}
          />

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Header
              brand="Manduka"
              name="PRO Yoga Mat 6mm"
              tagline="The ultimate performance yoga mat"
            />

            <Rating rating={5} reviews={8934} />

            <Price current="$120" original="$140" />

            <Separator />

            <Testimonial
              quote="This mat has transformed my practice. The grip is incredible even during hot yoga, and it's so cushioning on my joints."
              author={{ name: "Sarah M.", avatar: "https://avatars.githubusercontent.com/u/252440198?v=4", initials: "SM" }}
              verified={true}
            />

            <Description
              text="The Manduka PRO is the gold standard in yoga mats. With a lifetime guarantee and closed-cell surface that prevents moisture absorption, it's built to last through thousands of practices."
            />

            <Actions
              buttons={[
                { label: "Add to Cart", href: "#cart", icon: ShoppingCart },
                { label: "Save", href: "#wishlist", icon: Heart, variant: "outline" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

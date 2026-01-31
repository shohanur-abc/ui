"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, MapPin, Leaf, Award, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface HeroImageProps {
  src: string
  alt: string
  badges: string[]
}

interface TitleProps {
  origin: string
  name: string
  roaster: string
}

interface RatingProps {
  rating: number
  reviews: number
}

interface PriceProps {
  current: string
  unit: string
}

interface FlavorProfileProps {
  notes: { name: string; intensity: number }[]
}

interface OriginStoryProps {
  title: string
  description: string
  details: { icon: LucideIcon; label: string; value: string }[]
}

interface BrewGuideProps {
  methods: { name: string; ratio: string; temp: string; time: string }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const HeroImage = ({ src, alt, badges }: HeroImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30">
    <Image src={src} alt={alt} fill className="object-cover" />
    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
      {badges.map((badge, i) => (
        <Badge key={i} variant={i === 0 ? "default" : "secondary"}>{badge}</Badge>
      ))}
    </div>
  </div>
)

const Title = ({ origin, name, roaster }: TitleProps) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <MapPin className="size-3" />
      <span>{origin}</span>
    </div>
    <h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
    <p className="text-sm text-primary font-medium">Roasted by {roaster}</p>
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
    <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
  </div>
)

const Price = ({ current, unit }: PriceProps) => (
  <div className="flex items-baseline gap-1">
    <span className="text-3xl font-bold text-primary">{current}</span>
    <span className="text-muted-foreground">/ {unit}</span>
  </div>
)

const FlavorProfile = ({ notes }: FlavorProfileProps) => (
  <div className="space-y-3">
    <p className="font-medium text-sm">Tasting Notes</p>
    <div className="space-y-2">
      {notes.map((note, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>{note.name}</span>
            <span className="text-muted-foreground">{note.intensity}/10</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all"
              style={{ width: `${note.intensity * 10}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)

const OriginStory = ({ title, description, details }: OriginStoryProps) => (
  <div className="space-y-4">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {details.map((detail, i) => (
        <Card key={i} className="bg-muted/30 border-muted">
          <CardContent className="p-3 text-center">
            <detail.icon className="size-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">{detail.label}</p>
            <p className="text-sm font-medium">{detail.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

const BrewGuide = ({ methods }: BrewGuideProps) => (
  <div className="space-y-3">
    {methods.map((method, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-4">
          <p className="font-medium text-sm mb-2">{method.name}</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Ratio</p>
              <p className="font-medium">{method.ratio}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Temp</p>
              <p className="font-medium">{method.temp}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Time</p>
              <p className="font-medium">{method.time}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
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
          {/* Image */}
          <HeroImage
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800"
            alt="Coffee beans"
            badges={["Single Origin", "Organic", "Fair Trade"]}
          />

          {/* Content */}
          <div className="flex flex-col gap-5">
            <Title
              origin="Ethiopia, Yirgacheffe"
              name="Sunrise Bloom Ethiopian"
              roaster="Artisan Roasters Co."
            />

            <Rating rating={5} reviews={2341} />

            <Price current="$24" unit="12oz bag" />

            {/* Tabs */}
            <Tabs defaultValue="flavor" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="flavor">Flavor</TabsTrigger>
                <TabsTrigger value="origin">Origin</TabsTrigger>
                <TabsTrigger value="brew">Brew Guide</TabsTrigger>
              </TabsList>

              <TabsContent value="flavor" className="mt-4">
                <FlavorProfile
                  notes={[
                    { name: "Blueberry", intensity: 8 },
                    { name: "Jasmine", intensity: 6 },
                    { name: "Citrus", intensity: 7 },
                    { name: "Honey", intensity: 5 },
                    { name: "Bergamot", intensity: 4 },
                  ]}
                />
              </TabsContent>

              <TabsContent value="origin" className="mt-4">
                <OriginStory
                  title="The Yirgacheffe Region"
                  description="Grown at 1,900-2,200m altitude in the birthplace of coffee. These beans are hand-picked by local farming cooperatives and processed using traditional washed methods."
                  details={[
                    { icon: MapPin, label: "Altitude", value: "1,950m" },
                    { icon: Leaf, label: "Process", value: "Washed" },
                    { icon: Award, label: "Grade", value: "Grade 1" },
                  ]}
                />
              </TabsContent>

              <TabsContent value="brew" className="mt-4">
                <BrewGuide
                  methods={[
                    { name: "Pour Over (V60)", ratio: "1:16", temp: "94°C", time: "3:00" },
                    { name: "French Press", ratio: "1:15", temp: "93°C", time: "4:00" },
                    { name: "AeroPress", ratio: "1:12", temp: "85°C", time: "1:30" },
                  ]}
                />
              </TabsContent>
            </Tabs>

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

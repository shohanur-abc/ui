"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Star, ShoppingCart, Heart, Wifi, Cpu, HardDrive, MonitorSmartphone, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductShowcaseProps {
  src: string
  alt: string
  badge?: string
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

interface ConfigSelectorProps {
  label: string
  options: { id: string; name: string; price: string }[]
}

interface SpecComparisonProps {
  configs: { name: string; specs: { icon: LucideIcon; label: string; value: string }[] }[]
}

interface BenchmarkProps {
  tests: { name: string; score: number; max: number }[]
}

interface PortsInfoProps {
  ports: { name: string; count: number }[]
}

interface ActionsProps {
  buttons: { label: string; href: string; icon?: LucideIcon; variant?: "default" | "outline" }[]
}

const ProductShowcase = ({ src, alt, badge }: ProductShowcaseProps) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
    <Image src={src} alt={alt} fill className="object-cover p-8" />
    {badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
  </div>
)

const Header = ({ brand, name, tagline }: HeaderProps) => (
  <div className="space-y-1">
    <p className="text-sm text-primary font-medium uppercase tracking-wider">{brand}</p>
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

const ConfigSelector = ({ label, options }: ConfigSelectorProps) => (
  <div className="space-y-3">
    <p className="font-medium text-sm">{label}</p>
    <RadioGroup defaultValue={options[0].id} className="grid gap-2">
      {options.map((opt) => (
        <div key={opt.id} className="flex items-center">
          <RadioGroupItem value={opt.id} id={opt.id} className="peer sr-only" />
          <Label
            htmlFor={opt.id}
            className="flex-1 flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/30 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
          >
            <span className="font-medium text-sm">{opt.name}</span>
            <span className="text-sm text-muted-foreground">{opt.price}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
)

const SpecComparison = ({ configs }: SpecComparisonProps) => (
  <div className="grid gap-4">
    {configs.map((config, i) => (
      <Card key={i} className="bg-muted/30 border-muted">
        <CardContent className="p-4">
          <p className="font-medium text-sm mb-3">{config.name}</p>
          <div className="grid grid-cols-2 gap-3">
            {config.specs.map((spec, j) => (
              <div key={j} className="flex items-center gap-2">
                <spec.icon className="size-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="text-sm font-medium">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const Benchmark = ({ tests }: BenchmarkProps) => (
  <div className="space-y-4">
    {tests.map((test, i) => (
      <div key={i} className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>{test.name}</span>
          <span className="font-medium text-primary">{test.score.toLocaleString()}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all"
            style={{ width: `${(test.score / test.max) * 100}%` }}
          />
        </div>
      </div>
    ))}
  </div>
)

const PortsInfo = ({ ports }: PortsInfoProps) => (
  <div className="flex flex-wrap gap-2">
    {ports.map((port, i) => (
      <Badge key={i} variant="secondary">
        {port.count}x {port.name}
      </Badge>
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
          <ProductShowcase
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
            alt="Laptop"
            badge="Just Released"
          />

          {/* Content */}
          <div className="flex flex-col gap-5">
            <Header
              brand="Apple"
              name="MacBook Pro 16-inch"
              tagline="The most powerful MacBook Pro ever"
            />

            <Rating rating={5} reviews={8934} />

            <Price current="$2,499" original="$2,699" />

            <ConfigSelector
              label="Choose Configuration"
              options={[
                { id: "base", name: "M3 Pro • 18GB • 512GB", price: "$2,499" },
                { id: "mid", name: "M3 Pro • 36GB • 1TB", price: "$2,999" },
                { id: "max", name: "M3 Max • 48GB • 1TB", price: "$3,499" },
              ]}
            />

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
                <TabsTrigger value="ports">Ports</TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-4">
                <SpecComparison
                  configs={[
                    {
                      name: "Performance",
                      specs: [
                        { icon: Cpu, label: "Chip", value: "Apple M3 Pro" },
                        { icon: HardDrive, label: "Memory", value: "18GB Unified" },
                        { icon: MonitorSmartphone, label: "Display", value: "16.2\" Liquid Retina XDR" },
                        { icon: Wifi, label: "Wireless", value: "WiFi 6E + BT 5.3" },
                      ],
                    },
                  ]}
                />
              </TabsContent>

              <TabsContent value="benchmarks" className="mt-4">
                <Benchmark
                  tests={[
                    { name: "Geekbench 6 (Single-Core)", score: 3089, max: 4000 },
                    { name: "Geekbench 6 (Multi-Core)", score: 15498, max: 20000 },
                    { name: "Cinebench R24 (Single)", score: 141, max: 200 },
                    { name: "Cinebench R24 (Multi)", score: 1024, max: 1500 },
                  ]}
                />
              </TabsContent>

              <TabsContent value="ports" className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground">Complete connectivity for professionals</p>
                <PortsInfo
                  ports={[
                    { name: "Thunderbolt 4", count: 3 },
                    { name: "HDMI 2.1", count: 1 },
                    { name: "SDXC", count: 1 },
                    { name: "MagSafe 3", count: 1 },
                    { name: "3.5mm Audio", count: 1 },
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

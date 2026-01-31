import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Cloud, Download, Heart, ShoppingCart, Star, Zap, Shield } from "lucide-react"
import Image from "next/image"

interface SoftwareProps {
    image: string
    name: string
    developer: string
    price: number
    period: string
    rating: number
    reviews: number
    category: string
    features: string[]
    platforms: string[]
    version: string
}

const SoftwareLogo = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700">
        <Image src={src} alt={alt} fill className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
            <Cloud className="size-16 text-white" />
        </div>
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CategoryBadge = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Zap className="size-3" />
        {text}
    </Badge>
)

const VersionBadge = ({ version }: { version: string }) => (
    <Badge variant="outline" className="text-xs">
        v{version}
    </Badge>
)

const SoftwareName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const DeveloperName = ({ name }: { name: string }) => (
    <p className="text-sm text-muted-foreground">by {name}</p>
)

const SoftwareRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews.toLocaleString()})</span>
    </div>
)

const FeaturesList = ({ features }: { features: string[] }) => (
    <ul className="space-y-1.5">
        {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-4 shrink-0 text-green-500" />
                {f}
            </li>
        ))}
    </ul>
)

const PlatformsList = ({ platforms }: { platforms: string[] }) => (
    <div className="flex flex-wrap gap-1.5">
        {platforms.map((p, i) => (
            <Badge key={i} variant="outline" className="gap-1 text-xs">
                <Shield className="size-3" />
                {p}
            </Badge>
        ))}
    </div>
)

const PriceDisplay = ({ price, period }: { price: number; period: string }) => (
    <div className="space-y-0.5">
        <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-foreground">${price}</span>
            <span className="text-sm text-muted-foreground">/{period}</span>
        </div>
    </div>
)

const DownloadButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Download className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const software: SoftwareProps = {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=280&fit=crop",
        name: "CloudSync Pro",
        developer: "TechCorp Inc.",
        price: 12.99,
        period: "month",
        rating: 4.7,
        reviews: 8934,
        category: "Productivity",
        features: [
            "Unlimited cloud storage",
            "Real-time collaboration",
            "Advanced security",
            "24/7 Support",
        ],
        platforms: ["Windows", "macOS", "Linux"],
        version: "3.2.1",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <SoftwareLogo src={software.image} alt={software.name} />
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <CategoryBadge text={software.category} />
                                <VersionBadge version={software.version} />
                            </div>
                            <SoftwareRating rating={software.rating} reviews={software.reviews} />
                        </div>
                        <div className="space-y-0.5">
                            <SoftwareName text={software.name} />
                            <DeveloperName name={software.developer} />
                        </div>
                        <FeaturesList features={software.features} />
                        <PlatformsList platforms={software.platforms} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay price={software.price} period={software.period} />
                            <DownloadButton label="Get" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}

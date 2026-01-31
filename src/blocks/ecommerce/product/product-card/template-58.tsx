import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, FileCode, Heart, Layers, ShoppingCart, Star, Tag, Zap } from "lucide-react"
import Image from "next/image"

interface TemplateProps {
    image: string
    name: string
    author: string
    price: number
    rating: number
    reviews: number
    downloads: number
    category: string
    framework: string
    lastUpdated: string
    features: string[]
}

const TemplatePreview = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-white/80 text-foreground hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const FrameworkBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1 bg-black/70 backdrop-blur-sm">
        <FileCode className="size-3" />
        {text}
    </Badge>
)

const TemplateName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const AuthorName = ({ name }: { name: string }) => (
    <p className="text-sm text-muted-foreground">by {name}</p>
)

const TemplateRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const DownloadCount = ({ count }: { count: number }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Download className="size-4" />
        {count.toLocaleString()} downloads
    </div>
)

const FeatureTags = ({ features }: { features: string[] }) => (
    <div className="flex flex-wrap gap-1.5">
        {features.map((f, i) => (
            <Badge key={i} variant="outline" className="text-xs">
                {f}
            </Badge>
        ))}
    </div>
)

const LastUpdated = ({ date }: { date: string }) => (
    <p className="text-xs text-muted-foreground">Updated {date}</p>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount}</span>
)

const PurchaseButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const template: TemplateProps = {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=375&fit=crop",
        name: "Dashboard Pro UI Kit",
        author: "PixelCraft",
        price: 49,
        rating: 4.8,
        reviews: 342,
        downloads: 12540,
        category: "Dashboard",
        framework: "React + Tailwind",
        lastUpdated: "2 days ago",
        features: ["Dark Mode", "50+ Components", "Responsive", "TypeScript"],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <TemplatePreview src={template.image} alt={template.name} />
                        <FrameworkBadge text={template.framework} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <DownloadCount count={template.downloads} />
                            <TemplateRating rating={template.rating} reviews={template.reviews} />
                        </div>
                        <div className="space-y-0.5">
                            <TemplateName text={template.name} />
                            <AuthorName name={template.author} />
                        </div>
                        <FeatureTags features={template.features} />
                        <LastUpdated date={template.lastUpdated} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={template.price} />
                            <PurchaseButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}

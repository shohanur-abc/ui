import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Download, Gift, Star } from "lucide-react"
import Image from "next/image"

interface DigitalProductProps {
    image: string
    name: string
    type: string
    price: number
    rating: number
    downloads: number
    includes: string[]
}

const ProductPreview = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
                <Download className="size-6 text-primary" />
            </div>
        </div>
    </div>
)

const ProductType = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="text-xs">
        {text}
    </Badge>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-lg font-semibold text-foreground">{text}</h3>
)

const ProductStats = ({ rating, downloads }: { rating: number; downloads: number }) => (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            {rating.toFixed(1)}
        </span>
        <span className="flex items-center gap-1">
            <Download className="size-4" />
            {downloads.toLocaleString()}
        </span>
    </div>
)

const IncludedList = ({ items }: { items: string[] }) => (
    <div className="space-y-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Includes:</span>
        <div className="flex flex-wrap gap-1.5">
            {items.map((item, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                    {item}
                </Badge>
            ))}
        </div>
    </div>
)

const PriceSection = ({ amount }: { amount: number }) => (
    <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">${amount}</span>
        <span className="text-sm text-muted-foreground">one-time</span>
    </div>
)

const ActionButtons = ({ primary, secondary }: { primary: string; secondary: string }) => (
    <div className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2">
            <Gift className="size-4" />
            {secondary}
        </Button>
        <Button className="flex-1 gap-2">
            <Download className="size-4" />
            {primary}
        </Button>
    </div>
)

export default function Main() {
    const product: DigitalProductProps = {
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=340&fit=crop",
        name: "Complete UI Design System",
        type: "Design Template",
        price: 49,
        rating: 4.9,
        downloads: 12500,
        includes: ["Figma Files", "Components", "Icons", "Documentation"],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="space-y-4 p-5">
                    <ProductPreview src={product.image} alt={product.name} />
                    <div className="space-y-2">
                        <ProductType text={product.type} />
                        <ProductName text={product.name} />
                        <ProductStats rating={product.rating} downloads={product.downloads} />
                    </div>
                    <IncludedList items={product.includes} />
                    <PriceSection amount={product.price} />
                    <ActionButtons primary="Buy Now" secondary="Gift" />
                </Card>
            </div>
        </section>
    )
}

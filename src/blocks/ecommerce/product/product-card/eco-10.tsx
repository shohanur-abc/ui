import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Leaf, Package, Recycle, ShoppingCart, Truck } from "lucide-react"
import Image from "next/image"

interface ProductProps {
    image: string
    name: string
    brand: string
    price: number
    sustainability: { icon: string; label: string }[]
    deliveryDays: number
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <Badge className="absolute left-3 top-3 gap-1.5 bg-green-600 text-white">
            <Leaf className="size-3" />
            Eco-Friendly
        </Badge>
    </div>
)

const BrandName = ({ text }: { text: string }) => (
    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const SustainabilityBadges = ({ items }: { items: { icon: string; label: string }[] }) => {
    const iconMap: Record<string, React.ReactNode> = {
        recycle: <Recycle className="size-3" />,
        package: <Package className="size-3" />,
        leaf: <Leaf className="size-3" />,
    }
    return (
        <div className="flex flex-wrap gap-1.5">
            {items.map((item, i) => (
                <Badge key={i} variant="secondary" className="gap-1 text-xs">
                    {iconMap[item.icon]}
                    {item.label}
                </Badge>
            ))}
        </div>
    )
}

const DeliveryInfo = ({ days }: { days: number }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Truck className="size-4 text-primary" />
        <span>Free delivery in {days} days</span>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">${amount.toFixed(0)}</span>
        <span className="text-sm text-muted-foreground">.{((amount % 1) * 100).toFixed(0).padStart(2, "0")}</span>
    </div>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const product: ProductProps = {
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
        name: "Bamboo Sports Water Bottle",
        brand: "EcoLife",
        price: 34.99,
        sustainability: [
            { icon: "recycle", label: "Recyclable" },
            { icon: "package", label: "Zero Waste" },
            { icon: "leaf", label: "Carbon Neutral" },
        ],
        deliveryDays: 3,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden p-4">
                    <div className="space-y-4">
                        <ProductImage src={product.image} alt={product.name} />
                        <div className="space-y-2">
                            <BrandName text={product.brand} />
                            <ProductName text={product.name} />
                            <SustainabilityBadges items={product.sustainability} />
                        </div>
                        <Separator />
                        <DeliveryInfo days={product.deliveryDays} />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={product.price} />
                            <AddButton label="Add" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}

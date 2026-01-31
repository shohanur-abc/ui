import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Check, Palette } from "lucide-react"
import Image from "next/image"

interface ProductProps {
    image: string
    name: string
    price: number
    colors: { name: string; hex: string }[]
    selectedColor: number
    inStock: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-lg font-semibold text-foreground">{text}</h3>
)

const ColorSelector = ({ colors, selected }: { colors: { name: string; hex: string }[]; selected: number }) => (
    <div className="flex items-center gap-2">
        <Palette className="size-4 text-muted-foreground" />
        <div className="flex gap-1.5">
            {colors.map((color, i) => (
                <button
                    key={i}
                    className={`size-5 rounded-full border-2 transition-transform hover:scale-110 ${
                        i === selected ? "border-primary ring-2 ring-primary/30" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                />
            ))}
        </div>
    </div>
)

const StockStatus = ({ inStock }: { inStock: boolean }) => (
    <Badge variant={inStock ? "secondary" : "outline"} className="gap-1">
        {inStock && <Check className="size-3" />}
        {inStock ? "In Stock" : "Out of Stock"}
    </Badge>
)

const PriceDisplay = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const ActionButtons = ({ primaryLabel, secondaryLabel }: { primaryLabel: string; secondaryLabel: string }) => (
    <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
            {secondaryLabel}
        </Button>
        <Button className="flex-1">{primaryLabel}</Button>
    </div>
)

export default function Main() {
    const product: ProductProps = {
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        name: "Ceramic Watch Classic",
        price: 449.00,
        colors: [
            { name: "Midnight Black", hex: "#1a1a1a" },
            { name: "Rose Gold", hex: "#b76e79" },
            { name: "Silver", hex: "#c0c0c0" },
            { name: "Ocean Blue", hex: "#0077b6" },
        ],
        selectedColor: 0,
        inStock: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="overflow-hidden">
                    <CardContent className="space-y-4 p-4">
                        <ProductImage src={product.image} alt={product.name} />
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                                <ProductName text={product.name} />
                                <StockStatus inStock={product.inStock} />
                            </div>
                            <ColorSelector colors={product.colors} selected={product.selectedColor} />
                            <PriceDisplay amount={product.price} />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <ActionButtons primaryLabel="Buy Now" secondaryLabel="Details" />
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}

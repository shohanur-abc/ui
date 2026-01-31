import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, Heart, Star } from "lucide-react"
import Image from "next/image"

interface ProductProps {
    image: string
    name: string
    category: string
    price: number
    rating: number
    reviews: number
    isNew?: boolean
}

const ProductImage = ({ src, alt, isNew }: { src: string; alt: string; isNew?: boolean }) => (
    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        {isNew && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">New</Badge>
        )}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 bg-gradient-to-t from-black/80 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
            <Button size="icon-sm" variant="secondary" className="flex-1">
                <Heart className="size-4" />
            </Button>
            <Button size="icon-sm" variant="secondary" className="flex-1">
                <Eye className="size-4" />
            </Button>
        </div>
    </div>
)

const ProductCategory = ({ text }: { text: string }) => (
    <span className="text-xs uppercase tracking-wider text-muted-foreground">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{text}</h3>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`size-3.5 ${i < Math.floor(rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                />
            ))}
        </div>
        <span className="text-xs text-muted-foreground">({reviews})</span>
    </div>
)

const ProductPrice = ({ amount }: { amount: number }) => (
    <span className="text-lg font-bold text-foreground">${amount.toFixed(2)}</span>
)

export default function Main() {
    const product: ProductProps = {
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=500&fit=crop",
        name: "Luxury Perfume Collection",
        category: "Fragrances",
        price: 159.00,
        rating: 4.5,
        reviews: 128,
        isNew: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-card shadow-xl">
                    <ProductImage src={product.image} alt={product.name} isNew={product.isNew} />
                    <div className="space-y-2 p-4">
                        <ProductCategory text={product.category} />
                        <ProductName text={product.name} />
                        <ProductRating rating={product.rating} reviews={product.reviews} />
                        <ProductPrice amount={product.price} />
                    </div>
                </Card>
            </div>
        </section>
    )
}

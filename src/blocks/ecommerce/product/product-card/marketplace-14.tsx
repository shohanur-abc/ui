import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Crown, Heart, ShoppingBag, Star, Verified } from "lucide-react"
import Image from "next/image"

interface ProductProps {
    image: string
    name: string
    price: number
    seller: {
        name: string
        avatar: string
        verified: boolean
        topSeller: boolean
    }
    rating: number
    sales: number
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90 backdrop-blur-sm hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const SellerInfo = ({ name, avatar, verified, topSeller }: { name: string; avatar: string; verified: boolean; topSeller: boolean }) => (
    <div className="flex items-center gap-2">
        <Avatar className="size-7">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground">{name}</span>
            {verified && <Verified className="size-4 fill-primary text-primary-foreground" />}
            {topSeller && (
                <Badge variant="secondary" className="gap-1 py-0 text-xs">
                    <Crown className="size-3" />
                    Top
                </Badge>
            )}
        </div>
    </div>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="line-clamp-2 font-medium text-foreground">{text}</h3>
)

const ProductStats = ({ rating, sales }: { rating: number; sales: number }) => (
    <div className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            {rating.toFixed(1)}
        </span>
        <span className="text-muted-foreground">{sales.toLocaleString()} sold</span>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const BuyButton = ({ label }: { label: string }) => (
    <Button size="icon" className="shrink-0">
        <ShoppingBag className="size-4" />
    </Button>
)

export default function Main() {
    const product: ProductProps = {
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop",
        name: "Handcrafted Leather Journal Notebook",
        price: 42.99,
        seller: {
            name: "ArtisanCrafts",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            verified: true,
            topSeller: true,
        },
        rating: 4.9,
        sales: 3420,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden p-4">
                    <div className="space-y-3">
                        <ProductImage src={product.image} alt={product.name} />
                        <SellerInfo {...product.seller} />
                        <ProductName text={product.name} />
                        <ProductStats rating={product.rating} sales={product.sales} />
                        <div className="flex items-center justify-between pt-2">
                            <PriceTag amount={product.price} />
                            <BuyButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}

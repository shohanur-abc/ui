import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Heart, ShoppingCart, Star, UtensilsCrossed, ChefHat } from "lucide-react"
import Image from "next/image"

interface RestaurantProps {
    image: string
    name: string
    cuisine: string
    rating: number
    reviews: number
    priceRange: string
    deliveryTime: string
    freeDelivery: boolean
    menuItems: { name: string; price: number }[]
}

const RestaurantImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CuisineBadge = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <UtensilsCrossed className="size-3" />
        {text}
    </Badge>
)

const RestaurantName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const RatingDisplay = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-muted-foreground">({reviews}+)</span>
    </div>
)

const DeliveryInfo = ({ time, freeDelivery, priceRange }: { time: string; freeDelivery: boolean; priceRange: string }) => (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {time}
        </span>
        <span>{priceRange}</span>
        {freeDelivery && (
            <Badge variant="outline" className="text-xs text-green-600">
                Free Delivery
            </Badge>
        )}
    </div>
)

const MenuPreview = ({ items }: { items: { name: string; price: number }[] }) => (
    <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Popular Items</p>
        <div className="space-y-1.5">
            {items.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-primary">${item.price.toFixed(2)}</span>
                </div>
            ))}
        </div>
    </div>
)

const OrderButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const restaurant: RestaurantProps = {
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=375&fit=crop",
        name: "Sakura Japanese Kitchen",
        cuisine: "Japanese",
        rating: 4.8,
        reviews: 324,
        priceRange: "$$",
        deliveryTime: "25-35 min",
        freeDelivery: true,
        menuItems: [
            { name: "Dragon Roll", price: 18.99 },
            { name: "Chicken Teriyaki", price: 16.50 },
            { name: "Miso Ramen", price: 14.99 },
        ],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden p-4">
                    <div className="space-y-4">
                        <RestaurantImage src={restaurant.image} alt={restaurant.name} />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <CuisineBadge text={restaurant.cuisine} />
                                <RatingDisplay rating={restaurant.rating} reviews={restaurant.reviews} />
                            </div>
                            <RestaurantName text={restaurant.name} />
                            <DeliveryInfo time={restaurant.deliveryTime} freeDelivery={restaurant.freeDelivery} priceRange={restaurant.priceRange} />
                        </div>
                        <Separator />
                        <MenuPreview items={restaurant.menuItems} />
                        <OrderButton label="Order Now" />
                    </div>
                </Card>
            </div>
        </section>
    )
}

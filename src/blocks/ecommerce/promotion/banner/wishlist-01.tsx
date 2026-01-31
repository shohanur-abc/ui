import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const WishlistItem = ({
    image,
    title,
    price,
    originalPrice,
    rating,
    onSale,
}: {
    image: string
    title: string
    price: string
    originalPrice?: string
    rating: number
    onSale?: boolean
}) => (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border/50">
        <div className="aspect-square relative">
            <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            {onSale && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0">Sale</Badge>
            )}
            <button className="absolute top-2 right-2 size-8 rounded-full bg-white/90 flex items-center justify-center">
                <Heart className="size-4 text-red-500 fill-red-500" />
            </button>
        </div>
        <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`size-3 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
                ))}
            </div>
            <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{price}</span>
                    {originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
                    )}
                </div>
                <Button size="icon" variant="ghost" className="size-8">
                    <ShoppingCart className="size-4" />
                </Button>
            </div>
        </div>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: string
    subtext: string
}) => (
    <div className="text-center mb-10">
        <Badge className="bg-red-500/10 text-red-500 border-red-500/30 gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{headline}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Heart, text: "Your Wishlist" }}
                        headline="Items You'll Love"
                        subtext="Some items in your wishlist are now on sale!"
                    />
                    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
                        <WishlistItem
                            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                            title="Smart Watch Pro"
                            price="$249"
                            originalPrice="$299"
                            rating={5}
                            onSale
                        />
                        <WishlistItem
                            image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
                            title="Wireless Earbuds"
                            price="$149"
                            rating={4}
                        />
                        <WishlistItem
                            image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
                            title="Fitness Band"
                            price="$79"
                            originalPrice="$99"
                            rating={4}
                            onSale
                        />
                        <WishlistItem
                            image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
                            title="Power Bank"
                            price="$59"
                            rating={5}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

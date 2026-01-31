import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between mb-8 @md:mb-10">
                    <div>
                        <Badge variant="secondary" className="mb-4">Best Sellers</Badge>
                        <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
                            Most Popular Products
                        </h1>
                    </div>
                    <Button variant="outline" className="gap-2 mt-4 @lg:mt-0 w-fit" asChild>
                        <Link href="/bestsellers">
                            View All <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                {/* Product Grid */}
                <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-5 @md:gap-6">
                    <ProductCard
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                        name="Air Max Pro"
                        category="Running Shoes"
                        price="$159"
                        rating={4.9}
                        reviews={2847}
                        badge="Best Seller"
                    />
                    <ProductCard
                        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                        name="Chronos Elite"
                        category="Smart Watch"
                        price="$299"
                        rating={4.8}
                        reviews={1923}
                    />
                    <ProductCard
                        image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
                        name="Urban Tote"
                        category="Handbag"
                        price="$189"
                        originalPrice="$249"
                        rating={4.7}
                        reviews={856}
                        badge="Sale"
                    />
                    <ProductCard
                        image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
                        name="Aviator Classic"
                        category="Sunglasses"
                        price="$79"
                        rating={4.9}
                        reviews={3102}
                        badge="Top Rated"
                    />
                </div>
            </div>
        </section>
    )
}

interface ProductCardProps {
    image: string
    name: string
    category: string
    price: string
    originalPrice?: string
    rating: number
    reviews: number
    badge?: string
}

const ProductCard = ({ image, name, category, price, originalPrice, rating, reviews, badge }: ProductCardProps) => (
    <div className="group relative">
        {/* Image Container */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badge */}
            {badge && (
                <Badge
                    className={`absolute top-3 left-3 ${badge === 'Sale' ? 'bg-red-500' :
                            badge === 'Best Seller' ? 'bg-primary' :
                                'bg-yellow-500'
                        }`}
                >
                    {badge}
                </Badge>
            )}

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="size-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Heart className="size-4" />
                </button>
            </div>

            {/* Add to Cart Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <Button className="w-full gap-2" size="sm">
                    <ShoppingCart className="size-4" />
                    Add to Cart
                </Button>
            </div>
        </div>

        {/* Content */}
        <div>
            <p className="text-sm text-muted-foreground mb-1">{category}</p>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                <Link href="#">{name}</Link>
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`size-3.5 ${star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                        />
                    ))}
                </div>
                <span className="text-sm text-muted-foreground">({reviews.toLocaleString()})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{price}</span>
                {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
                )}
            </div>
        </div>
    </div>
)

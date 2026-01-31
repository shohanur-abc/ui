import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-8 @md:mb-10 @xl:mb-12">
                    <Eyebrow text="New Arrivals" />
                    <Title text="Trending This Season" />
                    <Description text="Discover our curated selection of must-have pieces" />
                </div>

                {/* Product Grid */}
                <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5 @xl:gap-6 mb-8 @md:mb-10">
                    <ProductCard
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                        name="Sport Sneakers"
                        price="$129"
                        badge="New"
                        featured
                    />
                    <ProductCard
                        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                        name="Classic Watch"
                        price="$299"
                    />
                    <ProductCard
                        image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
                        name="Leather Bag"
                        price="$189"
                        badge="Hot"
                    />
                    <ProductCard
                        image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
                        name="Sunglasses"
                        price="$79"
                    />
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/shop">
                            Shop All Products <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-3 @md:mb-4">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-lg mx-auto">
        {text}
    </p>
)

interface ProductCardProps {
    image: string
    name: string
    price: string
    badge?: string
    featured?: boolean
}

const ProductCard = ({ image, name, price, badge, featured }: ProductCardProps) => (
    <Link
        href="#"
        className={`group relative rounded-2xl overflow-hidden bg-muted/30 ${featured ? '@sm:col-span-2 @xl:col-span-2 @xl:row-span-2' : ''}`}
    >
        <div className={`relative ${featured ? 'aspect-square' : 'aspect-square'}`}>
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="size-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="size-4" />
                </button>
                <button className="size-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <ShoppingBag className="size-4" />
                </button>
            </div>

            {/* Badge */}
            {badge && (
                <Badge className="absolute top-3 left-3" variant={badge === 'Hot' ? 'destructive' : 'default'}>
                    {badge}
                </Badge>
            )}

            {/* Product Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 @md:p-5">
                <h3 className={`font-semibold text-white mb-1 ${featured ? 'text-xl @md:text-2xl' : 'text-base @md:text-lg'}`}>
                    {name}
                </h3>
                <p className={`text-white/90 font-medium ${featured ? 'text-lg @md:text-xl' : ''}`}>
                    {price}
                </p>
            </div>
        </div>
    </Link>
)

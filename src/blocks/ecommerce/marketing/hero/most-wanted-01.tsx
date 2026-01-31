import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Heart, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-4 mb-8 @md:mb-12">
                    <div>
                        <Badge variant="secondary" className="mb-4">
                            <TrendingUp className="size-3 mr-1" /> Trending Now
                        </Badge>
                        <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
                            Most <span className="text-primary">Wanted</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-xl">
                            Shop the products everyone&apos;s talking about. Updated weekly based on what&apos;s trending.
                        </p>
                    </div>
                    <Button variant="outline" className="gap-2 w-fit" asChild>
                        <Link href="/trending">
                            View All Trending <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                {/* Featured + Grid */}
                <div className="grid @lg:grid-cols-2 gap-6 @md:gap-8">
                    {/* Featured Large */}
                    <div className="relative rounded-3xl overflow-hidden group">
                        <div className="relative aspect-[4/5]">
                            <Image
                                src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800"
                                alt="Featured trending product"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <Badge className="bg-primary text-primary-foreground">
                                    #1 Trending
                                </Badge>
                                <Badge className="bg-white/20 text-white backdrop-blur-sm">
                                    <Star className="size-3 mr-1 fill-yellow-400 text-yellow-400" /> 4.9
                                </Badge>
                            </div>

                            {/* Wishlist */}
                            <button className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Heart className="size-5 text-white" />
                            </button>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h2 className="text-2xl @md:text-3xl font-bold text-white mb-2">
                                    Designer Handbag Collection
                                </h2>
                                <p className="text-white/80 mb-4 max-w-sm">
                                    The must-have accessory of the season. Handcrafted with premium materials.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="text-white">
                                        <span className="text-2xl font-bold">$299</span>
                                        <span className="text-white/60 line-through ml-2">$399</span>
                                    </div>
                                    <Button className="gap-2 bg-white text-black hover:bg-white/90">
                                        <ShoppingBag className="size-4" /> Add to Bag
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid of smaller items */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { image: 'https://images.unsplash.com/photo-1491553895911-0055uj8d0cce?w=400', name: 'Minimalist Watch', price: '$189', rank: 2 },
                            { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', name: 'Sport Sneakers', price: '$149', rank: 3 },
                            { image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', name: 'Classic Sunglasses', price: '$99', rank: 4 },
                            { image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400', name: 'Wireless Earbuds', price: '$129', rank: 5 },
                        ].map(({ image, name, price, rank }) => (
                            <Link key={name} href="#" className="group">
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                                    <Image
                                        src={image}
                                        alt={name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 left-2 size-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                                        {rank}
                                    </div>
                                    <button className="absolute top-2 right-2 size-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Heart className="size-4" />
                                    </button>
                                </div>
                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{name}</h3>
                                <p className="text-sm text-muted-foreground">{price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between mb-8 @md:mb-10">
                    <div>
                        <Badge variant="outline" className="mb-4 text-red-500 border-red-500/30">
                            <Heart className="size-3 mr-1 fill-red-500" /> Trending
                        </Badge>
                        <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
                            Most Wanted Right Now
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-lg">
                            See what&apos;s flying off our shelves and join the trend
                        </p>
                    </div>
                    <Button variant="outline" className="gap-2 mt-4 @lg:mt-0 w-fit" asChild>
                        <Link href="/trending">
                            View All Trending <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                {/* Trending Grid */}
                <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-5 @md:gap-6">
                    <TrendingCard
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                        name="Air Max Pro X"
                        price="$189"
                        views="12.5K"
                        rank={1}
                        featured
                    />
                    <TrendingCard
                        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                        name="Minimalist Watch"
                        price="$299"
                        views="8.2K"
                        rank={2}
                    />
                    <TrendingCard
                        image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500"
                        name="Designer Tote"
                        price="$159"
                        views="6.8K"
                        rank={3}
                    />
                </div>

                {/* Live Stats */}
                <LiveStats />
            </div>
        </section>
    )
}

interface TrendingCardProps {
    image: string
    name: string
    price: string
    views: string
    rank: number
    featured?: boolean
}

const TrendingCard = ({ image, name, price, views, rank, featured }: TrendingCardProps) => (
    <Link href="#" className={`group relative ${featured ? '@sm:row-span-2' : ''}`}>
        <div className={`relative rounded-2xl overflow-hidden bg-muted ${featured ? 'aspect-[3/4]' : 'aspect-square'}`}>
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Rank Badge */}
            <div className="absolute top-4 left-4 size-10 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg">
                #{rank}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="size-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md">
                    <Heart className="size-4" />
                </button>
                <button className="size-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md">
                    <ShoppingBag className="size-4" />
                </button>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 @md:p-6 text-white">
                <div className="flex items-center gap-2 mb-2 text-sm text-white/80">
                    <Eye className="size-4" />
                    {views} views today
                </div>
                <h3 className={`font-bold mb-1 ${featured ? 'text-2xl' : 'text-lg'}`}>{name}</h3>
                <div className="flex items-center justify-between">
                    <span className={`font-bold ${featured ? 'text-xl' : ''}`}>{price}</span>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="size-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Link>
)

const LiveStats = () => (
    <div className="mt-8 @md:mt-10 p-5 @md:p-6 rounded-2xl bg-muted/50 border">
        <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="size-3 rounded-full bg-green-500" />
                    <div className="absolute inset-0 size-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <span className="font-medium">Live Shopping Activity</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
                <div>
                    <span className="text-muted-foreground">Active shoppers: </span>
                    <span className="font-bold">2,847</span>
                </div>
                <div>
                    <span className="text-muted-foreground">Orders today: </span>
                    <span className="font-bold">1,234</span>
                </div>
                <div>
                    <span className="text-muted-foreground">Items sold: </span>
                    <span className="font-bold">4,567</span>
                </div>
            </div>
        </div>
    </div>
)

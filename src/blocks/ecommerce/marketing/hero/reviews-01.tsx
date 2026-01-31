import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Quote, Heart, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-10 @md:mb-14">
                    <Badge variant="secondary" className="mb-4">
                        <Star className="size-3 mr-1 fill-yellow-400 text-yellow-400" /> Top Reviewed
                    </Badge>
                    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
                        Don&apos;t Take Our Word for It
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See what our customers are saying about their favorite products.
                    </p>
                </div>

                {/* Featured Product with Reviews */}
                <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center mb-12">
                    <FeaturedProduct />
                    <FeaturedReviews />
                </div>

                {/* Review Stats */}
                <ReviewStats />

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/reviews">
                            Read All Reviews <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const FeaturedProduct = () => (
    <div className="relative">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                alt="Featured product"
                fill
                className="object-cover"
            />
        </div>

        {/* Rating badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-card rounded-2xl shadow-xl border flex items-center gap-4">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
                <div className="font-bold">4.9/5</div>
                <div className="text-xs text-muted-foreground">2,847 reviews</div>
            </div>
        </div>
    </div>
)

const FeaturedReviews = () => (
    <div className="space-y-4">
        <ReviewCard
            name="Sarah M."
            avatar="https://i.pravatar.cc/100?img=1"
            rating={5}
            review="Absolutely love this product! The quality exceeded my expectations. I've been using it daily for 3 months and it still looks brand new."
            helpful={142}
            verified
        />
        <ReviewCard
            name="James K."
            avatar="https://i.pravatar.cc/100?img=8"
            rating={5}
            review="Best purchase I've made this year. The attention to detail is incredible. Highly recommend to anyone on the fence."
            helpful={89}
            verified
        />
        <ReviewCard
            name="Emily R."
            avatar="https://i.pravatar.cc/100?img=5"
            rating={5}
            review="Worth every penny! Fast shipping, beautiful packaging, and the product itself is amazing."
            helpful={67}
            verified
        />
    </div>
)

interface ReviewCardProps {
    name: string
    avatar?: string
    rating: number
    review: string
    helpful: number
    verified?: boolean
}

const ReviewCard = ({ name, avatar, rating, review, helpful, verified }: ReviewCardProps) => (
    <div className="p-4 @md:p-5 rounded-2xl bg-card border">
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                <Avatar className="size-10">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{name}</span>
                        {verified && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Verified</Badge>
                        )}
                    </div>
                    <div className="flex">
                        {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>
            <Quote className="size-6 text-muted-foreground/30" />
        </div>
        <p className="text-sm text-muted-foreground mb-3">{review}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground">
                <ThumbsUp className="size-3" /> Helpful ({helpful})
            </button>
        </div>
    </div>
)

const ReviewStats = () => (
    <div className="grid @sm:grid-cols-4 gap-4 @md:gap-6 p-6 @md:p-8 rounded-2xl bg-card border">
        {[
            { value: '4.9', label: 'Average Rating', icon: Star },
            { value: '15K+', label: 'Total Reviews', icon: Quote },
            { value: '98%', label: 'Recommend', icon: ThumbsUp },
            { value: '12K+', label: 'Happy Customers', icon: Heart },
        ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
                <Icon className="size-6 mx-auto mb-2 text-amber-500" />
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Heart, Users, Smile } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-10 @md:mb-12">
                    <Badge variant="secondary" className="mb-4">
                        <Award className="size-3 mr-1" /> Customer Love
                    </Badge>
                    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
                        Loved by <span className="text-primary">50,000+</span> Customers
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. See why customers around the world trust us for their shopping needs.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6 mb-10 @md:mb-12">
                    <TestimonialCard
                        quote="Best shopping experience I've ever had! Fast shipping and amazing quality."
                        name="Sarah M."
                        avatar="https://i.pravatar.cc/100?img=1"
                        rating={5}
                        featured
                    />
                    <TestimonialCard
                        quote="Customer service went above and beyond to help me. Highly recommend!"
                        name="James K."
                        avatar="https://i.pravatar.cc/100?img=8"
                        rating={5}
                    />
                    <TestimonialCard
                        quote="The quality exceeded my expectations. Will definitely shop here again."
                        name="Emily R."
                        avatar="https://i.pravatar.cc/100?img=5"
                        rating={5}
                    />
                </div>

                {/* Stats */}
                <SocialProofStats items={[
                    { icon: Users, value: '50K+', label: 'Happy Customers' },
                    { icon: Heart, value: '4.9/5', label: 'Average Rating' },
                    { icon: Smile, value: '98%', label: 'Would Recommend' },
                ]} />

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/shop">
                            Join Happy Customers <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface TestimonialCardProps {
    quote: string
    name: string
    avatar?: string
    rating: number
    featured?: boolean
}

const TestimonialCard = ({ quote, name, avatar, rating, featured }: TestimonialCardProps) => (
    <div className={`p-6 rounded-2xl border ${featured ? 'bg-primary text-primary-foreground @md:col-span-2 @xl:col-span-1' : 'bg-card'}`}>
        {/* Rating */}
        <div className="flex gap-1 mb-4">
            {Array.from({ length: rating }).map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
            ))}
        </div>

        <p className={`text-base @md:text-lg mb-6 ${featured ? '' : 'text-foreground'}`}>&ldquo;{quote}&rdquo;</p>

        <div className="flex items-center gap-3">
            <Avatar className="size-10">
                <AvatarImage src={avatar} />
                <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
                <div className="font-semibold">{name}</div>
                <div className={`text-sm ${featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    Verified Buyer
                </div>
            </div>
        </div>
    </div>
)

const SocialProofStats = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid @sm:grid-cols-3 gap-6 p-6 @md:p-8 rounded-2xl bg-muted/50 border">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
                <Icon className="size-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl @md:text-4xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

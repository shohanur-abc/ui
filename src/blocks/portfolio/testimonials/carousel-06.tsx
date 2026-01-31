'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Star, Building2 } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-3 gap-8 @xl:gap-12 items-center">
                    <Header
                        eyebrow="Reviews"
                        title="Enterprise Trust"
                        description="Leading companies rely on our expertise for their digital transformation."
                    />

                    <div className="@xl:col-span-2">
                        <TestimonialCarousel items={[
                            {
                                quote: "The platform they built handles millions of transactions daily without a hitch. Incredible engineering.",
                                author: "Patricia Lane",
                                role: "CTO",
                                company: "FinanceFlow",
                                avatar: "https://i.pravatar.cc/100?img=1",
                                rating: 5,
                            },
                            {
                                quote: "Security, scalability, and user experience—they delivered excellence on all fronts.",
                                author: "Kevin Zhang",
                                role: "VP Engineering",
                                company: "SecureData Inc",
                                avatar: "https://i.pravatar.cc/100?img=2",
                                rating: 5,
                            },
                            {
                                quote: "Our enterprise portal has never been more efficient. The ROI was visible within months.",
                                author: "Maria Santos",
                                role: "Director of IT",
                                company: "GlobalCorp",
                                avatar: "https://i.pravatar.cc/100?img=3",
                                rating: 5,
                            },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Header = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
    <div>
        <Badge className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
)

const TestimonialCarousel = ({ items }: { items: TestimonialItem[] }) => (
    <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
            {items.map(({ quote, author, role, company, avatar, rating }, i) => (
                <CarouselItem key={i}>
                    <Card>
                        <CardContent className="p-6 @md:p-8">
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                ))}
                            </div>
                            <blockquote className="text-lg @md:text-xl leading-relaxed mb-6">
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage src={avatar} />
                                        <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{author}</div>
                                        <div className="text-sm text-muted-foreground">{role}</div>
                                    </div>
                                </div>
                                <div className="hidden @sm:flex items-center gap-2 text-muted-foreground">
                                    <Building2 className="size-4" />
                                    <span className="text-sm font-medium">{company}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
        </div>
    </Carousel>
)

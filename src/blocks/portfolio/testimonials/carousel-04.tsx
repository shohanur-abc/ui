'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Star } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    rating: number
}

export default function Main() {
    return (
        <section className="@container">
            <div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 px-4 @sm:px-6 @2xl:px-8">
                    <Eyebrow text="Testimonials" />
                    <Title text="Trusted Globally" />
                    <Description text="Auto-scrolling reviews from clients around the world." />
                </div>

                <AutoScrollCarousel items={[
                    {
                        quote: "Exceptional work that transformed our business completely.",
                        author: "Alex Turner",
                        role: "CEO, GlobalTech",
                        avatar: "https://i.pravatar.cc/100?img=89",
                        rating: 5,
                    },
                    {
                        quote: "The best development partner we've ever worked with.",
                        author: "Maria Santos",
                        role: "CTO, DataFlow",
                        avatar: "https://i.pravatar.cc/100?img=90",
                        rating: 5,
                    },
                    {
                        quote: "Delivered beyond expectations with incredible attention to detail.",
                        author: "James Wilson",
                        role: "Founder, AppStart",
                        avatar: "https://i.pravatar.cc/100?img=91",
                        rating: 5,
                    },
                    {
                        quote: "Professional, reliable, and incredibly talented team.",
                        author: "Sarah Chen",
                        role: "VP Product, ScaleUp",
                        avatar: "https://i.pravatar.cc/100?img=92",
                        rating: 5,
                    },
                    {
                        quote: "Our ROI increased 300% after the website redesign.",
                        author: "Michael Park",
                        role: "Marketing Director, GrowthCo",
                        avatar: "https://i.pravatar.cc/100?img=93",
                        rating: 5,
                    },
                    {
                        quote: "Communication was excellent from start to finish.",
                        author: "Emma Davis",
                        role: "Operations Lead, CloudFirst",
                        avatar: "https://i.pravatar.cc/100?img=94",
                        rating: 5,
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="secondary">{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const AutoScrollCarousel = ({ items }: { items: TestimonialItem[] }) => (
    <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
        className="w-full"
    >
        <CarouselContent className="-ml-4">
            {items.map(({ quote, author, role, avatar, rating }, i) => (
                <CarouselItem key={i} className="pl-4 basis-[85%] @sm:basis-[60%] @md:basis-[45%] @lg:basis-[30%] @xl:basis-[25%]">
                    <Card className="h-full">
                        <CardContent className="p-5 flex flex-col h-full min-h-[200px]">
                            <div className="flex gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                ))}
                            </div>
                            <blockquote className="text-sm leading-relaxed mb-4 flex-1">
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-2.5">
                                <Avatar className="size-8">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium text-sm">{author}</div>
                                    <div className="text-xs text-muted-foreground">{role}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
)

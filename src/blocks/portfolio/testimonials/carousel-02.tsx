'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Star, Quote } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    rating: number
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <Header
                        eyebrow="Reviews"
                        title="Client Reviews"
                        description="Hear directly from the people we've worked with."
                    />
                    <CarouselNavPlaceholder />
                </div>

                <TestimonialCarousel items={[
                    {
                        quote: "An exceptional partner who understood our vision and brought it to life with remarkable precision and creativity.",
                        author: "Victoria Adams",
                        role: "CEO, CreativeStudio",
                        avatar: "https://i.pravatar.cc/100?img=82",
                        rating: 5,
                    },
                    {
                        quote: "The level of professionalism and technical skill displayed throughout the project was truly impressive.",
                        author: "Marcus Johnson",
                        role: "CTO, TechFlow",
                        avatar: "https://i.pravatar.cc/100?img=83",
                        rating: 5,
                    },
                    {
                        quote: "Our website has never performed better. The improvements have had a direct impact on our bottom line.",
                        author: "Sophia Williams",
                        role: "Marketing VP, GrowthInc",
                        avatar: "https://i.pravatar.cc/100?img=84",
                        rating: 5,
                    },
                    {
                        quote: "Clear communication, on-time delivery, and exceptional quality. Everything we could ask for in a partner.",
                        author: "Benjamin Harris",
                        role: "Founder, StartupLab",
                        avatar: "https://i.pravatar.cc/100?img=85",
                        rating: 5,
                    },
                ]} />
            </div>
        </section>
    )
}

const Header = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
    <div className="max-w-xl">
        <Badge className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
    </div>
)

const CarouselNavPlaceholder = () => (
    <div className="hidden @lg:flex gap-2">
        <div className="size-10 rounded-full border flex items-center justify-center text-muted-foreground">←</div>
        <div className="size-10 rounded-full border flex items-center justify-center text-muted-foreground">→</div>
    </div>
)

const TestimonialCarousel = ({ items }: { items: TestimonialItem[] }) => (
    <Carousel opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent className="-ml-6">
            {items.map(({ quote, author, role, avatar, rating }, i) => (
                <CarouselItem key={i} className="pl-6 @md:basis-1/2">
                    <div className="bg-background rounded-2xl p-8 @md:p-10 h-full shadow-sm">
                        <Quote className="size-10 text-primary/20 mb-6" />
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <Avatar className="size-14 ring-2 ring-border">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-lg">{author}</div>
                                <div className="text-muted-foreground">{role}</div>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden @xl:flex" />
        <CarouselNext className="-right-4 hidden @xl:flex" />
    </Carousel>
)

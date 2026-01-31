'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, Star } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'
import { useState, useEffect } from 'react'

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
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Reviews" />
                    <Title text="Thumbnail Carousel" />
                    <Description text="Preview and select testimonials with thumbnails." />
                </div>

                <ThumbnailCarousel
                    items={[
                        { quote: "The team delivered an exceptional product that transformed our business operations completely.", author: "Christopher Lee", role: "CEO", company: "TransformBiz", avatar: "https://i.pravatar.cc/100?img=65", rating: 5 },
                        { quote: "Outstanding work quality and professionalism. Highly recommended for any enterprise project.", author: "Nicole Brown", role: "CTO", company: "EnterprisePro", avatar: "https://i.pravatar.cc/100?img=66", rating: 5 },
                        { quote: "Creative solutions that actually solve real business problems. A true strategic partner.", author: "Daniel Kim", role: "CMO", company: "StrategicWin", avatar: "https://i.pravatar.cc/100?img=67", rating: 5 },
                        { quote: "From concept to launch, every milestone was hit perfectly. Exceptional project management.", author: "Jennifer Park", role: "PM", company: "MilestoneHit", avatar: "https://i.pravatar.cc/100?img=68", rating: 5 },
                        { quote: "Technical excellence combined with beautiful design. The perfect combination.", author: "Robert Taylor", role: "VP Engineering", company: "PerfectCombo", avatar: "https://i.pravatar.cc/100?img=69", rating: 5 },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="outline">{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const ThumbnailCarousel = ({ items }: { items: TestimonialItem[] }) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    
    useEffect(() => {
        if (!api) return
        const onSelect = () => setCurrent(api.selectedScrollSnap())
        api.on('select', onSelect)
        return () => {
            api.off('select', onSelect)
        }
    }, [api])
    
    return (
        <div className="max-w-4xl mx-auto">
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full mb-6">
                <CarouselContent>
                    {items.map(({ quote, author, role, company, avatar, rating }, i) => (
                        <CarouselItem key={i}>
                            <div className="bg-card border rounded-2xl p-8 @md:p-10 text-center">
                                <div className="flex justify-center gap-1 mb-6">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <Star key={j} className={`size-5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                    ))}
                                </div>
                                <Quote className="size-10 text-primary/20 mx-auto mb-4" />
                                <blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
                                    &ldquo;{quote}&rdquo;
                                </blockquote>
                                <Avatar className="size-14 mx-auto ring-2 ring-primary/20 mb-3">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="font-semibold text-lg">{author}</div>
                                <div className="text-muted-foreground">{role}, {company}</div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
            
            <div className="flex justify-center gap-3">
                {items.map(({ avatar, author }, i) => (
                    <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        className={`transition-all duration-300 ${i === current ? 'scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full' : 'opacity-50 hover:opacity-100'}`}
                    >
                        <Avatar className="size-10 @md:size-12">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-muted">{author[0]}</AvatarFallback>
                        </Avatar>
                    </button>
                ))}
            </div>
        </div>
    )
}

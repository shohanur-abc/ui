'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, Star } from 'lucide-react'

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
        <section className="@container bg-gradient-to-b from-muted/50 to-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Client Stories" />
                    <Title text="Hover Stack" />
                    <Description text="Hover to reveal stacked testimonials." />
                </div>

                <HoverStack
                    items={[
                        { quote: "Outstanding work on our enterprise platform.", author: "Michael Torres", role: "CTO", company: "EnterprisePro", avatar: "https://i.pravatar.cc/100?img=8", rating: 5 },
                        { quote: "Perfect execution from start to finish.", author: "Sarah Williams", role: "Project Lead", company: "PerfectLaunch", avatar: "https://i.pravatar.cc/100?img=9", rating: 5 },
                        { quote: "Innovative solutions that drive real results.", author: "Robert Chen", role: "CEO", company: "InnovateCo", avatar: "https://i.pravatar.cc/100?img=10", rating: 5 },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge>{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const HoverStack = ({ items }: { items: TestimonialItem[] }) => {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
        <div 
            className="max-w-xl mx-auto relative h-80 @md:h-96"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {items.map(({ quote, author, role, company, avatar, rating }, i) => (
                <div
                    key={i}
                    className="absolute inset-x-0 bg-card border rounded-2xl p-6 @md:p-8 shadow-lg transition-all duration-500"
                    style={{
                        top: isHovered ? `${i * 120}px` : `${i * 8}px`,
                        transform: isHovered ? 'none' : `scale(${1 - i * 0.03})`,
                        zIndex: items.length - i,
                        opacity: isHovered ? 1 : 1 - i * 0.1,
                    }}
                >
                    <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                        ))}
                    </div>
                    <Quote className="size-7 text-primary/20 mb-3" />
                    <blockquote className="text-base @md:text-lg leading-relaxed mb-5">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold">{author}</div>
                            <div className="text-sm text-muted-foreground">{role}, {company}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

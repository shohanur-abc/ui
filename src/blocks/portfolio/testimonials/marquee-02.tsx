'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
        <section className="@container overflow-hidden bg-muted/30">
            <div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 px-4 @sm:px-6 @2xl:px-8">
                    <Eyebrow text="Reviews" />
                    <Title text="Client Reviews" />
                </div>

                <SingleMarquee
                    items={[
                        { quote: "Outstanding work quality!", author: "Victoria Adams", role: "CEO, TechFlow", avatar: "https://i.pravatar.cc/100?img=11", rating: 5 },
                        { quote: "A true game-changer for our business.", author: "Marcus Johnson", role: "CTO, ScalePro", avatar: "https://i.pravatar.cc/100?img=12", rating: 5 },
                        { quote: "Highly recommended!", author: "Sophia Williams", role: "Founder, DesignFirst", avatar: "https://i.pravatar.cc/100?img=13", rating: 5 },
                        { quote: "Professional and reliable.", author: "Benjamin Harris", role: "VP, CloudScale", avatar: "https://i.pravatar.cc/100?img=14", rating: 5 },
                        { quote: "Exceeded all expectations.", author: "Rachel Green", role: "CMO, GrowthLab", avatar: "https://i.pravatar.cc/100?img=15", rating: 5 },
                        { quote: "Best decision we made.", author: "Andrew Kim", role: "Director, AppMasters", avatar: "https://i.pravatar.cc/100?img=16", rating: 5 },
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">{text}</h2>
)

const SingleMarquee = ({ items }: { items: TestimonialItem[] }) => {
    const duplicatedItems = [...items, ...items, ...items]
    
    return (
        <div className="relative flex overflow-hidden">
            <div 
                className="flex gap-6 animate-marquee-left"
                style={{
                    animationDuration: '60s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                }}
            >
                {duplicatedItems.map(({ quote, author, role, avatar, rating }, i) => (
                    <div 
                        key={i} 
                        className="flex-shrink-0 w-72 bg-background border rounded-xl p-5 shadow-sm"
                    >
                        <div className="flex gap-0.5 mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-sm leading-relaxed mb-4 font-medium">
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
                    </div>
                ))}
            </div>
        </div>
    )
}

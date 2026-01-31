'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container overflow-hidden">
            <div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 px-4 @sm:px-6 @2xl:px-8">
                    <Eyebrow text="Testimonials" />
                    <Title text="Trusted Worldwide" />
                    <Description text="Continuously scrolling testimonials from satisfied clients." />
                </div>

                <MarqueeRow
                    items={[
                        { quote: "Exceptional work that exceeded all expectations.", author: "Alex Turner", role: "CEO, TechStart", avatar: "https://i.pravatar.cc/100?img=1" },
                        { quote: "A true partner in our digital transformation.", author: "Maria Santos", role: "CTO, CloudFirst", avatar: "https://i.pravatar.cc/100?img=2" },
                        { quote: "Professional, creative, and incredibly talented.", author: "David Chen", role: "Founder, AppFlow", avatar: "https://i.pravatar.cc/100?img=3" },
                        { quote: "Best investment we made this year.", author: "Sarah Kim", role: "VP Product, ScaleUp", avatar: "https://i.pravatar.cc/100?img=4" },
                        { quote: "Outstanding quality and on-time delivery.", author: "James Wilson", role: "Director, DesignHub", avatar: "https://i.pravatar.cc/100?img=5" },
                    ]}
                    direction="left"
                />

                <MarqueeRow
                    items={[
                        { quote: "Highly recommend to any business.", author: "Emily Foster", role: "CMO, GrowthCo", avatar: "https://i.pravatar.cc/100?img=6" },
                        { quote: "Transformed our online presence completely.", author: "Michael Park", role: "CEO, BrandForce", avatar: "https://i.pravatar.cc/100?img=7" },
                        { quote: "Technical excellence at its finest.", author: "Lisa Wang", role: "CTO, DataFlow", avatar: "https://i.pravatar.cc/100?img=8" },
                        { quote: "Creative solutions that actually work.", author: "Robert Taylor", role: "Founder, InnovateLab", avatar: "https://i.pravatar.cc/100?img=9" },
                        { quote: "A pleasure to work with on every project.", author: "Jennifer Lee", role: "PM, Enterprise Inc", avatar: "https://i.pravatar.cc/100?img=10" },
                    ]}
                    direction="right"
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

const MarqueeRow = ({ items, direction }: { items: TestimonialItem[]; direction: 'left' | 'right' }) => {
    const duplicatedItems = [...items, ...items]
    
    return (
        <div className="relative flex overflow-hidden py-4 group">
            <div 
                className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'} group-hover:[animation-play-state:paused]`}
                style={{
                    animationDuration: '40s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                }}
            >
                {duplicatedItems.map(({ quote, author, role, avatar }, i) => (
                    <div 
                        key={i} 
                        className="flex-shrink-0 w-80 @md:w-96 bg-card border rounded-xl p-5 shadow-sm"
                    >
                        <blockquote className="text-sm leading-relaxed mb-4">
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

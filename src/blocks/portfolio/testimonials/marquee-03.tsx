'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote } from 'lucide-react'

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
                    <Title text="Vertical Scroll" />
                    <Description text="Watch testimonials flow in a vertical marquee." />
                </div>

                <div className="max-w-6xl mx-auto px-4 @sm:px-6 @2xl:px-8">
                    <div className="grid @lg:grid-cols-3 gap-6">
                        <VerticalMarquee
                            items={[
                                { quote: "Exceptional work quality and professionalism.", author: "Alex Turner", role: "CEO, TechStart", avatar: "https://i.pravatar.cc/100?img=17" },
                                { quote: "Best decision we made this year.", author: "Maria Santos", role: "CTO, CloudFirst", avatar: "https://i.pravatar.cc/100?img=18" },
                                { quote: "A true partner in our journey.", author: "David Chen", role: "Founder, AppFlow", avatar: "https://i.pravatar.cc/100?img=19" },
                            ]}
                            speed="slow"
                        />
                        <VerticalMarquee
                            items={[
                                { quote: "Creative solutions that actually work.", author: "Sarah Kim", role: "VP Product, ScaleUp", avatar: "https://i.pravatar.cc/100?img=20" },
                                { quote: "Outstanding attention to detail.", author: "James Wilson", role: "Director, DesignHub", avatar: "https://i.pravatar.cc/100?img=21" },
                                { quote: "Highly recommended to anyone.", author: "Emily Foster", role: "CMO, GrowthCo", avatar: "https://i.pravatar.cc/100?img=22" },
                            ]}
                            speed="medium"
                            reverse
                        />
                        <VerticalMarquee
                            items={[
                                { quote: "Transformed our digital presence.", author: "Michael Park", role: "CEO, BrandForce", avatar: "https://i.pravatar.cc/100?img=23" },
                                { quote: "Technical excellence at its finest.", author: "Lisa Wang", role: "CTO, DataFlow", avatar: "https://i.pravatar.cc/100?img=24" },
                                { quote: "A pleasure to work with.", author: "Robert Taylor", role: "PM, Enterprise Inc", avatar: "https://i.pravatar.cc/100?img=25" },
                            ]}
                            speed="fast"
                        />
                    </div>
                </div>
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

const VerticalMarquee = ({ items, speed, reverse }: { items: TestimonialItem[]; speed: 'slow' | 'medium' | 'fast'; reverse?: boolean }) => {
    const duplicatedItems = [...items, ...items, ...items]
    const duration = speed === 'slow' ? '30s' : speed === 'medium' ? '20s' : '15s'
    
    return (
        <div className="relative h-[500px] overflow-hidden">
            <div 
                className={`flex flex-col gap-4 ${reverse ? 'animate-marquee-down' : 'animate-marquee-up'}`}
                style={{
                    animationDuration: duration,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                }}
            >
                {duplicatedItems.map(({ quote, author, role, avatar }, i) => (
                    <div 
                        key={i} 
                        className="flex-shrink-0 bg-card border rounded-xl p-5 shadow-sm"
                    >
                        <Quote className="size-6 text-primary/30 mb-3" />
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

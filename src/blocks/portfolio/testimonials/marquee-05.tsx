'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

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
        <section className="@container overflow-hidden">
            <div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 px-4 @sm:px-6 @2xl:px-8">
                    <Eyebrow text="Testimonials" />
                    <Title text="Marquee 5" />
                    <Description text="Elegant card marquee with ratings." />
                </div>

                <ElegantMarquee
                    items={[
                        { quote: "The team delivered exceptional work quality.", author: "Victoria Adams", role: "CEO", company: "ExceptCo", avatar: "https://i.pravatar.cc/100?img=39", rating: 5 },
                        { quote: "Best investment we made this year.", author: "Marcus Johnson", role: "CTO", company: "InvestPro", avatar: "https://i.pravatar.cc/100?img=40", rating: 5 },
                        { quote: "Professional and creative team.", author: "Rachel Green", role: "CMO", company: "CreativePro", avatar: "https://i.pravatar.cc/100?img=41", rating: 5 },
                        { quote: "Outstanding results on every project.", author: "Daniel Kim", role: "VP", company: "ResultMax", avatar: "https://i.pravatar.cc/100?img=42", rating: 5 },
                        { quote: "Transformed our digital presence.", author: "Jennifer Park", role: "Director", company: "TransformDigital", avatar: "https://i.pravatar.cc/100?img=43", rating: 5 },
                        { quote: "A true partner in success.", author: "Robert Taylor", role: "Founder", company: "SuccessLab", avatar: "https://i.pravatar.cc/100?img=44", rating: 5 },
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

const ElegantMarquee = ({ items }: { items: TestimonialItem[] }) => {
    const duplicatedItems = [...items, ...items]
    
    return (
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-hidden">
                <div 
                    className="flex gap-6 animate-marquee-left"
                    style={{
                        animationDuration: '50s',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                    }}
                >
                    {duplicatedItems.map(({ quote, author, role, company, avatar, rating }, i) => (
                        <div 
                            key={i} 
                            className="flex-shrink-0 w-80 bg-card border rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                ))}
                            </div>
                            <blockquote className="text-base leading-relaxed mb-5">
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <Avatar className="size-10 ring-2 ring-primary/10">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold text-sm">{author}</div>
                                    <div className="text-xs text-muted-foreground">{role}, {company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

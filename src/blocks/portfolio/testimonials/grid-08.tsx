'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, Star, CheckCircle2 } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
    verified: boolean
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Verified Reviews" />
                    <Title text="Verified Grid" />
                    <Description text="Authentic testimonials from verified clients." />
                </div>

                <VerifiedGrid
                    items={[
                        { quote: "Absolutely outstanding work quality.", author: "Michael Torres", role: "CEO", company: "VerifiedCo", avatar: "https://i.pravatar.cc/100?img=25", rating: 5, verified: true },
                        { quote: "Professional and highly recommended.", author: "Sarah Williams", role: "CTO", company: "TrustTech", avatar: "https://i.pravatar.cc/100?img=26", rating: 5, verified: true },
                        { quote: "Best agency we've worked with.", author: "Robert Chen", role: "CMO", company: "ReviewPro", avatar: "https://i.pravatar.cc/100?img=27", rating: 5, verified: true },
                        { quote: "Exceeded all our expectations.", author: "Jennifer Lee", role: "VP Product", company: "ExpectMore", avatar: "https://i.pravatar.cc/100?img=28", rating: 5, verified: true },
                        { quote: "A true partner in success.", author: "David Kim", role: "Founder", company: "PartnerCo", avatar: "https://i.pravatar.cc/100?img=29", rating: 5, verified: true },
                        { quote: "Innovative and reliable team.", author: "Amanda Wright", role: "Director", company: "InnovateLab", avatar: "https://i.pravatar.cc/100?img=30", rating: 5, verified: true },
                        { quote: "Transformed our online presence.", author: "Christopher Lee", role: "CEO", company: "TransformDigital", avatar: "https://i.pravatar.cc/100?img=31", rating: 5, verified: true },
                        { quote: "Outstanding attention to detail.", author: "Nicole Brown", role: "Design Lead", company: "DetailFirst", avatar: "https://i.pravatar.cc/100?img=32", rating: 5, verified: true },
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

const VerifiedGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {items.map(({ quote, author, role, avatar, rating, verified }, i) => (
            <li key={i} className="bg-card border rounded-xl p-5 shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`size-3 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                        ))}
                    </div>
                    {verified && (
                        <CheckCircle2 className="size-4 text-green-500" />
                    )}
                </div>
                <Quote className="size-5 text-primary/20 mb-2" />
                <blockquote className="text-sm leading-relaxed mb-4 line-clamp-3">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-muted text-xs">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium text-xs">{author}</div>
                        <div className="text-xs text-muted-foreground">{role}</div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

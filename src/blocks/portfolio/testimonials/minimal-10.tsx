'use client'

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
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Reviews" />
                    <Title text="Text Only" />
                    <Description text="Pure text-based testimonials with ratings." />
                </div>

                <TextOnly
                    items={[
                        { quote: "Exceptional work quality that exceeded all our expectations. Would highly recommend.", author: "Daniel Kim", role: "CEO", company: "ExceptCo", avatar: "https://i.pravatar.cc/100?img=12", rating: 5 },
                        { quote: "Professional team that delivers results on time and on budget. Outstanding!", author: "Sarah Johnson", role: "CTO", company: "ResultPro", avatar: "https://i.pravatar.cc/100?img=13", rating: 5 },
                        { quote: "Creative solutions combined with technical excellence. A true partner.", author: "Michael Torres", role: "VP Product", company: "CreativeTech", avatar: "https://i.pravatar.cc/100?img=14", rating: 5 },
                        { quote: "Best investment we made this year. The ROI has been incredible.", author: "Jennifer Park", role: "CFO", company: "InvestMax", avatar: "https://i.pravatar.cc/100?img=15", rating: 5 },
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

const TextOnly = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="max-w-3xl mx-auto grid @md:grid-cols-2 gap-8">
        {items.map(({ quote, author, role, company, rating }, i) => (
            <li key={i}>
                <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                    ))}
                </div>
                <blockquote className="text-base leading-relaxed mb-4">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="text-sm">
                    <span className="font-semibold">{author}</span>
                    <span className="text-muted-foreground"> — {role}, {company}</span>
                </div>
            </li>
        ))}
    </ul>
)

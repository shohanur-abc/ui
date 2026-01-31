'use client'

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
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Client Love" />
                    <Title text="Stacked Cards" />
                    <Description text="Layered testimonials for a dynamic look." />
                </div>

                <StackedCards
                    items={[
                        { quote: "Absolutely phenomenal work. The attention to detail was incredible and the results speak for themselves.", author: "Christopher Lee", role: "CEO", company: "TechVentures", avatar: "https://i.pravatar.cc/100?img=75", rating: 5 },
                        { quote: "Best decision we made this year was partnering with this team.", author: "Amanda Wright", role: "COO", company: "GrowthCo", avatar: "https://i.pravatar.cc/100?img=76", rating: 5 },
                        { quote: "Professional, creative, and incredibly talented. Highly recommend!", author: "Jonathan Price", role: "Founder", company: "StartupLab", avatar: "https://i.pravatar.cc/100?img=77", rating: 5 },
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

const StackedCards = ({ items }: { items: TestimonialItem[] }) => (
    <div className="max-w-xl mx-auto relative h-80 @md:h-96">
        {items.map(({ quote, author, role, company, avatar, rating }, i) => (
            <div
                key={i}
                className="absolute w-full bg-card border rounded-2xl p-6 @md:p-8 shadow-lg transition-all duration-300 hover:z-10"
                style={{
                    top: `${i * 16}px`,
                    left: `${i * 8}px`,
                    right: `${i * 8}px`,
                    zIndex: items.length - i,
                    transform: `rotate(${(i - 1) * 2}deg)`,
                }}
            >
                <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                    ))}
                </div>
                <Quote className="size-8 text-primary/20 mb-4" />
                <blockquote className="text-base @md:text-lg leading-relaxed mb-6">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                    <Avatar className="size-11">
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

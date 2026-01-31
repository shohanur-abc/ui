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
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Reviews" />
                    <Title text="Quote Focus" />
                    <Description text="Large quotes with minimal distraction." />
                </div>

                <QuoteFocusGrid
                    items={[
                        { quote: "The team delivered exceptional work.", author: "Patricia Lane", role: "CEO", company: "ExceptionalCo", avatar: "https://i.pravatar.cc/100?img=79", rating: 5 },
                        { quote: "Outstanding results on every project.", author: "Kevin Zhang", role: "CTO", company: "ResultsPro", avatar: "https://i.pravatar.cc/100?img=80", rating: 5 },
                        { quote: "Creative solutions that work.", author: "Maria Santos", role: "CMO", company: "CreativeCo", avatar: "https://i.pravatar.cc/100?img=1", rating: 5 },
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

const QuoteFocusGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {items.map(({ quote, author, role, company, avatar, rating }, i) => (
            <li key={i} className="text-center">
                <Quote className="size-12 text-primary/20 mx-auto mb-6" />
                <div className="flex justify-center gap-0.5 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`size-5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                    ))}
                </div>
                <blockquote className="text-xl @md:text-2xl font-medium leading-relaxed mb-8">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <Avatar className="size-14 mx-auto mb-3 ring-2 ring-primary/20">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                </Avatar>
                <div className="font-semibold">{author}</div>
                <div className="text-sm text-muted-foreground">{role}, {company}</div>
            </li>
        ))}
    </ul>
)

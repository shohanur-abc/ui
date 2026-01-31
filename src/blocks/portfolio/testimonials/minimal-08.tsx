'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container bg-gradient-to-b from-muted/30 to-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Client Stories" />
                    <Title text="Pull Quote" />
                    <Description text="Large pull-quote style testimonials." />
                </div>

                <PullQuote
                    items={[
                        { quote: "A game-changer for our business", author: "Robert Chen", role: "CEO", company: "GameChange", avatar: "https://i.pravatar.cc/100?img=6" },
                        { quote: "Best investment we ever made", author: "Jennifer Lee", role: "CFO", company: "InvestPro", avatar: "https://i.pravatar.cc/100?img=7" },
                        { quote: "Exceeded every expectation", author: "David Kim", role: "CTO", company: "ExpectMax", avatar: "https://i.pravatar.cc/100?img=8" },
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

const PullQuote = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="max-w-4xl mx-auto space-y-16">
        {items.map(({ quote, author, role, company, avatar }, i) => (
            <li key={i} className={`flex flex-col ${i % 2 === 0 ? '@md:items-start' : '@md:items-end'} text-${i % 2 === 0 ? 'left' : 'right'}`}>
                <blockquote className={`text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl font-bold leading-tight mb-6 ${i % 2 === 0 ? 'text-left' : '@md:text-right'}`}>
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className={`flex items-center gap-3 ${i % 2 === 0 ? '' : '@md:flex-row-reverse'}`}>
                    <Avatar className="size-12">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div className={i % 2 === 0 ? '' : '@md:text-right'}>
                        <div className="font-semibold">{author}</div>
                        <div className="text-sm text-muted-foreground">{role}, {company}</div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

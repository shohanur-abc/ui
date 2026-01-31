'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Quote, ArrowRight } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    highlight: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Success Stories" />
                    <Title text="Offset Stack" />
                    <Description text="Overlapping cards with key highlights." />
                </div>

                <OffsetStack
                    items={[
                        { quote: "Revenue doubled within 6 months of launch.", author: "Victoria Adams", role: "CEO", company: "RevenuePro", avatar: "https://i.pravatar.cc/100?img=11", highlight: "2x Revenue" },
                        { quote: "User engagement increased by 300%.", author: "Marcus Johnson", role: "CPO", company: "EngageTech", avatar: "https://i.pravatar.cc/100?img=12", highlight: "+300% Engagement" },
                        { quote: "Operational costs reduced by 40%.", author: "Rachel Green", role: "COO", company: "EfficiencyCorp", avatar: "https://i.pravatar.cc/100?img=13", highlight: "-40% Costs" },
                    ]}
                />
                
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg">
                        View All Stories <ArrowRight className="ml-2 size-4" />
                    </Button>
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

const OffsetStack = ({ items }: { items: TestimonialItem[] }) => (
    <div className="max-w-4xl mx-auto">
        <ul className="flex flex-col @lg:flex-row gap-4 @lg:-space-x-16 items-center justify-center">
            {items.map(({ quote, author, role, company, avatar, highlight }, i) => (
                <li
                    key={i}
                    className="w-full @lg:w-80 bg-card border rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:z-10"
                    style={{
                        zIndex: items.length - i,
                        marginTop: i % 2 === 1 ? '32px' : '0',
                    }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <Quote className="size-7 text-primary/20" />
                        <Badge className="bg-primary/10 text-primary border-primary/20">{highlight}</Badge>
                    </div>
                    <blockquote className="text-base leading-relaxed mb-5">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10 ring-2 ring-background">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-sm">{author}</div>
                            <div className="text-xs text-muted-foreground">{role}, {company}</div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)

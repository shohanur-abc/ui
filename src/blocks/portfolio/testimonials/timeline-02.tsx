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
    year: string
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Our History" />
                    <Title text="Horizontal Timeline" />
                    <Description text="Scroll through years of client success stories." />
                </div>

                <HorizontalTimeline
                    items={[
                        { quote: "The project that started it all. A beautiful website that launched our partnership.", author: "Michael Foster", role: "CEO", company: "FirstClient", avatar: "https://i.pravatar.cc/100?img=55", rating: 5, year: "2020" },
                        { quote: "An award-winning mobile app design that put us on the map.", author: "Diana Ross", role: "Founder", company: "AppStart", avatar: "https://i.pravatar.cc/100?img=56", rating: 5, year: "2021" },
                        { quote: "Enterprise platform that handles millions of users daily.", author: "Thomas Anderson", role: "CTO", company: "ScaleUp", avatar: "https://i.pravatar.cc/100?img=57", rating: 5, year: "2022" },
                        { quote: "AI integration that revolutionized our workflow.", author: "Emma Wilson", role: "VP Engineering", company: "AIWorks", avatar: "https://i.pravatar.cc/100?img=58", rating: 5, year: "2023" },
                        { quote: "The most ambitious project yet - and it exceeded expectations.", author: "Kevin Park", role: "CEO", company: "FutureTech", avatar: "https://i.pravatar.cc/100?img=59", rating: 5, year: "2024" },
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

const HorizontalTimeline = ({ items }: { items: TestimonialItem[] }) => (
    <div className="overflow-x-auto pb-4">
        <div className="min-w-max flex flex-col">
            <div className="flex items-center gap-8 @md:gap-12 px-4">
                {items.map(({ year }, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-64 @md:w-80" />
                        <div className="flex flex-col items-center mt-4">
                            <div className="size-4 rounded-full bg-primary" />
                            <div className="h-6 w-0.5 bg-border" />
                            <div className="text-lg font-bold">{year}</div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="h-0.5 bg-border my-4" />
            
            <ul className="flex gap-8 @md:gap-12 px-4">
                {items.map(({ quote, author, role, company, avatar, rating }, i) => (
                    <li key={i} className="w-64 @md:w-80 flex-shrink-0">
                        <div className="bg-background border rounded-xl p-5 shadow-sm h-full">
                            <div className="flex gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                ))}
                            </div>
                            <Quote className="size-6 text-primary/20 mb-3" />
                            <blockquote className="text-sm leading-relaxed mb-4 line-clamp-3">
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-2.5">
                                <Avatar className="size-9">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">{author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium text-sm">{author}</div>
                                    <div className="text-xs text-muted-foreground">{role}, {company}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)

'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    phase: string
    phaseNumber: number
    rating: number
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Project Phases" />
                    <Title text="Project Journey" />
                    <Description text="Testimonials from each phase of our process." />
                </div>

                <PhaseTimeline
                    items={[
                        { quote: "The discovery phase was incredibly thorough. They understood our needs perfectly.", author: "Victoria Adams", role: "CEO", company: "DiscoveryCo", avatar: "https://i.pravatar.cc/100?img=71", phase: "Discovery", phaseNumber: 1, rating: 5 },
                        { quote: "Design iterations were on point. The UI/UX exceeded our expectations.", author: "Marcus Johnson", role: "Design Director", company: "DesignPro", avatar: "https://i.pravatar.cc/100?img=72", phase: "Design", phaseNumber: 2, rating: 5 },
                        { quote: "Development was smooth and transparent. Weekly demos kept us in the loop.", author: "Rachel Green", role: "Product Owner", company: "DevTeam", avatar: "https://i.pravatar.cc/100?img=73", phase: "Development", phaseNumber: 3, rating: 5 },
                        { quote: "Launch day was flawless. Zero downtime, zero issues. Professional!", author: "Daniel Kim", role: "CTO", company: "LaunchPad", avatar: "https://i.pravatar.cc/100?img=74", phase: "Launch", phaseNumber: 4, rating: 5 },
                    ]}
                />
                
                <div className="text-center mt-12">
                    <Button size="lg">
                        Start Your Project <ArrowRight className="ml-2 size-4" />
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

const PhaseTimeline = ({ items }: { items: TestimonialItem[] }) => (
    <div className="max-w-5xl mx-auto">
        <div className="hidden @lg:flex justify-between items-center mb-8 px-8">
            {items.map(({ phase, phaseNumber }, i) => (
                <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                            {phaseNumber}
                        </div>
                        <div className="mt-2 font-semibold">{phase}</div>
                    </div>
                    {i < items.length - 1 && (
                        <div className="flex-1 h-0.5 bg-primary/30 mx-4 min-w-16" />
                    )}
                </div>
            ))}
        </div>
        
        <ul className="grid @lg:grid-cols-4 gap-6">
            {items.map(({ quote, author, role, avatar, phase, phaseNumber, rating }, i) => (
                <li key={i}>
                    <div className="bg-card border rounded-xl p-5 shadow-sm h-full">
                        <div className="@lg:hidden flex items-center gap-2 mb-3">
                            <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                {phaseNumber}
                            </div>
                            <span className="font-semibold">{phase}</span>
                        </div>
                        <div className="flex gap-0.5 mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-3 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <Quote className="size-5 text-primary/20 mb-2" />
                        <blockquote className="text-sm leading-relaxed mb-4 line-clamp-4">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-2.5">
                            <Avatar className="size-8">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="bg-muted text-xs">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-xs">{author}</div>
                                <div className="text-xs text-muted-foreground">{role}</div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)

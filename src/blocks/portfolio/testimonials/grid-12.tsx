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
    featured?: boolean
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Featured Center" />
                    <Description text="Highlighted testimonial in the center." />
                </div>

                <FeaturedCenterGrid
                    items={[
                        { quote: "Professional team.", author: "Alex Turner", role: "CEO", company: "TechCo", avatar: "https://i.pravatar.cc/100?img=56", rating: 5 },
                        { quote: "Outstanding work quality and exceptional attention to detail. This team transformed our entire digital presence.", author: "Maria Santos", role: "CTO", company: "TransformCo", avatar: "https://i.pravatar.cc/100?img=57", rating: 5, featured: true },
                        { quote: "Best decision ever.", author: "David Chen", role: "VP", company: "DecisionCo", avatar: "https://i.pravatar.cc/100?img=58", rating: 5 },
                        { quote: "Highly recommended.", author: "Sarah Kim", role: "CMO", company: "RecommendPro", avatar: "https://i.pravatar.cc/100?img=59", rating: 5 },
                        { quote: "Creative solutions.", author: "James Wilson", role: "Dir", company: "CreativeCo", avatar: "https://i.pravatar.cc/100?img=60", rating: 5 },
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

const FeaturedCenterGrid = ({ items }: { items: TestimonialItem[] }) => {
    const featured = items.find(item => item.featured)
    const regular = items.filter(item => !item.featured)
    
    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid @lg:grid-cols-3 gap-6 items-center">
                <ul className="space-y-4">
                    {regular.slice(0, 2).map(({ quote, author, role, avatar, rating }, i) => (
                        <li key={i} className="bg-background border rounded-xl p-5 shadow-sm">
                            <div className="flex gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`size-3 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                ))}
                            </div>
                            <blockquote className="text-sm leading-relaxed mb-4">
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
                        </li>
                    ))}
                </ul>
                
                {featured && (
                    <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg">
                        <div className="flex gap-0.5 mb-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-5 ${j < featured.rating ? 'fill-yellow-400 text-yellow-400' : 'text-primary-foreground/30'}`} />
                            ))}
                        </div>
                        <Quote className="size-10 opacity-30 mb-4" />
                        <blockquote className="text-lg leading-relaxed mb-6">
                            &ldquo;{featured.quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 ring-2 ring-primary-foreground/30">
                                <AvatarImage src={featured.avatar} />
                                <AvatarFallback className="bg-primary-foreground text-primary">{featured.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">{featured.author}</div>
                                <div className="text-primary-foreground/80">{featured.role}, {featured.company}</div>
                            </div>
                        </div>
                    </div>
                )}
                
                <ul className="space-y-4">
                    {regular.slice(2, 4).map(({ quote, author, role, avatar, rating }, i) => (
                        <li key={i} className="bg-background border rounded-xl p-5 shadow-sm">
                            <div className="flex gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`size-3 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                ))}
                            </div>
                            <blockquote className="text-sm leading-relaxed mb-4">
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

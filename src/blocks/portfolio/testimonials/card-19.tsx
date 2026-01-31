'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, Star, ThumbsUp, MessageSquare } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
    likes: number
    replies: number
}

export default function Main() {
    return (
        <section className="@container bg-gradient-to-b from-muted/50 to-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Reviews" />
                    <Title text="With Engagement" />
                    <Description text="Testimonials with community engagement metrics." />
                </div>

                <EngagementCards
                    items={[
                        { quote: "The best digital agency I've worked with in 15 years of business.", author: "Robert Chen", role: "CEO", company: "VeteranBiz", avatar: "https://i.pravatar.cc/100?img=5", rating: 5, likes: 234, replies: 18 },
                        { quote: "Incredible attention to detail and flawless execution.", author: "Jennifer Lee", role: "Design Director", company: "DetailFirst", avatar: "https://i.pravatar.cc/100?img=6", rating: 5, likes: 189, replies: 12 },
                        { quote: "Transformed our online presence completely.", author: "David Kim", role: "CMO", company: "TransformDigital", avatar: "https://i.pravatar.cc/100?img=7", rating: 5, likes: 156, replies: 9 },
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

const EngagementCards = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map(({ quote, author, role, company, avatar, rating, likes, replies }, i) => (
            <li key={i} className="bg-card border rounded-xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                    ))}
                </div>
                <Quote className="size-6 text-primary/20 mb-3" />
                <blockquote className="text-base leading-relaxed mb-5">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                    <Avatar className="size-10">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-sm">{author}</div>
                        <div className="text-xs text-muted-foreground">{role}, {company}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <ThumbsUp className="size-4" />
                        <span>{likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare className="size-4" />
                        <span>{replies}</span>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

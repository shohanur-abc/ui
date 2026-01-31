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
                    <Title text="Pinterest Style" />
                    <Description text="Masonry layout for varied content heights." />
                </div>

                <MasonryGrid
                    items={[
                        { quote: "Exceptional work! The team delivered a complete digital transformation that has revolutionized how we do business.", author: "Alex Turner", role: "CEO", company: "TransformCo", avatar: "https://i.pravatar.cc/100?img=14", rating: 5 },
                        { quote: "Quick, efficient, perfect.", author: "Maria S.", role: "CTO", company: "QuickTech", avatar: "https://i.pravatar.cc/100?img=15", rating: 5 },
                        { quote: "The attention to detail was remarkable. Every feature was carefully considered.", author: "David Chen", role: "VP Product", company: "DetailPro", avatar: "https://i.pravatar.cc/100?img=16", rating: 5 },
                        { quote: "Best ROI we've ever seen from any digital investment.", author: "Sarah Kim", role: "CFO", company: "ROICorp", avatar: "https://i.pravatar.cc/100?img=17", rating: 5 },
                        { quote: "Simply outstanding.", author: "James W.", role: "PM", company: "Simple", avatar: "https://i.pravatar.cc/100?img=18", rating: 5 },
                        { quote: "From initial consultation to final delivery, the communication was exceptional. The team kept us informed every step of the way.", author: "Emily Foster", role: "Project Lead", company: "CommsPro", avatar: "https://i.pravatar.cc/100?img=19", rating: 5 },
                        { quote: "A true game-changer.", author: "Mike P.", role: "CEO", company: "GameChange", avatar: "https://i.pravatar.cc/100?img=20", rating: 5 },
                        { quote: "Professional, creative, and reliable.", author: "Lisa Wang", role: "CMO", company: "ReliableCo", avatar: "https://i.pravatar.cc/100?img=21", rating: 5 },
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

const MasonryGrid = ({ items }: { items: TestimonialItem[] }) => (
    <div className="max-w-6xl mx-auto columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4 gap-4">
        {items.map(({ quote, author, role, company, avatar, rating }, i) => (
            <div key={i} className="break-inside-avoid mb-4">
                <div className="bg-background border rounded-xl p-5 shadow-sm">
                    <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`size-3 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                        ))}
                    </div>
                    <Quote className="size-5 text-primary/20 mb-2" />
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
                            <div className="text-xs text-muted-foreground">{role}, {company}</div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

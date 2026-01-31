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
        <section className="@container bg-gradient-to-b from-muted/50 to-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Alternating Grid" />
                    <Description text="Alternating heights for visual interest." />
                </div>

                <AlternatingGrid
                    items={[
                        { quote: "Exceptional work that transformed our business. The team delivered outstanding results on time and on budget.", author: "Robert Chen", role: "CEO", company: "TransformBiz", avatar: "https://i.pravatar.cc/100?img=67", rating: 5 },
                        { quote: "Best decision we made.", author: "Jennifer Lee", role: "CTO", company: "BestChoice", avatar: "https://i.pravatar.cc/100?img=68", rating: 5 },
                        { quote: "Outstanding results.", author: "David Kim", role: "CMO", company: "ResultPro", avatar: "https://i.pravatar.cc/100?img=69", rating: 5 },
                        { quote: "The attention to detail was remarkable. Every aspect of the project was handled with care and precision.", author: "Amanda Wright", role: "VP Product", company: "DetailFirst", avatar: "https://i.pravatar.cc/100?img=70", rating: 5 },
                        { quote: "Creative excellence combined with technical mastery. This team understands how to build products users love.", author: "Christopher Lee", role: "Design Director", company: "CreativeTech", avatar: "https://i.pravatar.cc/100?img=71", rating: 5 },
                        { quote: "Highly recommended.", author: "Nicole Brown", role: "PM", company: "RecommendCo", avatar: "https://i.pravatar.cc/100?img=72", rating: 5 },
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

const AlternatingGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map(({ quote, author, role, company, avatar, rating }, i) => (
            <li 
                key={i} 
                className={`bg-card border rounded-xl shadow-sm transition-all hover:shadow-md ${i % 2 === 0 ? '@xl:-mt-4' : '@xl:mt-4'}`}
            >
                <div className="p-6">
                    <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                        ))}
                    </div>
                    <Quote className="size-6 text-primary/20 mb-3" />
                    <blockquote className="text-base leading-relaxed mb-5">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-sm">{author}</div>
                            <div className="text-xs text-muted-foreground">{role}, {company}</div>
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

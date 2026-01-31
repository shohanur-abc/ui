'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    size: 'lg' | 'md' | 'sm'
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Reviews" />
                    <Title text="Mixed Size Grid" />
                    <Description text="Varied card sizes for visual interest." />
                </div>

                <MixedGrid
                    items={[
                        { quote: "This partnership transformed our entire digital strategy. The team's expertise in UX design and development created a seamless user experience that our customers love.", author: "Patricia Lane", role: "CEO", company: "DigitalTransform", avatar: "https://i.pravatar.cc/100?img=20", size: 'lg' },
                        { quote: "Quick turnaround with excellent quality.", author: "Kevin Zhang", role: "CTO", company: "FastTech", avatar: "https://i.pravatar.cc/100?img=21", size: 'sm' },
                        { quote: "Best decision we made this year.", author: "Maria Santos", role: "VP Product", company: "DecisionCo", avatar: "https://i.pravatar.cc/100?img=22", size: 'sm' },
                        { quote: "The attention to detail was remarkable. Every aspect of our project was handled with care and precision.", author: "James Wilson", role: "Design Director", company: "DetailFirst", avatar: "https://i.pravatar.cc/100?img=23", size: 'md' },
                        { quote: "Exceptional communication throughout the entire project lifecycle.", author: "Emily Foster", role: "PM", company: "ProjectPro", avatar: "https://i.pravatar.cc/100?img=24", size: 'md' },
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

const MixedGrid = ({ items }: { items: TestimonialItem[] }) => (
    <div className="max-w-6xl mx-auto">
        <ul className="grid @md:grid-cols-2 @lg:grid-cols-4 gap-4 auto-rows-fr">
            {items.map(({ quote, author, role, company, avatar, size }, i) => (
                <li 
                    key={i} 
                    className={`${size === 'lg' ? '@lg:col-span-2 @lg:row-span-2' : size === 'md' ? '@lg:col-span-2' : ''}`}
                >
                    <Card className="h-full">
                        <CardContent className={`p-5 @md:p-6 h-full flex flex-col ${size === 'lg' ? '@lg:p-8' : ''}`}>
                            <Quote className={`text-primary/20 mb-3 ${size === 'lg' ? 'size-10' : 'size-6'}`} />
                            <blockquote className={`leading-relaxed mb-auto ${size === 'lg' ? 'text-lg @lg:text-xl' : 'text-sm'}`}>
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-3 mt-5">
                                <Avatar className={size === 'lg' ? 'size-12' : 'size-9'}>
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className={`font-semibold ${size === 'lg' ? 'text-base' : 'text-sm'}`}>{author}</div>
                                    <div className={`text-muted-foreground ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>{role}, {company}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </li>
            ))}
        </ul>
    </div>
)

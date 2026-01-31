'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

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
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Reviews" />
                    <Title text="Hexagonal Grid" />
                    <Description text="A unique hexagonal layout for testimonials." />
                </div>

                <HexGrid
                    items={[
                        { quote: "Outstanding work!", author: "Alex Turner", role: "CEO", company: "TechCo", avatar: "https://i.pravatar.cc/100?img=49", rating: 5 },
                        { quote: "Highly recommend.", author: "Maria Santos", role: "CTO", company: "CloudPro", avatar: "https://i.pravatar.cc/100?img=50", rating: 5 },
                        { quote: "Best agency ever.", author: "David Chen", role: "VP", company: "ScaleUp", avatar: "https://i.pravatar.cc/100?img=51", rating: 5 },
                        { quote: "A+ experience.", author: "Sarah Kim", role: "PM", company: "ProjectCo", avatar: "https://i.pravatar.cc/100?img=52", rating: 5 },
                        { quote: "Creative genius.", author: "James Wilson", role: "Dir", company: "DesignLab", avatar: "https://i.pravatar.cc/100?img=53", rating: 5 },
                        { quote: "Pure excellence.", author: "Emily Foster", role: "Lead", company: "ExcellentCo", avatar: "https://i.pravatar.cc/100?img=54", rating: 5 },
                        { quote: "Game changer!", author: "Mike Park", role: "CEO", company: "GameChange", avatar: "https://i.pravatar.cc/100?img=55", rating: 5 },
                    ]}
                />
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

const HexGrid = ({ items }: { items: TestimonialItem[] }) => (
    <div className="max-w-4xl mx-auto">
        <ul className="flex flex-wrap justify-center gap-4">
            {items.map(({ quote, author, role, company, avatar, rating }, i) => (
                <li 
                    key={i} 
                    className="w-full @sm:w-56 bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        aspectRatio: '1/1.15',
                    }}
                >
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-2.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-xs font-medium mb-3">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <Avatar className="size-10 mb-2">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-xs">{author}</div>
                        <div className="text-[10px] text-muted-foreground">{role}, {company}</div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)

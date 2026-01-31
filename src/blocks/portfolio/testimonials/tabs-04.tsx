'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container bg-gradient-to-b from-muted/50 to-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Success Stories" />
                    <Title text="Avatar Tabs" />
                    <Description text="Click on avatars to read different testimonials." />
                </div>

                <AvatarTabs
                    items={[
                        { quote: "Working with this team was transformative. They understood our vision and delivered beyond expectations. Our digital transformation is now complete.", author: "Victoria Lane", role: "CEO", company: "Transform Inc", avatar: "https://i.pravatar.cc/100?img=42" },
                        { quote: "The level of craftsmanship is unparalleled. Every pixel was considered, every interaction was smooth. This is what premium looks like.", author: "Robert Chen", role: "Design Lead", company: "DesignCraft", avatar: "https://i.pravatar.cc/100?img=43" },
                        { quote: "From concept to launch in record time. The agile process and constant communication made this project a success.", author: "Jennifer Park", role: "Product Owner", company: "AgileWorks", avatar: "https://i.pravatar.cc/100?img=44" },
                        { quote: "SEO traffic increased 300% after launch. The technical implementation was flawless and Google loves our new site.", author: "Michael Torres", role: "Marketing VP", company: "GrowthScale", avatar: "https://i.pravatar.cc/100?img=45" },
                        { quote: "Enterprise-grade security with startup agility. They handled our complex requirements while keeping the project moving fast.", author: "Sarah Williams", role: "CTO", company: "SecureTech", avatar: "https://i.pravatar.cc/100?img=46" },
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

const AvatarTabs = ({ items }: { items: TestimonialItem[] }) => {
    const [active, setActive] = useState(0)
    const current = items[active]
    
    if (!current) return null
    
    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-center gap-3 @md:gap-4 mb-10">
                {items.map(({ avatar, author }, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`transition-all duration-300 ${i === active ? 'scale-125 ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full' : 'opacity-60 hover:opacity-100'}`}
                    >
                        <Avatar className="size-12 @md:size-14">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-muted">{author[0]}</AvatarFallback>
                        </Avatar>
                    </button>
                ))}
            </div>
            
            <div className="bg-card border rounded-2xl p-8 @md:p-10 text-center shadow-sm">
                <Quote className="size-10 text-primary/20 mx-auto mb-6" />
                <blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8 font-medium">
                    &ldquo;{current.quote}&rdquo;
                </blockquote>
                <div className="font-semibold text-lg">{current.author}</div>
                <div className="text-muted-foreground">{current.role}, {current.company}</div>
            </div>
        </div>
    )
}

'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Single Column" />
                    <Description text="A clean single-column testimonial layout." />
                </div>

                <SingleColumn
                    items={[
                        { quote: "The level of craftsmanship is unparalleled. Every pixel was considered, every interaction was smooth.", author: "Amanda Wright", role: "Design Director", company: "CraftPerfect", avatar: "https://i.pravatar.cc/100?img=9" },
                        { quote: "From concept to launch in record time. The agile process and constant communication made this project a success.", author: "Christopher Lee", role: "Product Owner", company: "AgileWorks", avatar: "https://i.pravatar.cc/100?img=10" },
                        { quote: "Enterprise-grade security with startup agility. They handled our complex requirements while keeping the project moving fast.", author: "Nicole Brown", role: "CTO", company: "SecureTech", avatar: "https://i.pravatar.cc/100?img=11" },
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

const SingleColumn = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="max-w-2xl mx-auto space-y-12">
        {items.map(({ quote, author, role, company, avatar }, i) => (
            <li key={i} className="text-center">
                <Avatar className="size-14 mx-auto mb-6 ring-2 ring-primary/20">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                </Avatar>
                <blockquote className="text-lg @md:text-xl leading-relaxed mb-6 italic text-muted-foreground">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="font-semibold">{author}</div>
                <div className="text-sm text-muted-foreground">{role}, {company}</div>
            </li>
        ))}
    </ul>
)

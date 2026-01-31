'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, TrendingUp } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    metric: string
    metricLabel: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Results" />
                    <Title text="Metrics Grid" />
                    <Description text="Testimonials with measurable results." />
                </div>

                <MetricsGrid
                    items={[
                        { quote: "Revenue growth exceeded all projections.", author: "Michael Park", role: "CEO", company: "GrowthCo", avatar: "https://i.pravatar.cc/100?img=39", metric: "+285%", metricLabel: "Revenue Growth" },
                        { quote: "User acquisition costs dropped significantly.", author: "Lisa Wang", role: "CMO", company: "AcquirePro", avatar: "https://i.pravatar.cc/100?img=40", metric: "-42%", metricLabel: "CAC Reduction" },
                        { quote: "Conversion rates are through the roof.", author: "Robert Taylor", role: "VP Marketing", company: "ConvertMax", avatar: "https://i.pravatar.cc/100?img=41", metric: "+156%", metricLabel: "Conversion Rate" },
                        { quote: "Page load times improved dramatically.", author: "Jennifer Lee", role: "CTO", company: "SpeedTech", avatar: "https://i.pravatar.cc/100?img=42", metric: "0.8s", metricLabel: "Load Time" },
                        { quote: "Customer satisfaction at an all-time high.", author: "Daniel Kim", role: "CPO", company: "SatisfyCo", avatar: "https://i.pravatar.cc/100?img=43", metric: "4.9★", metricLabel: "CSAT Score" },
                        { quote: "Organic traffic exploded after launch.", author: "Amanda Wright", role: "SEO Lead", company: "TrafficPro", avatar: "https://i.pravatar.cc/100?img=44", metric: "+420%", metricLabel: "Organic Traffic" },
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

const MetricsGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map(({ quote, author, role, company, avatar, metric, metricLabel }, i) => (
            <li key={i} className="bg-gradient-to-br from-card to-muted/30 border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="size-5 text-primary" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-primary">{metric}</div>
                        <div className="text-xs text-muted-foreground">{metricLabel}</div>
                    </div>
                </div>
                <Quote className="size-5 text-primary/20 mb-2" />
                <blockquote className="text-sm leading-relaxed mb-5">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-sm">{author}</div>
                        <div className="text-xs text-muted-foreground">{role}, {company}</div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

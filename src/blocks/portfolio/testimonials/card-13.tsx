import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

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
                    <Eyebrow text="Impact Stories" />
                    <Title text="Measurable Results" />
                    <Description text="Real outcomes that speak louder than words." />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "Our conversion rate skyrocketed after the website overhaul. The ROI was incredible.",
                        author: "Chris Martinez",
                        role: "CEO",
                        company: "ConvertPro",
                        avatar: "https://i.pravatar.cc/100?img=69",
                        metric: "+340%",
                        metricLabel: "Conversion Rate",
                    },
                    {
                        quote: "Page load time decreased dramatically, leading to better user engagement.",
                        author: "Amy Foster",
                        role: "VP Engineering",
                        company: "SpeedFirst",
                        avatar: "https://i.pravatar.cc/100?img=70",
                        metric: "2.1s",
                        metricLabel: "Load Time",
                    },
                    {
                        quote: "Customer satisfaction scores reached an all-time high after the UX improvements.",
                        author: "Jason Lee",
                        role: "Product Director",
                        company: "UserLove",
                        avatar: "https://i.pravatar.cc/100?img=71",
                        metric: "98%",
                        metricLabel: "Satisfaction",
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="secondary">{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @lg:grid-cols-3 gap-6">
        {items.map(({ quote, author, role, company, avatar, metric, metricLabel }, i) => (
            <li key={i}>
                <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0 flex flex-col h-full">
                        <div className="p-6 bg-primary text-primary-foreground">
                            <div className="flex items-center justify-between mb-2">
                                <TrendingUp className="size-5" />
                                <span className="text-xs uppercase tracking-wider opacity-80">{metricLabel}</span>
                            </div>
                            <div className="text-4xl @md:text-5xl font-bold">{metric}</div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <blockquote className="text-base leading-relaxed mb-6 flex-1">
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <Avatar className="size-10">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback>{author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold text-sm">{author}</div>
                                    <div className="text-xs text-muted-foreground">{role}, {company}</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

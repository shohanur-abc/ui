import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, TrendingUp } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    metric?: string
    metricLabel?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Success Stories" />
                    <Title text="Results That Matter" />
                    <Description text="Asymmetric grid highlighting key metrics and testimonials." />
                </div>

                <AsymmetricGrid items={[
                    {
                        quote: "The platform transformation resulted in unprecedented growth. Our team has never been more productive.",
                        author: "Victoria Adams",
                        role: "CEO",
                        company: "ScalePro",
                        avatar: "https://i.pravatar.cc/100?img=68",
                        metric: "+180%",
                        metricLabel: "Revenue Growth",
                    },
                    {
                        quote: "Exceptional quality delivered on time.",
                        author: "Marcus Johnson",
                        role: "CTO",
                        company: "TechFirst",
                        avatar: "https://i.pravatar.cc/100?img=69",
                    },
                    {
                        quote: "A true partner who cares about results.",
                        author: "Sophia Williams",
                        role: "VP Product",
                        company: "AppMasters",
                        avatar: "https://i.pravatar.cc/100?img=70",
                    },
                    {
                        quote: "The UX redesign completely transformed user engagement. Metrics improved across every dimension we track.",
                        author: "Benjamin Harris",
                        role: "Director",
                        company: "UserFirst",
                        avatar: "https://i.pravatar.cc/100?img=71",
                        metric: "2.5x",
                        metricLabel: "Engagement",
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

const AsymmetricGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4">
        {items.map(({ quote, author, role, company, avatar, metric, metricLabel }, i) => {
            const hasMetric = metric && metricLabel
            return (
                <li key={i} className={hasMetric ? '@xl:row-span-2' : ''}>
                    <Card className={`h-full ${hasMetric ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' : ''}`}>
                        <CardContent className="p-6 flex flex-col h-full">
                            {hasMetric && (
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-2 opacity-80">
                                        <TrendingUp className="size-5" />
                                        <span className="text-sm">{metricLabel}</span>
                                    </div>
                                    <div className="text-4xl @md:text-5xl font-bold">{metric}</div>
                                </div>
                            )}
                            {!hasMetric && <Quote className="size-8 text-primary/20 mb-4" />}
                            <blockquote className={`leading-relaxed mb-6 flex-1 ${hasMetric ? 'text-lg opacity-95' : 'text-base'}`}>
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <Avatar className="size-10">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className={hasMetric ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}>
                                        {author[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold text-sm">{author}</div>
                                    <div className={`text-xs ${hasMetric ? 'opacity-80' : 'text-muted-foreground'}`}>{role}, {company}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </li>
            )
        })}
    </ul>
)

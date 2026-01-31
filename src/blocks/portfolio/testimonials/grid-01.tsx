import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Bento Grid" />
                    <Description text="Dynamic layout showcasing our best testimonials." />
                </div>

                <BentoGrid items={[
                    {
                        quote: "The complete redesign of our platform was handled with exceptional skill. Every aspect from UX research to final implementation was executed flawlessly. Our metrics have improved across the board.",
                        author: "Alexandra Reynolds",
                        role: "CPO, TechVentures",
                        avatar: "https://i.pravatar.cc/100?img=57",
                    },
                    {
                        quote: "Outstanding work quality!",
                        author: "James Foster",
                        role: "CTO, AppMasters",
                        avatar: "https://i.pravatar.cc/100?img=58",
                    },
                    {
                        quote: "Professional and reliable.",
                        author: "Sarah Chen",
                        role: "VP, CloudFirst",
                        avatar: "https://i.pravatar.cc/100?img=59",
                    },
                    {
                        quote: "A transformative partnership that delivered measurable results.",
                        author: "Michael Park",
                        role: "CEO, GrowthLab",
                        avatar: "https://i.pravatar.cc/100?img=60",
                    },
                    {
                        quote: "Technical excellence combined with creative vision. The team understood our complex requirements and delivered a solution that exceeded expectations.",
                        author: "Emily Rodriguez",
                        role: "Director, EnterpriseFirst",
                        avatar: "https://i.pravatar.cc/100?img=61",
                    },
                ]} />
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

const BentoGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4">
        {items.map(({ quote, author, role, avatar }, i) => {
            const isLarge = i === 0 || i === 4
            return (
                <li key={i} className={isLarge ? '@xl:col-span-2' : ''}>
                    <Card className={`h-full ${isLarge ? 'bg-primary text-primary-foreground' : ''}`}>
                        <CardContent className={`flex flex-col h-full ${isLarge ? 'p-8' : 'p-6'}`}>
                            <Quote className={`mb-4 ${isLarge ? 'size-10 opacity-30' : 'size-8 text-primary/20'}`} />
                            <blockquote className={`leading-relaxed mb-6 flex-1 ${isLarge ? 'text-lg @md:text-xl' : 'text-sm'}`}>
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <Avatar className={isLarge ? 'size-12' : 'size-10'}>
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className={isLarge ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}>
                                        {author[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className={`font-semibold ${isLarge ? '' : 'text-sm'}`}>{author}</div>
                                    <div className={`${isLarge ? 'opacity-80' : 'text-muted-foreground'} ${isLarge ? 'text-sm' : 'text-xs'}`}>{role}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </li>
            )
        })}
    </ul>
)

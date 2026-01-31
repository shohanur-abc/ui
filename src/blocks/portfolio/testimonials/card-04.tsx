import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    featured?: boolean
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="What They Say" />
                    <Title text="Client Testimonials" />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "Incredible attention to detail. Every pixel was crafted with purpose.",
                        author: "Emma Thompson",
                        role: "Design Lead, Pixel Perfect",
                        avatar: "https://i.pravatar.cc/100?img=21",
                    },
                    {
                        quote: "The most seamless collaboration I've experienced. Communication was clear, deadlines were met, and the final product exceeded expectations. Highly recommended for any serious project.",
                        author: "Daniel Park",
                        role: "CTO, NextGen Systems",
                        avatar: "https://i.pravatar.cc/100?img=22",
                        featured: true,
                    },
                    {
                        quote: "Transformed our outdated platform into a modern, efficient system.",
                        author: "Lisa Wang",
                        role: "Operations Manager, CloudFirst",
                        avatar: "https://i.pravatar.cc/100?img=23",
                    },
                    {
                        quote: "Professional, skilled, and truly understands user experience.",
                        author: "Marcus Johnson",
                        role: "Product Owner, AppWorks",
                        avatar: "https://i.pravatar.cc/100?img=24",
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">{text}</h2>
)

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map(({ quote, author, role, avatar, featured }, i) => (
            <li key={i} className={featured ? '@md:col-span-2' : ''}>
                <Card className={`h-full transition-all duration-300 hover:shadow-lg ${featured ? 'bg-primary text-primary-foreground' : ''}`}>
                    <CardContent className="p-6 flex flex-col h-full">
                        <blockquote className={`text-base leading-relaxed mb-6 flex-1 ${featured ? 'text-lg @md:text-xl' : ''}`}>
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <Avatar className="size-10">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className={featured ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}>{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-sm">{author}</div>
                                <div className={`text-xs ${featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{role}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

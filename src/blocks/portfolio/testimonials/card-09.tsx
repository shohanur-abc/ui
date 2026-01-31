import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    rating: number
    highlight?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-3 gap-8 @lg:gap-12">
                    <Header
                        eyebrow="Reviews"
                        title="Client Satisfaction"
                        description="Our commitment to excellence is reflected in every project we deliver."
                    />

                    <div className="@lg:col-span-2">
                        <TestimonialGrid items={[
                            {
                                quote: "Exceeded every expectation. The project was delivered flawlessly and has become the cornerstone of our digital strategy.",
                                author: "Victoria Adams",
                                role: "Marketing Director, BrandForce",
                                avatar: "https://i.pravatar.cc/100?img=53",
                                rating: 5,
                                highlight: "Exceptional Quality",
                            },
                            {
                                quote: "Technical excellence combined with creative problem-solving. A rare find in today's market.",
                                author: "James Cooper",
                                role: "CTO, DevStream",
                                avatar: "https://i.pravatar.cc/100?img=54",
                                rating: 5,
                                highlight: "Best Partnership",
                            },
                            {
                                quote: "The team's dedication to understanding our needs resulted in a product that truly serves our users.",
                                author: "Sophia Williams",
                                role: "Product Lead, UserFirst",
                                avatar: "https://i.pravatar.cc/100?img=55",
                                rating: 5,
                                highlight: "Outstanding Service",
                            },
                            {
                                quote: "From initial consultation to final delivery, every interaction was professional and productive.",
                                author: "Benjamin Harris",
                                role: "Founder, NextStep",
                                avatar: "https://i.pravatar.cc/100?img=56",
                                rating: 5,
                                highlight: "Top Rated",
                            },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Header = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
    <div className="@lg:sticky @lg:top-24">
        <Badge className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <div className="text-2xl font-bold">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average client rating</div>
        </div>
    </div>
)

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 gap-4">
        {items.map(({ quote, author, role, avatar, rating, highlight }, i) => (
            <li key={i}>
                <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                        {highlight && (
                            <Badge variant="secondary" className="mb-3 text-xs">{highlight}</Badge>
                        )}
                        <div className="flex gap-0.5 mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-sm leading-relaxed mb-4">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-2.5">
                            <Avatar className="size-8">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-sm">{author}</div>
                                <div className="text-xs text-muted-foreground">{role}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

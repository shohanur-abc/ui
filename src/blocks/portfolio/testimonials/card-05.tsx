import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star, CheckCircle } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
    verified?: boolean
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <Header
                        eyebrow="Reviews"
                        title="Customer Reviews"
                        description="Real feedback from verified clients and partners."
                    />
                    <Stats averageRating={4.9} totalReviews={127} />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "The project was delivered ahead of schedule with impeccable quality. Every feature works flawlessly.",
                        author: "Christopher Lee",
                        role: "Engineering Manager",
                        company: "TechCorp",
                        avatar: "https://i.pravatar.cc/100?img=30",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "Outstanding work! The team went above and beyond to ensure our complete satisfaction.",
                        author: "Jessica Martinez",
                        role: "Marketing Director",
                        company: "BrandHub",
                        avatar: "https://i.pravatar.cc/100?img=31",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "Reliable, creative, and technically excellent. A pleasure to work with on multiple projects.",
                        author: "Andrew Kim",
                        role: "Startup Founder",
                        company: "LaunchPad",
                        avatar: "https://i.pravatar.cc/100?img=32",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "Transformed our digital presence completely. Our conversion rates have doubled since launch.",
                        author: "Rachel Brown",
                        role: "E-commerce Manager",
                        company: "ShopFlow",
                        avatar: "https://i.pravatar.cc/100?img=33",
                        rating: 5,
                        verified: true,
                    },
                ]} />
            </div>
        </section>
    )
}

const Header = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
    <div className="max-w-xl">
        <Badge className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
    </div>
)

const Stats = ({ averageRating, totalReviews }: { averageRating: number; totalReviews: number }) => (
    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="text-4xl font-bold">{averageRating}</div>
        <div>
            <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
        </div>
    </div>
)

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 gap-6">
        {items.map(({ quote, author, role, company, avatar, rating, verified }, i) => (
            <li key={i}>
                <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                ))}
                            </div>
                            {verified && (
                                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                    <CheckCircle className="size-3.5" />
                                    <span>Verified</span>
                                </div>
                            )}
                        </div>
                        <blockquote className="text-base leading-relaxed mb-6">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <Avatar className="size-10">
                                <AvatarImage src={avatar} />
                                <AvatarFallback>{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-sm">{author}</div>
                                <div className="text-xs text-muted-foreground">{role} at {company}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

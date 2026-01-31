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
    verified: boolean
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <Header
                        eyebrow="Reviews"
                        title="Verified Reviews"
                        description="Authentic feedback from verified clients."
                    />
                    <Stats total={150} average={4.9} />
                </div>

                <MasonryGrid items={[
                    {
                        quote: "Absolutely outstanding work. The team delivered beyond our expectations.",
                        author: "Alexandra Chen",
                        role: "CEO",
                        company: "TechFlow",
                        avatar: "https://i.pravatar.cc/100?img=44",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "Professional, creative, and incredibly responsive. A pleasure to work with on our complex enterprise platform.",
                        author: "Marcus Williams",
                        role: "CTO",
                        company: "Enterprise Solutions",
                        avatar: "https://i.pravatar.cc/100?img=45",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "Five stars!",
                        author: "Rachel Kim",
                        role: "Founder",
                        company: "StartupPro",
                        avatar: "https://i.pravatar.cc/100?img=46",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "The website redesign doubled our leads. Worth every penny.",
                        author: "David Foster",
                        role: "Marketing VP",
                        company: "GrowthCo",
                        avatar: "https://i.pravatar.cc/100?img=47",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "Incredible attention to detail throughout the entire project. The mobile app they built became our highest-rated product.",
                        author: "Jennifer Liu",
                        role: "Product Lead",
                        company: "AppMasters",
                        avatar: "https://i.pravatar.cc/100?img=48",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "Highly recommend!",
                        author: "Michael Park",
                        role: "Director",
                        company: "DigitalFirst",
                        avatar: "https://i.pravatar.cc/100?img=49",
                        rating: 5,
                        verified: true,
                    },
                    {
                        quote: "A true partner who understands both technology and business objectives.",
                        author: "Sarah Brown",
                        role: "COO",
                        company: "ScaleUp Inc",
                        avatar: "https://i.pravatar.cc/100?img=50",
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

const Stats = ({ total, average }: { total: number; average: number }) => (
    <div className="flex items-center gap-6 px-6 py-4 bg-muted/50 rounded-lg">
        <div className="text-center">
            <div className="text-3xl font-bold">{total}+</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center">
            <div className="flex items-center gap-1">
                <span className="text-3xl font-bold">{average}</span>
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-sm text-muted-foreground">Average</div>
        </div>
    </div>
)

const MasonryGrid = ({ items }: { items: TestimonialItem[] }) => (
    <div className="columns-1 @md:columns-2 @xl:columns-3 gap-4 space-y-4">
        {items.map(({ quote, author, role, company, avatar, rating, verified }, i) => (
            <Card key={i} className="break-inside-avoid hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        {verified && (
                            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                <CheckCircle className="size-3.5" />
                                <span>Verified</span>
                            </div>
                        )}
                    </div>
                    <blockquote className="text-sm leading-relaxed mb-4">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-2.5">
                        <Avatar className="size-9">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium text-sm">{author}</div>
                            <div className="text-xs text-muted-foreground">{role}, {company}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

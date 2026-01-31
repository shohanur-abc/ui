import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Award } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
    award?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Award-Winning Work" />
                    <Description text="Recognized excellence by clients and industry alike." />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "The project set a new standard for what we expect from digital partners. Exceptional in every way.",
                        author: "William Chen",
                        role: "CEO",
                        company: "InnovateX",
                        avatar: "https://i.pravatar.cc/100?img=73",
                        rating: 5,
                        award: "Best Website 2025",
                    },
                    {
                        quote: "Creative excellence combined with flawless execution. A rare combination we were fortunate to find.",
                        author: "Isabella Santos",
                        role: "Creative Director",
                        company: "ArtHouse",
                        avatar: "https://i.pravatar.cc/100?img=74",
                        rating: 5,
                    },
                    {
                        quote: "Technical innovation that actually serves user needs. Refreshingly practical yet forward-thinking.",
                        author: "Robert Kim",
                        role: "CTO",
                        company: "TechForward",
                        avatar: "https://i.pravatar.cc/100?img=75",
                        rating: 5,
                        award: "Innovation Award",
                    },
                    {
                        quote: "From strategy to execution, every step was handled with expertise and genuine care for our success.",
                        author: "Diana Moore",
                        role: "VP Marketing",
                        company: "GrowthLab",
                        avatar: "https://i.pravatar.cc/100?img=76",
                        rating: 5,
                    },
                ]} />
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

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 gap-6">
        {items.map(({ quote, author, role, company, avatar, rating, award }, i) => (
            <li key={i}>
                <Card className={`h-full relative overflow-hidden ${award ? 'ring-2 ring-yellow-400/50' : ''}`}>
                    {award && (
                        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-semibold flex items-center gap-1">
                            <Award className="size-3" />
                            {award}
                        </div>
                    )}
                    <CardContent className="p-6 @md:p-8 flex flex-col h-full">
                        <div className="flex gap-0.5 mb-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-base @md:text-lg leading-relaxed mb-6 flex-1">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <Avatar className="size-12">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">{author}</div>
                                <div className="text-sm text-muted-foreground">{role}, {company}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

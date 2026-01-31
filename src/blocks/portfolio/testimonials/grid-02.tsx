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
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Reviews" />
                    <Title text="Customer Feedback" />
                    <Description text="A 3x2 grid of our most impactful testimonials." />
                </div>

                <Grid3x2 items={[
                    {
                        quote: "The project was delivered ahead of schedule with exceptional quality. Our team was impressed by the professionalism.",
                        author: "William Chen",
                        role: "CTO, TechFlow",
                        avatar: "https://i.pravatar.cc/100?img=62",
                        rating: 5,
                    },
                    {
                        quote: "Creative solutions that actually work. The UX improvements led to a 40% increase in user engagement.",
                        author: "Isabella Santos",
                        role: "Product Lead, DesignFirst",
                        avatar: "https://i.pravatar.cc/100?img=63",
                        rating: 5,
                    },
                    {
                        quote: "A reliable partner who understands enterprise requirements. Security and scalability were handled perfectly.",
                        author: "Robert Kim",
                        role: "VP Engineering, SecureCorp",
                        avatar: "https://i.pravatar.cc/100?img=64",
                        rating: 5,
                    },
                    {
                        quote: "From concept to launch, every milestone was hit. The communication throughout was excellent.",
                        author: "Diana Moore",
                        role: "PM, LaunchPad",
                        avatar: "https://i.pravatar.cc/100?img=65",
                        rating: 5,
                    },
                    {
                        quote: "The mobile app they built has become our primary customer touchpoint. Downloads exceeded projections by 200%.",
                        author: "Christopher Lee",
                        role: "CEO, AppFirst",
                        avatar: "https://i.pravatar.cc/100?img=66",
                        rating: 5,
                    },
                    {
                        quote: "True partners in every sense. They took ownership of our success and delivered results that matter.",
                        author: "Amanda Foster",
                        role: "CMO, GrowthCo",
                        avatar: "https://i.pravatar.cc/100?img=67",
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

const Grid3x2 = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ quote, author, role, avatar, rating }, i) => (
            <li key={i}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex gap-0.5 mb-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-base leading-relaxed mb-6 flex-1">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3 pt-4 border-t">
                            <Avatar className="size-11">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">{author}</div>
                                <div className="text-sm text-muted-foreground">{role}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

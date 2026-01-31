import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-8 @md:mb-12">
                    <Eyebrow text="Testimonials" />
                    <Title text="What People Say" />
                    <Description text="Don't just take my word for it — hear from the clients I've worked with." />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "Working with John was an absolute pleasure. He delivered a stunning website that exceeded our expectations and helped us increase conversions by 40%.",
                        author: "Sarah Chen",
                        role: "CEO, TechFlow",
                        avatar: "https://i.pravatar.cc/100?img=1",
                        rating: 5,
                    },
                    {
                        quote: "John's attention to detail and technical expertise are unmatched. He built our entire platform from scratch and it's been rock-solid for 3 years.",
                        author: "Michael Park",
                        role: "CTO, StartupXYZ",
                        avatar: "https://i.pravatar.cc/100?img=2",
                        rating: 5,
                    },
                    {
                        quote: "The best developer I've ever worked with. Clear communication, on-time delivery, and exceptional quality. Will definitely hire again.",
                        author: "Emily Rodriguez",
                        role: "Product Manager, Enterprise Co",
                        avatar: "https://i.pravatar.cc/100?img=3",
                        rating: 5,
                    },
                    {
                        quote: "John took our outdated website and transformed it into a modern, fast, and accessible platform. Our users love it!",
                        author: "David Kim",
                        role: "Founder, Design Studio",
                        avatar: "https://i.pravatar.cc/100?img=4",
                        rating: 5,
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
    <p className="text-base @md:text-lg text-muted-foreground  mb-8 @md:mb-12">{text}</p>
)

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    rating: number
}

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 gap-6 @md:gap-8">
        {items.map(({ quote, author, role, avatar, rating }, i) => (
            <li key={i}>
                <Card className="h-full">
                    <CardContent className="p-6 @md:p-8 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-base @md:text-lg leading-relaxed mb-6 flex-1">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3 pt-4 border-t">
                            <Avatar className="size-10 @md:size-12">
                                <AvatarImage src={avatar} />
                                <AvatarFallback>{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-sm @md:text-base">{author}</div>
                                <div className="text-xs @md:text-sm text-muted-foreground">{role}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

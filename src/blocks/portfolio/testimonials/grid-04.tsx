import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Compact Grid" />
                    <Description text="Clean, minimal testimonial cards in a 4-column layout." />
                </div>

                <CompactGrid items={[
                    {
                        quote: "Exceptional work that exceeded expectations.",
                        author: "Alex Turner",
                        role: "CEO, StartupX",
                        avatar: "https://i.pravatar.cc/100?img=72",
                    },
                    {
                        quote: "Professional and highly skilled team.",
                        author: "Maria Santos",
                        role: "CTO, TechFlow",
                        avatar: "https://i.pravatar.cc/100?img=73",
                    },
                    {
                        quote: "Delivered on time with great quality.",
                        author: "David Chen",
                        role: "VP, CloudFirst",
                        avatar: "https://i.pravatar.cc/100?img=74",
                    },
                    {
                        quote: "Best investment we made this year.",
                        author: "Sarah Kim",
                        role: "Founder, AppLab",
                        avatar: "https://i.pravatar.cc/100?img=75",
                    },
                    {
                        quote: "Creative solutions that actually work.",
                        author: "James Wilson",
                        role: "Director, DesignHub",
                        avatar: "https://i.pravatar.cc/100?img=76",
                    },
                    {
                        quote: "A true partner in our digital journey.",
                        author: "Emily Foster",
                        role: "CMO, GrowthCo",
                        avatar: "https://i.pravatar.cc/100?img=77",
                    },
                    {
                        quote: "Incredible attention to every detail.",
                        author: "Michael Park",
                        role: "PM, ScaleUp",
                        avatar: "https://i.pravatar.cc/100?img=78",
                    },
                    {
                        quote: "Would definitely work together again.",
                        author: "Lisa Wang",
                        role: "COO, Enterprise Inc",
                        avatar: "https://i.pravatar.cc/100?img=79",
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

const CompactGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
        {items.map(({ quote, author, role, avatar }, i) => (
            <li key={i} className="bg-background p-5 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <Quote className="size-6 text-primary/30 mb-3" />
                <blockquote className="text-sm leading-relaxed mb-4">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2.5">
                    <Avatar className="size-8">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium text-sm">{author}</div>
                        <div className="text-xs text-muted-foreground">{role}</div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

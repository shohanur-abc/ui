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
                    <Title text="Client Love" />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "A perfect blend of creativity and technical skill. Our new website has transformed our business.",
                        author: "Lauren Mitchell",
                        role: "CEO, Creative Labs",
                        avatar: "https://i.pravatar.cc/100?img=57",
                    },
                    {
                        quote: "The attention to detail was incredible. Every aspect of the project was handled with care.",
                        author: "Marcus Johnson",
                        role: "Founder, TechStart",
                        avatar: "https://i.pravatar.cc/100?img=58",
                    },
                    {
                        quote: "Professional, reliable, and incredibly talented. I couldn't have asked for a better partner.",
                        author: "Emily Chen",
                        role: "Product Director, InnovateCo",
                        avatar: "https://i.pravatar.cc/100?img=59",
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
    <ul className="grid @lg:grid-cols-3 gap-8">
        {items.map(({ quote, author, role, avatar }, i) => (
            <li key={i} className="relative">
                <Quote className="absolute -top-4 -left-2 size-12 text-primary/10" />
                <div className="relative pt-4">
                    <blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <Avatar className="size-14 ring-4 ring-background shadow-lg">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-lg">{author}</div>
                            <div className="text-muted-foreground">{role}</div>
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

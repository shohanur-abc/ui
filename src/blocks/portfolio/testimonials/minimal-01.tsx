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
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Minimal Elegance" />
                    <Description text="Clean, focused testimonials that let the words speak." />
                </div>

                <MinimalGrid items={[
                    {
                        quote: "Exceptional work that exceeded every expectation we had. The attention to detail was remarkable.",
                        author: "Alexandra Chen",
                        role: "CEO, TechFlow",
                        avatar: "https://i.pravatar.cc/100?img=84",
                    },
                    {
                        quote: "A true partner who understood our vision and brought it to life beautifully.",
                        author: "Marcus Williams",
                        role: "Founder, DesignFirst",
                        avatar: "https://i.pravatar.cc/100?img=85",
                    },
                    {
                        quote: "Professional, creative, and incredibly talented. Highly recommended.",
                        author: "Rachel Kim",
                        role: "VP Product, ScaleUp",
                        avatar: "https://i.pravatar.cc/100?img=86",
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

const MinimalGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @lg:grid-cols-3 gap-12 @lg:gap-16">
        {items.map(({ quote, author, role, avatar }, i) => (
            <li key={i} className="text-center">
                <Quote className="size-10 text-primary/20 mx-auto mb-6" />
                <blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <Avatar className="size-14 mx-auto mb-3">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                </Avatar>
                <div className="font-semibold">{author}</div>
                <div className="text-sm text-muted-foreground">{role}</div>
            </li>
        ))}
    </ul>
)

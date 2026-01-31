import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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
                <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
                    <Header
                        eyebrow="Testimonials"
                        title="Real Stories from Real Clients"
                        description="Discover how we've helped businesses achieve their goals through innovative solutions and dedicated partnership."
                    />

                    <TestimonialCard
                        quote="Working with this team was transformative. They didn't just build what we asked for—they helped us discover what we truly needed. The result speaks for itself."
                        author="Sophie Anderson"
                        role="VP of Product, Innovate Labs"
                        avatar="https://i.pravatar.cc/100?img=20"
                    />
                </div>
            </div>
        </section>
    )
}

const Header = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
    <div className="@lg:pr-8">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{description}</p>
    </div>
)

const TestimonialCard = ({ quote, author, role, avatar }: TestimonialItem) => (
    <Card className="relative overflow-hidden">
        <CardContent className="p-6 @md:p-8 @xl:p-10">
            <Quote className="absolute top-6 right-6 size-16 @md:size-20 text-primary/10" />
            <blockquote className="relative text-lg @md:text-xl leading-relaxed mb-8">
                &ldquo;{quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
                <Avatar className="size-14 ring-2 ring-primary/20">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold text-lg">{author}</div>
                    <div className="text-muted-foreground">{role}</div>
                </div>
            </div>
        </CardContent>
    </Card>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Feedback" />
                    <Title text="What Clients Say" />
                    <Description text="Testimonials from people I've had the pleasure of working with." />
                </div>

                <TestimonialGrid
                    items={[
                        {
                            quote: 'Working with this developer was an absolute pleasure. They delivered beyond our expectations.',
                            author: 'Sarah Johnson',
                            role: 'CEO, TechStart',
                            avatar: 'https://i.pravatar.cc/150?u=sarah',
                            initials: 'SJ',
                        },
                        {
                            quote: 'The attention to detail and code quality was exceptional. Our app performance improved significantly.',
                            author: 'Michael Chen',
                            role: 'CTO, DataFlow',
                            avatar: 'https://i.pravatar.cc/150?u=michael',
                            initials: 'MC',
                        },
                        {
                            quote: 'Clear communication throughout the project. They understood our needs perfectly.',
                            author: 'Emily Davis',
                            role: 'Product Manager, Scale',
                            avatar: 'https://i.pravatar.cc/150?u=emily',
                            initials: 'ED',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar: string
    initials: string
}

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ quote, author, role, avatar, initials }, i) => (
            <Card key={i} className="py-0">
                <CardContent className="p-5 @md:p-6">
                    <Quote className="size-8 text-primary/20 mb-4" />
                    <p className="text-sm @md:text-base leading-relaxed mb-6">{quote}</p>
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10 @md:size-11">
                            <AvatarImage src={avatar} alt={author} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-sm @md:text-base">{author}</div>
                            <div className="text-xs @md:text-sm text-muted-foreground">{role}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

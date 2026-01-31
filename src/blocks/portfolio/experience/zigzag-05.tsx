import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote, Star } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="What Colleagues Say" />
                    <Description text="Feedback from teammates and collaborators." />
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    <TestimonialZigzag
                        quote="John is the best engineer I've ever worked with. His technical skills are matched only by his ability to mentor and lead."
                        author="Sarah Chen"
                        role="VP of Engineering"
                        company="TechCorp"
                        avatar="https://github.com/shadcn.png"
                        rating={5}
                        align="left"
                    />
                    <TestimonialZigzag
                        quote="Working with John transformed our design system. He brings clarity to complex problems."
                        author="Michael Park"
                        role="Product Designer"
                        company="Meta"
                        avatar="https://github.com/shadcn.png"
                        rating={5}
                        align="right"
                    />
                    <TestimonialZigzag
                        quote="John's mentorship helped me grow from junior to senior in just two years. Forever grateful."
                        author="Alex Kim"
                        role="Senior Engineer"
                        company="Google"
                        avatar="https://github.com/shadcn.png"
                        rating={5}
                        align="left"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">{text}</Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface TestimonialZigzagProps {
    quote: string
    author: string
    role: string
    company: string
    avatar: string
    rating: number
    align: 'left' | 'right'
}

const TestimonialZigzag = ({ quote, author, role, company, avatar, rating, align }: TestimonialZigzagProps) => (
    <div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
        <div className={`${align === 'right' ? '@lg:order-2' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="size-14 ring-2 ring-background">
                    <AvatarImage src={avatar} alt={author} />
                    <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">{author}</p>
                    <p className="text-sm text-muted-foreground">{role} · {company}</p>
                </div>
            </div>
            <div className="flex gap-0.5 mb-2">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="size-4 text-yellow-500 fill-current" />
                ))}
            </div>
        </div>
        <Card className={`${align === 'right' ? '@lg:order-1' : ''}`}>
            <CardContent className="p-6 @md:p-8">
                <Quote className="size-8 text-primary/20 mb-4" />
                <p className="text-lg italic">&quot;{quote}&quot;</p>
            </CardContent>
        </Card>
    </div>
)

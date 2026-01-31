import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow text="Testimonials" />
                        <Title text="What Colleagues Say" />
                        <Description text="Feedback from teammates, managers, and collaborators I've worked with throughout my career." />

                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex -space-x-2">
                                {['https://github.com/shadcn.png', 'https://github.com/shadcn.png', 'https://github.com/shadcn.png', 'https://github.com/shadcn.png'].map((src, i) => (
                                    <Avatar key={i} className="size-10 border-2 border-background">
                                        <AvatarImage src={src} />
                                        <AvatarFallback>U{i + 1}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-0.5 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="size-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">From 25+ colleagues</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <TestimonialCard
                            quote="John is the best engineer I've ever worked with. His technical skills are matched only by his ability to mentor and lead others."
                            author="Sarah Chen"
                            role="VP of Engineering"
                            company="TechCorp"
                            avatar="https://github.com/shadcn.png"
                        />
                        <TestimonialCard
                            quote="Working with John transformed our design system. He brings clarity to complex problems and delivers exceptional results."
                            author="Michael Park"
                            role="Product Designer"
                            company="Meta"
                            avatar="https://github.com/shadcn.png"
                        />
                    </div>
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

interface TestimonialCardProps {
    quote: string
    author: string
    role: string
    company: string
    avatar: string
}

const TestimonialCard = ({ quote, author, role, company, avatar }: TestimonialCardProps) => (
    <Card>
        <CardContent className="p-6">
            <Quote className="size-8 text-primary/20 mb-4" />
            <p className="text-sm @md:text-base mb-6 italic">&quot;{quote}&quot;</p>
            <div className="flex items-center gap-3">
                <Avatar className="size-10">
                    <AvatarImage src={avatar} alt={author} />
                    <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium text-sm">{author}</p>
                    <p className="text-xs text-muted-foreground">{role} · {company}</p>
                </div>
            </div>
        </CardContent>
    </Card>
)

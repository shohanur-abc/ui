import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Featured Review" />
                    <Title text="Spotlight Testimonial" />
                </div>

                <FeaturedTestimonial
                    quote="The transformation was remarkable. From our initial consultation to the final launch, every aspect of the project was handled with exceptional care and expertise. Our new platform has become the cornerstone of our digital strategy, driving growth and improving customer satisfaction across all metrics."
                    author="Jonathan Burke"
                    role="Chief Executive Officer"
                    company="GlobalTech Enterprises"
                    avatar="https://i.pravatar.cc/100?img=95"
                    rating={5}
                />
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

const FeaturedTestimonial = ({ quote, author, role, company, avatar, rating }: TestimonialItem) => (
    <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardContent className="p-0">
            <div className="grid @lg:grid-cols-5">
                <div className="@lg:col-span-3 p-8 @md:p-10 @lg:p-12">
                    <Quote className="size-12 text-primary/20 mb-6" />
                    <div className="flex gap-1 mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`size-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                        ))}
                    </div>
                    <blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                </div>
                <div className="@lg:col-span-2 bg-muted/50 p-8 @md:p-10 flex flex-col items-center justify-center text-center">
                    <Avatar className="size-24 @md:size-28 ring-4 ring-background shadow-lg mb-6">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-3xl bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-bold text-xl @md:text-2xl mb-1">{author}</div>
                    <div className="text-muted-foreground mb-2">{role}</div>
                    <Badge variant="secondary">{company}</Badge>
                </div>
            </div>
        </CardContent>
    </Card>
)

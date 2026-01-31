import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star, Award } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
    awards: string[]
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Award-Winning Project" />
                    <Title text="Recognized Excellence" />
                    <Description text="A project that earned industry recognition and client praise." />
                </div>

                <AwardWinningTestimonial
                    quote="This project set a new standard in our industry. The innovative approach, flawless execution, and measurable results led to multiple industry awards. More importantly, it delivered exactly what our customers needed."
                    author="Katherine Brooks"
                    role="Chief Innovation Officer"
                    company="InnovateLead"
                    avatar="https://i.pravatar.cc/100?img=99"
                    rating={5}
                    awards={['Best Website 2025', 'UX Excellence Award', 'Innovation of the Year']}
                />
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

const AwardWinningTestimonial = ({ quote, author, role, company, avatar, rating, awards }: TestimonialItem) => (
    <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardContent className="p-0">
            <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 p-4 flex flex-wrap items-center justify-center gap-3">
                {awards.map((award, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-sm font-medium">
                        <Award className="size-4 text-yellow-600" />
                        <span>{award}</span>
                    </div>
                ))}
            </div>
            <div className="p-8 @md:p-10 @lg:p-12">
                <Quote className="size-12 text-primary/20 mb-6" />
                <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`size-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                    ))}
                </div>
                <blockquote className="text-xl @md:text-2xl leading-relaxed mb-10">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                    <Avatar className="size-16 ring-4 ring-yellow-400/30">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-xl bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-bold text-xl">{author}</div>
                        <div className="text-muted-foreground">{role}</div>
                        <div className="text-primary font-medium">{company}</div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
)

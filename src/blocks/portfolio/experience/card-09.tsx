import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote, Star } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="What Colleagues Say" />
                    <Description text="Feedback from managers, peers, and direct reports." />
                </div>

                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
                    <TestimonialCard
                        quote="One of the most talented engineers I've ever worked with. Their ability to lead technical initiatives while maintaining code quality is exceptional."
                        name="Sarah Chen"
                        role="VP of Engineering"
                        company="TechCorp"
                        avatar="https://i.pravatar.cc/100?img=10"
                        initials="SC"
                        relationship="Manager"
                    />
                    <TestimonialCard
                        quote="A true mentor who helped me grow from junior to senior in just 2 years. Always available to help and explain complex concepts."
                        name="Alex Kim"
                        role="Senior Engineer"
                        company="TechCorp"
                        avatar="https://i.pravatar.cc/100?img=11"
                        initials="AK"
                        relationship="Mentee"
                    />
                    <TestimonialCard
                        quote="The design system they built transformed how we work. It's now used by 500+ engineers and has significantly improved our development velocity."
                        name="Michael Ross"
                        role="Staff Engineer"
                        company="TechCorp"
                        avatar="https://i.pravatar.cc/100?img=12"
                        initials="MR"
                        relationship="Peer"
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

interface TestimonialCardProps {
    quote: string
    name: string
    role: string
    company: string
    avatar: string
    initials: string
    relationship: string
}

const TestimonialCard = ({ quote, name, role, company, avatar, initials, relationship }: TestimonialCardProps) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
                <Quote className="size-8 text-primary/20" />
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-primary text-primary" />
                    ))}
                </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
            <div className="flex items-center gap-3 pt-4 border-t">
                <Avatar className="size-10">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}, {company}</p>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{relationship}</Badge>
            </div>
        </CardContent>
    </Card>
)

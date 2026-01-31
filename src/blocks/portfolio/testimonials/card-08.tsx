import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Building2 } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    companyLogo?: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Success Stories" />
                    <Title text="Trusted by Industry Leaders" />
                    <Description text="Join the companies that have transformed their digital presence." />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "Delivered a complete redesign that increased our user engagement by 60%. The results speak for themselves.",
                        author: "Patricia Lane",
                        role: "CMO",
                        company: "GlobalTech Solutions",
                        avatar: "https://i.pravatar.cc/100?img=49",
                    },
                    {
                        quote: "The technical expertise and creative solutions provided were exactly what our enterprise needed.",
                        author: "Kevin Zhang",
                        role: "Director of Engineering",
                        company: "Enterprise Systems Inc",
                        avatar: "https://i.pravatar.cc/100?img=50",
                    },
                    {
                        quote: "From concept to deployment, every phase was handled with precision and professionalism.",
                        author: "Maria Santos",
                        role: "VP of Operations",
                        company: "Innovate Corp",
                        avatar: "https://i.pravatar.cc/100?img=51",
                    },
                    {
                        quote: "A strategic partner who understands both technology and business objectives perfectly.",
                        author: "Thomas Wright",
                        role: "CEO",
                        company: "FutureScale",
                        avatar: "https://i.pravatar.cc/100?img=52",
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="secondary">{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 gap-6 @lg:gap-8">
        {items.map(({ quote, author, role, company, avatar }, i) => (
            <li key={i}>
                <Card className="h-full overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-6 @md:p-8">
                            <blockquote className="text-base @md:text-lg leading-relaxed mb-6">
                                &ldquo;{quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <Avatar className="size-12">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold">{author}</div>
                                    <div className="text-sm text-muted-foreground">{role}</div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 @md:px-8 py-4 bg-muted/50 flex items-center gap-2">
                            <Building2 className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{company}</span>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

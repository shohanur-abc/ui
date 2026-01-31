import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
}

interface CTAItem {
    label: string
    href: string
    variant?: 'default' | 'outline' | 'secondary'
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-5 gap-8 @xl:gap-12">
                    <div className="@xl:col-span-2">
                        <Header
                            eyebrow="Testimonials"
                            title="Trusted by Teams Worldwide"
                            description="Join hundreds of satisfied clients who have transformed their digital presence with our expertise."
                            cta={[
                                { label: 'View All Stories', href: '/testimonials', variant: 'default' },
                            ]}
                        />
                    </div>

                    <div className="@xl:col-span-3">
                        <TestimonialStack items={[
                            {
                                quote: "Working with this team was the best decision we made this year. The results have been phenomenal.",
                                author: "Rachel Green",
                                role: "Founder, StartupHub",
                                avatar: "https://i.pravatar.cc/100?img=66",
                            },
                            {
                                quote: "They delivered more than what we asked for. True professionals who care about their work.",
                                author: "Tom Anderson",
                                role: "Director, AgencyOne",
                                avatar: "https://i.pravatar.cc/100?img=67",
                            },
                            {
                                quote: "The attention to detail and commitment to quality is unmatched in the industry.",
                                author: "Nina Patel",
                                role: "CEO, TechVenture",
                                avatar: "https://i.pravatar.cc/100?img=68",
                            },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Header = ({ eyebrow, title, description, cta }: { eyebrow: string; title: string; description: string; cta: CTAItem[] }) => (
    <div className="@xl:sticky @xl:top-24">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-3">
            {cta.map(({ label, href, variant }, i) => (
                <Button key={i} variant={variant || 'default'} className="gap-2" asChild>
                    <Link href={href}>
                        {label}
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            ))}
        </div>
    </div>
)

const TestimonialStack = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="space-y-4">
        {items.map(({ quote, author, role, avatar }, i) => (
            <li key={i}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                        <div className="flex flex-col @md:flex-row">
                            <div className="@md:w-1/4 p-6 bg-muted/30 flex items-center justify-center">
                                <Avatar className="size-20 ring-4 ring-background shadow-lg">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex-1 p-6">
                                <Quote className="size-8 text-primary/20 mb-3" />
                                <blockquote className="text-base @md:text-lg leading-relaxed mb-4">
                                    &ldquo;{quote}&rdquo;
                                </blockquote>
                                <div>
                                    <div className="font-semibold">{author}</div>
                                    <div className="text-sm text-muted-foreground">{role}</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

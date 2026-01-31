import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Quote, Star } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    eyebrow="Testimonials"
                    title="What People Say"
                    description="Feedback from clients, colleagues, and collaborators."
                />
                <TestimonialTabs
                    tabs={[
                        {
                            id: 'clients',
                            label: 'Clients',
                            testimonials: [
                                {
                                    quote: 'Delivered exactly what we needed, on time and above expectations. A true professional.',
                                    author: 'Jane Smith',
                                    role: 'CEO, TechStartup',
                                    avatar: 'https://picsum.photos/seed/c1/100/100',
                                    rating: 5,
                                },
                                {
                                    quote: 'Transformed our product with incredible attention to detail. Highly recommended.',
                                    author: 'Mark Johnson',
                                    role: 'Product Manager, FinCorp',
                                    avatar: 'https://picsum.photos/seed/c2/100/100',
                                    rating: 5,
                                },
                            ],
                        },
                        {
                            id: 'colleagues',
                            label: 'Colleagues',
                            testimonials: [
                                {
                                    quote: 'One of the best developers I\'ve worked with. Great technical skills and even better teamwork.',
                                    author: 'Sarah Chen',
                                    role: 'Lead Developer, Google',
                                    avatar: 'https://picsum.photos/seed/co1/100/100',
                                    rating: 5,
                                },
                                {
                                    quote: 'A natural leader who brings out the best in everyone. Truly inspiring to work with.',
                                    author: 'David Kim',
                                    role: 'Senior Engineer, Meta',
                                    avatar: 'https://picsum.photos/seed/co2/100/100',
                                    rating: 5,
                                },
                            ],
                        },
                        {
                            id: 'mentees',
                            label: 'Mentees',
                            testimonials: [
                                {
                                    quote: 'Changed my career trajectory. The mentorship was invaluable and practical.',
                                    author: 'Alex Rivera',
                                    role: 'Junior Developer',
                                    avatar: 'https://picsum.photos/seed/m1/100/100',
                                    rating: 5,
                                },
                                {
                                    quote: 'Patient, knowledgeable, and genuinely cares about your growth. Couldn\'t ask for more.',
                                    author: 'Lisa Wang',
                                    role: 'Bootcamp Graduate',
                                    avatar: 'https://picsum.photos/seed/m2/100/100',
                                    rating: 5,
                                },
                            ],
                        },
                    ]}
                />
                <CTA label="Work With Me" href="/contact" icon={ArrowRight} />
            </div>
        </section>
    )
}

interface HeaderProps {
    eyebrow: string
    title: string
    description: string
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
    <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
        <h1 className="text-3xl @lg:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
    </div>
)

interface Testimonial {
    quote: string
    author: string
    role: string
    avatar: string
    rating: number
}

interface TabData {
    id: string
    label: string
    testimonials: Testimonial[]
}

interface TestimonialTabsProps {
    tabs: TabData[]
}

const TestimonialTabs = ({ tabs }: TestimonialTabsProps) => (
    <Tabs defaultValue={tabs[0].id} className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
            {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
            ))}
        </TabsList>
        {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
                <div className="grid @md:grid-cols-2 gap-6">
                    {tab.testimonials.map((testimonial, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <Quote className="size-8 text-primary/20 mb-4" />
                                <p className="text-muted-foreground mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                                        <Star key={j} className="size-4 fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-10">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                                        <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-sm">{testimonial.author}</p>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        ))}
    </Tabs>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center mt-12">
        <Button className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)

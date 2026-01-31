'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Quote, Building2, Users, Briefcase } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
}

interface IndustryItem {
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
    testimonials: TestimonialItem[]
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Industry Reviews" />
                    <Title text="By Industry" />
                    <Description text="See what clients from different industries say." />
                </div>

                <IndustryTabs
                    industries={[
                        {
                            label: 'Enterprise',
                            value: 'enterprise',
                            icon: Building2,
                            testimonials: [
                                { quote: "Handled our enterprise requirements with ease. Security, scalability, and compliance were all addressed perfectly.", author: "Patricia Lane", role: "CTO", company: "Fortune 500 Corp", avatar: "https://i.pravatar.cc/100?img=34" },
                            ],
                        },
                        {
                            label: 'Startups',
                            value: 'startups',
                            icon: Briefcase,
                            testimonials: [
                                { quote: "Perfect partner for a fast-moving startup. Agile, responsive, and delivered MVPs quickly.", author: "Kevin Zhang", role: "Founder", company: "TechStartup", avatar: "https://i.pravatar.cc/100?img=35" },
                            ],
                        },
                        {
                            label: 'Agencies',
                            value: 'agencies',
                            icon: Users,
                            testimonials: [
                                { quote: "Reliable white-label partner. Our clients love the work and never know we outsourced.", author: "Maria Santos", role: "Agency Owner", company: "DigitalAgency", avatar: "https://i.pravatar.cc/100?img=36" },
                            ],
                        },
                    ]}
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

const IndustryTabs = ({ industries }: { industries: IndustryItem[] }) => (
    <Tabs defaultValue={industries[0]?.value} className="w-full max-w-3xl mx-auto">
        <TabsList className="flex justify-center mb-8">
            {industries.map(({ label, value, icon: Icon }) => (
                <TabsTrigger key={value} value={value} className="gap-2">
                    <Icon className="size-4" />
                    {label}
                </TabsTrigger>
            ))}
        </TabsList>
        {industries.map(({ value, testimonials }) => (
            <TabsContent key={value} value={value}>
                {testimonials.map(({ quote, author, role, company, avatar }, i) => (
                    <div key={i} className="bg-background rounded-xl p-8 shadow-sm border">
                        <Quote className="size-10 text-primary/20 mb-6" />
                        <blockquote className="text-xl @md:text-2xl leading-relaxed mb-8">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <Avatar className="size-14 ring-2 ring-primary/20">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-lg">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-lg">{author}</div>
                                <div className="text-muted-foreground">{role}, {company}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </TabsContent>
        ))}
    </Tabs>
)

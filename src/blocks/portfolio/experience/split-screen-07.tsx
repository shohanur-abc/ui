import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16">
                    <div>
                        <Eyebrow icon={Briefcase} text="Timeline" />
                        <Title text="Career Journey" />
                        <Description text="From my first internship to leading engineering at scale, here's how my career has evolved." />

                        <Card className="mt-8">
                            <CardContent className="p-6">
                                <div className="text-center">
                                    <p className="text-5xl @md:text-6xl font-bold text-primary mb-2">8+</p>
                                    <p className="text-lg font-medium">Years of Experience</p>
                                    <p className="text-sm text-muted-foreground">Across 4 companies</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 @md:left-6 top-0 bottom-0 w-0.5 bg-border" />
                        <div className="space-y-6">
                            <TimelineItem
                                logo="https://github.com/google.png"
                                initials="TC"
                                role="Principal Engineer"
                                company="TechCorp"
                                period="2023 - Present"
                                location="San Francisco"
                                current
                            />
                            <TimelineItem
                                logo="https://github.com/facebook.png"
                                initials="SX"
                                role="Staff Engineer"
                                company="StartupX"
                                period="2021 - 2023"
                                location="Remote"
                            />
                            <TimelineItem
                                logo="https://github.com/facebook.png"
                                initials="M"
                                role="Senior Engineer"
                                company="Meta"
                                period="2019 - 2021"
                                location="Menlo Park"
                            />
                            <TimelineItem
                                logo="https://github.com/stripe.png"
                                initials="S"
                                role="Software Engineer"
                                company="Stripe"
                                period="2017 - 2019"
                                location="San Francisco"
                            />
                            <TimelineItem
                                logo="https://github.com/github.png"
                                initials="SI"
                                role="Junior Developer"
                                company="Startup Inc"
                                period="2015 - 2017"
                                location="New York"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface TimelineItemProps {
    logo: string
    initials: string
    role: string
    company: string
    period: string
    location: string
    current?: boolean
}

const TimelineItem = ({ logo, initials, role, company, period, location, current }: TimelineItemProps) => (
    <Link href={`/experience/${company.toLowerCase().replace(' ', '-')}`} className="block group">
        <div className="relative pl-12 @md:pl-16">
            <div className={`absolute left-0 size-8 @md:size-12 rounded-full border-4 border-background flex items-center justify-center ${current ? 'bg-primary' : 'bg-muted'}`}>
                <Avatar className="size-full">
                    <AvatarImage src={logo} alt={company} />
                    <AvatarFallback className={current ? 'bg-primary text-primary-foreground' : ''}>{initials}</AvatarFallback>
                </Avatar>
            </div>
            <Card className={`hover:shadow-md transition-all ${current ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-4 @md:p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            {current && <Badge className="mb-2">Current</Badge>}
                            <h3 className="font-bold group-hover:text-primary transition-colors">{role}</h3>
                            <p className="text-sm text-primary">{company}</p>
                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="size-3" />{period}</span>
                                <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
                            </div>
                        </div>
                        <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                </CardContent>
            </Card>
        </div>
    </Link>
)

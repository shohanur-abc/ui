import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Briefcase, GraduationCap, Trophy, Heart } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Timeline" />
                    <Title text="Life & Career Timeline" />
                    <Description text="A chronological view of my professional and personal journey." />
                </div>

                <div className="relative">
                    <TimelineLine />
                    <div className="space-y-8">
                        <TimelineEntry
                            icon={Briefcase}
                            date="2024"
                            title="Principal Engineer"
                            subtitle="Leading technical strategy"
                            description="Promoted to principal, now guiding architectural decisions."
                            side="left"
                        />
                        <TimelineEntry
                            icon={Trophy}
                            date="2023"
                            title="Tech Lead Award"
                            subtitle="Company recognition"
                            description="Received award for outstanding technical leadership."
                            side="right"
                        />
                        <TimelineEntry
                            icon={Briefcase}
                            date="2021"
                            title="Senior Engineer"
                            subtitle="Promoted from mid-level"
                            description="Started leading projects and mentoring junior developers."
                            side="left"
                        />
                        <TimelineEntry
                            icon={GraduationCap}
                            date="2019"
                            title="Master's Degree"
                            subtitle="Computer Science"
                            description="Completed graduate studies while working full-time."
                            side="right"
                        />
                        <TimelineEntry
                            icon={Heart}
                            date="2018"
                            title="Open Source"
                            subtitle="First major contribution"
                            description="Started contributing to popular open source projects."
                            side="left"
                        />
                        <TimelineEntry
                            icon={GraduationCap}
                            date="2016"
                            title="Bachelor's Degree"
                            subtitle="Started career"
                            description="Graduated and landed my first developer role."
                            side="right"
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

const TimelineLine = () => (
    <div className="absolute left-4 @lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
)

interface TimelineEntryProps {
    icon: ComponentType<{ className?: string }>
    date: string
    title: string
    subtitle: string
    description: string
    side: 'left' | 'right'
}

const TimelineEntry = ({ icon: Icon, date, title, subtitle, description, side }: TimelineEntryProps) => (
    <div className={`relative flex @lg:items-center ${side === 'left' ? '@lg:flex-row' : '@lg:flex-row-reverse'}`}>
        <div className="hidden @lg:block @lg:w-1/2" />
        <div className="absolute left-4 @lg:left-1/2 -translate-x-1/2 z-10">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
                <Icon className="size-4 text-primary-foreground" />
            </div>
        </div>
        <div className={`@lg:w-1/2 pl-12 @lg:pl-0 ${side === 'left' ? '@lg:pr-12' : '@lg:pl-12'}`}>
            <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                    <span className="text-xs font-mono text-muted-foreground">{date}</span>
                    <h3 className="text-base @md:text-lg font-semibold mt-1">{title}</h3>
                    <p className="text-sm text-primary">{subtitle}</p>
                    <Separator className="my-2" />
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </div>
    </div>
)

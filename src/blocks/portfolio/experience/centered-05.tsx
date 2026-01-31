import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, GraduationCap, Award, Heart } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Journey" />
                    <Title text="Career Timeline" />
                    <Description text="Key milestones that shaped my professional journey." />
                </div>

                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

                    <div className="space-y-12">
                        <TimelineCard
                            icon={Briefcase}
                            year="2023"
                            title="Principal Engineer"
                            subtitle="Promoted at TechCorp"
                            align="right"
                        />
                        <TimelineCard
                            icon={Award}
                            year="2022"
                            title="Patent Filed"
                            subtitle="Caching algorithm innovation"
                            align="left"
                        />
                        <TimelineCard
                            icon={Briefcase}
                            year="2021"
                            title="Staff Engineer"
                            subtitle="Joined StartupX"
                            align="right"
                        />
                        <TimelineCard
                            icon={Heart}
                            year="2020"
                            title="First Team Lead"
                            subtitle="Led team of 8 at Meta"
                            align="left"
                        />
                        <TimelineCard
                            icon={Briefcase}
                            year="2019"
                            title="Senior Engineer"
                            subtitle="Joined Meta"
                            align="right"
                        />
                        <TimelineCard
                            icon={GraduationCap}
                            year="2018"
                            title="Master's Degree"
                            subtitle="Stanford University"
                            align="left"
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

interface TimelineCardProps {
    icon: ComponentType<{ className?: string }>
    year: string
    title: string
    subtitle: string
    align: 'left' | 'right'
}

const TimelineCard = ({ icon: Icon, year, title, subtitle, align }: TimelineCardProps) => (
    <div className={`relative flex items-center ${align === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-1/2 ${align === 'right' ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
            <Card className="inline-block">
                <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">{year}</Badge>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </CardContent>
            </Card>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 size-10 rounded-full bg-primary flex items-center justify-center z-10">
            <Icon className="size-5 text-primary-foreground" />
        </div>
        <div className="w-1/2" />
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Braces, Cloud, Database, Globe, Layers, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Architecture"
                    title="Technology Timeline"
                    subtitle="Evolution of my tech stack over time"
                />

                <HorizontalTimeline
                    items={[
                        { year: '2018', icon: Braces, title: 'Core Languages', skills: ['JavaScript', 'HTML/CSS'] },
                        { year: '2019', icon: Globe, title: 'Frontend Frameworks', skills: ['React', 'Vue.js'] },
                        { year: '2020', icon: Server, title: 'Backend & APIs', skills: ['Node.js', 'Express'] },
                        { year: '2021', icon: Database, title: 'Data Layer', skills: ['PostgreSQL', 'MongoDB'] },
                        { year: '2022', icon: Layers, title: 'Advanced Stack', skills: ['Next.js', 'TypeScript'] },
                        { year: '2023', icon: Cloud, title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'K8s'] },
                    ]}
                />
            </div>
        </section>
    )
}

interface SectionHeaderProps {
    badge: string
    title: string
    subtitle: string
}

const SectionHeader = ({ badge, title, subtitle }: SectionHeaderProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface TimelineItem {
    year: string
    icon: ComponentType<{ className?: string }>
    title: string
    skills: string[]
}

const HorizontalTimeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="max-w-6xl mx-auto">
        <div className="hidden @lg:block relative">
            <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full" />
            <div className="grid grid-cols-6 gap-4">
                {items.map((item, i) => (
                    <TimelineNode key={i} {...item} />
                ))}
            </div>
        </div>

        <div className="@lg:hidden space-y-4">
            {items.map((item, i) => (
                <MobileTimelineCard key={i} {...item} />
            ))}
        </div>
    </div>
)

const TimelineNode = ({ year, icon: Icon, title, skills }: TimelineItem) => (
    <div className="flex flex-col items-center">
        <Badge variant="outline" className="mb-4">{year}</Badge>
        <div className="size-10 rounded-full bg-primary flex items-center justify-center mb-6 z-10">
            <Icon className="size-5 text-primary-foreground" />
        </div>
        <Card className="w-full group hover:border-primary/50 transition-all">
            <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-sm mb-2">{title}</h4>
                <div className="flex flex-wrap justify-center gap-1">
                    {skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
)

const MobileTimelineCard = ({ year, icon: Icon, title, skills }: TimelineItem) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-5 flex items-center gap-4">
            <div className="size-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Icon className="size-6 text-primary-foreground" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{year}</Badge>
                    <h4 className="font-semibold">{title}</h4>
                </div>
                <div className="flex flex-wrap gap-1">
                    {skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
)

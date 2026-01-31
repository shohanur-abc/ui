import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Briefcase, GraduationCap } from 'lucide-react'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mb-12 @md:mb-16">
                    <Eyebrow text="Experience" />
                    <Title text="My Career Journey" />
                    <Description text="A timeline of my professional growth and key milestones." />
                </div>

                <div className="grid @3xl:grid-cols-2 gap-12 @lg:gap-16 @3xl:gap-20">
                    <TimelineSection
                        icon={Briefcase}
                        title="Work Experience"
                        items={[
                            { period: '2022 - Present', title: 'Lead Engineer', company: 'TechCorp', description: 'Leading a team of 8 engineers building a next-gen analytics platform.' },
                            { period: '2019 - 2022', title: 'Senior Developer', company: 'StartupXYZ', description: 'Built core features and scaled the platform to 1M+ users.' },
                            { period: '2017 - 2019', title: 'Frontend Developer', company: 'AgencyPro', description: 'Developed websites and web apps for 30+ clients across industries.' },
                            { period: '2015 - 2017', title: 'Junior Developer', company: 'WebStudio', description: 'Started my career building WordPress sites and learning the ropes.' },
                        ]}
                    />

                    <TimelineSection
                        icon={GraduationCap}
                        title="Education"
                        items={[
                            { period: '2013 - 2015', title: 'M.S. Computer Science', company: 'MIT', description: 'Focus on distributed systems and machine learning.' },
                            { period: '2009 - 2013', title: 'B.S. Computer Science', company: 'UC Berkeley', description: 'Minor in Design. Dean\'s List all semesters.' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="flex items-center gap-2 mb-3 @md:mb-4" variant="outline">
        {Icon && <Icon className="size-4" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface TimelineItem {
    period: string
    title: string
    company: string
    description: string
}

interface TimelineSectionProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    items: TimelineItem[]
}

const TimelineSection = ({ icon: Icon, title, items }: TimelineSectionProps) => (
    <div>
        <div className="flex items-center gap-3 mb-8">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="size-5 text-primary" />
            </div>
            <h3 className="text-xl @md:text-2xl font-bold">{title}</h3>
        </div>

        <div className="space-y-0">
            {items.map(({ period, title: itemTitle, company, description }, i) => (
                <div key={i}>
                    {i > 0 && <Separator className="my-6" />}
                    <div className="relative pl-6 border-l-2 border-border">
                        <div className="absolute left-0 top-0 -translate-x-1/2 size-3 rounded-full bg-primary" />
                        <span className="text-xs @md:text-sm text-muted-foreground font-mono">{period}</span>
                        <h4 className="text-base @md:text-lg font-semibold mt-1">{itemTitle}</h4>
                        <p className="text-sm text-primary mb-2">{company}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

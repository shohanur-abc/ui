import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, Calendar } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Briefcase} text="Work History" />
                    <Title text="Professional Experience" />
                    <Description text="A comprehensive overview of my career path and achievements." />
                </div>

                <Timeline
                    items={[
                        { year: '2023', title: 'Senior Software Engineer', company: 'Meta', location: 'Menlo Park, CA', description: 'Leading frontend architecture for Instagram Stories.', tags: ['React', 'GraphQL', 'TypeScript'] },
                        { year: '2021', title: 'Software Engineer II', company: 'Stripe', location: 'San Francisco, CA', description: 'Built payment processing dashboards for enterprise clients.', tags: ['React', 'Ruby', 'PostgreSQL'] },
                        { year: '2019', title: 'Frontend Developer', company: 'Airbnb', location: 'San Francisco, CA', description: 'Developed booking flow and search experience.', tags: ['React', 'Node.js', 'Redis'] },
                        { year: '2017', title: 'Junior Developer', company: 'Startup Inc', location: 'New York, NY', description: 'Full-stack development for SaaS platform.', tags: ['Vue.js', 'Python', 'MongoDB'] },
                    ]}
                />
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

interface TimelineItem {
    year: string
    title: string
    company: string
    location: string
    description: string
    tags: string[]
}

const Timeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden @lg:block" />
        <div className="space-y-8 @lg:space-y-12">
            {items.map(({ year, title, company, location, description, tags }, i) => (
                <div key={i} className={`@lg:flex @lg:gap-8 ${i % 2 === 0 ? '@lg:flex-row' : '@lg:flex-row-reverse'}`}>
                    <div className="@lg:w-1/2 @lg:text-right mb-4 @lg:mb-0">
                        <div className={`inline-flex items-center gap-2 text-sm text-muted-foreground ${i % 2 === 0 ? '@lg:justify-end' : '@lg:justify-start'}`}>
                            <Calendar className="size-4" />
                            <span className="font-mono">{year}</span>
                        </div>
                    </div>
                    <div className="hidden @lg:flex items-start justify-center relative z-10">
                        <div className="size-4 rounded-full bg-primary ring-4 ring-background" />
                    </div>
                    <div className="@lg:w-1/2">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="text-sm text-primary mb-1">{company}</p>
                                <p className="text-xs text-muted-foreground mb-3">{location}</p>
                                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {tags.map((tag, j) => (
                                        <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

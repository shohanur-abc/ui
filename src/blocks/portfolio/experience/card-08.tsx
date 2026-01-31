import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Mic, Calendar, MapPin, Users } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Mic} text="Speaking" />
                    <Title text="Conference Talks" />
                    <Description text="Sharing knowledge and experience at industry events." />
                </div>

                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
                    <TalkCard
                        title="Scaling Design Systems"
                        event="React Summit 2024"
                        date="Jun 2024"
                        location="Amsterdam"
                        attendees={2500}
                        topics={['Design Systems', 'React', 'Scale']}
                    />
                    <TalkCard
                        title="Performance at Scale"
                        event="Google I/O 2023"
                        date="May 2023"
                        location="Mountain View"
                        attendees={5000}
                        topics={['Performance', 'Web Vitals', 'Optimization']}
                    />
                    <TalkCard
                        title="Building with TypeScript"
                        event="TSConf 2023"
                        date="Mar 2023"
                        location="Seattle"
                        attendees={1500}
                        topics={['TypeScript', 'Best Practices', 'Tooling']}
                    />
                    <TalkCard
                        title="Team Leadership"
                        event="LeadDev 2022"
                        date="Nov 2022"
                        location="Berlin"
                        attendees={1800}
                        topics={['Leadership', 'Management', 'Culture']}
                    />
                    <TalkCard
                        title="Modern Frontend Architecture"
                        event="JSConf EU 2022"
                        date="Jun 2022"
                        location="Berlin"
                        attendees={2000}
                        topics={['Architecture', 'Micro-frontends', 'DX']}
                    />
                    <TalkCard
                        title="GraphQL Best Practices"
                        event="GraphQL Summit 2021"
                        date="Oct 2021"
                        location="Virtual"
                        attendees={3000}
                        topics={['GraphQL', 'API Design', 'Caching']}
                    />
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

interface TalkCardProps {
    title: string
    event: string
    date: string
    location: string
    attendees: number
    topics: string[]
}

const TalkCard = ({ title, event, date, location, attendees, topics }: TalkCardProps) => (
    <Card className="group hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Mic className="size-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-primary mb-3">{event}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar className="size-3" />{date}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
                <span className="flex items-center gap-1"><Users className="size-3" />{attendees.toLocaleString()}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {topics.map((topic, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{topic}</Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

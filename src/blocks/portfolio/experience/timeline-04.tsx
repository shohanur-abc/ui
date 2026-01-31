import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Briefcase} text="Career Path" />
                    <Title text="My Journey So Far" />
                    <Description text="From junior developer to leading engineering teams at scale." />
                </div>

                <HorizontalTimeline
                    items={[
                        { year: '2016', role: 'Intern', company: 'Local Agency', duration: '3 months' },
                        { year: '2017', role: 'Junior Dev', company: 'Startup', duration: '1 year' },
                        { year: '2018', role: 'Developer', company: 'Tech Corp', duration: '2 years' },
                        { year: '2020', role: 'Senior Dev', company: 'Scale Up', duration: '2 years' },
                        { year: '2022', role: 'Lead Engineer', company: 'Enterprise', duration: 'Present' },
                    ]}
                />

                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 mt-12 @md:mt-16">
                    <DetailCard
                        title="Enterprise Inc"
                        role="Lead Engineer"
                        period="2022 - Present"
                        location="Remote"
                        highlights={['Led team of 12 engineers', 'Reduced deploy time by 60%', 'Implemented microservices']}
                    />
                    <DetailCard
                        title="Scale Up Co"
                        role="Senior Developer"
                        period="2020 - 2022"
                        location="New York, NY"
                        highlights={['Built real-time dashboard', 'Mentored 5 junior devs', 'Led frontend migration']}
                    />
                    <DetailCard
                        title="Tech Corp"
                        role="Software Developer"
                        period="2018 - 2020"
                        location="Boston, MA"
                        highlights={['Developed core product', 'Improved test coverage', 'Cross-team collaboration']}
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

interface TimelineStep {
    year: string
    role: string
    company: string
    duration: string
}

const HorizontalTimeline = ({ items }: { items: TimelineStep[] }) => (
    <div className="relative overflow-x-auto pb-4">
        <div className="flex items-center min-w-max">
            {items.map(({ year, role, company }, i) => (
                <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div className="size-10 @md:size-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <span className="text-xs @md:text-sm font-bold text-primary">{year}</span>
                        </div>
                        <div className="text-center px-4">
                            <p className="text-sm font-medium">{role}</p>
                            <p className="text-xs text-muted-foreground">{company}</p>
                        </div>
                    </div>
                    {i < items.length - 1 && (
                        <div className="w-16 @md:w-24 h-0.5 bg-border mx-2" />
                    )}
                </div>
            ))}
        </div>
    </div>
)

interface DetailCardProps {
    title: string
    role: string
    period: string
    location: string
    highlights: string[]
}

const DetailCard = ({ title, role, period, location, highlights }: DetailCardProps) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-primary">{role}</p>
        </CardHeader>
        <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="size-3" />{period}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
            </div>
            <ul className="space-y-1.5">
                {highlights.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
)

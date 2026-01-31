import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, DollarSign, Users } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Availability" />
                    <Title text="Current Status" />
                    <Description text="Here's my current availability and preferred project types." />
                </div>

                <AvailabilityInfo
                    status={{
                        available: true,
                        message: 'Open for new projects starting March 2024',
                    }}
                    preferences={[
                        { icon: Clock, label: 'Commitment', value: 'Full-time or Part-time' },
                        { icon: DollarSign, label: 'Budget Range', value: '$5,000 - $50,000+' },
                        { icon: Users, label: 'Team Size', value: 'Solo or with your team' },
                    ]}
                    projectTypes={[
                        { name: 'Web Applications', available: true },
                        { name: 'Mobile Apps (React Native)', available: true },
                        { name: 'API Development', available: true },
                        { name: 'UI/UX Design', available: true },
                        { name: 'Technical Consulting', available: true },
                        { name: 'WordPress Development', available: false },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface StatusInfo {
    available: boolean
    message: string
}

interface PreferenceItem {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
}

interface ProjectType {
    name: string
    available: boolean
}

interface AvailabilityInfoProps {
    status: StatusInfo
    preferences: PreferenceItem[]
    projectTypes: ProjectType[]
}

const AvailabilityInfo = ({ status, preferences, projectTypes }: AvailabilityInfoProps) => (
    <div className="grid @md:grid-cols-2 gap-6 @md:gap-8 max-w-4xl mx-auto">
        <div>
            <Card className="py-0 mb-4 @md:mb-6 border-primary/30 bg-primary/5">
                <CardContent className="p-4 @md:p-6 flex items-center gap-4">
                    <div className={`size-4 rounded-full ${status.available ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                    <div>
                        <div className="font-semibold">
                            {status.available ? 'Available for Work' : 'Currently Unavailable'}
                        </div>
                        <div className="text-sm text-muted-foreground">{status.message}</div>
                    </div>
                </CardContent>
            </Card>

            <h3 className="font-bold text-lg mb-4">Preferences</h3>
            <div className="space-y-3">
                {preferences.map(({ icon: Icon, label, value }, i) => (
                    <Card key={i} className="py-0">
                        <CardContent className="p-3 @md:p-4 flex items-center gap-3">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="size-4 text-primary" />
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">{label}</div>
                                <div className="font-medium text-sm">{value}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div>
            <h3 className="font-bold text-lg mb-4">Project Types</h3>
            <Card className="py-0">
                <CardContent className="p-4 @md:p-6">
                    <div className="space-y-3">
                        {projectTypes.map(({ name, available }, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Checkbox checked={available} disabled className="data-[state=checked]:bg-primary" />
                                <span className={`text-sm ${available ? '' : 'text-muted-foreground line-through'}`}>
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
)

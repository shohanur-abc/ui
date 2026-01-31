import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Detailed View"
                    title="Skill Breakdown"
                    subtitle="Comprehensive skill analysis with sub-skills"
                />

                <DetailedSkills
                    domains={[
                        {
                            name: 'Frontend Development',
                            overall: 95,
                            subSkills: [
                                { name: 'React Patterns', level: 95 },
                                { name: 'State Management', level: 92 },
                                { name: 'Performance', level: 90 },
                                { name: 'Accessibility', level: 85 },
                            ],
                        },
                        {
                            name: 'Backend Development',
                            overall: 88,
                            subSkills: [
                                { name: 'API Design', level: 90 },
                                { name: 'Authentication', level: 88 },
                                { name: 'Database Integration', level: 85 },
                                { name: 'Caching', level: 82 },
                            ],
                        },
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

interface SubSkill {
    name: string
    level: number
}

interface Domain {
    name: string
    overall: number
    subSkills: SubSkill[]
}

const DetailedSkills = ({ domains }: { domains: Domain[] }) => (
    <div className="grid @lg:grid-cols-2 gap-6 @md:gap-8 max-w-5xl mx-auto">
        {domains.map((domain, i) => (
            <DomainCard key={i} {...domain} />
        ))}
    </div>
)

const DomainCard = ({ name, overall, subSkills }: Domain) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-6 @md:p-8">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-xl">{name}</h3>
                <Badge className="text-lg font-bold">{overall}%</Badge>
            </div>
            <Progress value={overall} className="h-3 mb-6" />

            <Separator className="my-6" />

            <h4 className="text-sm font-medium text-muted-foreground mb-4">Sub-skills</h4>
            <div className="space-y-4">
                {subSkills.map(({ name, level }, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span>{name}</span>
                            <span className="font-medium">{level}%</span>
                        </div>
                        <Progress value={level} className="h-1.5" />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

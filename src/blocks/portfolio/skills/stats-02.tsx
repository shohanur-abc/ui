import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Skill Stats"
                    title="By the Numbers"
                    subtitle="Quantified technical expertise"
                />

                <StatsGrid
                    stats={[
                        { value: '8+', label: 'Years Coding', description: 'Professional experience' },
                        { value: '15+', label: 'Technologies', description: 'Actively used' },
                        { value: '50+', label: 'Projects', description: 'Completed successfully' },
                        { value: '10k+', label: 'Commits', description: 'Code contributions' },
                    ]}
                    topSkills={[
                        { name: 'React', level: 95 },
                        { name: 'TypeScript', level: 95 },
                        { name: 'Next.js', level: 92 },
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

interface Stat {
    value: string
    label: string
    description: string
}

interface Skill {
    name: string
    level: number
}

interface StatsGridProps {
    stats: Stat[]
    topSkills: Skill[]
}

const StatsGrid = ({ stats, topSkills }: StatsGridProps) => (
    <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
            ))}
        </div>
        <Card>
            <CardContent className="p-6 @md:p-8">
                <h3 className="font-bold text-lg mb-6">Top Skills</h3>
                <div className="space-y-5">
                    {topSkills.map(({ name, level }, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">{name}</span>
                                <span className="font-bold text-primary">{level}%</span>
                            </div>
                            <Progress value={level} className="h-3" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
)

const StatCard = ({ value, label, description }: Stat) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-5 text-center">
            <span className="text-3xl @md:text-4xl font-bold text-primary">{value}</span>
            <h4 className="font-semibold mt-1">{label}</h4>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
    </Card>
)

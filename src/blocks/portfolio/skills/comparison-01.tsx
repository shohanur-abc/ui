import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Comparison"
                    title="Before & After"
                    subtitle="How my skills have evolved over time"
                />

                <ComparisonGrid
                    comparisons={[
                        { skill: 'React', before: 40, after: 95, years: '2018 → 2024' },
                        { skill: 'TypeScript', before: 0, after: 95, years: '2019 → 2024' },
                        { skill: 'Node.js', before: 30, after: 88, years: '2018 → 2024' },
                        { skill: 'Cloud/DevOps', before: 10, after: 82, years: '2020 → 2024' },
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

interface Comparison {
    skill: string
    before: number
    after: number
    years: string
}

const ComparisonGrid = ({ comparisons }: { comparisons: Comparison[] }) => (
    <div className="grid @sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {comparisons.map((comparison, i) => (
            <ComparisonCard key={i} {...comparison} />
        ))}
    </div>
)

const ComparisonCard = ({ skill, before, after, years }: Comparison) => {
    const improvement = after - before

    return (
        <Card className="group hover:border-primary/50 transition-all">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">{skill}</h4>
                    <Badge variant="outline" className="text-xs">{years}</Badge>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-muted-foreground">{before}%</div>
                        <div className="text-xs text-muted-foreground">Before</div>
                    </div>
                    <div className="text-primary font-bold">→</div>
                    <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-primary">{after}%</div>
                        <div className="text-xs text-muted-foreground">After</div>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        +{improvement}% growth
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}

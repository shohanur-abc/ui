import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <IntroSection
                    badge="Proficiency Matrix"
                    title="Skill Assessment"
                    subtitle="Transparent evaluation of my technical abilities"
                />

                <ComparisonBars
                    comparisons={[
                        { category: 'Languages', items: [{ name: 'TypeScript', level: 95 }, { name: 'Python', level: 82 }, { name: 'Go', level: 70 }] },
                        { category: 'Frameworks', items: [{ name: 'React', level: 95 }, { name: 'Next.js', level: 92 }, { name: 'Vue', level: 75 }] },
                        { category: 'Databases', items: [{ name: 'PostgreSQL', level: 88 }, { name: 'MongoDB', level: 82 }, { name: 'Redis', level: 78 }] },
                        { category: 'Cloud', items: [{ name: 'AWS', level: 82 }, { name: 'Vercel', level: 90 }, { name: 'GCP', level: 65 }] },
                    ]}
                />
            </div>
        </section>
    )
}

interface IntroSectionProps {
    badge: string
    title: string
    subtitle: string
}

const IntroSection = ({ badge, title, subtitle }: IntroSectionProps) => (
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

interface SkillItem {
    name: string
    level: number
}

interface Comparison {
    category: string
    items: SkillItem[]
}

const ComparisonBars = ({ comparisons }: { comparisons: Comparison[] }) => (
    <div className="grid @md:grid-cols-2 gap-6 @md:gap-8 max-w-5xl mx-auto">
        {comparisons.map((comparison, i) => (
            <ComparisonCard key={i} {...comparison} />
        ))}
    </div>
)

const ComparisonCard = ({ category, items }: Comparison) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 @md:p-6">
            <h3 className="font-bold mb-5">{category}</h3>
            <div className="space-y-4">
                {items.map(({ name, level }, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <span className="w-24 text-sm font-medium shrink-0">{name}</span>
                        <div className="flex-1">
                            <Progress value={level} className="h-3" />
                        </div>
                        <span className="text-sm font-bold text-primary w-12 text-right">{level}%</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

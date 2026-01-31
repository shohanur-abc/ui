import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    eyebrow="Skill Bars"
                    title="Horizontal Progress"
                    description="Clean visualization of technical abilities"
                />

                <HorizontalBars
                    categories={[
                        { name: 'Frontend Development', level: 95, color: 'bg-blue-500' },
                        { name: 'Backend Development', level: 88, color: 'bg-green-500' },
                        { name: 'Database & Storage', level: 85, color: 'bg-purple-500' },
                        { name: 'Cloud & Infrastructure', level: 82, color: 'bg-orange-500' },
                        { name: 'DevOps & CI/CD', level: 80, color: 'bg-cyan-500' },
                        { name: 'UI/UX Design', level: 75, color: 'bg-pink-500' },
                        { name: 'Mobile Development', level: 70, color: 'bg-yellow-500' },
                        { name: 'AI/ML Integration', level: 55, color: 'bg-red-500' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    eyebrow: string
    title: string
    description: string
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {description}
        </p>
    </div>
)

interface SkillCategory {
    name: string
    level: number
    color: string
}

const HorizontalBars = ({ categories }: { categories: SkillCategory[] }) => (
    <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6 @md:p-8">
            <div className="space-y-6">
                {categories.map((category, i) => (
                    <HorizontalBar key={i} {...category} />
                ))}
            </div>
        </CardContent>
    </Card>
)

const HorizontalBar = ({ name, level, color }: SkillCategory) => (
    <div className="group">
        <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{name}</span>
            <Badge variant="secondary">{level}%</Badge>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
                className={`h-full ${color} rounded-full transition-all duration-500 group-hover:opacity-80`}
                style={{ width: `${level}%` }}
            />
        </div>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Expertise Levels"
                    title="Vertical Progress"
                    subtitle="Skills displayed with vertical bars"
                />

                <VerticalBars
                    skills={[
                        { name: 'React', level: 95 },
                        { name: 'TypeScript', level: 92 },
                        { name: 'Next.js', level: 90 },
                        { name: 'Node.js', level: 88 },
                        { name: 'PostgreSQL', level: 85 },
                        { name: 'AWS', level: 82 },
                        { name: 'Docker', level: 80 },
                        { name: 'Python', level: 78 },
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

interface Skill {
    name: string
    level: number
}

const VerticalBars = ({ skills }: { skills: Skill[] }) => (
    <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 @md:p-8">
            <div className="flex items-end justify-between gap-4 @md:gap-6 h-64">
                {skills.map((skill, i) => (
                    <VerticalBar key={i} {...skill} />
                ))}
            </div>
        </CardContent>
    </Card>
)

const VerticalBar = ({ name, level }: Skill) => (
    <div className="flex-1 flex flex-col items-center gap-2 h-full group">
        <span className="text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">{level}%</span>
        <div className="flex-1 w-full bg-muted rounded-t-md relative overflow-hidden">
            <div
                className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md transition-all duration-500 group-hover:bg-primary/80"
                style={{ height: `${level}%` }}
            />
        </div>
        <span className="text-xs font-medium text-center [writing-mode:vertical-lr] rotate-180 h-20">{name}</span>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Skills Radar"
                    title="Multi-Dimensional"
                    subtitle="A holistic view of technical capabilities"
                />

                <RadarGrid
                    skills={[
                        { name: 'Frontend', level: 95, description: 'React, Next.js, TypeScript' },
                        { name: 'Backend', level: 88, description: 'Node.js, Python, APIs' },
                        { name: 'Database', level: 85, description: 'SQL, NoSQL, Caching' },
                        { name: 'DevOps', level: 80, description: 'Docker, AWS, CI/CD' },
                        { name: 'Design', level: 75, description: 'UI/UX, Figma, Systems' },
                        { name: 'Leadership', level: 85, description: 'Mentoring, Architecture' },
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

interface SkillItem {
    name: string
    level: number
    description: string
}

const RadarGrid = ({ skills }: { skills: SkillItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6 max-w-4xl mx-auto">
        {skills.map((skill, i) => (
            <RadarCard key={i} {...skill} />
        ))}
    </div>
)

const RadarCard = ({ name, level, description }: SkillItem) => {
    const radius = 36
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (level / 100) * circumference

    return (
        <Card className="group hover:border-primary/50 transition-all">
            <CardContent className="p-5 @md:p-6 flex items-center gap-4">
                <div className="relative size-20 shrink-0">
                    <svg className="size-full -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="none"
                            strokeWidth="5"
                            className="stroke-muted"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="none"
                            strokeWidth="5"
                            className="stroke-primary"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{level}%</span>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-1">{name}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

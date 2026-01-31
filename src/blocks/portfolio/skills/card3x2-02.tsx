import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Binary, Braces, Cloud, Database, Globe, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    badge="Skill Levels"
                    title="Expertise Breakdown"
                    description="Detailed view of my technical proficiency"
                />

                <SkillGrid3x2
                    skills={[
                        { icon: Braces, name: 'Frontend', level: 95, description: 'React, Next.js, TypeScript' },
                        { icon: Server, name: 'Backend', level: 88, description: 'Node.js, Python, Go' },
                        { icon: Database, name: 'Databases', level: 85, description: 'PostgreSQL, MongoDB' },
                        { icon: Cloud, name: 'Cloud', level: 82, description: 'AWS, Docker, K8s' },
                        { icon: Globe, name: 'APIs', level: 90, description: 'REST, GraphQL, tRPC' },
                        { icon: Binary, name: 'Algorithms', level: 80, description: 'DS & Algorithms' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    badge: string
    title: string
    description: string
}

const TitleSection = ({ badge, title, description }: TitleSectionProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {description}
        </p>
    </div>
)

interface SkillItem {
    icon: ComponentType<{ className?: string }>
    name: string
    level: number
    description: string
}

const SkillGrid3x2 = ({ skills }: { skills: SkillItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6 max-w-5xl mx-auto">
        {skills.map((skill, i) => (
            <SkillProgressCard key={i} {...skill} />
        ))}
    </div>
)

const SkillProgressCard = ({ icon: Icon, name, level, description }: SkillItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="font-bold text-primary">{level}%</span>
                </div>
                <Progress value={level} className="h-2.5" />
            </div>
        </CardContent>
    </Card>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Code2, Database, Globe, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Wide Cards"
                    title="Horizontal Skills"
                    subtitle="Skills displayed in wide card format"
                />

                <WideCards
                    skills={[
                        { icon: Code2, title: 'Frontend Development', description: 'Building modern, responsive web interfaces', level: 95, techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                        { icon: Server, title: 'Backend Development', description: 'Creating scalable server-side applications', level: 88, techs: ['Node.js', 'Python', 'GraphQL', 'REST APIs'] },
                        { icon: Database, title: 'Database Design', description: 'Efficient data modeling and optimization', level: 85, techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
                        { icon: Globe, title: 'Cloud & DevOps', description: 'Infrastructure and deployment automation', level: 82, techs: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
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
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    level: number
    techs: string[]
}

const WideCards = ({ skills }: { skills: Skill[] }) => (
    <div className="max-w-4xl mx-auto space-y-4">
        {skills.map((skill, i) => (
            <WideCard key={i} {...skill} />
        ))}
    </div>
)

const WideCard = ({ icon: Icon, title, description, level, techs }: Skill) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-5 @md:p-6">
            <div className="flex flex-col @md:flex-row @md:items-center gap-4 @md:gap-6">
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-7 text-primary" />
                </div>

                <div className="flex-1">
                    <div className="flex flex-col @sm:flex-row @sm:items-center @sm:justify-between gap-2 mb-2">
                        <h4 className="font-bold text-lg">{title}</h4>
                        <span className="text-lg font-bold text-primary">{level}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{description}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {techs.map((tech, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                        ))}
                    </div>
                </div>

                <div className="hidden @lg:block w-32">
                    <Progress value={level} className="h-2" />
                </div>
            </div>
        </CardContent>
    </Card>
)

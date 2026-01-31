import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Braces, Cloud, Database, Layers, Server, Smartphone } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionTitle
                    badge="Technical Stack"
                    title="Skills Overview"
                    subtitle="My core competencies at a glance"
                />

                <StackedSkills
                    skills={[
                        {
                            icon: Braces,
                            title: 'Frontend Development',
                            level: 95,
                            description: 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion',
                            highlight: true,
                        },
                        {
                            icon: Server,
                            title: 'Backend Development',
                            level: 88,
                            description: 'Node.js, Python, Go, GraphQL, REST APIs',
                            highlight: false,
                        },
                        {
                            icon: Database,
                            title: 'Database & Storage',
                            level: 85,
                            description: 'PostgreSQL, MongoDB, Redis, Elasticsearch, Prisma',
                            highlight: false,
                        },
                        {
                            icon: Cloud,
                            title: 'Cloud & Infrastructure',
                            level: 82,
                            description: 'AWS, Docker, Kubernetes, Terraform, Serverless',
                            highlight: false,
                        },
                        {
                            icon: Layers,
                            title: 'System Architecture',
                            level: 80,
                            description: 'Microservices, Event-driven, Domain-driven design',
                            highlight: false,
                        },
                        {
                            icon: Smartphone,
                            title: 'Mobile Development',
                            level: 72,
                            description: 'React Native, Expo, Flutter basics',
                            highlight: false,
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface SectionTitleProps {
    badge: string
    title: string
    subtitle: string
}

const SectionTitle = ({ badge, title, subtitle }: SectionTitleProps) => (
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
    icon: ComponentType<{ className?: string }>
    title: string
    level: number
    description: string
    highlight: boolean
}

const StackedSkills = ({ skills }: { skills: SkillItem[] }) => (
    <div className="max-w-3xl mx-auto space-y-4">
        {skills.map((skill, i) => (
            <StackedSkillCard key={i} {...skill} index={i} />
        ))}
    </div>
)

interface StackedSkillCardProps extends SkillItem {
    index: number
}

const StackedSkillCard = ({ icon: Icon, title, level, description, highlight, index }: StackedSkillCardProps) => (
    <Card 
        className={`group hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${highlight ? 'border-primary/30 bg-primary/5' : ''}`}
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-start gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                    <Icon className={`size-6 ${highlight ? '' : 'text-primary'}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{title}</h3>
                        <span className="text-lg font-bold text-primary">{level}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{description}</p>
                    <Progress value={level} className="h-2" />
                </div>
            </div>
        </CardContent>
    </Card>
)

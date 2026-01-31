import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Braces, Cloud, Database, Globe, Layers, Palette, Server, Shield } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="4x2 Layout"
                    title="Progress Grid"
                    subtitle="Skill levels with progress indicators"
                />

                <ProgressGrid
                    skills={[
                        { icon: Braces, title: 'TypeScript', level: 95 },
                        { icon: Globe, title: 'React', level: 95 },
                        { icon: Layers, title: 'Next.js', level: 92 },
                        { icon: Server, title: 'Node.js', level: 88 },
                        { icon: Database, title: 'PostgreSQL', level: 85 },
                        { icon: Cloud, title: 'AWS', level: 82 },
                        { icon: Shield, title: 'Security', level: 78 },
                        { icon: Palette, title: 'UI/UX', level: 75 },
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
    level: number
}

const ProgressGrid = ({ skills }: { skills: Skill[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 @md:gap-6 max-w-5xl mx-auto">
        {skills.map((skill, i) => (
            <ProgressCard key={i} {...skill} />
        ))}
    </div>
)

const ProgressCard = ({ icon: Icon, title, level }: Skill) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-4 @md:p-5 text-center">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-1">{title}</h4>
            <span className="text-lg font-bold text-primary">{level}%</span>
            <Progress value={level} className="h-1.5 mt-3" />
        </CardContent>
    </Card>
)

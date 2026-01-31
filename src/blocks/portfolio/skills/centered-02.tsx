import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Code2, Database, Layers, Palette, Server, Smartphone } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    badge="Technical Proficiency"
                    title="Skills That Deliver Results"
                    description="Measured expertise across the full development stack"
                />

                <SkillBarsGrid
                    skills={[
                        { icon: Code2, name: 'Frontend Development', level: 95, details: 'React, Next.js, TypeScript, Tailwind' },
                        { icon: Server, name: 'Backend Development', level: 88, details: 'Node.js, Python, Go, APIs' },
                        { icon: Database, name: 'Database & Storage', level: 85, details: 'PostgreSQL, MongoDB, Redis' },
                        { icon: Layers, name: 'DevOps & Cloud', level: 82, details: 'AWS, Docker, Kubernetes' },
                        { icon: Smartphone, name: 'Mobile Development', level: 75, details: 'React Native, Flutter' },
                        { icon: Palette, name: 'UI/UX Design', level: 78, details: 'Figma, Design Systems' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    badge: string
    title: string
    description: string
}

const Header = ({ badge, title, description }: HeaderProps) => (
    <div className="text-center mb-12 @md:mb-16 @xl:mb-20">
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
    details: string
}

const SkillBarsGrid = ({ skills }: { skills: SkillItem[] }) => (
    <div className="max-w-4xl mx-auto space-y-6 @md:space-y-8">
        {skills.map((skill, i) => (
            <SkillBar key={i} {...skill} />
        ))}
    </div>
)

const SkillBar = ({ icon: Icon, name, level, details }: SkillItem) => (
    <div className="group">
        <div className="flex items-center gap-4 mb-3">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                <Icon className="size-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{name}</h3>
                    <span className="text-lg font-bold text-primary">{level}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{details}</p>
            </div>
        </div>
        <Progress value={level} className="h-3 ml-16" />
    </div>
)

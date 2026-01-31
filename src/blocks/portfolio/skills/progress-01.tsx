import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Braces, Cloud, Database, Layout, Server, Smartphone } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Skill Levels"
                    title="Technical Proficiency"
                    subtitle="Honest assessment of my capabilities"
                />

                <ProgressBars
                    skills={[
                        { icon: Braces, name: 'Frontend Development', level: 95, color: 'bg-blue-500' },
                        { icon: Server, name: 'Backend Development', level: 88, color: 'bg-green-500' },
                        { icon: Database, name: 'Database Design', level: 85, color: 'bg-purple-500' },
                        { icon: Cloud, name: 'Cloud & DevOps', level: 82, color: 'bg-orange-500' },
                        { icon: Layout, name: 'UI/UX Design', level: 78, color: 'bg-pink-500' },
                        { icon: Smartphone, name: 'Mobile Development', level: 72, color: 'bg-cyan-500' },
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
    icon: ComponentType<{ className?: string }>
    name: string
    level: number
    color: string
}

const ProgressBars = ({ skills }: { skills: SkillItem[] }) => (
    <div className="max-w-3xl mx-auto space-y-8">
        {skills.map((skill, i) => (
            <AnimatedProgressBar key={i} {...skill} />
        ))}
    </div>
)

const AnimatedProgressBar = ({ icon: Icon, name, level, color }: SkillItem) => (
    <div className="group">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className={`size-10 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
                    <Icon className={`size-5 ${color.replace('bg-', 'text-')}`} />
                </div>
                <span className="font-semibold">{name}</span>
            </div>
            <span className="text-lg font-bold">{level}%</span>
        </div>
        <div className="relative h-4 bg-muted rounded-full overflow-hidden">
            <div
                className={`absolute inset-y-0 left-0 ${color} rounded-full transition-all duration-700 ease-out group-hover:opacity-80`}
                style={{ width: `${level}%` }}
            />
        </div>
    </div>
)

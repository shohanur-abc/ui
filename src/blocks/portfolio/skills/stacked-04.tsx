import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Expertise Ladder"
                    title="Skill Progression"
                    subtitle="My journey from beginner to expert"
                />

                <SteppedSkills
                    steps={[
                        { title: 'Expert', color: 'bg-green-500', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'] },
                        { title: 'Advanced', color: 'bg-blue-500', skills: ['Python', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS'] },
                        { title: 'Intermediate', color: 'bg-yellow-500', skills: ['Go', 'Kubernetes', 'Redis', 'MongoDB', 'Figma'] },
                        { title: 'Learning', color: 'bg-orange-500', skills: ['Rust', 'AI/ML', 'WebAssembly', 'Blockchain'] },
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

interface SkillStep {
    title: string
    color: string
    skills: string[]
}

const SteppedSkills = ({ steps }: { steps: SkillStep[] }) => (
    <div className="max-w-4xl mx-auto">
        {steps.map((step, i) => (
            <StepRow key={i} {...step} index={i} total={steps.length} />
        ))}
    </div>
)

interface StepRowProps extends SkillStep {
    index: number
    total: number
}

const StepRow = ({ title, color, skills, index, total }: StepRowProps) => {
    const widthPercent = 100 - (index * (100 / total))

    return (
        <div
            className="relative"
            style={{ width: `${widthPercent}%`, marginLeft: 'auto', marginRight: 'auto' }}
        >
            <Card className="mb-4 group hover:border-primary/50 transition-all">
                <CardContent className="p-5 @md:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`size-4 rounded-full ${color}`} />
                        <h4 className="font-bold text-lg">{title}</h4>
                        <Badge variant="outline" className="ml-auto">{skills.length} skills</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-sm">
                                <CheckCircle2 className={`size-4 ${color.replace('bg-', 'text-')}`} />
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

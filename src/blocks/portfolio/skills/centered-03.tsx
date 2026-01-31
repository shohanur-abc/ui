import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Atom, Binary, Cloud, Cpu, Database, Globe, Layers, Terminal, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Core Competencies"
                    title="Technology Expertise"
                    subtitle="A comprehensive skillset built over years of hands-on experience"
                />

                <SkillsOrbit
                    center={{ icon: Atom, label: 'Full Stack' }}
                    innerRing={[
                        { icon: Globe, label: 'Frontend', color: 'bg-blue-500' },
                        { icon: Terminal, label: 'Backend', color: 'bg-green-500' },
                        { icon: Database, label: 'Data', color: 'bg-purple-500' },
                    ]}
                    outerRing={[
                        { icon: Cloud, label: 'Cloud', color: 'bg-orange-500' },
                        { icon: Cpu, label: 'DevOps', color: 'bg-red-500' },
                        { icon: Layers, label: 'Architecture', color: 'bg-cyan-500' },
                        { icon: Binary, label: 'Algorithms', color: 'bg-pink-500' },
                        { icon: Zap, label: 'Performance', color: 'bg-yellow-500' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleBlockProps {
    eyebrow: string
    title: string
    subtitle: string
}

const TitleBlock = ({ eyebrow, title, subtitle }: TitleBlockProps) => (
    <div className="text-center mb-12 @md:mb-16 @xl:mb-20">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface SkillNode {
    icon: ComponentType<{ className?: string }>
    label: string
    color?: string
}

interface SkillsOrbitProps {
    center: SkillNode
    innerRing: SkillNode[]
    outerRing: SkillNode[]
}

const SkillsOrbit = ({ center, innerRing, outerRing }: SkillsOrbitProps) => (
    <div className="flex flex-col items-center gap-8 @md:gap-12">
        <CenterNode {...center} />

        <div className="flex flex-wrap justify-center gap-4 @md:gap-6 max-w-2xl">
            {innerRing.map((node, i) => (
                <InnerRingNode key={i} {...node} />
            ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 @md:gap-4 max-w-4xl">
            {outerRing.map((node, i) => (
                <OuterRingNode key={i} {...node} />
            ))}
        </div>
    </div>
)

const CenterNode = ({ icon: Icon, label }: SkillNode) => (
    <Card className="border-primary/50 shadow-lg shadow-primary/10">
        <CardContent className="p-6 @md:p-8 text-center">
            <div className="size-16 @md:size-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                <Icon className="size-8 @md:size-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl @md:text-2xl font-bold">{label}</h3>
            <p className="text-sm text-muted-foreground mt-1">Developer</p>
        </CardContent>
    </Card>
)

const InnerRingNode = ({ icon: Icon, label, color }: SkillNode) => (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-5 @md:p-6 text-center">
            <div className={`size-12 @md:size-14 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`size-6 @md:size-7 ${color?.replace('bg-', 'text-')}`} />
            </div>
            <h4 className="font-semibold">{label}</h4>
        </CardContent>
    </Card>
)

const OuterRingNode = ({ icon: Icon, label, color }: SkillNode) => (
    <div className="group flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-default">
        <div className={`size-10 rounded-lg ${color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`size-5 ${color?.replace('bg-', 'text-')}`} />
        </div>
        <span className="text-sm font-medium">{label}</span>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Database, Globe, Layers, Palette, Server, Shield, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Core Competencies"
                    title="Radial Skills"
                    subtitle="My expertise radiating from the core"
                />

                <RadialSkillGrid
                    centerSkill={{ icon: Code2, title: 'Full Stack', description: 'Complete development' }}
                    orbitSkills={[
                        { icon: Globe, title: 'React', level: 95 },
                        { icon: Server, title: 'Node.js', level: 88 },
                        { icon: Database, title: 'PostgreSQL', level: 85 },
                        { icon: Layers, title: 'Next.js', level: 92 },
                        { icon: Palette, title: 'UI/UX', level: 80 },
                        { icon: Shield, title: 'Security', level: 78 },
                        { icon: Zap, title: 'Performance', level: 85 },
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

interface CenterSkill {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

interface OrbitSkill {
    icon: ComponentType<{ className?: string }>
    title: string
    level: number
}

interface RadialSkillGridProps {
    centerSkill: CenterSkill
    orbitSkills: OrbitSkill[]
}

const RadialSkillGrid = ({ centerSkill, orbitSkills }: RadialSkillGridProps) => (
    <div className="max-w-4xl mx-auto">
        <div className="hidden @lg:block relative aspect-square max-w-xl mx-auto">
            <CenterCard {...centerSkill} />
            <OrbitCards skills={orbitSkills} />
        </div>

        <div className="@lg:hidden">
            <Card className="mb-6 border-primary/50">
                <CardContent className="p-6 text-center">
                    <centerSkill.icon className="size-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold text-xl">{centerSkill.title}</h3>
                    <p className="text-sm text-muted-foreground">{centerSkill.description}</p>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 @sm:grid-cols-3 gap-4">
                {orbitSkills.map((skill, i) => (
                    <MobileSkillCard key={i} {...skill} />
                ))}
            </div>
        </div>
    </div>
)

const CenterCard = ({ icon: Icon, title, description }: CenterSkill) => (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Card className="border-primary/50 shadow-xl">
            <CardContent className="p-8 text-center">
                <Icon className="size-16 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </div>
)

const OrbitCards = ({ skills }: { skills: OrbitSkill[] }) => {
    const positions = [
        'top-0 left-1/2 -translate-x-1/2',
        'top-[15%] right-[5%]',
        'top-[50%] right-0 -translate-y-1/2',
        'bottom-[15%] right-[5%]',
        'bottom-0 left-1/2 -translate-x-1/2',
        'bottom-[15%] left-[5%]',
        'top-[50%] left-0 -translate-y-1/2',
    ]

    return (
        <>
            {skills.map((skill, i) => (
                <div key={i} className={`absolute ${positions[i % positions.length]}`}>
                    <OrbitCard {...skill} />
                </div>
            ))}
        </>
    )
}

const OrbitCard = ({ icon: Icon, title, level }: OrbitSkill) => (
    <Card className="group hover:border-primary/50 transition-all hover:scale-105">
        <CardContent className="p-4 text-center">
            <Icon className="size-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-sm">{title}</h4>
            <Badge variant="secondary" className="mt-1 text-xs">{level}%</Badge>
        </CardContent>
    </Card>
)

const MobileSkillCard = ({ icon: Icon, title, level }: OrbitSkill) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-4 text-center">
            <Icon className="size-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-sm">{title}</h4>
            <Badge variant="secondary" className="mt-2 text-xs">{level}%</Badge>
        </CardContent>
    </Card>
)

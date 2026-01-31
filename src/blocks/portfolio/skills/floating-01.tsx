import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Code2, Database, Globe, Layers, Palette, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Skills"
                    title="Floating Expertise"
                    subtitle="Hover to explore each skill domain"
                />

                <FloatingCards
                    skills={[
                        { icon: Code2, title: 'Frontend', description: 'React, Next.js, TypeScript', level: 'Expert' },
                        { icon: Server, title: 'Backend', description: 'Node.js, Python, Go', level: 'Advanced' },
                        { icon: Database, title: 'Database', description: 'PostgreSQL, MongoDB, Redis', level: 'Advanced' },
                        { icon: Layers, title: 'DevOps', description: 'Docker, AWS, CI/CD', level: 'Advanced' },
                        { icon: Palette, title: 'Design', description: 'Figma, UI/UX, Systems', level: 'Intermediate' },
                        { icon: Globe, title: 'Web', description: 'PWA, SEO, Performance', level: 'Expert' },
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
    title: string
    description: string
    level: string
}

const FloatingCards = ({ skills }: { skills: SkillItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6 max-w-5xl mx-auto">
        {skills.map((skill, i) => (
            <FloatingCard key={i} {...skill} index={i} />
        ))}
    </div>
)

interface FloatingCardProps extends SkillItem {
    index: number
}

const FloatingCard = ({ icon: Icon, title, description, level, index }: FloatingCardProps) => {
    const offsets = ['translate-y-0', '@md:-translate-y-4', '@md:translate-y-2', '@md:translate-y-4', '@md:-translate-y-2', 'translate-y-0']
    const offset = offsets[index % offsets.length]

    const levelColor = {
        Expert: 'bg-green-500/10 text-green-500 border-green-500/20',
        Advanced: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        Intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    }[level] || 'bg-muted text-muted-foreground'

    return (
        <Card className={`group hover:border-primary/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${offset}`}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-6 text-primary" />
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${levelColor}`}>
                    {level}
                </span>
            </CardContent>
        </Card>
    )
}

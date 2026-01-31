import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Flame, Snowflake, Sun, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Temperature"
                    title="Skill Heatmap"
                    description="How 'hot' are my skills right now"
                />

                <HeatmapGrid
                    skills={[
                        { name: 'React', temp: 'hot', level: 95 },
                        { name: 'Next.js', temp: 'hot', level: 92 },
                        { name: 'TypeScript', temp: 'hot', level: 95 },
                        { name: 'Tailwind', temp: 'hot', level: 95 },
                        { name: 'Node.js', temp: 'warm', level: 88 },
                        { name: 'PostgreSQL', temp: 'warm', level: 85 },
                        { name: 'GraphQL', temp: 'warm', level: 85 },
                        { name: 'Docker', temp: 'warm', level: 80 },
                        { name: 'AWS', temp: 'cool', level: 82 },
                        { name: 'Python', temp: 'cool', level: 78 },
                        { name: 'Go', temp: 'cold', level: 65 },
                        { name: 'Rust', temp: 'cold', level: 45 },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleBlockProps {
    eyebrow: string
    title: string
    description: string
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {description}
        </p>
    </div>
)

interface Skill {
    name: string
    temp: 'hot' | 'warm' | 'cool' | 'cold'
    level: number
}

const HeatmapGrid = ({ skills }: { skills: Skill[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {skills.map((skill, i) => (
            <HeatCell key={i} {...skill} />
        ))}
    </div>
)

const HeatCell = ({ name, temp, level }: Skill) => {
    const tempConfig = {
        hot: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-500', icon: Flame },
        warm: { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-500', icon: Sun },
        cool: { bg: 'bg-blue-400/20', border: 'border-blue-400/50', text: 'text-blue-400', icon: Zap },
        cold: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-500', icon: Snowflake },
    }[temp]

    const Icon = tempConfig.icon

    return (
        <Card className={`group hover:${tempConfig.border} transition-all ${tempConfig.bg}`}>
            <CardContent className="p-4 text-center">
                <Icon className={`size-6 ${tempConfig.text} mx-auto mb-2`} />
                <h4 className="font-semibold mb-1">{name}</h4>
                <Badge variant="outline" className={`text-xs ${tempConfig.text} border-current`}>
                    {level}%
                </Badge>
            </CardContent>
        </Card>
    )
}

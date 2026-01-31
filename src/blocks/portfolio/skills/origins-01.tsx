import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, GraduationCap, Heart, Sparkles } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    eyebrow="Skill Origins"
                    title="How I Learned"
                    subtitle="Where my skills come from"
                />

                <OriginGrid
                    origins={[
                        {
                            icon: Briefcase,
                            title: 'Work Experience',
                            description: 'Skills developed through professional projects',
                            skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
                            percentage: 50,
                        },
                        {
                            icon: GraduationCap,
                            title: 'Formal Education',
                            description: 'Foundation from academic studies',
                            skills: ['Algorithms', 'Data Structures', 'System Design'],
                            percentage: 20,
                        },
                        {
                            icon: Heart,
                            title: 'Side Projects',
                            description: 'Skills learned building personal projects',
                            skills: ['Next.js', 'Tailwind CSS', 'Prisma', 'Vercel'],
                            percentage: 20,
                        },
                        {
                            icon: Sparkles,
                            title: 'Self Learning',
                            description: 'Continuous learning through courses and docs',
                            skills: ['Rust', 'AI/ML', 'WebAssembly', 'Go'],
                            percentage: 10,
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    eyebrow: string
    title: string
    subtitle: string
}

const TitleSection = ({ eyebrow, title, subtitle }: TitleSectionProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface Origin {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    skills: string[]
    percentage: number
}

const OriginGrid = ({ origins }: { origins: Origin[] }) => (
    <div className="grid @sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {origins.map((origin, i) => (
            <OriginCard key={i} {...origin} />
        ))}
    </div>
)

const OriginCard = ({ icon: Icon, title, description, skills, percentage }: Origin) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-6 text-primary" />
                </div>
                <Badge className="text-lg font-bold">{percentage}%</Badge>
            </div>
            <h4 className="font-bold text-lg mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

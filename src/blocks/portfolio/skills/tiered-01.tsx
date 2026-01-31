import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Award, Briefcase, GraduationCap, Rocket, Star, Target } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Skill Levels"
                    title="Experience Tiers"
                    subtitle="Skills organized by proficiency level"
                />

                <TieredSkills
                    tiers={[
                        {
                            icon: Rocket,
                            level: 'Expert',
                            color: 'border-t-green-500',
                            skills: [
                                { name: 'React', years: 6 },
                                { name: 'TypeScript', years: 5 },
                                { name: 'Next.js', years: 4 },
                                { name: 'Tailwind CSS', years: 4 },
                            ],
                        },
                        {
                            icon: Star,
                            level: 'Advanced',
                            color: 'border-t-blue-500',
                            skills: [
                                { name: 'Node.js', years: 5 },
                                { name: 'PostgreSQL', years: 4 },
                                { name: 'GraphQL', years: 3 },
                                { name: 'Docker', years: 3 },
                            ],
                        },
                        {
                            icon: Target,
                            level: 'Intermediate',
                            color: 'border-t-yellow-500',
                            skills: [
                                { name: 'Python', years: 3 },
                                { name: 'AWS', years: 3 },
                                { name: 'MongoDB', years: 2 },
                                { name: 'Kubernetes', years: 2 },
                            ],
                        },
                        {
                            icon: GraduationCap,
                            level: 'Learning',
                            color: 'border-t-orange-500',
                            skills: [
                                { name: 'Rust', years: 1 },
                                { name: 'Go', years: 1 },
                                { name: 'AI/ML', years: 1 },
                            ],
                        },
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
    name: string
    years: number
}

interface Tier {
    icon: ComponentType<{ className?: string }>
    level: string
    color: string
    skills: SkillItem[]
}

const TieredSkills = ({ tiers }: { tiers: Tier[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {tiers.map((tier, i) => (
            <TierCard key={i} {...tier} />
        ))}
    </div>
)

const TierCard = ({ icon: Icon, level, color, skills }: Tier) => (
    <Card className={`group hover:border-primary/50 transition-all border-t-4 ${color}`}>
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                </div>
                <h4 className="font-bold">{level}</h4>
            </div>
            <div className="space-y-3">
                {skills.map(({ name, years }, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{name}</span>
                        <Badge variant="outline" className="text-xs">{years}y</Badge>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Award, Flame, Star, Target, Trophy, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Achievements"
                    title="Skill Badges"
                    subtitle="Earned through projects and experience"
                />

                <BadgeGrid
                    badges={[
                        { icon: Trophy, title: 'React Expert', description: '6+ years of React development', color: 'text-yellow-500' },
                        { icon: Star, title: 'TypeScript Pro', description: 'Type-safe code advocate', color: 'text-blue-500' },
                        { icon: Flame, title: 'Performance Guru', description: 'Core Web Vitals specialist', color: 'text-orange-500' },
                        { icon: Zap, title: 'Fast Learner', description: 'Quick to adopt new tech', color: 'text-purple-500' },
                        { icon: Target, title: 'Problem Solver', description: 'Complex challenges welcomed', color: 'text-green-500' },
                        { icon: Award, title: 'Team Player', description: 'Collaborative development', color: 'text-pink-500' },
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

interface BadgeItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

const BadgeGrid = ({ badges }: { badges: BadgeItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {badges.map((badge, i) => (
            <AchievementCard key={i} {...badge} />
        ))}
    </div>
)

const AchievementCard = ({ icon: Icon, title, description, color }: BadgeItem) => (
    <Card className="group hover:border-primary/50 transition-all text-center">
        <CardContent className="p-6">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon className={`size-8 ${color}`} />
            </div>
            <h4 className="font-bold text-lg mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

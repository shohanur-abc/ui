import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Code2, Coffee, Flame, GitBranch, Star, Target, Trophy, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleArea
                    badge="By The Numbers"
                    title="Skill Metrics"
                    subtitle="Quantifiable achievements and expertise levels"
                />

                <MetricsGrid
                    stats={[
                        { icon: Code2, value: '500K+', label: 'Lines of Code', sublabel: 'Written' },
                        { icon: GitBranch, value: '2,000+', label: 'Commits', sublabel: 'This Year' },
                        { icon: Coffee, value: '∞', label: 'Coffee Cups', sublabel: 'Consumed' },
                    ]}
                    achievements={[
                        { icon: Trophy, title: 'Top Contributor', description: 'Open source projects' },
                        { icon: Award, title: 'Certified Expert', description: 'AWS Solutions Architect' },
                        { icon: Star, title: '5-Star Rating', description: 'Client satisfaction' },
                    ]}
                    streaks={[
                        { icon: Flame, value: '365', label: 'Day Coding Streak' },
                        { icon: Target, value: '100%', label: 'Project Success Rate' },
                        { icon: Zap, value: '< 1hr', label: 'Avg Response Time' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleAreaProps {
    badge: string
    title: string
    subtitle: string
}

const TitleArea = ({ badge, title, subtitle }: TitleAreaProps) => (
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

interface StatItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
    sublabel: string
}

interface AchievementItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

interface StreakItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

interface MetricsGridProps {
    stats: StatItem[]
    achievements: AchievementItem[]
    streaks: StreakItem[]
}

const MetricsGrid = ({ stats, achievements, streaks }: MetricsGridProps) => (
    <div className="space-y-6 @md:space-y-8 max-w-5xl mx-auto">
        <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6">
            {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
            ))}
        </div>

        <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6">
            {achievements.map((achievement, i) => (
                <AchievementCard key={i} {...achievement} />
            ))}
        </div>

        <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6">
            {streaks.map((streak, i) => (
                <StreakCard key={i} {...streak} />
            ))}
        </div>
    </div>
)

const StatCard = ({ icon: Icon, value, label, sublabel }: StatItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300 text-center">
        <CardContent className="p-6">
            <Icon className="size-8 text-primary mx-auto mb-3" />
            <p className="text-3xl @md:text-4xl font-bold mb-1">{value}</p>
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">{sublabel}</p>
        </CardContent>
    </Card>
)

const AchievementCard = ({ icon: Icon, title, description }: AchievementItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-6 text-primary" />
            </div>
            <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </CardContent>
    </Card>
)

const StreakCard = ({ icon: Icon, value, label }: StreakItem) => (
    <div className="flex items-center justify-center gap-3 p-4 rounded-xl border bg-card hover:border-primary/50 transition-all">
        <Icon className="size-5 text-orange-500" />
        <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold">{value}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
        </div>
    </div>
)

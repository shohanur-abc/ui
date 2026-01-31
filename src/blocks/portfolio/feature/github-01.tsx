import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code, FileCode, Folder, GitBranch, Star, Users } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
                    <div>
                        <Eyebrow text="Open Source" />
                        <Title text="GitHub Contributions" />
                        <Description text="Actively contributing to the open-source community. Here's a snapshot of my GitHub activity." />

                        <GitHubStats
                            stats={[
                                { icon: Star, label: 'Total Stars', value: '2.4k' },
                                { icon: Users, label: 'Followers', value: '1.2k' },
                                { icon: GitBranch, label: 'Repositories', value: '86' },
                                { icon: Code, label: 'Contributions', value: '2,847' },
                            ]}
                        />
                    </div>

                    <ContributionGraph
                        months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">{text}</p>
)

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
}

const GitHubStats = ({ stats }: { stats: StatItem[] }) => (
    <div className="grid grid-cols-2 gap-3 @md:gap-4">
        {stats.map(({ icon: Icon, label, value }, i) => (
            <Card key={i} className="py-0">
                <CardContent className="p-3 @md:p-4 flex items-center gap-3">
                    <div className="size-9 @md:size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 @md:size-5 text-primary" />
                    </div>
                    <div>
                        <div className="font-bold text-lg @md:text-xl">{value}</div>
                        <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

interface ContributionGraphProps {
    months: string[]
}

const ContributionGraph = ({ months }: ContributionGraphProps) => {
    const generateWeeks = () => {
        return months.map(() => {
            return Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
        })
    }

    const weeks = generateWeeks()
    const levels = ['bg-muted', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary']

    return (
        <Card className="py-0">
            <CardContent className="p-5 @md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Contribution Activity</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>Less</span>
                        {levels.map((level, i) => (
                            <div key={i} className={`size-3 rounded-sm ${level}`} />
                        ))}
                        <span>More</span>
                    </div>
                </div>

                <div className="flex gap-1">
                    {weeks.map((week, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            {week.map((level, j) => (
                                <div
                                    key={j}
                                    className={`size-3 @md:size-4 rounded-sm ${levels[level]}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                    {months.map((month, i) => (
                        <span key={i}>{month}</span>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

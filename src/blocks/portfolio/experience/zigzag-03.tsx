import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Rocket, Users, TrendingUp, Award, Layers, Target } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Award} text="Achievements" />
                    <Title text="Career Milestones" />
                    <Description text="Key accomplishments that shaped my career." />
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    <AchievementZigzag
                        icon={Rocket}
                        year="2024"
                        title="Promoted to Principal"
                        description="Recognized for technical leadership and organizational impact. Now guiding technical direction across 5 product teams."
                        metrics={[
                            { value: '5', label: 'Teams' },
                            { value: '$10M+', label: 'Scope' },
                        ]}
                        align="left"
                    />
                    <AchievementZigzag
                        icon={Layers}
                        year="2023"
                        title="Design System v3"
                        description="Led the launch of major design system release, now the standard for frontend development."
                        metrics={[
                            { value: '200+', label: 'Engineers' },
                            { value: '500+', label: 'Components' },
                        ]}
                        align="right"
                    />
                    <AchievementZigzag
                        icon={TrendingUp}
                        year="2022"
                        title="Performance Optimization"
                        description="Led initiative to improve Core Web Vitals across all product surfaces."
                        metrics={[
                            { value: '40%', label: 'Faster' },
                            { value: '2M+', label: 'Users' },
                        ]}
                        align="left"
                    />
                    <AchievementZigzag
                        icon={Users}
                        year="2021"
                        title="Team Leadership"
                        description="Started leading my first engineering team, growing it from 3 to 8 engineers."
                        metrics={[
                            { value: '100%', label: 'Retention' },
                            { value: '3', label: 'Promotions' },
                        ]}
                        align="right"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface Metric {
    value: string
    label: string
}

interface AchievementZigzagProps {
    icon: ComponentType<{ className?: string }>
    year: string
    title: string
    description: string
    metrics: Metric[]
    align: 'left' | 'right'
}

const AchievementZigzag = ({ icon: Icon, year, title, description, metrics, align }: AchievementZigzagProps) => (
    <div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
        <div className={`${align === 'right' ? '@lg:order-2 @lg:text-right' : ''}`}>
            <Badge variant="secondary" className="mb-4">{year}</Badge>
            <h3 className="text-2xl @md:text-3xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
        <Card className={`${align === 'right' ? '@lg:order-1' : ''}`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-7 text-primary" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        {metrics.map(({ value, label }, i) => (
                            <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                                <p className="text-2xl font-bold">{value}</p>
                                <p className="text-xs text-muted-foreground">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
)

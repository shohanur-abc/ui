import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Globe, Rocket, TrendingUp, Users, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface StatItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={TrendingUp} text="Our Impact" />
                    <Title text="Numbers That" highlight="Matter" />
                    <Description text="We measure success by the impact we create for our customers." />
                </div>

                <StatsGrid items={[
                    { icon: Users, value: '50K+', label: 'Active Users', description: 'Professionals using our platform daily' },
                    { icon: Globe, value: '120+', label: 'Countries', description: 'Global reach across continents' },
                    { icon: Zap, value: '99.99%', label: 'Uptime', description: 'Reliable infrastructure you can trust' },
                    { icon: Rocket, value: '10M+', label: 'Tasks Automated', description: 'Hours saved through automation' },
                    { icon: Award, value: '#1', label: 'Rated Platform', description: 'By G2 and Capterra users' },
                    { icon: TrendingUp, value: '3x', label: 'ROI Average', description: 'Return on investment for customers' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const StatsGrid = ({ items }: { items: StatItem[] }) => (
    <div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-3">
        {items.map((item) => (
            <Card key={item.label} className="group text-center border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-6 @md:p-8">
                    <div className="mb-4 mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
                        <item.icon className="size-6 text-primary" />
                    </div>
                    <p className="text-3xl @md:text-4xl font-bold text-primary mb-1">{item.value}</p>
                    <p className="text-base font-semibold mb-1">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

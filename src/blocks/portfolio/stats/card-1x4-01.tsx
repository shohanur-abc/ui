import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MessageSquareText } from 'lucide-react'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={MessageSquareText} text="By The Numbers" />
                    <Title text="Impact & Results" />
                    <Description text="Measurable outcomes that demonstrate the value I bring to every project." />
                </div>

                <StatsGrid items={[
                    { value: '200+', label: 'Projects Completed', description: 'From startups to enterprise clients' },
                    { value: '50+', label: 'Happy Clients', description: 'Across 15+ countries worldwide' },
                    { value: '12+', label: 'Years Experience', description: 'Building web applications' },
                    { value: '99%', label: 'Client Satisfaction', description: 'Based on post-project surveys' },
                ]} />

                <Separator className="my-12 @md:my-16" />

                <ImpactMetrics items={[
                    { metric: 'Average conversion increase', value: '+47%' },
                    { metric: 'Load time improvement', value: '3.2x faster' },
                    { metric: 'SEO ranking improvement', value: '+85%' },
                    { metric: 'User engagement boost', value: '+62%' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mx-auto mb-3 @md:mb-4">
        {Icon && <Icon className="size-4 mr-1" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface StatItem {
    value: string
    label: string
    description: string
}

const StatsGrid = ({ items }: { items: StatItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        {items.map(({ value, label, description }, i) => (
            <li key={i}>
                <Card className="h-full text-center py-0">
                    <CardContent className="p-6 @md:p-8">
                        <div className="text-4xl @md:text-5xl @xl:text-6xl font-bold text-primary mb-2">{value}</div>
                        <div className="text-base @md:text-lg font-semibold mb-1">{label}</div>
                        <div className="text-xs @md:text-sm text-muted-foreground">{description}</div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

interface ImpactMetricItem {
    metric: string
    value: string
}

const ImpactMetrics = ({ items }: { items: ImpactMetricItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6 @md:gap-8 text-center">
        {items.map(({ metric, value }, i) => (
            <div key={i}>
                <div className="text-2xl @md:text-3xl font-bold mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{metric}</div>
            </div>
        ))}
    </div>
)

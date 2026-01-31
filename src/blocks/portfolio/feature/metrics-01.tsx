import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Performance" />
                    <Title text="Key Metrics" />
                    <Description text="Measurable impact across projects and client engagements." />
                </div>

                <MetricsGrid
                    items={[
                        { label: 'Page Load Time', value: '1.2s', change: '-45%', isPositive: true },
                        { label: 'User Engagement', value: '78%', change: '+32%', isPositive: true },
                        { label: 'Conversion Rate', value: '4.8%', change: '+18%', isPositive: true },
                        { label: 'Bounce Rate', value: '22%', change: '-28%', isPositive: true },
                        { label: 'Customer Satisfaction', value: '98%', change: '+5%', isPositive: true },
                        { label: 'Development Time', value: '40%', change: 'faster', isPositive: true },
                    ]}
                />
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface MetricItem {
    label: string
    value: string
    change: string
    isPositive: boolean
}

const MetricsGrid = ({ items }: { items: MetricItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ label, value, change, isPositive }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all">
                <CardContent className="p-5 @md:p-6">
                    <div className="flex items-start justify-between mb-3">
                        <span className="text-sm @md:text-base text-muted-foreground">{label}</span>
                        <div className={`flex items-center gap-1 text-xs @md:text-sm font-medium ${
                            isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                        }`}>
                            {isPositive ? (
                                <ChevronUp className="size-4" />
                            ) : (
                                <ChevronDown className="size-4" />
                            )}
                            {change}
                        </div>
                    </div>
                    <div className="text-3xl @md:text-4xl font-bold">{value}</div>
                </CardContent>
            </Card>
        ))}
    </div>
)

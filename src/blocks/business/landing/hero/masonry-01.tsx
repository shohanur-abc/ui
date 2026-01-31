import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Gauge, BarChart2, PieChart, LineChart, Activity, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Gauge} text="Performance Analytics" />
                    <Title text="Data-Driven Decisions Made Simple" />
                    <Description text="Transform complex data into actionable insights. Beautiful dashboards that anyone can understand." />
                    <CTA items={[
                        { label: 'Try Analytics Free', href: '#try', icon: ArrowRight },
                        { label: 'See Features', href: '#features', variant: 'outline' },
                    ]} />
                </div>
                <MasonryGrid items={[
                    { icon: BarChart2, title: 'Revenue Tracking', value: '$2.4M', change: '+23%', height: 'tall' },
                    { icon: PieChart, title: 'Market Share', value: '34%', change: '+5%', height: 'normal' },
                    { icon: LineChart, title: 'User Growth', value: '125K', change: '+18%', height: 'normal' },
                    { icon: Activity, title: 'Engagement', value: '89%', change: '+12%', height: 'short' },
                    { icon: TrendingUp, title: 'Conversion', value: '4.2%', change: '+0.8%', height: 'short' },
                    { icon: Gauge, title: 'Performance', value: '98/100', change: '+3', height: 'normal' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const MasonryGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; value: string; change: string; height: 'tall' | 'normal' | 'short' }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, value, change, height }, i) => (
            <Card 
                key={i} 
                className={`group hover:shadow-lg hover:border-primary/30 transition-all ${
                    height === 'tall' ? 'row-span-2' : height === 'short' ? '' : ''
                }`}
            >
                <CardContent className={`flex flex-col ${height === 'tall' ? 'pt-8 h-full justify-between' : 'pt-6'}`}>
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-primary">{change}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    </div>
                    <p className={`font-bold ${height === 'tall' ? 'text-4xl @md:text-5xl' : 'text-2xl @md:text-3xl'}`}>{value}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

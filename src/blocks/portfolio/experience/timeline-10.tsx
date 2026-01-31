import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Layers, TrendingUp } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <div className="max-w-xl">
                        <Eyebrow icon={Layers} text="Experience" />
                        <Title text="Career Overview" />
                        <Description text="8+ years of building products at scale." />
                    </div>
                    <Stats items={[
                        { label: 'Years Experience', value: '8+' },
                        { label: 'Companies', value: '5' },
                        { label: 'Projects Shipped', value: '50+' },
                    ]} />
                </div>

                <div className="grid @md:grid-cols-2 gap-4">
                    <TimelineCard
                        year="2024"
                        title="Director of Engineering"
                        company="ScaleUp Inc"
                        description="Leading engineering organization of 40+ engineers across 5 teams."
                        growth="+25%"
                        current
                    />
                    <TimelineCard
                        year="2022"
                        title="Engineering Manager"
                        company="TechVenture"
                        description="Managed platform team and led migration to microservices architecture."
                        growth="+20%"
                    />
                    <TimelineCard
                        year="2020"
                        title="Staff Engineer"
                        company="DataTech"
                        description="Technical lead for core product. Designed real-time data pipeline."
                        growth="+15%"
                    />
                    <TimelineCard
                        year="2018"
                        title="Senior Engineer"
                        company="StartupX"
                        description="Full-stack development. Built customer-facing dashboards."
                        growth="+10%"
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

interface StatItem {
    label: string
    value: string
}

const Stats = ({ items }: { items: StatItem[] }) => (
    <div className="flex gap-6 @lg:gap-8">
        {items.map(({ label, value }, i) => (
            <div key={i} className="text-center @lg:text-right">
                <p className="text-2xl @md:text-3xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

interface TimelineCardProps {
    year: string
    title: string
    company: string
    description: string
    growth: string
    current?: boolean
}

const TimelineCard = ({ year, title, company, description, growth, current }: TimelineCardProps) => (
    <Card className={`overflow-hidden hover:shadow-lg transition-all ${current ? 'ring-2 ring-primary' : ''}`}>
        <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{year}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="size-3" />
                    <span>{growth} scope</span>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                {current && <Badge className="text-xs">Current</Badge>}
            </div>
            <p className="text-sm text-primary mb-2">{company}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

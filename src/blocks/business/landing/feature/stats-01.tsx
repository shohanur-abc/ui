import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface StatItem {
    label: string
    value: number
    displayValue: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={BarChart2} text="By The Numbers" />
                        <Title text="Proven Results That" highlight="Speak for Themselves" />
                        <Description text="Our platform has helped thousands of businesses achieve measurable improvements across key metrics." />
                        <CTAButton label="See Case Studies" href="/case-studies" />
                    </div>

                    <StatsProgress items={[
                        { label: 'Customer Satisfaction', value: 98, displayValue: '98%' },
                        { label: 'Time Saved on Tasks', value: 75, displayValue: '75%' },
                        { label: 'Increase in Productivity', value: 85, displayValue: '85%' },
                        { label: 'Cost Reduction', value: 60, displayValue: '60%' },
                        { label: 'Faster Time to Market', value: 90, displayValue: '3x Faster' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" variant="outline" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const StatsProgress = ({ items }: { items: StatItem[] }) => (
    <div className="space-y-6">
        {items.map((item) => (
            <div key={item.label}>
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-bold text-primary">{item.displayValue}</span>
                </div>
                <Progress value={item.value} className="h-2" />
            </div>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calculator, DollarSign, Percent, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Calculator} text="ROI Calculator" />
                        <Title text="See How Much You Could Save" />
                        <Description text="Our customers save an average of $150,000 per year. Calculate your potential savings in seconds." />
                        <Savings items={[
                            { icon: DollarSign, value: '$2.4M', label: 'Saved by Customers' },
                            { icon: Percent, value: '40%', label: 'Cost Reduction' },
                            { icon: TrendingUp, value: '3x', label: 'ROI Average' },
                        ]} />
                        <CTA items={[
                            { label: 'Calculate Savings', href: '#calculate', icon: ArrowRight },
                            { label: 'View Case Studies', href: '#cases', variant: 'outline' },
                        ]} />
                    </div>
                    <ROICalculator />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
)

const Savings = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-4 mb-8">
        {items.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
                <Icon className="size-5 text-primary mx-auto mb-2" />
                <div className="text-xl @md:text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
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

const ROICalculator = () => (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-xl">
        <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-6">Quick Estimate</h3>
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium mb-2 block">Team Size</label>
                    <div className="flex gap-2">
                        {['1-10', '11-50', '51-200', '200+'].map((size, i) => (
                            <Button key={i} variant={i === 1 ? 'default' : 'outline'} size="sm" className="flex-1">
                                {size}
                            </Button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium mb-2 block">Current Monthly Spend</label>
                    <div className="flex gap-2">
                        {['$1K', '$5K', '$10K', '$25K+'].map((spend, i) => (
                            <Button key={i} variant={i === 2 ? 'default' : 'outline'} size="sm" className="flex-1">
                                {spend}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Annual Savings</p>
                    <p className="text-3xl font-bold text-primary">$48,000</p>
                </div>
                <Button size="lg" className="w-full gap-2">
                    Get Detailed Report
                    <ArrowRight className="size-4" />
                </Button>
            </div>
        </CardContent>
    </Card>
)

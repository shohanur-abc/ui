import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, Calculator, DollarSign, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="slate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Calculator} text="ROI Calculator" />
                        <Title text="See Your Potential Savings" />
                        <Description text="Calculate how much time and money you could save by switching to our platform. Most customers see ROI within 3 months." />
                        <AverageResults items={[
                            { icon: DollarSign, value: '$125K', label: 'Average yearly savings' },
                            { icon: TrendingUp, value: '40%', label: 'Productivity increase' },
                            { icon: Users, value: '10hrs', label: 'Time saved per week' },
                        ]} />
                        <CTA items={[
                            { label: 'Get Custom Quote', href: '#quote', icon: ArrowRight },
                        ]} />
                    </div>
                    <ROICalculator />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
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

const AverageResults = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-4 mb-8">
        {items.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center p-3 rounded-lg bg-muted/50 border border-border/50">
                <Icon className="size-5 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold">{value}</div>
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
    <Card>
        <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-6">Calculate Your ROI</h3>
            <form className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-2 block">Number of employees</label>
                    <Input type="number" placeholder="50" defaultValue="50" />
                </div>
                <div>
                    <label className="text-sm font-medium mb-2 block">Average hourly rate ($)</label>
                    <Input type="number" placeholder="75" defaultValue="75" />
                </div>
                <div>
                    <label className="text-sm font-medium mb-2 block">Hours spent on manual tasks per week</label>
                    <Input type="number" placeholder="10" defaultValue="10" />
                </div>
                <Button className="w-full gap-2" size="lg">
                    Calculate Savings
                    <ArrowRight className="size-4" />
                </Button>
            </form>
            <div className="mt-6 pt-6 border-t border-border">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Estimated annual savings</p>
                    <p className="text-4xl font-bold text-primary">$195,000</p>
                </div>
            </div>
        </CardContent>
    </Card>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Globe, Users, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 h-full">
                <div className="grid @3xl:grid-cols-2 min-h-screen gap-8 @xl:gap-16 items-center">
                    <div className="order-2 @3xl:order-1 py-8 @3xl:py-12">
                        <StatsGrid items={[
                            { icon: Users, value: '2M+', label: 'Active Users' },
                            { icon: Globe, value: '150+', label: 'Countries' },
                            { icon: Zap, value: '99.9%', label: 'Uptime' },
                            { icon: TrendingUp, value: '40%', label: 'Avg. Growth' },
                        ]} />
                    </div>
                    <div className="order-1 @3xl:order-2 py-12 @md:py-16 @3xl:py-0">
                        <Eyebrow icon={Globe} text="Global Reach" />
                        <Title text="Connect With Customers Worldwide" />
                        <Description text="Expand your market reach with our localization tools, multi-currency support, and 24/7 global customer service infrastructure." />
                        <CTA items={[
                            { label: 'Expand Globally', href: '#expand', icon: ArrowRight },
                            { label: 'View Markets', href: '#markets', variant: 'outline' },
                        ]} />
                    </div>
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
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed max-w-xl">
        {text}
    </p>
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

const StatsGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid grid-cols-2 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, value, label }, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                    <div className="size-10 @md:size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-5 @md:size-6 text-primary" />
                    </div>
                    <div className="text-2xl @md:text-3xl @xl:text-4xl font-bold mb-1">{value}</div>
                    <div className="text-sm @md:text-base text-muted-foreground">{label}</div>
                </CardContent>
            </Card>
        ))}
    </div>
)

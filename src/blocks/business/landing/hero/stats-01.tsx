import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Users, Globe, Zap, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-12 @md:mb-16">
                    <Eyebrow icon={TrendingUp} text="By the Numbers" />
                    <Title text="Results That Speak for Themselves" />
                    <Description text="Our platform has powered success for thousands of businesses. Here&apos;s what that looks like." />
                </div>
                <StatsGrid items={[
                    { icon: Users, value: '50K+', label: 'Active Users', change: '+12% this month' },
                    { icon: Globe, value: '120+', label: 'Countries', change: 'Global coverage' },
                    { icon: Zap, value: '99.99%', label: 'Uptime', change: 'Industry leading' },
                    { icon: Award, value: '4.9/5', label: 'Customer Rating', change: 'From 10K+ reviews' },
                    { icon: TrendingUp, value: '$2.5B', label: 'Revenue Generated', change: 'For our customers' },
                    { icon: Clock, value: '<5min', label: 'Avg. Response Time', change: '24/7 support' },
                ]} />
                <div className="text-center mt-12 @md:mt-16">
                    <CTA items={[
                        { label: 'Join Our Customers', href: '#start', icon: ArrowRight },
                        { label: 'Read Case Studies', href: '#cases', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
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
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const StatsGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string; change: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, value, label, change }, i) => (
            <div key={i} className="group bg-card border border-border rounded-2xl p-6 @md:p-8 text-center hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-6 text-primary" />
                </div>
                <div className="text-4xl @md:text-5xl font-bold text-primary mb-2">{value}</div>
                <div className="font-medium text-lg mb-1">{label}</div>
                <div className="text-sm text-muted-foreground">{change}</div>
            </div>
        ))}
    </div>
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

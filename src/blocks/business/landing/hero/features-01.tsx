import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BarChart, Globe2, Users2, Zap, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={BarChart} text="Why Choose Us" />
                    <Title text="The Platform Trusted by Leaders" />
                    <Description text="Industry-leading features, unmatched reliability, and world-class support. Here&apos;s why top companies choose us." />
                    <CTA items={[
                        { label: 'Start Free', href: '#start', icon: ArrowRight },
                        { label: 'Compare Plans', href: '#compare', variant: 'outline' },
                    ]} />
                </div>
                <FeatureGrid items={[
                    { icon: Globe2, title: 'Global Infrastructure', description: 'Data centers in 25+ regions for ultra-low latency worldwide', stat: '25+', statLabel: 'Regions' },
                    { icon: Users2, title: 'Scalable Architecture', description: 'Handle millions of users without breaking a sweat', stat: '10M+', statLabel: 'Users Served' },
                    { icon: Zap, title: 'Lightning Performance', description: 'Sub-50ms response times even under heavy load', stat: '<50ms', statLabel: 'Avg Response' },
                    { icon: Shield, title: 'Enterprise Security', description: 'SOC 2, GDPR, HIPAA compliant with end-to-end encryption', stat: '100%', statLabel: 'Compliant' },
                    { icon: Clock, title: 'Guaranteed Uptime', description: 'Industry-leading SLA with 99.99% uptime guarantee', stat: '99.99%', statLabel: 'Uptime SLA' },
                    { icon: BarChart, title: 'Advanced Analytics', description: 'Real-time insights with customizable dashboards', stat: '50+', statLabel: 'Metrics' },
                ]} />
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

const FeatureGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string; stat: string; statLabel: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description, stat, statLabel }, i) => (
            <Card key={i} className="group hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden">
                <CardContent className="pt-6 relative">
                    <div className="absolute top-4 right-4 text-right">
                        <div className="text-2xl font-bold text-primary">{stat}</div>
                        <div className="text-xs text-muted-foreground">{statLabel}</div>
                    </div>
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

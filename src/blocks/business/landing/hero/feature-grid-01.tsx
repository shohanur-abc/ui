import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, LayoutGrid, Zap, Shield, Globe, BarChart, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-start">
                    <div className="@3xl:sticky @3xl:top-24">
                        <Eyebrow icon={LayoutGrid} text="All-in-One Platform" />
                        <Title text="Everything You Need in One Place" />
                        <Description text="Stop juggling multiple tools. Our platform brings together all the features your team needs to succeed, without the complexity." />
                        <CTA items={[
                            { label: 'Explore Features', href: '#features', icon: ArrowRight },
                            { label: 'View Pricing', href: '#pricing', variant: 'outline' },
                        ]} />
                    </div>
                    <FeatureCards items={[
                        { icon: Zap, title: 'Lightning Fast', description: 'Built for speed with edge computing and intelligent caching' },
                        { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption with SOC 2 and GDPR compliance' },
                        { icon: Globe, title: 'Global Scale', description: 'Deploy across 30+ regions with automatic failover' },
                        { icon: BarChart, title: 'Advanced Analytics', description: 'Real-time insights with customizable dashboards' },
                        { icon: Users, title: 'Team Collaboration', description: 'Built-in tools for seamless team communication' },
                        { icon: LayoutGrid, title: 'Custom Workflows', description: 'Automate any process with visual workflow builder' },
                    ]} />
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

const FeatureCards = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="grid @sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="group hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="pt-6">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, BarChart3, Box, Cloud, Code2, Globe, Lock, Rocket, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface QuickLinkItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    href: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Box} text="Quick Links" />
                    <Title text="Explore Our" highlight="Feature Catalog" />
                    <Description text="Jump directly to the features that matter most to your business." />
                </div>

                <QuickLinksGrid items={[
                    { icon: Zap, title: 'Performance', description: 'Speed optimization tools', href: '/features/performance' },
                    { icon: Shield, title: 'Security', description: 'Protection & compliance', href: '/features/security' },
                    { icon: BarChart3, title: 'Analytics', description: 'Insights & reporting', href: '/features/analytics' },
                    { icon: Code2, title: 'API', description: 'Developer resources', href: '/docs/api' },
                    { icon: Cloud, title: 'Hosting', description: 'Infrastructure options', href: '/features/hosting' },
                    { icon: Globe, title: 'Integrations', description: '500+ connections', href: '/integrations' },
                    { icon: Lock, title: 'Access Control', description: 'Permissions & roles', href: '/features/access' },
                    { icon: Rocket, title: 'Deployment', description: 'CI/CD & automation', href: '/features/deployment' },
                    { icon: Box, title: 'Storage', description: 'Data & file management', href: '/features/storage' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const QuickLinksGrid = ({ items }: { items: QuickLinkItem[] }) => (
    <div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3">
        {items.map((item) => (
            <Link key={item.title} href={item.href}>
                <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-md hover:bg-primary/5">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/15">
                            <item.icon className="size-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        </div>
                        <ArrowUpRight className="size-4 text-muted-foreground shrink-0 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)

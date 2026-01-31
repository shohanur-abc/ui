import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ArrowUpRight, BarChart3, Globe2, Lock, MessageSquare, Rocket, Settings2, Sparkles, Users2, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    href: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6">
                    <div className="max-w-2xl">
                        <Eyebrow icon={Sparkles} text="Feature Set" />
                        <Title text="Discover What Makes Us" highlight="Different" />
                        <Description text="Explore our comprehensive feature set designed to give you the competitive edge." />
                    </div>
                    <Button variant="outline" className="gap-2 shrink-0 w-fit" asChild>
                        <Link href="/features">
                            View All Features
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <Card3x3Grid items={[
                    { icon: Zap, title: 'Blazing Fast', description: 'Optimized for speed with edge caching and smart prefetching.', href: '/features/performance' },
                    { icon: Lock, title: 'Secure by Default', description: 'Enterprise security with encryption and compliance.', href: '/features/security' },
                    { icon: Users2, title: 'Team Friendly', description: 'Built for collaboration with real-time features.', href: '/features/collaboration' },
                    { icon: Globe2, title: 'Global Scale', description: 'Deploy worldwide with automatic geo-routing.', href: '/features/scale' },
                    { icon: BarChart3, title: 'Deep Analytics', description: 'Actionable insights with custom dashboards.', href: '/features/analytics' },
                    { icon: Settings2, title: 'Customizable', description: 'Tailor every aspect to your workflow.', href: '/features/customization' },
                    { icon: MessageSquare, title: 'Support Included', description: 'Expert help available around the clock.', href: '/support' },
                    { icon: Rocket, title: 'Quick Deploy', description: 'Go live in minutes, not days.', href: '/features/deployment' },
                    { icon: Sparkles, title: 'AI Powered', description: 'Smart automation that learns from you.', href: '/features/ai' },
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

const Card3x3Grid = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-3">
        {items.map((item) => (
            <Link key={item.title} href={item.href}>
                <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-md hover:bg-primary/5">
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
                                <item.icon className="size-5 text-primary" />
                            </div>
                            <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)

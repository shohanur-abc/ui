import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Boxes, Building2, Cpu, Globe, Rocket, Shield, Target, Users2, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface SolutionItem {
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
                        <Eyebrow icon={Boxes} text="Solutions" />
                        <Title text="Tailored Solutions for" highlight="Every Industry" />
                        <Description text="We understand that different industries have unique challenges. Explore solutions built specifically for your sector." />
                    </div>
                </div>

                <SolutionCards items={[
                    { icon: Building2, title: 'Enterprise', description: 'Scalable solutions for large organizations with complex requirements and compliance needs.', href: '/solutions/enterprise' },
                    { icon: Rocket, title: 'Startups', description: 'Agile tools that grow with you. Move fast without breaking things.', href: '/solutions/startups' },
                    { icon: Cpu, title: 'Technology', description: 'Built by developers, for developers. Powerful APIs and integrations.', href: '/solutions/technology' },
                    { icon: Shield, title: 'Healthcare', description: 'HIPAA-compliant solutions for healthcare organizations and providers.', href: '/solutions/healthcare' },
                    { icon: Globe, title: 'E-commerce', description: 'Optimize your online store with advanced analytics and automation.', href: '/solutions/ecommerce' },
                    { icon: Users2, title: 'Agencies', description: 'Manage multiple clients and projects with white-label capabilities.', href: '/solutions/agencies' },
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

const SolutionCards = ({ items }: { items: SolutionItem[] }) => (
    <div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3">
        {items.map((solution) => (
            <Link key={solution.title} href={solution.href}>
                <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg hover:bg-primary/5">
                    <CardContent className="p-5 @md:p-6">
                        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15 group-hover:scale-105">
                            <solution.icon className="size-6 text-primary" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{solution.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{solution.description}</p>
                        <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Learn more <ArrowRight className="size-4" />
                        </span>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)

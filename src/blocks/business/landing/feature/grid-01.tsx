import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, ChevronRight, Code2, Database, GitBranch, Monitor, Server } from 'lucide-react'
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
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6">
                    <div className="max-w-2xl">
                        <Eyebrow icon={Box} text="Platform Features" />
                        <Title text="Developer-First" highlight="Infrastructure" />
                        <Description text="Build, deploy, and scale with tools designed for modern development workflows." />
                    </div>
                    <CTAButton label="Explore All Features" href="/features" />
                </div>

                <FeatureGrid items={[
                    { icon: Code2, title: 'Code Collaboration', description: 'Real-time pair programming with integrated version control and code review tools.', href: '/features/code' },
                    { icon: Server, title: 'Managed Hosting', description: 'Auto-scaling infrastructure that handles millions of requests without configuration.', href: '/features/hosting' },
                    { icon: Database, title: 'Edge Database', description: 'Globally distributed data with single-digit millisecond latency worldwide.', href: '/features/database' },
                    { icon: GitBranch, title: 'CI/CD Pipelines', description: 'Automated testing and deployment with preview environments for every branch.', href: '/features/cicd' },
                    { icon: Monitor, title: 'Observability', description: 'Comprehensive logging, metrics, and tracing for complete system visibility.', href: '/features/observability' },
                    { icon: Box, title: 'Container Registry', description: 'Private container registry with vulnerability scanning and image optimization.', href: '/features/registry' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-3 @md:mb-4">
        <Badge variant="secondary" className="gap-2">
            <Icon className="size-3" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-3 @md:mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button variant="outline" className="gap-2 shrink-0" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-3">
        {items.map((item) => (
            <Card key={item.title} className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card">
                <CardContent className="p-5 @md:p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <item.icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    <Link 
                        href={item.href} 
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        Learn more
                        <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </CardContent>
            </Card>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BarChart3, Code2, Layers, Palette, Rocket, Settings, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Rocket} text="Developer Experience" />
                    <Title text="Built by Developers," highlight="For Developers" />
                    <Description text="A platform that prioritizes developer experience without sacrificing power or flexibility." />
                </div>

                <Card4x2Grid items={[
                    { icon: Code2, title: 'TypeScript First', description: 'Full type safety with auto-generated types for your API.' },
                    { icon: Zap, title: 'Hot Reload', description: 'Instant updates during development without losing state.' },
                    { icon: Palette, title: 'Customizable UI', description: 'Fully themeable components with CSS variables.' },
                    { icon: Settings, title: 'Config as Code', description: 'Infrastructure as code with version control support.' },
                    { icon: BarChart3, title: 'Dev Analytics', description: 'Track build times, bundle sizes, and performance.' },
                    { icon: Layers, title: 'Monorepo Ready', description: 'First-class support for Turborepo and Nx.' },
                    { icon: Rocket, title: 'Edge Deploy', description: 'Deploy to the edge with zero configuration.' },
                    { icon: Code2, title: 'Open Source', description: 'Core libraries are open source and community-driven.' },
                ]} />

                <CTASection 
                    label="Read the Docs"
                    href="/docs"
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
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

const Card4x2Grid = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
        {items.map((item) => (
            <Card key={item.title} className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40">
                <CardContent className="p-5">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/15">
                        <item.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

const CTASection = ({ label, href }: { label: string; href: string }) => (
    <div className="mt-10 @md:mt-12 text-center">
        <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

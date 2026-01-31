import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, CircleDot, Layers } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface LayerItem {
    title: string
    description: string
    features: string[]
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={Layers} text="Modular Architecture" />
                        <Title text="Pick and Choose the" highlight="Modules You Need" />
                        <Description text="Our platform is built as independent modules that work seamlessly together. Start with what you need and expand as you grow." />
                        <CTAButton label="Explore Modules" href="/modules" />
                    </div>

                    <ModularStack items={[
                        { title: 'Analytics Engine', description: 'Real-time data processing and visualization', features: ['Dashboards', 'Reports', 'Alerts'] },
                        { title: 'Automation Hub', description: 'Workflow automation and orchestration', features: ['Triggers', 'Actions', 'Schedules'] },
                        { title: 'Integration Layer', description: 'Connect with external services', features: ['APIs', 'Webhooks', 'SDKs'] },
                        { title: 'Core Platform', description: 'User management and security', features: ['Auth', 'Roles', 'Audit'] },
                    ]} />
                </div>
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
    <h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const ModularStack = ({ items }: { items: LayerItem[] }) => (
    <div className="space-y-4">
        {items.map((item, index) => (
            <Card 
                key={item.title}
                className="border-border/50 transition-all hover:border-primary/30 hover:shadow-md"
                style={{ marginLeft: `${(items.length - 1 - index) * 8}px` }}
            >
                <CardContent className="p-4 @md:p-5 flex flex-col @sm:flex-row @sm:items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Box className="size-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {item.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

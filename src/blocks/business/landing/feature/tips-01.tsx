import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle, Lightbulb, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface TipItem {
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={Lightbulb} text="Pro Tips" />
                        <Title text="Get the Most Out of" highlight="Your Platform" />
                        <Description text="Follow these expert tips to maximize your productivity and unlock hidden features that power users love." />
                        <CTAButton label="View All Tips" href="/tips" />
                    </div>

                    <TipsList items={[
                        { title: 'Keyboard Shortcuts', description: 'Press "?" anywhere to see all available shortcuts and navigate faster.' },
                        { title: 'Quick Search', description: 'Use Cmd+K to instantly search across projects, files, and team members.' },
                        { title: 'Templates', description: 'Save time by creating reusable templates for common workflows and tasks.' },
                        { title: 'Automations', description: 'Set up triggers to automate repetitive tasks and focus on what matters.' },
                        { title: 'Integrations', description: 'Connect your favorite tools to keep everything in sync automatically.' },
                    ]} />
                </div>
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
    <h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" variant="outline" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const TipsList = ({ items }: { items: TipItem[] }) => (
    <div className="space-y-3">
        {items.map((tip, index) => (
            <Card 
                key={tip.title}
                className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30"
            >
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-semibold mb-0.5">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

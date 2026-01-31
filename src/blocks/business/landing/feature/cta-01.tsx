import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Rocket, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface Benefit {
    text: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <GradientBackground />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Rocket} text="Get Started" />
                    <Title text="Ready to Transform Your" highlight="Workflow?" />
                    <Description text="Join thousands of teams who have already made the switch. Get started in minutes with our free trial." />
                    <Benefits items={[
                        { text: '14-day free trial' },
                        { text: 'No credit card required' },
                        { text: 'Full feature access' },
                        { text: 'Cancel anytime' },
                    ]} />
                    <CTAButtons 
                        primaryLabel="Start Free Trial"
                        primaryHref="/signup"
                        secondaryLabel="Schedule Demo"
                        secondaryHref="/demo"
                    />
                </div>
            </div>
        </section>
    )
}

const GradientBackground = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-8 text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto">
        {text}
    </p>
)

const Benefits = ({ items }: { items: Benefit[] }) => (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
        {items.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-primary" />
                {item.text}
            </div>
        ))}
    </div>
)

const CTAButtons = ({ primaryLabel, primaryHref, secondaryLabel, secondaryHref }: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
        <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" asChild>
            <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
            <Link href={secondaryHref}>
                {secondaryLabel}
            </Link>
        </Button>
    </div>
)

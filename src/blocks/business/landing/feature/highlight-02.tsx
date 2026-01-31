import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface BenefitItem {
    text: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <GlowDecorative />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <FeatureVisual />
                    <div>
                        <Eyebrow icon={Star} text="Featured Highlight" />
                        <Title text="Revolutionary Workflow" highlight="Automation Engine" />
                        <Description text="Our intelligent automation engine learns from your patterns and suggests optimizations. Reduce manual work by up to 80% while maintaining full control." />
                        <Benefits items={[
                            { text: 'AI-powered workflow suggestions' },
                            { text: 'Visual drag-and-drop builder' },
                            { text: 'Pre-built templates for common tasks' },
                            { text: 'Real-time error detection and alerts' },
                            { text: 'Seamless integration with 500+ apps' },
                        ]} />
                        <CTAButtons 
                            primaryLabel="Try Automation"
                            primaryHref="/automation"
                            secondaryLabel="Watch Demo"
                            secondaryHref="/demo"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const GlowDecorative = () => (
    <>
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-accent/20 rounded-full blur-3xl opacity-30" />
    </>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge className="gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-accent border-0 text-primary-foreground">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
        {text} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const Benefits = ({ items }: { items: BenefitItem[] }) => (
    <ul className="mb-6 @md:mb-8 space-y-3">
        {items.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <span className="text-sm @md:text-base">{item.text}</span>
            </li>
        ))}
    </ul>
)

const CTAButtons = ({ primaryLabel, primaryHref, secondaryLabel, secondaryHref }: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string }) => (
    <div className="flex flex-wrap gap-3">
        <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
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

const FeatureVisual = () => (
    <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 rounded-3xl blur-3xl opacity-40" />
        <div className="relative p-8 @md:p-10 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl">
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Sparkles className="size-5 text-primary" />
                        </div>
                        <div className="flex-1 h-3 rounded-full bg-primary/20" style={{ width: `${100 - i * 15}%` }} />
                    </div>
                ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border/50" />
                ))}
            </div>
        </div>
    </div>
)

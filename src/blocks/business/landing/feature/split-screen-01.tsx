import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface BenefitItem {
    text: string
}

interface CTAItem {
    label: string
    href: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
    icon?: ComponentType<{ className?: string }>
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={Lightbulb} text="Smart Automation" />
                        <Title text="Automate Repetitive Tasks and" highlight="Focus on Growth" />
                        <Description text="Reduce manual work by 80% with intelligent automation that learns your processes and adapts to your business needs." />
                        <Benefits items={[
                            { text: 'Visual workflow builder with drag-and-drop interface' },
                            { text: 'Pre-built templates for common business processes' },
                            { text: 'Real-time monitoring and error handling' },
                            { text: 'Seamless integration with 500+ applications' },
                        ]} />
                        <CTA items={[
                            { label: 'Start Automating', href: '/automation', icon: ArrowRight },
                            { label: 'See Examples', href: '/examples', variant: 'outline' },
                        ]} />
                    </div>
                    <FeatureVisual 
                        imageSrc="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                        imageAlt="Automation dashboard showing workflow builder"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 @md:mb-5 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 @md:mb-8 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const Benefits = ({ items }: { items: BenefitItem[] }) => (
    <ul className="mb-6 @md:mb-8 space-y-3">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm @md:text-base text-muted-foreground">{item.text}</span>
            </li>
        ))}
    </ul>
)

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, variant, icon: Icon }) => (
            <Button key={label} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const FeatureVisual = ({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) => (
    <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-2xl blur-3xl opacity-50" />
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
            <img 
                src={imageSrc} 
                alt={imageAlt}
                className="w-full h-auto aspect-[4/3] object-cover"
            />
        </div>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface FeatureItem {
    text: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <VideoShowcase 
                        thumbnailSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                        thumbnailAlt="Product demo video thumbnail"
                    />
                    <div>
                        <Eyebrow icon={Sparkles} text="See It in Action" />
                        <Title text="Watch How Easy It Is to" highlight="Get Started" />
                        <Description text="Our intuitive interface lets you accomplish more with less effort. See for yourself how teams are transforming their workflows." />
                        <Features items={[
                            { text: 'Set up in under 5 minutes' },
                            { text: 'No credit card required' },
                            { text: 'Import from existing tools' },
                            { text: 'Live support during onboarding' },
                        ]} />
                        <CTAButtons 
                            primaryLabel="Start Free Trial"
                            primaryHref="/signup"
                            secondaryLabel="Book Demo"
                            secondaryHref="/demo"
                        />
                    </div>
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
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const Features = ({ items }: { items: FeatureItem[] }) => (
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
        <Button size="lg" className="gap-2" asChild>
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

const VideoShowcase = ({ thumbnailSrc, thumbnailAlt }: { thumbnailSrc: string; thumbnailAlt: string }) => (
    <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 rounded-2xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />
        <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
            <img 
                src={thumbnailSrc} 
                alt={thumbnailAlt}
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <div className="flex size-16 @md:size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                    <Play className="size-6 @md:size-8 ml-1" />
                </div>
            </div>
        </div>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ChevronRight, Layers, Sparkles, Zap } from 'lucide-react'
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
            <GlowDecorative />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Sparkles} text="Premium Features" />
                    <Title text="Experience the Future of" highlight="Business Software" />
                    <Description text="Cutting-edge features designed for the modern enterprise, with a touch of magic." />
                </div>

                <GlassCards items={[
                    { icon: Zap, title: 'Instant Processing', description: 'Sub-millisecond data processing with our optimized infrastructure.', href: '/features/processing' },
                    { icon: Layers, title: 'Multi-layer Security', description: 'Defense in depth with encryption, authentication, and monitoring.', href: '/features/security' },
                    { icon: Sparkles, title: 'AI Automation', description: 'Smart workflows that learn and adapt to your business patterns.', href: '/features/ai' },
                ]} />

                <CTASection 
                    label="Start Free Trial"
                    href="/signup"
                />
            </div>
        </section>
    )
}

const GlowDecorative = () => (
    <>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-30" />
    </>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1.5 bg-primary/10 border-primary/20">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const GlassCards = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-6 @md:gap-8 @lg:grid-cols-3">
        {items.map((item) => (
            <Card 
                key={item.title} 
                className="group border-border/30 bg-card/30 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card/50 hover:shadow-xl hover:shadow-primary/5"
            >
                <CardContent className="p-6 @md:p-8">
                    <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-primary/20">
                        <item.icon className="size-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="mb-5 text-muted-foreground leading-relaxed">{item.description}</p>
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

const CTASection = ({ label, href }: { label: string; href: string }) => (
    <div className="mt-12 @md:mt-16 text-center">
        <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

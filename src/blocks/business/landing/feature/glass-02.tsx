import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Cpu, Layers, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface GlassFeature {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5" data-theme="corporate">
            <GlassOrbDecorative />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={Sparkles} text="Modern Design" />
                        <Title text="Crafted with Precision and" highlight="Attention to Detail" />
                        <Description text="Every pixel, every interaction, every feature has been thoughtfully designed to deliver an exceptional user experience." />
                        <GlassFeatureList items={[
                            { icon: Zap, title: 'Lightning Fast', description: 'Optimized for performance at every level.' },
                            { icon: Layers, title: 'Modular Design', description: 'Build exactly what you need, nothing more.' },
                            { icon: Cpu, title: 'Smart Automation', description: 'AI that actually helps, not hinders.' },
                        ]} />
                        <CTAButton label="Experience It Now" href="/demo" />
                    </div>
                    <GlassCard />
                </div>
            </div>
        </section>
    )
}

const GlassOrbDecorative = () => (
    <>
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-3xl" />
    </>
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
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const GlassFeatureList = ({ items }: { items: GlassFeature[] }) => (
    <div className="mb-6 @md:mb-8 space-y-4">
        {items.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                </div>
                <div>
                    <h4 className="font-semibold mb-0.5">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const GlassCard = () => (
    <Card className="relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-8 @md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                    <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <Sparkles className="size-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Premium Design</h3>
                        <p className="text-sm text-muted-foreground">Crafted for excellence</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-border/50" />
                    ))}
                </div>
                <div className="space-y-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-3 rounded-full bg-primary/15" style={{ width: `${100 - i * 20}%` }} />
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
)

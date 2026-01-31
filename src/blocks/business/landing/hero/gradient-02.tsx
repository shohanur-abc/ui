import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, Check } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center relative overflow-hidden" data-theme="neon">
            <GradientDecoration />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full relative z-10">
                <div className="max-w-3xl">
                    <Eyebrow icon={Rocket} text="Launch Your Vision" />
                    <Title 
                        text="Build Something " 
                        gradientText="Extraordinary"
                    />
                    <Description text="The all-in-one platform that empowers teams to create, collaborate, and ship faster than ever before." />
                    <FeatureList items={[
                        'Unlimited projects and collaborators',
                        'Real-time sync across all devices',
                        'Enterprise-grade security included',
                    ]} />
                    <CTA items={[
                        { label: 'Start Building Free', href: '#start', icon: ArrowRight },
                        { label: 'Book a Demo', href: '#demo', variant: 'outline' },
                    ]} />
                </div>
            </div>
            <FloatingElements />
        </section>
    )
}

const GradientDecoration = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
    </div>
)

const FloatingElements = () => (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden @3xl:block">
        <div className="relative w-[500px] h-[600px]">
            {/* Floating cards */}
            <div className="absolute top-10 right-10 w-64 h-48 bg-card/80 backdrop-blur border border-border/50 rounded-xl shadow-xl p-4">
                <div className="w-full h-3 rounded bg-muted mb-3" />
                <div className="w-3/4 h-3 rounded bg-muted mb-6" />
                <div className="flex gap-2">
                    <div className="w-1/3 h-20 rounded bg-primary/10" />
                    <div className="w-1/3 h-20 rounded bg-primary/10" />
                    <div className="w-1/3 h-20 rounded bg-primary/10" />
                </div>
            </div>
            <div className="absolute bottom-20 right-20 w-56 h-40 bg-card/80 backdrop-blur border border-primary/30 rounded-xl shadow-xl shadow-primary/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-full bg-primary/20" />
                    <div className="flex-1">
                        <div className="w-full h-2 rounded bg-muted mb-1" />
                        <div className="w-2/3 h-2 rounded bg-muted" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-2 rounded bg-primary/30 w-full" />
                    <div className="h-2 rounded bg-primary/20 w-4/5" />
                    <div className="h-2 rounded bg-primary/10 w-3/5" />
                </div>
            </div>
            {/* Glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 rounded-full bg-primary/20 blur-3xl" />
        </div>
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-6 @md:mb-8 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text, gradientText }: { text: string; gradientText: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8 leading-tight">
        {text}
        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {gradientText}
        </span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed max-w-xl">
        {text}
    </p>
)

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="space-y-3 mb-8">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-base @md:text-lg">
                <Check className="size-5 text-primary shrink-0" />
                {item}
            </li>
        ))}
    </ul>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

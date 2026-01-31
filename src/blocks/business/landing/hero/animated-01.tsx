import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center relative overflow-hidden" data-theme="business-neon">
            <AnimatedBackground />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <FloatingBadge icon={Sparkles} text="Now with AI" />
                    <AnimatedTitle 
                        line1="The Future of"
                        line2="Business Software"
                    />
                    <Description text="Experience the next generation of productivity tools. Powered by AI, designed for humans." />
                    <CTA items={[
                        { label: 'Experience the Future', href: '#start', icon: ArrowRight },
                        { label: 'Watch Demo', href: '#demo', variant: 'outline' },
                    ]} />
                    <TrustLogos />
                </div>
            </div>
        </section>
    )
}

const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/5 size-2 rounded-full bg-primary/50 animate-bounce" />
        <div className="absolute top-2/3 right-1/4 size-3 rounded-full bg-primary/30 animate-bounce delay-500" />
        <div className="absolute bottom-1/3 left-1/3 size-2 rounded-full bg-primary/40 animate-bounce delay-700" />
    </div>
)

const FloatingBadge = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-6 @md:mb-8 gap-2 px-4 py-2 animate-pulse">
        <Icon className="size-4" />
        <span className="font-semibold">{text}</span>
    </Badge>
)

const AnimatedTitle = ({ line1, line2 }: { line1: string; line2: string }) => (
    <h1 className="text-5xl @sm:text-6xl @md:text-7xl @xl:text-8xl font-bold tracking-tight mb-6 @md:mb-8">
        <span className="block text-muted-foreground">{line1}</span>
        <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            {line2}
        </span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground mb-10 @md:mb-12 max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-12 @md:mb-16">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2 px-8" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const TrustLogos = () => (
    <div className="pt-8 border-t border-border/50">
        <p className="text-sm text-muted-foreground mb-6">Trusted by innovative companies worldwide</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((name, i) => (
                <div key={i} className="text-lg font-bold tracking-tight">
                    {name}
                </div>
            ))}
        </div>
    </div>
)

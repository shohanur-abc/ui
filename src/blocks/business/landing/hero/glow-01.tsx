import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gem, Star, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center relative overflow-hidden" data-theme="business-slate">
            <GlowDecorative />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <PremiumBadge icon={Crown} text="Premium Experience" />
                    <Title text="Elevate Your Business to New Heights" />
                    <Description text="Experience the pinnacle of business solutions. Unmatched quality, unparalleled support, unprecedented results." />
                    <CTA items={[
                        { label: 'Unlock Premium', href: '#premium', icon: ArrowRight },
                        { label: 'Compare Plans', href: '#plans', variant: 'outline' },
                    ]} />
                    <TrustBadges items={[
                        { icon: Star, label: '5-Star Rated' },
                        { icon: Gem, label: 'Premium Quality' },
                        { icon: Sparkles, label: 'White-Glove Service' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </div>
)

const PremiumBadge = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-6 @md:mb-8 gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
        <Icon className="size-4 text-primary" />
        <span className="font-medium">{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-10 @md:mb-14">
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

const TrustBadges = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-6 @md:gap-10">
        {items.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-primary" />
                <span>{label}</span>
            </div>
        ))}
    </div>
)

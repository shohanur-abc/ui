import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Flame } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center relative overflow-hidden" data-theme="slate">
            <UrgencyDecorative />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <UrgencyBadge icon={Flame} text="Limited Time Offer" />
                    <Title text="Don&apos;t Miss Out on This Exclusive Deal" />
                    <Description text="Get 60% off our annual plan for the next 48 hours. Over 10,000 businesses have already claimed this offer." />
                    <Countdown 
                        days={0}
                        hours={47}
                        minutes={59}
                        seconds={59}
                    />
                    <CTA items={[
                        { label: 'Claim Your Discount', href: '#claim', icon: ArrowRight },
                        { label: 'See What&apos;s Included', href: '#included', variant: 'outline' },
                    ]} />
                    <TrustIndicators items={[
                        '30-day money-back guarantee',
                        'No credit card required to start',
                        'Cancel anytime',
                    ]} />
                </div>
            </div>
        </section>
    )
}

const UrgencyDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
    </div>
)

const UrgencyBadge = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-6 @md:mb-8 gap-2 px-4 py-2 bg-destructive/10 text-destructive border-destructive/30 animate-pulse">
        <Icon className="size-4" />
        <span className="font-semibold">{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const Countdown = ({ days, hours, minutes, seconds }: { days: number; hours: number; minutes: number; seconds: number }) => (
    <div className="flex justify-center gap-4 @md:gap-6 mb-8 @md:mb-10">
        {[
            { value: days, label: 'Days' },
            { value: hours, label: 'Hours' },
            { value: minutes, label: 'Minutes' },
            { value: seconds, label: 'Seconds' },
        ].map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="bg-card border border-border rounded-xl p-3 @md:p-4 min-w-16 @md:min-w-20 mb-2">
                    <span className="text-2xl @md:text-4xl font-bold text-primary tabular-nums">
                        {value.toString().padStart(2, '0')}
                    </span>
                </div>
                <span className="text-xs @md:text-sm text-muted-foreground">{label}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-8 @md:mb-10">
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

const TrustIndicators = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-4 @md:gap-6 text-sm text-muted-foreground">
        {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {item}
            </span>
        ))}
    </div>
)

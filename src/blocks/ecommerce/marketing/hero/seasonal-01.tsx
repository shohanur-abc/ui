import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Gift, Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            {/* Festive Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-background to-green-500/10" />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Gift} text="Holiday Special" />
                        <Title text="Gift the" highlight="Magic" suffix="This Season" />
                        <Description text="Find the perfect gifts for everyone on your list. Enjoy exclusive holiday savings with up to 40% off on selected items." />

                        <PromoCode code="HOLIDAY40" discount="40% OFF" />

                        <CTA items={[
                            { label: 'Shop Gifts', href: '/gifts', icon: ArrowRight },
                            { label: 'Gift Guide', href: '/gift-guide', variant: 'outline' },
                        ]} />

                        <Countdown />
                    </div>

                    {/* Gift Stack */}
                    <div className="relative">
                        <GiftStack />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="destructive" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent">{highlight}</span>
        <br />
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const PromoCode = ({ code, discount }: { code: string; discount: string }) => (
    <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-dashed mb-6 @md:mb-8">
        <Sparkles className="size-5 text-yellow-500" />
        <div>
            <div className="text-xs text-muted-foreground">Use code</div>
            <div className="font-mono font-bold">{code}</div>
        </div>
        <Badge variant="secondary">{discount}</Badge>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8 @md:mb-10">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Countdown = () => (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Clock className="size-4" />
        <span>Sale ends in: <span className="font-semibold text-foreground">3d 12h 45m</span></span>
    </div>
)

const GiftStack = () => (
    <div className="relative aspect-square max-w-md mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-2xl" />

        {/* Gift boxes */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 @md:w-56 @md:h-56 bg-red-500 rounded-2xl rotate-3 shadow-2xl" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-x-4 w-40 h-40 @md:w-48 @md:h-48 bg-green-500 rounded-2xl -rotate-6 shadow-xl" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 -translate-x-8 w-32 h-32 @md:w-40 @md:h-40 bg-yellow-500 rounded-2xl rotate-12 shadow-lg" />

        {/* Ribbon decoration */}
        <div className="absolute top-1/4 right-1/4 animate-bounce [animation-duration:3s]">
            <div className="size-16 @md:size-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                <Gift className="size-8 @md:size-10 text-red-500" />
            </div>
        </div>
    </div>
)

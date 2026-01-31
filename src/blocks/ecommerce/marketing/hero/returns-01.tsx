import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Undo, Truck, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Undo} text="Free Returns" />
                        <Title text="Shop" highlight="Risk-Free" />
                        <Description text="Not sure about your order? No problem! We offer hassle-free returns within 60 days. Shop with confidence knowing you can return anything, anytime." />

                        <ReturnFeatures items={[
                            { icon: Clock, title: '60-Day Returns', description: 'Extended return window' },
                            { icon: Truck, title: 'Free Return Shipping', description: 'We cover the cost' },
                            { icon: Shield, title: 'Full Refund', description: 'Money back guaranteed' },
                        ]} />

                        <CTA items={[
                            { label: 'Start Shopping', href: '/shop', icon: ArrowRight },
                            { label: 'Return Policy', href: '/returns', variant: 'outline' },
                        ]} />

                        <TrustStats />
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <ReturnVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-green-500/50 text-green-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const ReturnFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="space-y-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-4 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                <div className="size-12 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <Icon className="size-6 text-green-600" />
                </div>
                <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-muted-foreground">{description}</div>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-green-600 hover:bg-green-700' : ''}`}
                asChild
            >
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const TrustStats = () => (
    <div className="flex flex-wrap gap-6 text-sm">
        <span className="text-muted-foreground">✓ 98% satisfaction rate</span>
        <span className="text-muted-foreground">✓ 24hr refund processing</span>
    </div>
)

const ReturnVisual = () => (
    <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-400/5 rounded-3xl" />

        <div className="relative aspect-square max-w-md mx-auto p-8 flex items-center justify-center">
            {/* Package visual */}
            <div className="relative">
                {/* Return arrow */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <Undo className="size-12 text-green-500" />
                </div>

                {/* Box */}
                <div className="w-48 h-48 @md:w-56 @md:h-56 bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl shadow-2xl flex items-center justify-center">
                    <div className="size-20 @md:size-24 bg-white rounded-2xl flex items-center justify-center">
                        <Shield className="size-10 @md:size-12 text-green-500" />
                    </div>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-white rounded-full shadow-lg border flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold">100% Guaranteed</span>
                </div>
            </div>
        </div>
    </div>
)

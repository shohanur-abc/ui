import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CreditCard, Wallet, Shield, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Wallet} text="Flexible Payments" />
                        <Title text="Buy Now," highlight="Pay Later" />
                        <Description text="Split your purchase into 4 interest-free payments. No hidden fees, no credit check. Shop now and pay at your own pace." />

                        <PaymentExample />

                        <PaymentFeatures items={[
                            { icon: Check, label: 'No interest or fees' },
                            { icon: Shield, label: 'Secure checkout' },
                            { icon: CreditCard, label: 'All major cards accepted' },
                        ]} />

                        <PaymentProviders />

                        <CTA items={[
                            { label: 'Shop Now', href: '/shop', icon: ArrowRight },
                            { label: 'Learn More', href: '/payment-options', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Payment Visual */}
                    <div className="relative">
                        <PaymentVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const PaymentExample = () => (
    <div className="p-5 rounded-2xl bg-muted/50 border mb-6 @md:mb-8">
        <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Example: $200 purchase</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-600">0% Interest</Badge>
        </div>
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((payment) => (
                <div key={payment} className="flex-1 text-center">
                    <div className={`h-2 rounded-full mb-2 ${payment === 1 ? 'bg-primary' : 'bg-muted'}`} />
                    <div className="font-bold">$50</div>
                    <div className="text-xs text-muted-foreground">
                        {payment === 1 ? 'Today' : `Week ${payment}`}
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const PaymentFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-green-600" />
                <span>{label}</span>
            </div>
        ))}
    </div>
)

const PaymentProviders = () => (
    <div className="mb-8 @md:mb-10">
        <div className="text-sm text-muted-foreground mb-3">Powered by</div>
        <div className="flex gap-4">
            {['Klarna', 'Afterpay', 'Affirm'].map((provider) => (
                <div
                    key={provider}
                    className="px-4 py-2 rounded-lg bg-card border text-sm font-medium"
                >
                    {provider}
                </div>
            ))}
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
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

const PaymentVisual = () => (
    <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />

        {/* Payment flow */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Card mockup */}
            <div className="relative w-72 h-44 @md:w-80 @md:h-48 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-6 text-white">
                <div className="flex justify-between items-start mb-8">
                    <div className="size-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500" />
                    <Wallet className="size-6" />
                </div>
                <div className="font-mono text-lg tracking-widest mb-4">•••• •••• •••• 4242</div>
                <div className="flex justify-between text-sm">
                    <div>
                        <div className="text-gray-400 text-xs">Card Holder</div>
                        <div>JANE DOE</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs">Expires</div>
                        <div>12/28</div>
                    </div>
                </div>
            </div>

            {/* Split payment indicator */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {[1, 2, 3, 4].map((payment) => (
                    <div
                        key={payment}
                        className={`size-12 rounded-full flex items-center justify-center font-bold ${payment === 1
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                            }`}
                    >
                        ${50}
                    </div>
                ))}
            </div>

            {/* Approved badge */}
            <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white font-medium rounded-full shadow-lg flex items-center gap-2">
                <Check className="size-4" />
                Approved
            </div>
        </div>
    </div>
)

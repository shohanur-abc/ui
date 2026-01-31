import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, Clock, Truck, MapPin } from 'lucide-react'
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
                        <Eyebrow icon={Package} text="Subscription Box" />
                        <Title text="Curated" highlight="Monthly" suffix="Surprises" />
                        <Description text="Get handpicked products delivered to your door every month. Each box is carefully curated based on your preferences and the latest trends." />

                        <BoxPreview />

                        <PricingInfo price="$49" frequency="month" savings="$150+ value" />

                        <CTA items={[
                            { label: 'Subscribe Now', href: '/subscribe', icon: ArrowRight },
                            { label: 'Gift a Box', href: '/gift', variant: 'outline' },
                        ]} />

                        <ShippingInfo />
                    </div>

                    {/* Box Visual */}
                    <div className="relative">
                        <SubscriptionBoxVisual />
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

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">{highlight}</span>
        <br />
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const BoxPreview = () => (
    <div className="flex gap-3 mb-6 @md:mb-8 overflow-x-auto pb-2">
        {[
            'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100',
            'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100',
        ].map((src, i) => (
            <div key={i} className="relative size-16 @md:size-20 rounded-xl overflow-hidden shrink-0 border-2 border-background shadow-md">
                <Image src={src} alt={`Item ${i + 1}`} fill className="object-cover" />
            </div>
        ))}
        <div className="size-16 @md:size-20 rounded-xl bg-muted flex items-center justify-center shrink-0 border-2 border-dashed">
            <span className="text-sm text-muted-foreground">+5</span>
        </div>
    </div>
)

const PricingInfo = ({ price, frequency, savings }: { price: string; frequency: string; savings: string }) => (
    <div className="flex items-center gap-4 mb-6 @md:mb-8 p-4 rounded-xl bg-muted/50 border">
        <div>
            <span className="text-3xl @md:text-4xl font-bold">{price}</span>
            <span className="text-muted-foreground">/{frequency}</span>
        </div>
        <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
            {savings}
        </Badge>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500' : ''}`}
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

const ShippingInfo = () => (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Truck className="size-4" /> Free shipping
        </span>
        <span className="flex items-center gap-1.5">
            <Clock className="size-4" /> Cancel anytime
        </span>
        <span className="flex items-center gap-1.5">
            <MapPin className="size-4" /> Ships worldwide
        </span>
    </div>
)

const SubscriptionBoxVisual = () => (
    <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-orange-400/20 to-transparent rounded-3xl blur-3xl" />

        {/* Box stack */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Background boxes */}
            <div className="absolute top-8 left-8 w-48 h-48 @md:w-56 @md:h-56 bg-orange-400 rounded-2xl rotate-12 shadow-xl" />
            <div className="absolute top-4 right-12 w-40 h-40 @md:w-48 @md:h-48 bg-pink-400 rounded-2xl -rotate-6 shadow-lg" />

            {/* Main box */}
            <div className="relative w-56 h-56 @md:w-64 @md:h-64 bg-gradient-to-br from-pink-500 to-orange-400 rounded-3xl shadow-2xl flex items-center justify-center">
                <Package className="size-20 @md:size-24 text-white" />

                {/* Ribbon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-16 bg-white rounded-full" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-4 bg-white rounded-full" />
            </div>

            {/* Floating products */}
            <div className="absolute bottom-4 left-0 w-16 h-16 rounded-xl overflow-hidden shadow-lg animate-bounce [animation-duration:3s]">
                <Image
                    src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100"
                    alt="Product"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute top-0 right-0 w-14 h-14 rounded-xl overflow-hidden shadow-lg animate-bounce [animation-duration:4s] [animation-delay:1s]">
                <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100"
                    alt="Product"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    </div>
)

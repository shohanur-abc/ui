import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Crown, Sparkles, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20">
            <LuxuryPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @2xl:grid-cols-2 gap-10 @lg:gap-16 items-center">
                    {/* Content */}
                    <div className="order-2 @2xl:order-1">
                        <Eyebrow icon={Crown} text="Premium Collection" />
                        <Title text="Timeless" highlight="Elegance" />
                        <Subtitle text="Handcrafted with precision, designed for distinction" />
                        <Description text="Discover our exclusive collection of luxury timepieces and accessories. Each piece tells a story of exceptional craftsmanship and enduring style." />

                        <Features items={[
                            { icon: Sparkles, text: 'Handcrafted Excellence' },
                            { icon: Shield, text: 'Lifetime Warranty' },
                        ]} />

                        <CTA items={[
                            { label: 'Explore Luxury', href: '/luxury', icon: ArrowRight },
                            { label: 'Book Consultation', href: '/consultation', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Product Display */}
                    <div className="order-1 @2xl:order-2 relative">
                        <LuxuryProductDisplay />
                    </div>
                </div>
            </div>
        </section>
    )
}

const LuxuryPattern = () => (
    <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-amber-500/50 text-amber-700 dark:text-amber-400">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-2 @md:mb-3">
        {text}
        <br />
        <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-amber-700/80 dark:text-amber-400/80 font-light italic mb-4 @md:mb-6">
        {text}
    </p>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const Features = ({ items }: { items: { icon: ComponentType<{ className?: string }>; text: string }[] }) => (
    <div className="flex flex-wrap gap-4 @md:gap-6 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm">
                <Icon className="size-5 text-amber-600 dark:text-amber-400" />
                <span className="font-medium">{text}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600' : ''}`}
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

const LuxuryProductDisplay = () => (
    <div className="relative">
        {/* Decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 @md:w-96 @md:h-96 rounded-full border-2 border-amber-500/20" />
            <div className="absolute w-72 h-72 @md:w-88 @md:h-88 rounded-full border border-amber-500/10" />
        </div>

        {/* Main product */}
        <div className="relative aspect-square max-w-md mx-auto p-8">
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500/20 shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                    alt="Luxury Watch"
                    fill
                    className="object-cover"
                />
            </div>
        </div>

        {/* Price tag */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white dark:bg-card rounded-full shadow-xl border border-amber-500/20">
            <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Starting at</span>
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">$2,499</span>
            </div>
        </div>
    </div>
)

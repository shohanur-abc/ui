import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Box, Percent, Clock, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <BundlePattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div className="text-white">
                        <Eyebrow icon={Box} text="Bundle & Save" />
                        <Title text="More for" highlight="Less" />
                        <Description text="Save big when you bundle! Combine your favorites and unlock exclusive discounts. The more you add, the more you save." />

                        <SavingsTiers items={[
                            { items: '2 items', discount: '10% OFF' },
                            { items: '3 items', discount: '20% OFF' },
                            { items: '4+ items', discount: '30% OFF' },
                        ]} />

                        <CTA items={[
                            { label: 'Build Your Bundle', href: '/bundle', icon: ArrowRight },
                            { label: 'Popular Bundles', href: '/bundles', variant: 'outline' },
                        ]} />

                        <BundleStats />
                    </div>

                    {/* Bundle Visual */}
                    <div className="relative">
                        <BundleShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const BundlePattern = () => (
    <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%)`,
            backgroundSize: '50px 50px'
        }} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-white/20 text-white border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="text-yellow-400">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-white/80 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const SavingsTiers = ({ items }: { items: { items: string; discount: string }[] }) => (
    <div className="flex flex-wrap gap-3 mb-8 @md:mb-10">
        {items.map(({ items: itemCount, discount }, i) => (
            <div
                key={itemCount}
                className={`p-4 rounded-xl flex items-center gap-3 ${i === items.length - 1 ? 'bg-yellow-400 text-black' : 'bg-white/10'
                    }`}
            >
                <Percent className={`size-5 ${i === items.length - 1 ? 'text-black' : 'text-yellow-400'}`} />
                <div>
                    <div className="font-bold">{discount}</div>
                    <div className={`text-xs ${i === items.length - 1 ? 'text-black/70' : 'text-white/70'}`}>{itemCount}</div>
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
                className={`gap-2 ${i === 0 ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'border-white/30 text-white hover:bg-white/20'}`}
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

const BundleStats = () => (
    <div className="flex flex-wrap gap-6 text-sm text-white/70">
        <span className="flex items-center gap-1">
            <Star className="size-4 text-yellow-400" />
            50K+ bundles sold
        </span>
        <span className="flex items-center gap-1">
            <Clock className="size-4" />
            Avg. $45 saved
        </span>
    </div>
)

const BundleShowcase = () => (
    <div className="relative">
        {/* Main bundle box */}
        <div className="relative aspect-square max-w-md mx-auto">
            {/* Background glow */}
            <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-3xl" />

            {/* Products floating */}
            <div className="relative h-full flex items-center justify-center">
                {/* Center product */}
                <div className="relative w-32 h-32 @md:w-40 @md:h-40 rounded-2xl overflow-hidden shadow-2xl z-10">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
                        alt="Bundle item"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Surrounding products */}
                <div className="absolute top-8 left-8 w-24 h-24 rounded-xl overflow-hidden shadow-lg -rotate-12">
                    <Image
                        src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150"
                        alt="Bundle item"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute top-4 right-12 w-20 h-20 rounded-xl overflow-hidden shadow-lg rotate-6">
                    <Image
                        src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150"
                        alt="Bundle item"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute bottom-12 left-4 w-22 h-22 rounded-xl overflow-hidden shadow-lg rotate-12">
                    <Image
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150"
                        alt="Bundle item"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute bottom-4 right-8 w-24 h-24 rounded-xl overflow-hidden shadow-lg -rotate-6">
                    <Image
                        src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=150"
                        alt="Bundle item"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Savings badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-yellow-400 text-black font-bold text-xl rounded-full shadow-lg">
                SAVE 30%
            </div>
        </div>
    </div>
)

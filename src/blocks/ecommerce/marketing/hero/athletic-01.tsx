import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Dumbbell, Timer, Flame, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gray-900 text-white">
            <GeometricPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Dumbbell} text="Athletic Gear" />
                        <Title text="Perform at Your" highlight="Peak" />
                        <Description text="Engineered for athletes who demand more. Our performance gear combines cutting-edge technology with unmatched comfort to help you break barriers." />

                        <PerformanceMetrics items={[
                            { icon: Flame, value: '40%', label: 'More Breathable' },
                            { icon: Timer, value: '2X', label: 'Faster Dry' },
                            { icon: Zap, value: '360°', label: 'Flexibility' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Performance', href: '/athletic', icon: ArrowRight },
                            { label: 'View Tech Specs', href: '/technology', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Athletic Visual */}
                    <div className="relative">
                        <AthleticShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const GeometricPattern = () => (
    <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-500/20 to-transparent" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-orange-500/20 text-orange-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-black leading-tight tracking-tight mb-4 @md:mb-6 uppercase">
        {text}
        <br />
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const PerformanceMetrics = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center p-4 rounded-xl bg-white/5">
                <Icon className="size-6 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
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
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' : 'border-gray-700 text-white hover:bg-white/10'}`}
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

const AthleticShowcase = () => (
    <div className="relative aspect-[4/5] max-w-md mx-auto">
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/20 rounded-3xl blur-3xl" />

        {/* Main image */}
        <div className="relative h-full rounded-3xl overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
                alt="Athletic performance"
                fill
                className="object-cover"
            />

            {/* Overlay stats */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Pro Series</div>
                        <div className="text-xl font-bold">Training Kit</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-400">From</div>
                        <div className="text-2xl font-bold text-orange-500">$129</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Floating badge */}
        <div className="absolute -top-4 -right-4 px-4 py-2 bg-orange-500 text-black font-bold rounded-full shadow-lg">
            NEW
        </div>
    </div>
)

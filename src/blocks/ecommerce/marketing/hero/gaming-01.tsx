import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gamepad2, Cpu, Monitor, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            <GamingGlowEffects />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Gamepad2} text="Gaming Gear" />
                        <Title text="Level Up" highlight="Your Setup" />
                        <Description text="Dominate the competition with pro-grade gaming gear. From high-refresh monitors to precision controllers, get the edge you need." />

                        <GamingCategories items={[
                            { icon: Monitor, label: 'Monitors' },
                            { icon: Cpu, label: 'PC Parts' },
                            { icon: Gamepad2, label: 'Controllers' },
                        ]} />

                        <FeaturedSpec specs={[
                            { value: '360Hz', label: 'Refresh Rate' },
                            { value: '0.5ms', label: 'Response Time' },
                            { value: 'RGB', label: 'Lighting' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Gaming', href: '/gaming', icon: ArrowRight },
                            { label: 'Build a PC', href: '/build', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Gaming Visual */}
                    <div className="relative">
                        <GamingShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const GamingGlowEffects = () => (
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-600/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-600/20 to-transparent" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-black leading-tight tracking-tight mb-4 @md:mb-6 uppercase">
        {text}
        <br />
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const GamingCategories = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex gap-3 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, label }) => (
            <Link
                key={label}
                href={`/gaming/${label.toLowerCase()}`}
                className="group px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
                <Icon className="size-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{label}</span>
            </Link>
        ))}
    </div>
)

const FeaturedSpec = ({ specs }: { specs: { value: string; label: string }[] }) => (
    <div className="flex gap-6 mb-8 @md:mb-10 p-4 rounded-xl bg-white/5 w-fit">
        {specs.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-gray-700" />}
                <div>
                    <div className="text-xl font-bold text-cyan-400">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                </div>
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
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600' : 'border-gray-700 text-white hover:bg-white/10'}`}
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

const GamingShowcase = () => (
    <div className="relative">
        {/* RGB Glow effects */}
        <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 size-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 size-32 bg-cyan-500/30 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        </div>

        {/* Main product */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            <div className="relative w-72 h-56 @md:w-80 @md:h-64">
                <Image
                    src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500"
                    alt="Gaming Setup"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            {/* Floating badges */}
            <div className="absolute top-0 right-0 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-bold">
                PRO SERIES
            </div>

            <div className="absolute bottom-8 left-0 p-3 bg-white/10 backdrop-blur-sm rounded-xl flex items-center gap-2">
                <Zap className="size-5 text-yellow-400" />
                <span className="text-sm font-medium">Lightning Fast</span>
            </div>
        </div>
    </div>
)

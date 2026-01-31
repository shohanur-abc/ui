import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Music, Headphones, Speaker, Radio } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            <AudioWave />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Music} text="Audio Collection" />
                        <Title text="Sound" highlight="Perfection" />
                        <Description text="Experience audio like never before. From studio-quality headphones to room-filling speakers, discover the perfect sound for every moment." />

                        <AudioCategories items={[
                            { icon: Headphones, label: 'Headphones', count: '45+ products' },
                            { icon: Speaker, label: 'Speakers', count: '30+ products' },
                            { icon: Radio, label: 'Home Audio', count: '25+ products' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Audio', href: '/audio', icon: ArrowRight },
                            { label: 'Compare Products', href: '/compare', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Product Visual */}
                    <div className="relative">
                        <AudioShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const AudioWave = () => (
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-center gap-1 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="w-2 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full"
                    style={{
                        height: `${Math.sin(i * 0.3) * 50 + 60}%`,
                        animationDelay: `${i * 0.05}s`,
                    }}
                />
            ))}
        </div>
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-cyan-500/20 text-cyan-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const AudioCategories = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; count: string }[] }) => (
    <div className="grid grid-cols-3 gap-3 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label, count }) => (
            <Link
                key={label}
                href={`/audio/${label.toLowerCase()}`}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
            >
                <Icon className="size-8 mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-gray-500">{count}</div>
            </Link>
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
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600' : 'border-gray-700 text-white hover:bg-white/10'}`}
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

const AudioShowcase = () => (
    <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-transparent rounded-3xl blur-3xl" />

        {/* Main headphones */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            <div className="relative w-64 h-64 @md:w-80 @md:h-80">
                <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                    alt="Premium Headphones"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            {/* Floating specs */}
            <div className="absolute top-8 right-0 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-xs text-gray-400">Active Noise Cancellation</div>
                <div className="font-bold">40dB</div>
            </div>
            <div className="absolute bottom-8 left-0 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-xs text-gray-400">Battery Life</div>
                <div className="font-bold">60 Hours</div>
            </div>

            {/* Price tag */}
            <div className="absolute bottom-0 right-1/4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg">
                <span className="font-bold">From $299</span>
            </div>
        </div>
    </div>
)

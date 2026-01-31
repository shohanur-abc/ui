import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plane, Palmtree, Camera, Map } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600"
                    alt="Travel destination"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="max-w-2xl text-white">
                    <Eyebrow icon={Plane} text="Travel Essentials" />
                    <Title text="Adventure" highlight="Awaits" />
                    <Description text="Pack smart, travel better. Discover luggage, travel accessories, and gear designed for the modern explorer. Everything you need for your next journey." />

                    <TravelCategories items={[
                        { icon: Map, label: 'Luggage', count: '200+' },
                        { icon: Camera, label: 'Accessories', count: '350+' },
                        { icon: Palmtree, label: 'Beach Gear', count: '150+' },
                    ]} />

                    <CTA items={[
                        { label: 'Shop Travel', href: '/travel', icon: ArrowRight },
                        { label: 'Packing Guide', href: '/guide', variant: 'outline' },
                    ]} />

                    <TrustBadges />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-sky-500/20 text-sky-300 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="text-sky-400">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-white/80 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const TravelCategories = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; count: string }[] }) => (
    <div className="grid grid-cols-3 gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label, count }) => (
            <Link
                key={label}
                href={`/travel/${label.toLowerCase()}`}
                className="p-4 @md:p-5 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-center group"
            >
                <Icon className="size-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-semibold">{label}</div>
                <div className="text-sm text-white/70">{count} items</div>
            </Link>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-sky-500 hover:bg-sky-600' : 'border-white/30 text-white hover:bg-white/20'}`}
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

const TrustBadges = () => (
    <div className="flex flex-wrap gap-6 text-sm text-white/70">
        <span>✓ TSA Approved</span>
        <span>✓ Lifetime Warranty</span>
        <span>✓ Free Returns</span>
    </div>
)

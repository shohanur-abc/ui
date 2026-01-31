import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Tent, Mountain, Compass, Sun } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600"
                    alt="Outdoor adventure"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="max-w-2xl text-white">
                    <Eyebrow icon={Tent} text="Outdoor Gear" />
                    <Title text="Gear Up for" highlight="Adventure" />
                    <Description text="From mountain peaks to forest trails, equip yourself with premium outdoor gear built to withstand any adventure. Tested by explorers, trusted by adventurers." />

                    <ActivityCategories items={[
                        { icon: Mountain, label: 'Hiking' },
                        { icon: Tent, label: 'Camping' },
                        { icon: Compass, label: 'Trekking' },
                        { icon: Sun, label: 'Beach' },
                    ]} />

                    <CTA items={[
                        { label: 'Shop Outdoor', href: '/outdoor', icon: ArrowRight },
                        { label: 'Adventure Guides', href: '/guides', variant: 'outline' },
                    ]} />

                    <TrustBadges />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-green-600/20 text-green-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="text-green-400">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-white/80 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const ActivityCategories = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-3 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <Link
                key={label}
                href={`/outdoor/${label.toLowerCase()}`}
                className="group px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center gap-2"
            >
                <Icon className="size-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{label}</span>
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
                className={`gap-2 ${i === 0 ? 'bg-green-600 hover:bg-green-700' : 'border-white/30 text-white hover:bg-white/20'}`}
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
        <span>✓ Weatherproof</span>
        <span>✓ Lifetime Warranty</span>
        <span>✓ Expert Support</span>
    </div>
)

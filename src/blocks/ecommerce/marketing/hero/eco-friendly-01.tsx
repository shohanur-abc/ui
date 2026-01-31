import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Globe, Recycle, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-green-50 to-background dark:from-green-950/20">
            <LeafPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Leaf} text="Eco-Friendly" />
                        <Title text="Shop" highlight="Sustainably" />
                        <Description text="Every purchase makes a difference. We're committed to eco-friendly packaging, carbon-neutral shipping, and supporting environmental causes." />

                        <ImpactStats items={[
                            { value: '100%', label: 'Recyclable Packaging' },
                            { value: '50K', label: 'Trees Planted' },
                            { value: '0', label: 'Plastic Used' },
                        ]} />

                        <Initiatives items={[
                            { icon: Recycle, title: 'Carbon Neutral', description: 'All shipments offset' },
                            { icon: Heart, title: '1% for Planet', description: 'Every sale gives back' },
                            { icon: Globe, title: 'Local Sourcing', description: 'Supporting communities' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Eco Collection', href: '/eco', icon: ArrowRight },
                            { label: 'Our Impact', href: '/sustainability', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Sustainability Visual */}
                    <div className="relative">
                        <SustainabilityVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const LeafPattern = () => {
    const positions = [
        { top: '10%', left: '5%', width: 32, rotate: 45 },
        { top: '20%', left: '85%', width: 28, rotate: 120 },
        { top: '35%', left: '15%', width: 36, rotate: 200 },
        { top: '45%', left: '75%', width: 30, rotate: 75 },
        { top: '55%', left: '25%', width: 40, rotate: 300 },
        { top: '65%', left: '90%', width: 26, rotate: 150 },
        { top: '75%', left: '10%', width: 34, rotate: 240 },
        { top: '85%', left: '70%', width: 38, rotate: 30 },
        { top: '15%', left: '50%', width: 28, rotate: 180 },
        { top: '60%', left: '55%', width: 32, rotate: 90 },
        { top: '40%', left: '40%', width: 30, rotate: 270 },
        { top: '80%', left: '35%', width: 36, rotate: 330 },
    ]
    return (
        <div className="absolute inset-0 opacity-5 overflow-hidden">
            {positions.map((pos, i) => (
                <Leaf
                    key={i}
                    className="absolute text-green-600"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        width: `${pos.width}px`,
                        transform: `rotate(${pos.rotate}deg)`,
                    }}
                />
            ))}
        </div>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-green-400/50 text-green-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const ImpactStats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-4 mb-6 @md:mb-8">
        {items.map(({ value, label }) => (
            <div key={label} className="text-center p-4 rounded-xl bg-green-500/10">
                <div className="text-2xl @md:text-3xl font-bold text-green-600">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const Initiatives = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="space-y-3 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-green-600" />
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
    <div className="flex flex-wrap gap-3 @md:gap-4">
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

const SustainabilityVisual = () => (
    <div className="relative">
        {/* Earth glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded-full blur-3xl" />

        {/* Main visual */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Earth illustration */}
            <div className="relative w-56 h-56 @md:w-64 @md:h-64 rounded-full overflow-hidden shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500"
                    alt="Earth from space"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Floating eco badges */}
            <div className="absolute top-4 left-0 p-3 bg-white dark:bg-card rounded-xl shadow-lg border flex items-center gap-2">
                <Recycle className="size-5 text-green-600" />
                <span className="text-sm font-medium">Zero Waste</span>
            </div>

            <div className="absolute bottom-4 right-0 p-3 bg-white dark:bg-card rounded-xl shadow-lg border flex items-center gap-2">
                <Leaf className="size-5 text-green-600" />
                <span className="text-sm font-medium">Eco Certified</span>
            </div>

            {/* Product preview */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 p-2 bg-white dark:bg-card rounded-xl shadow-xl border">
                <div className="flex gap-2">
                    <div className="size-12 rounded-lg bg-green-100 flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                    </div>
                    <div>
                        <div className="text-xs text-green-600 font-medium">Eco Package</div>
                        <div className="text-[10px] text-muted-foreground">100% Recycled</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

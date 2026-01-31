import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gift, Heart, Package, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <GiftPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Gift} text="Gift Registry" />
                        <Title text="Create Your" highlight="Wishlist" />
                        <Description text="Build your perfect gift registry for any occasion. Share with friends and family, and get exactly what you want for birthdays, weddings, or holidays." />

                        <OccasionTags items={[
                            { label: 'Wedding', emoji: '💒' },
                            { label: 'Birthday', emoji: '🎂' },
                            { label: 'Baby Shower', emoji: '👶' },
                            { label: 'Housewarming', emoji: '🏠' },
                        ]} />

                        <RegistryFeatures items={[
                            { icon: Package, label: 'Ship anywhere' },
                            { icon: Heart, label: 'Easy sharing' },
                            { icon: Sparkles, label: 'Group gifting' },
                        ]} />

                        <CTA items={[
                            { label: 'Create Registry', href: '/registry/create', icon: ArrowRight },
                            { label: 'Find a Registry', href: '/registry/find', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Registry Visual */}
                    <div className="relative">
                        <RegistryVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const GiftPattern = () => (
    <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L40 20 L35 20 L35 50 L25 50 L25 20 L20 20 Z' fill='currentColor'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
        }} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const OccasionTags = ({ items }: { items: { label: string; emoji: string }[] }) => (
    <div className="flex flex-wrap gap-2 mb-6 @md:mb-8">
        {items.map(({ label, emoji }) => (
            <Link
                key={label}
                href={`/registry/${label.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
            >
                <span>{emoji}</span>
                <span className="text-sm font-medium">{label}</span>
            </Link>
        ))}
    </div>
)

const RegistryFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-rose-500" />
                <span>{label}</span>
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
                className={`gap-2 ${i === 0 ? 'bg-rose-500 hover:bg-rose-600' : ''}`}
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

const RegistryVisual = () => (
    <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/5 rounded-3xl" />

        {/* Registry card */}
        <div className="relative p-6 @md:p-8 bg-card rounded-3xl shadow-xl border max-w-sm mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="size-14 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-2xl">
                    💒
                </div>
                <div>
                    <h3 className="font-bold">Emma & James</h3>
                    <div className="text-sm text-muted-foreground">Wedding - June 15, 2024</div>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span>Registry Progress</span>
                    <span className="font-semibold">18 of 32 items</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[56%] bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
                </div>
            </div>

            {/* Items preview */}
            <div className="space-y-3 mb-6">
                {[
                    { name: 'Stand Mixer', price: '$350', bought: true },
                    { name: 'Bedding Set', price: '$200', bought: true },
                    { name: 'Coffee Machine', price: '$150', bought: false },
                ].map(({ name, price, bought }) => (
                    <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-3">
                            <div className={`size-8 rounded-lg flex items-center justify-center ${bought ? 'bg-green-500/20' : 'bg-muted'}`}>
                                {bought ? <Heart className="size-4 text-green-600 fill-green-600" /> : <Gift className="size-4 text-muted-foreground" />}
                            </div>
                            <span className={`text-sm ${bought ? 'line-through text-muted-foreground' : ''}`}>{name}</span>
                        </div>
                        <span className="text-sm font-medium">{price}</span>
                    </div>
                ))}
            </div>

            <Button className="w-full gap-2 bg-rose-500 hover:bg-rose-600">
                View Full Registry <ArrowRight className="size-4" />
            </Button>
        </div>
    </div>
)

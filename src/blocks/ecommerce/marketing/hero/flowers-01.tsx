import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Flower2, Truck, Heart, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-pink-50 to-background dark:from-pink-950/20">
            <FloralPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Flower2} text="Fresh Flowers" />
                        <Title text="Say It with" highlight="Flowers" />
                        <Description text="Hand-crafted bouquets delivered fresh to your door. Perfect for every occasion – birthdays, anniversaries, or just because." />

                        <OccasionTags items={[
                            'Birthday',
                            'Anniversary',
                            'Thank You',
                            'Sympathy',
                            'Just Because',
                        ]} />

                        <DeliveryInfo items={[
                            { icon: Truck, label: 'Same-day delivery' },
                            { icon: Heart, label: 'Hand-arranged' },
                            { icon: Calendar, label: 'Schedule ahead' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Flowers', href: '/flowers', icon: ArrowRight },
                            { label: 'Subscription', href: '/subscribe', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Flowers Visual */}
                    <div className="relative">
                        <FlowerShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const FloralPattern = () => {
    const positions = [
        { top: '5%', left: '10%', width: 40, rotate: 30 },
        { top: '15%', left: '80%', width: 48, rotate: 120 },
        { top: '25%', left: '20%', width: 36, rotate: 200 },
        { top: '35%', left: '70%', width: 52, rotate: 75 },
        { top: '45%', left: '5%', width: 44, rotate: 300 },
        { top: '55%', left: '90%', width: 38, rotate: 150 },
        { top: '65%', left: '30%', width: 56, rotate: 240 },
        { top: '75%', left: '60%', width: 42, rotate: 45 },
        { top: '85%', left: '15%', width: 50, rotate: 180 },
        { top: '10%', left: '50%', width: 34, rotate: 90 },
        { top: '40%', left: '40%', width: 46, rotate: 270 },
        { top: '70%', left: '85%', width: 40, rotate: 330 },
        { top: '90%', left: '45%', width: 54, rotate: 60 },
        { top: '30%', left: '95%', width: 38, rotate: 210 },
        { top: '60%', left: '55%', width: 48, rotate: 135 },
    ]
    return (
        <div className="absolute inset-0 opacity-5 overflow-hidden">
            {positions.map((pos, i) => (
                <Flower2
                    key={i}
                    className="absolute text-pink-500"
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
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-pink-400/50 text-pink-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const OccasionTags = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2 mb-6 @md:mb-8">
        {items.map((item) => (
            <Link
                key={item}
                href={`/flowers/${item.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-sm hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors"
            >
                {item}
            </Link>
        ))}
    </div>
)

const DeliveryInfo = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <div className="size-8 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <Icon className="size-4 text-pink-600" />
                </div>
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
                className={`gap-2 ${i === 0 ? 'bg-pink-600 hover:bg-pink-700' : ''}`}
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

const FlowerShowcase = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/10 rounded-full blur-3xl" />

        {/* Main bouquet */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            <div className="relative w-72 h-72 @md:w-80 @md:h-80 rounded-full overflow-hidden shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500"
                    alt="Fresh flower bouquet"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Floating product cards */}
            <div className="absolute top-0 left-0 p-3 bg-card rounded-xl shadow-lg">
                <div className="size-16 rounded-lg overflow-hidden relative mb-2">
                    <Image
                        src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=100"
                        alt="Roses"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="text-xs font-medium">Red Roses</div>
                <div className="text-xs text-pink-600">$59</div>
            </div>

            <div className="absolute bottom-0 right-0 p-3 bg-card rounded-xl shadow-lg">
                <div className="size-16 rounded-lg overflow-hidden relative mb-2">
                    <Image
                        src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100"
                        alt="Mixed bouquet"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="text-xs font-medium">Mixed Bouquet</div>
                <div className="text-xs text-pink-600">$79</div>
            </div>

            {/* Price badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-pink-600 text-white rounded-full shadow-lg">
                From $49
            </div>
        </div>
    </div>
)

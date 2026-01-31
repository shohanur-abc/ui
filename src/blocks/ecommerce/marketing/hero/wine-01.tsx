import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Wine, Sparkles, Gift, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            <WinePattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Wine} text="Wine Collection" />
                        <Title text="Curated" highlight="Wines" suffix="from Around the World" />
                        <Description text="Discover exceptional wines handpicked by our sommeliers. From bold reds to crisp whites, explore flavors that tell a story." />

                        <WineCategories items={[
                            { color: 'bg-red-900', label: 'Red', count: '250+' },
                            { color: 'bg-amber-100', label: 'White', count: '180+' },
                            { color: 'bg-pink-300', label: 'Rosé', count: '75+' },
                            { color: 'bg-yellow-400', label: 'Sparkling', count: '100+' },
                        ]} />

                        <CTA items={[
                            { label: 'Explore Wines', href: '/wines', icon: ArrowRight },
                            { label: 'Wine Club', href: '/club', variant: 'outline' },
                        ]} />

                        <AgeVerification />
                    </div>

                    {/* Wine Visual */}
                    <div className="relative">
                        <WineShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const WinePattern = () => (
    <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-gray-950 to-gray-950" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-red-900/30 text-red-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-serif font-normal leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-red-500 italic">{highlight}</span>
        <br />
        <span className="text-2xl @sm:text-3xl @md:text-4xl text-gray-400">{suffix}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const WineCategories = ({ items }: { items: { color: string; label: string; count: string }[] }) => (
    <div className="flex gap-4 mb-8 @md:mb-10">
        {items.map(({ color, label, count }) => (
            <Link key={label} href={`/wines/${label.toLowerCase()}`} className="group text-center">
                <div className={`size-14 @md:size-16 rounded-full ${color} mb-2 group-hover:scale-110 transition-transform shadow-lg`} />
                <div className="text-xs font-medium">{label}</div>
                <div className="text-xs text-gray-500">{count}</div>
            </Link>
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
                className={`gap-2 ${i === 0 ? 'bg-red-800 hover:bg-red-900' : 'border-gray-700 text-white hover:bg-white/10'}`}
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

const AgeVerification = () => (
    <p className="text-xs text-gray-500">
        Must be 21 or older to purchase. Please drink responsibly.
    </p>
)

const WineShowcase = () => (
    <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-transparent rounded-3xl blur-3xl" />

        {/* Wine bottle display */}
        <div className="relative aspect-[3/4] max-w-sm mx-auto flex items-center justify-center">
            <div className="relative w-32 h-80 @md:w-40 @md:h-96">
                <Image
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300"
                    alt="Premium Wine"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            {/* Rating card */}
            <div className="absolute top-8 right-0 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-red-500/20">
                <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="size-3 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <div className="text-xs text-gray-400">93 Points</div>
            </div>

            {/* Gift option */}
            <div className="absolute bottom-8 left-0 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-red-500/20 flex items-center gap-2">
                <Gift className="size-5 text-red-400" />
                <span className="text-sm">Gift wrap available</span>
            </div>
        </div>
    </div>
)

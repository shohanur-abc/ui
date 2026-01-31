import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Droplet, Leaf, FlaskConical } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-purple-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Sparkles} text="Beauty Essentials" />
                        <Title text="Glow from" highlight="Within" />
                        <Description text="Discover skincare and beauty products that celebrate your natural beauty. Clean ingredients, proven results, cruelty-free always." />

                        <IngredientsBadges items={[
                            { icon: Droplet, label: 'Hydrating' },
                            { icon: Leaf, label: 'Vegan' },
                            { icon: FlaskConical, label: 'Dermatologist Tested' },
                        ]} />

                        <BestSellers items={[
                            { image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100', name: 'Glow Serum', price: '$48' },
                            { image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100', name: 'Hydra Cream', price: '$56' },
                            { image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100', name: 'Rose Mist', price: '$32' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Beauty', href: '/beauty', icon: ArrowRight },
                            { label: 'Take Skin Quiz', href: '/quiz', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Beauty Visual */}
                    <div className="relative">
                        <BeautyShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-rose-400/50 text-rose-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const IngredientsBadges = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-3 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, label }) => (
            <Badge key={label} variant="secondary" className="gap-1.5 py-2 px-3 bg-white/60 dark:bg-card">
                <Icon className="size-3.5 text-rose-500" />
                {label}
            </Badge>
        ))}
    </div>
)

const BestSellers = ({ items }: { items: { image: string; name: string; price: string }[] }) => (
    <div className="mb-8 @md:mb-10">
        <div className="text-sm font-medium text-muted-foreground mb-3">Best Sellers</div>
        <div className="flex gap-4">
            {items.map(({ image, name, price }) => (
                <Link key={name} href="#" className="group">
                    <div className="size-16 @md:size-20 rounded-xl overflow-hidden relative mb-2 ring-2 ring-transparent group-hover:ring-rose-400 transition-all">
                        <Image src={image} alt={name} fill className="object-cover" />
                    </div>
                    <div className="text-xs font-medium truncate max-w-16 @md:max-w-20">{name}</div>
                    <div className="text-xs text-muted-foreground">{price}</div>
                </Link>
            ))}
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600' : ''}`}
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

const BeautyShowcase = () => (
    <div className="relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-purple-400/20 rounded-full blur-3xl" />

        {/* Main product display */}
        <div className="relative aspect-square max-w-md mx-auto">
            {/* Center product */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-64 @md:w-56 @md:h-72">
                    <Image
                        src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
                        alt="Featured Product"
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* Floating products */}
            <div className="absolute top-4 left-4 w-20 h-20 rounded-xl overflow-hidden shadow-lg">
                <Image
                    src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100"
                    alt="Product"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute bottom-4 right-4 w-20 h-20 rounded-xl overflow-hidden shadow-lg">
                <Image
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100"
                    alt="Product"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-1/4 left-0 px-4 py-2 bg-white dark:bg-card rounded-full shadow-lg flex items-center gap-2">
                <Sparkles className="size-4 text-rose-500" />
                <span className="text-sm font-semibold">Award Winner</span>
            </div>
        </div>
    </div>
)

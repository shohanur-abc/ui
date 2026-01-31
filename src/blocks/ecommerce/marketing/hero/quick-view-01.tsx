import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, ShoppingCart, Heart, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Zap} text="Quick View" />
                        <Title text="Shop" highlight="Faster" />
                        <Description text="Explore products without leaving the page. Quick view lets you see details, choose options, and add to cart in seconds." />

                        <QuickViewDemo />

                        <QuickViewFeatures items={[
                            { icon: Clock, label: '3x faster shopping' },
                            { icon: ShoppingCart, label: 'Instant add to cart' },
                            { icon: Heart, label: 'Quick wishlist' },
                        ]} />

                        <CTA items={[
                            { label: 'Start Shopping', href: '/shop', icon: ArrowRight },
                        ]} />
                    </div>

                    {/* Quick View Visual */}
                    <div className="relative">
                        <QuickViewVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const QuickViewDemo = () => (
    <div className="mb-6 @md:mb-8 p-4 rounded-xl bg-muted/50 border">
        <div className="flex items-center gap-3 text-sm">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="size-4 text-primary" />
            </div>
            <span>Hover or click on any product to open Quick View</span>
        </div>
    </div>
)

const QuickViewFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-primary" />
                <span>{label}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const QuickViewVisual = () => (
    <div className="relative">
        {/* Product grid background */}
        <div className="grid grid-cols-2 gap-3 opacity-50">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted" />
            ))}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-4 bg-card rounded-2xl shadow-2xl border p-4 @md:p-6 flex flex-col">
            <div className="flex gap-4 flex-1">
                {/* Product image */}
                <div className="relative w-1/2 aspect-square rounded-xl overflow-hidden bg-muted shrink-0">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                        alt="Product"
                        fill
                        className="object-cover"
                    />
                    <button className="absolute top-2 right-2 size-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white">
                        <Heart className="size-4" />
                    </button>
                </div>

                {/* Product info */}
                <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-1">Premium Watch</h3>
                    <div className="text-muted-foreground text-sm mb-2">Titanium Series</div>
                    <div className="text-xl font-bold mb-3">$299</div>

                    {/* Options */}
                    <div className="mb-3">
                        <div className="text-xs text-muted-foreground mb-1">Color</div>
                        <div className="flex gap-1">
                            {['bg-black', 'bg-gray-400', 'bg-amber-700'].map((color) => (
                                <button key={color} className={`size-5 rounded-full ${color} ring-1 ring-border`} />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2">
                        <Button size="sm" className="flex-1 gap-1">
                            <ShoppingCart className="size-3" /> Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {/* Close hint */}
            <div className="text-center text-xs text-muted-foreground mt-3">
                Press ESC or click outside to close
            </div>
        </div>

        {/* Speed indicator */}
        <div className="absolute -top-4 right-4 px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full shadow-lg flex items-center gap-1.5">
            <Zap className="size-4" />
            Quick View
        </div>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Layers, Check, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Layers} text="Build Your Set" />
                        <Title text="Mix, Match," highlight="Save" />
                        <Description text="Create your perfect set and save up to 30%. Choose your products, customize your bundle, and watch the savings add up." />

                        <BundleBuilder />

                        <BundlePerks items={[
                            'Free shipping on all bundles',
                            'Save more with more items',
                            'Easy returns on any item',
                        ]} />

                        <CTA items={[
                            { label: 'Start Building', href: '/bundle/create', icon: ArrowRight },
                            { label: 'Pre-Made Sets', href: '/bundles', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Bundle Visual */}
                    <div className="relative">
                        <BundleVisual />
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
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const BundleBuilder = () => (
    <div className="p-5 @md:p-6 rounded-2xl bg-muted/50 border mb-6 @md:mb-8">
        <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Your Bundle</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-600">Save 25%</Badge>
        </div>

        {[
            { name: 'Base Product', price: '$49', qty: 1 },
            { name: 'Add-on Item', price: '$29', qty: 2 },
            { name: 'Accessory', price: '$19', qty: 1 },
        ].map(({ name, price, qty }) => (
            <div key={name} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-card" />
                    <div>
                        <div className="font-medium text-sm">{name}</div>
                        <div className="text-sm text-muted-foreground">{price}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="size-7 rounded-full border flex items-center justify-center hover:bg-muted">
                        <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center font-medium">{qty}</span>
                    <button className="size-7 rounded-full border flex items-center justify-center hover:bg-muted">
                        <Plus className="size-3" />
                    </button>
                </div>
            </div>
        ))}

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div>
                <div className="text-sm text-muted-foreground">Bundle Total</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">$97</span>
                    <span className="text-sm text-muted-foreground line-through">$126</span>
                </div>
            </div>
            <Button>Add to Cart</Button>
        </div>
    </div>
)

const BundlePerks = ({ items }: { items: string[] }) => (
    <div className="space-y-2 mb-8 @md:mb-10">
        {items.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-green-500" />
                <span>{item}</span>
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

const BundleVisual = () => (
    <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
        {/* Stacked products */}
        <div className="relative w-full h-full">
            {/* Product 1 */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 @md:w-40 @md:h-40 bg-card rounded-2xl shadow-xl p-4 rotate-6">
                <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
                    alt="Product 1"
                    fill
                    className="object-contain p-4"
                />
            </div>

            {/* Product 2 */}
            <div className="absolute top-1/3 right-1/4 w-28 h-28 @md:w-36 @md:h-36 bg-card rounded-2xl shadow-xl p-4 -rotate-6">
                <Image
                    src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200"
                    alt="Product 2"
                    fill
                    className="object-contain p-4"
                />
            </div>

            {/* Product 3 */}
            <div className="absolute bottom-1/4 left-1/3 w-24 h-24 @md:w-32 @md:h-32 bg-card rounded-2xl shadow-xl p-3 rotate-3">
                <Image
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200"
                    alt="Product 3"
                    fill
                    className="object-contain p-3"
                />
            </div>

            {/* Savings badge */}
            <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg">
                Save $29
            </div>
        </div>
    </div>
)

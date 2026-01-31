import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Tag, Percent, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-yellow-50 to-background dark:from-yellow-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Tag} text="Clearance Event" />
                        <Title text="Up to" highlight="70% Off" suffix="Everything" />
                        <Description text="Our biggest clearance event of the year! Shop thousands of items at unbeatable prices. While supplies last." />

                        <DiscountTiers items={[
                            { range: '$50+', discount: '30% OFF', code: 'CLEAR30' },
                            { range: '$100+', discount: '50% OFF', code: 'CLEAR50' },
                            { range: '$200+', discount: '70% OFF', code: 'CLEAR70' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Clearance', href: '/clearance', icon: ArrowRight },
                            { label: 'View All Deals', href: '/deals', variant: 'outline' },
                        ]} />

                        <StockWarning />
                    </div>

                    {/* Product Stack */}
                    <div className="relative">
                        <ClearanceStack />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="destructive" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-yellow-500">{highlight}</span>
        <br />
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const DiscountTiers = ({ items }: { items: { range: string; discount: string; code: string }[] }) => (
    <div className="space-y-3 mb-8 @md:mb-10">
        {items.map(({ range, discount, code }) => (
            <div key={code} className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-3">
                    <Percent className="size-5 text-yellow-600" />
                    <div>
                        <span className="font-medium">Spend {range}</span>
                        <span className="text-muted-foreground"> → </span>
                        <span className="font-bold text-yellow-600">{discount}</span>
                    </div>
                </div>
                <Badge variant="outline" className="font-mono">{code}</Badge>
            </div>
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
                className={`gap-2 ${i === 0 ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}`}
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

const StockWarning = () => (
    <div className="flex items-center gap-2 text-sm text-destructive">
        <ShoppingBag className="size-4" />
        <span>Limited stock available - shop now before it&apos;s gone!</span>
    </div>
)

const ClearanceStack = () => (
    <div className="relative aspect-square max-w-md mx-auto">
        {/* Sale tags */}
        <div className="absolute top-0 left-0 z-20 px-4 py-2 bg-yellow-500 text-black font-bold text-xl rounded-lg shadow-lg -rotate-12 animate-bounce [animation-duration:2s]">
            -70%
        </div>
        <div className="absolute top-20 right-0 z-20 px-3 py-1.5 bg-red-500 text-white font-bold rounded-lg shadow-lg rotate-12">
            -50%
        </div>

        {/* Product images */}
        <div className="grid grid-cols-2 gap-3 p-4">
            {[
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
                'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
            ].map((src, i) => (
                <div key={i} className={`relative aspect-square rounded-2xl overflow-hidden shadow-xl ${i % 2 === 1 ? 'mt-8' : ''}`}>
                    <Image src={src} alt={`Clearance item ${i + 1}`} fill className="object-cover" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded">
                        SALE
                    </div>
                </div>
            ))}
        </div>
    </div>
)

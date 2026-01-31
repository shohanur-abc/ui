import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone, Monitor, Headphones, Camera } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
            <TechGrid />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow text="Tech & Electronics" />
                        <Title text="Next-Gen" highlight="Technology" />
                        <Description text="Discover the latest in consumer electronics. From smartphones to smart home devices, find cutting-edge tech at unbeatable prices." />

                        <CategoryChips items={[
                            { icon: Smartphone, label: 'Phones' },
                            { icon: Monitor, label: 'Computers' },
                            { icon: Headphones, label: 'Audio' },
                            { icon: Camera, label: 'Cameras' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Tech', href: '/tech', icon: ArrowRight },
                            { label: 'Compare Products', href: '/compare', variant: 'outline' },
                        ]} />

                        <TrustIndicators />
                    </div>

                    {/* Product Showcase */}
                    <div className="relative">
                        <TechShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const TechGrid = () => (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent)] opacity-20" />
)

const Eyebrow = ({ text }: { text: string }) => (
    <Badge className="mb-4 @md:mb-6 bg-blue-500 hover:bg-blue-600 px-4 py-2">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const CategoryChips = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-2 @md:gap-3 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <Link
                key={label}
                href={`/category/${label.toLowerCase()}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 border transition-colors"
            >
                <Icon className="size-4 text-blue-500" />
                <span className="text-sm font-medium">{label}</span>
            </Link>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8 @md:mb-10">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
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

const TrustIndicators = () => (
    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        <span>✓ 2-Year Warranty</span>
        <span>✓ Free Tech Support</span>
        <span>✓ Price Match Guarantee</span>
    </div>
)

const TechShowcase = () => (
    <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-3xl blur-3xl" />

        {/* Main product */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 @md:p-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
                    alt="Latest Tech"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Floating specs */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                New Release
            </div>
        </div>

        {/* Price card */}
        <div className="absolute -bottom-4 left-4 right-4 bg-card rounded-2xl p-4 shadow-xl border flex items-center justify-between">
            <div>
                <div className="text-xs text-muted-foreground">Starting at</div>
                <div className="text-2xl font-bold">$999</div>
            </div>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                Shop Now
            </Button>
        </div>
    </div>
)

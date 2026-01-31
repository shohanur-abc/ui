import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Glasses, Eye, Sparkles, ShieldCheck } from 'lucide-react'
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
                        <Eyebrow icon={Glasses} text="Eyewear Collection" />
                        <Title text="See the World" highlight="In Style" />
                        <Description text="Designer frames and premium lenses for every lifestyle. From classic styles to modern trends, find your perfect pair." />

                        <StyleCategories items={[
                            { label: 'Classic', count: '120+' },
                            { label: 'Modern', count: '85+' },
                            { label: 'Sporty', count: '60+' },
                            { label: 'Luxury', count: '40+' },
                        ]} />

                        <LensFeatures items={[
                            { icon: Eye, label: 'Blue Light Filter' },
                            { icon: ShieldCheck, label: 'UV Protection' },
                            { icon: Sparkles, label: 'Anti-Scratch' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Eyewear', href: '/eyewear', icon: ArrowRight },
                            { label: 'Virtual Try-On', href: '/try-on', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Eyewear Visual */}
                    <div className="relative">
                        <EyewearShowcase />
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
        {text}
        <br />
        <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const StyleCategories = ({ items }: { items: { label: string; count: string }[] }) => (
    <div className="flex flex-wrap gap-3 mb-6 @md:mb-8">
        {items.map(({ label, count }) => (
            <Link
                key={label}
                href={`/eyewear/${label.toLowerCase()}`}
                className="px-5 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
                <div className="font-semibold">{label}</div>
                <div className="text-xs text-muted-foreground">{count} frames</div>
            </Link>
        ))}
    </div>
)

const LensFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
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

const EyewearShowcase = () => (
    <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-3xl" />

        {/* Glasses display */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Main glasses */}
            <div className="relative w-72 h-48 @md:w-80 @md:h-56">
                <Image
                    src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"
                    alt="Designer eyewear"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            {/* Try-on preview */}
            <div className="absolute top-4 left-0 w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white">
                <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                    alt="Virtual try-on preview"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Frame options */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {['bg-black', 'bg-amber-700', 'bg-gray-400', 'bg-blue-900'].map((color, i) => (
                    <button
                        key={color}
                        className={`size-8 rounded-full ${color} ${i === 0 ? 'ring-2 ring-primary ring-offset-2' : ''} shadow-lg`}
                    />
                ))}
            </div>

            {/* Price tag */}
            <div className="absolute bottom-4 right-0 px-4 py-2 bg-card rounded-xl shadow-lg">
                <div className="text-xs text-muted-foreground">From</div>
                <div className="font-bold text-lg">$129</div>
            </div>
        </div>
    </div>
)

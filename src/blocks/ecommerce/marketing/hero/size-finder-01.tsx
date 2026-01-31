import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shirt, Palette, Ruler, Eye } from 'lucide-react'
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
                        <Eyebrow icon={Ruler} text="Size Guide" />
                        <Title text="Find Your" highlight="Perfect Fit" />
                        <Description text="Say goodbye to sizing guesswork. Use our smart size finder to get personalized size recommendations based on your measurements." />

                        <SizeOptions />

                        <FitFeatures items={[
                            { icon: Ruler, label: 'Accurate Measurements' },
                            { icon: Eye, label: 'Virtual Try-On' },
                            { icon: Palette, label: 'Style Preview' },
                        ]} />

                        <CTA items={[
                            { label: 'Find My Size', href: '/size-finder', icon: ArrowRight },
                            { label: 'Size Charts', href: '/size-guide', variant: 'outline' },
                        ]} />

                        <FitGuarantee />
                    </div>

                    {/* Size Finder Visual */}
                    <div className="relative">
                        <SizeFinderVisual />
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

const SizeOptions = () => (
    <div className="mb-6 @md:mb-8">
        <div className="text-sm font-medium mb-3">Quick Size Check</div>
        <div className="flex gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, i) => (
                <button
                    key={size}
                    className={`size-12 rounded-xl font-semibold transition-colors ${i === 2
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                        }`}
                >
                    {size}
                </button>
            ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
            Based on your previous orders, we recommend <strong>M</strong>
        </p>
    </div>
)

const FitFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
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
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
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

const FitGuarantee = () => (
    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-sm">
        <strong className="text-green-600">Free exchanges if it doesn&apos;t fit!</strong>
        <span className="text-muted-foreground"> We&apos;ll cover return shipping on size exchanges.</span>
    </div>
)

const SizeFinderVisual = () => (
    <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />

        {/* Main visual */}
        <div className="relative aspect-[4/5] max-w-md mx-auto flex items-center justify-center">
            {/* Model with size overlay */}
            <div className="relative w-56 h-80 @md:w-64 @md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"
                    alt="Size guide model"
                    fill
                    className="object-cover"
                />

                {/* Measurement lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Chest measurement */}
                    <div className="absolute top-1/4 left-0 right-0 flex items-center justify-center">
                        <div className="w-3/4 h-px bg-primary opacity-70" />
                        <div className="absolute px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                            Chest: 38&quot;
                        </div>
                    </div>

                    {/* Waist measurement */}
                    <div className="absolute top-1/2 left-0 right-0 flex items-center justify-center">
                        <div className="w-2/3 h-px bg-primary opacity-70" />
                        <div className="absolute px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                            Waist: 32&quot;
                        </div>
                    </div>
                </div>
            </div>

            {/* Size recommendation card */}
            <div className="absolute -bottom-4 -right-4 p-4 bg-card rounded-2xl shadow-xl border">
                <div className="text-xs text-muted-foreground mb-1">Recommended Size</div>
                <div className="text-3xl font-bold text-primary mb-1">M</div>
                <div className="text-xs text-green-600">98% confidence</div>
            </div>

            {/* Measurement tool */}
            <div className="absolute -top-4 -left-4 p-3 bg-card rounded-xl shadow-lg border">
                <Ruler className="size-6 text-primary" />
            </div>
        </div>
    </div>
)

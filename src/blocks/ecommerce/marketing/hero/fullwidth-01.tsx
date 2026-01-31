import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Shield, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative min-h-screen flex items-center overflow-hidden">
            {/* Full-width Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-2xl">
                    <Eyebrow text="Exclusive Launch" />
                    <Title text="Elevate Your" highlight="Style" />
                    <Description text="Experience luxury redefined with our premium collection. Handcrafted with precision, designed for those who appreciate the finer things." />

                    <TrustBadges items={[
                        { icon: Star, text: '5-Star Reviews' },
                        { icon: Shield, text: '2-Year Warranty' },
                        { icon: RefreshCw, text: '30-Day Returns' },
                    ]} />

                    <CTA items={[
                        { label: 'Explore Collection', href: '/collection', icon: ArrowRight },
                        { label: 'Watch Video', href: '#video', variant: 'outline' },
                    ]} />

                    <PriceTag originalPrice="$299" salePrice="$199" />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge className="mb-4 @md:mb-6 px-4 py-2">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const TrustBadges = ({ items }: { items: { icon: ComponentType<{ className?: string }>; text: string }[] }) => (
    <div className="flex flex-wrap gap-4 @md:gap-6 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
                <div className="size-8 @md:size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="size-4 @md:size-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{text}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8 @md:mb-10">
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

const PriceTag = ({ originalPrice, salePrice }: { originalPrice: string; salePrice: string }) => (
    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-card/80 backdrop-blur-sm border">
        <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
        <span className="text-2xl @md:text-3xl font-bold text-primary">{salePrice}</span>
        <Badge variant="destructive" className="text-xs">Save 33%</Badge>
    </div>
)

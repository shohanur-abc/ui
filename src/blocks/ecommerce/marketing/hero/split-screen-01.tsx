import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Star, Truck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <BackgroundDecorative />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div className="order-2 @2xl:order-1">
                        <Eyebrow icon={Sparkles} text="New Collection" />
                        <Title text="Summer" highlight="2026" suffix="Collection" />
                        <Description text="Discover our latest arrivals featuring sustainable materials and timeless designs. Made for the modern lifestyle." />

                        <Features items={[
                            { icon: Truck, text: 'Free shipping over $100' },
                            { icon: Star, text: '4.9/5 customer rating' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Now', href: '/shop', icon: ArrowRight },
                            { label: 'View Lookbook', href: '/lookbook', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Image */}
                    <div className="order-1 @2xl:order-2 relative">
                        <HeroImage
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                            alt="Summer Collection"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const BackgroundDecorative = () => (
    <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
        <br />
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const Features = ({ items }: { items: { icon: ComponentType<{ className?: string }>; text: string }[] }) => (
    <div className="flex flex-wrap gap-4 @md:gap-6 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-primary" />
                {text}
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

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square @sm:aspect-4/3 @2xl:aspect-square rounded-2xl @md:rounded-3xl overflow-hidden">
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
)

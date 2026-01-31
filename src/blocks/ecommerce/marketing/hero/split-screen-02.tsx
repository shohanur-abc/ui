import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Timer, Percent } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Image with Sale Badge */}
                    <div className="relative">
                        <HeroImage
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
                            alt="Flash Sale"
                        />
                        <SaleBadge discount="50" />
                    </div>

                    {/* Content */}
                    <div>
                        <Eyebrow icon={Timer} text="Limited Time Offer" />
                        <Title text="Flash" highlight="Sale" />
                        <Description text="Get up to 50% off on selected items. Don't miss out on our biggest sale of the season with exclusive deals on trending products." />

                        <CountdownTimer />

                        <CTA items={[
                            { label: 'Shop the Sale', href: '/sale', icon: ArrowRight },
                            { label: 'View All Deals', href: '/deals', variant: 'outline' },
                        ]} />
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

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-5xl @sm:text-6xl @md:text-7xl @xl:text-8xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-destructive to-destructive/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const CountdownTimer = () => (
    <div className="flex gap-3 @md:gap-4 mb-8 @md:mb-10">
        {[
            { value: '02', label: 'Days' },
            { value: '14', label: 'Hours' },
            { value: '36', label: 'Mins' },
            { value: '52', label: 'Secs' },
        ].map(({ value, label }) => (
            <div key={label} className="text-center">
                <div className="text-2xl @sm:text-3xl @md:text-4xl font-bold bg-card border rounded-xl px-3 @md:px-4 py-2 @md:py-3 mb-1">
                    {value}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
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
    <div className="relative aspect-square rounded-2xl @md:rounded-3xl overflow-hidden shadow-2xl">
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
        />
    </div>
)

const SaleBadge = ({ discount }: { discount: string }) => (
    <div className="absolute top-4 @md:top-6 right-4 @md:right-6 bg-destructive text-destructive-foreground rounded-full size-20 @md:size-24 flex flex-col items-center justify-center shadow-lg animate-bounce [animation-duration:2s]">
        <Percent className="size-4 @md:size-5" />
        <span className="text-2xl @md:text-3xl font-bold">{discount}</span>
        <span className="text-xs">OFF</span>
    </div>
)

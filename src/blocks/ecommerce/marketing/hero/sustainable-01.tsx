import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Recycle, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-green-50/50 to-background dark:from-green-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div className="order-2 @2xl:order-1">
                        <Eyebrow icon={Leaf} text="Eco-Friendly" />
                        <Title text="Fashion That Cares for the" highlight="Planet" />
                        <Description text="Our sustainable collection is crafted from recycled materials and organic fabrics. Look good, feel good, do good." />

                        <ImpactStats items={[
                            { icon: Recycle, value: '1M+', label: 'Plastic bottles recycled' },
                            { icon: Leaf, value: '50%', label: 'Less water usage' },
                            { icon: Heart, value: '100%', label: 'Ethically made' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Sustainable', href: '/sustainable', icon: ArrowRight },
                            { label: 'Our Impact', href: '/impact', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Image */}
                    <div className="order-1 @2xl:order-2 relative">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
                                alt="Sustainable Fashion"
                                fill
                                className="object-cover"
                            />
                            <EcoBadge />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-green-500/50 text-green-600 dark:text-green-400">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const ImpactStats = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid @sm:grid-cols-3 gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                <Icon className="size-5 text-green-600 dark:text-green-400 shrink-0" />
                <div>
                    <div className="font-bold text-lg">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className={`gap-2 ${i === 0 ? 'bg-green-600 hover:bg-green-700' : ''}`} asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const EcoBadge = () => (
    <div className="absolute top-4 right-4 px-4 py-2 bg-green-600 text-white rounded-full flex items-center gap-2 shadow-lg">
        <Leaf className="size-4" />
        <span className="text-sm font-medium">Eco-Certified</span>
    </div>
)

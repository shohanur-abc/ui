import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Baby, Heart, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-pink-50 to-background dark:from-pink-950/20">
            <FloatingShapes />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Baby} text="Kids Collection" />
                        <Title text="Little Ones" highlight="Big Adventures" />
                        <Description text="Safe, comfortable, and oh-so-cute! Our kids' collection is designed with love and made for play. Explore clothing, toys, and essentials for your little explorer." />

                        <SafetyBadges items={[
                            { icon: Shield, label: 'Safety Certified' },
                            { icon: Heart, label: 'Organic Materials' },
                            { icon: Star, label: 'Parent Approved' },
                        ]} />

                        <AgeGroups items={[
                            { range: '0-2', label: 'Baby' },
                            { range: '2-5', label: 'Toddler' },
                            { range: '5-10', label: 'Kids' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Kids', href: '/kids', icon: ArrowRight },
                            { label: 'Baby Registry', href: '/registry', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Kids Visual */}
                    <div className="relative">
                        <KidsShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 size-32 rounded-full bg-yellow-300/20 blur-xl" />
        <div className="absolute top-40 right-32 size-24 rounded-full bg-pink-300/30 blur-xl" />
        <div className="absolute bottom-20 left-1/3 size-40 rounded-full bg-blue-300/20 blur-xl" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-pink-400/50 text-pink-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text},{' '}
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const SafetyBadges = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-3 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, label }) => (
            <Badge key={label} variant="secondary" className="gap-1.5 py-2 px-3">
                <Icon className="size-3.5" />
                {label}
            </Badge>
        ))}
    </div>
)

const AgeGroups = ({ items }: { items: { range: string; label: string }[] }) => (
    <div className="flex gap-4 mb-8 @md:mb-10">
        {items.map(({ range, label }) => (
            <Link
                key={range}
                href={`/kids/${label.toLowerCase()}`}
                className="flex-1 p-4 rounded-xl bg-white dark:bg-card border text-center hover:border-pink-400 transition-colors group"
            >
                <div className="text-2xl font-bold text-pink-500 group-hover:scale-110 transition-transform">
                    {range}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </Link>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' : ''}`}
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

const KidsShowcase = () => (
    <div className="relative">
        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 @md:gap-6">
            {[
                { image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', label: 'Clothing' },
                { image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', label: 'Toys' },
                { image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400', label: 'Accessories' },
                { image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', label: 'Essentials' },
            ].map(({ image, label }, i) => (
                <Link
                    key={label}
                    href={`/kids/${label.toLowerCase()}`}
                    className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'row-span-2' : ''}`}
                >
                    <div className={`relative ${i === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                        <Image
                            src={image}
                            alt={label}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white font-semibold">
                            {label}
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        {/* Floating discount */}
        <div className="absolute -top-4 -right-4 px-4 py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg animate-bounce [animation-duration:2s]">
            20% OFF
        </div>
    </div>
)

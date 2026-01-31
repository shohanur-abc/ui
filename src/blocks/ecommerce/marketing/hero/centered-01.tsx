import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Truck, RotateCcw, Shield, CreditCard } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                    <div className="text-center max-w-4xl mx-auto">
                        <Eyebrow text="Welcome to Our Store" />
                        <Title text="Shop the Latest" highlight="Trends" />
                        <Description text="Discover thousands of products from top brands at unbeatable prices. Fast shipping, easy returns, and exceptional customer service." />

                        <CTA items={[
                            { label: 'Start Shopping', href: '/shop', icon: ArrowRight },
                            { label: 'View Categories', href: '/categories', variant: 'outline' },
                        ]} />

                        {/* Featured Categories */}
                        <FeaturedCategories items={[
                            { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300', name: 'Fashion' },
                            { image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300', name: 'Electronics' },
                            { image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300', name: 'Home' },
                            { image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300', name: 'Beauty' },
                        ]} />
                    </div>
                </div>
            </div>

            {/* Trust Banner */}
            <TrustBanner items={[
                { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
                { icon: RotateCcw, title: 'Easy Returns', description: '30-day return policy' },
                { icon: Shield, title: 'Secure Payment', description: '256-bit encryption' },
                { icon: CreditCard, title: 'Flexible Payment', description: 'Buy now, pay later' },
            ]} />
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 px-4 py-2">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 @md:mb-10">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-10 @md:mb-12">
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

const FeaturedCategories = ({ items }: { items: { image: string; name: string }[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-3 @md:gap-4">
        {items.map(({ image, name }) => (
            <Link
                key={name}
                href={`/category/${name.toLowerCase()}`}
                className="group relative aspect-square rounded-2xl overflow-hidden"
            >
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg @md:text-xl">{name}</span>
                </div>
            </Link>
        ))}
    </div>
)

const TrustBanner = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="border-t border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-6 @md:py-8">
            <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6 @md:gap-8">
                {items.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-center gap-3 @md:gap-4">
                        <div className="size-10 @md:size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="size-5 @md:size-6 text-primary" />
                        </div>
                        <div>
                            <div className="font-semibold text-sm @md:text-base">{title}</div>
                            <div className="text-xs @md:text-sm text-muted-foreground">{description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

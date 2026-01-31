import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Apple, Leaf, Clock, Truck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-green-50 to-background dark:from-green-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Apple} text="Fresh Groceries" />
                        <Title text="Farm Fresh to" highlight="Your Door" />
                        <Description text="Get the freshest produce, quality meats, and pantry essentials delivered straight to your home. Same-day delivery available in select areas." />

                        <FreshGuarantee items={[
                            { icon: Leaf, label: '100% Fresh Guarantee' },
                            { icon: Clock, label: 'Same-Day Delivery' },
                            { icon: Truck, label: 'Free Delivery $50+' },
                        ]} />

                        <PopularCategories items={[
                            { image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100', label: 'Fruits' },
                            { image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=100', label: 'Vegetables' },
                            { image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100', label: 'Dairy' },
                            { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100', label: 'Bakery' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Groceries', href: '/groceries', icon: ArrowRight },
                            { label: 'View Weekly Deals', href: '/deals', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Grocery Visual */}
                    <div className="relative">
                        <GroceryShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-green-500/50 text-green-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const FreshGuarantee = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Icon className="size-4 text-green-600" />
                </div>
                <span>{label}</span>
            </div>
        ))}
    </div>
)

const PopularCategories = ({ items }: { items: { image: string; label: string }[] }) => (
    <div className="mb-8 @md:mb-10">
        <div className="text-sm font-medium text-muted-foreground mb-3">Popular Categories</div>
        <div className="flex gap-3">
            {items.map(({ image, label }) => (
                <Link key={label} href={`/groceries/${label.toLowerCase()}`} className="group text-center">
                    <div className="size-16 @md:size-20 rounded-full overflow-hidden relative mb-2 ring-2 ring-green-500/20 group-hover:ring-green-500 transition-all">
                        <Image src={image} alt={label} fill className="object-cover" />
                    </div>
                    <div className="text-xs font-medium">{label}</div>
                </Link>
            ))}
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-green-600 hover:bg-green-700' : ''}`}
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

const GroceryShowcase = () => (
    <div className="relative">
        {/* Decorative circles */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-64 @md:size-80 rounded-full border-4 border-dashed border-green-200 dark:border-green-800" />
        </div>

        {/* Main image */}
        <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 @md:w-72 @md:h-72 rounded-full overflow-hidden shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1543168256-418811576931?w=500"
                        alt="Fresh groceries"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Floating items */}
            <div className="absolute top-4 left-8 w-16 h-16 rounded-xl overflow-hidden shadow-lg animate-bounce [animation-duration:3s]">
                <Image
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100"
                    alt="Fruits"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute top-1/3 right-4 w-16 h-16 rounded-xl overflow-hidden shadow-lg animate-bounce [animation-duration:4s] [animation-delay:1s]">
                <Image
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100"
                    alt="Dairy"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute bottom-8 right-8 w-16 h-16 rounded-xl overflow-hidden shadow-lg animate-bounce [animation-duration:3.5s] [animation-delay:0.5s]">
                <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100"
                    alt="Bakery"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Delivery badge */}
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-white dark:bg-card rounded-full shadow-lg flex items-center gap-2">
                <Truck className="size-4 text-green-600" />
                <span className="text-sm font-semibold">Delivery in 2hrs</span>
            </div>
        </div>
    </div>
)

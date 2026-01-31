import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, RefreshCw, Calendar, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Sparkles} text="New Arrivals" />
                        <Title text="Fresh Drops" highlight="Every Week" />
                        <Description text="Stay ahead of the curve with our latest arrivals. New styles land every week, curated to keep your wardrobe fresh and on-trend." />

                        <DropSchedule />

                        <NewArrivalsPreview items={[
                            { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300', name: 'Summer Dress', price: '$89' },
                            { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300', name: 'Linen Blazer', price: '$159' },
                            { image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300', name: 'Wide Pants', price: '$79' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop New Arrivals', href: '/new', icon: ArrowRight },
                            { label: 'Get Notified', href: '/notify', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <NewArrivalsShowcase />
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
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const DropSchedule = () => (
    <div className="flex items-center gap-4 mb-6 @md:mb-8 p-4 rounded-xl bg-muted/50 border">
        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="size-6 text-primary" />
        </div>
        <div>
            <div className="font-semibold">Next Drop: Friday 9AM EST</div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
                <RefreshCw className="size-3" /> Updated weekly
            </div>
        </div>
    </div>
)

const NewArrivalsPreview = ({ items }: { items: { image: string; name: string; price: string }[] }) => (
    <div className="flex gap-4 mb-8 @md:mb-10 overflow-x-auto pb-2">
        {items.map(({ image, name, price }) => (
            <Link key={name} href="#" className="group shrink-0">
                <div className="size-20 @md:size-24 rounded-xl overflow-hidden relative mb-2 ring-2 ring-transparent group-hover:ring-primary transition-all">
                    <Image src={image} alt={name} fill className="object-cover" />
                    <Badge className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5">NEW</Badge>
                </div>
                <div className="text-xs font-medium truncate max-w-20 @md:max-w-24">{name}</div>
                <div className="text-xs text-muted-foreground">{price}</div>
            </Link>
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

const NewArrivalsShowcase = () => (
    <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />

        {/* Main image with stacked effect */}
        <div className="relative aspect-[4/5] max-w-sm mx-auto p-6">
            {/* Back cards */}
            <div className="absolute top-8 left-8 right-8 bottom-0 rounded-2xl bg-muted/50 transform rotate-3" />
            <div className="absolute top-4 left-4 right-4 bottom-4 rounded-2xl bg-muted/80 transform -rotate-2" />

            {/* Main card */}
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500"
                    alt="New Arrival"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge className="mb-2">Just Dropped</Badge>
                    <div className="text-xl font-bold mb-1">Summer Collection</div>
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span>Already trending</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

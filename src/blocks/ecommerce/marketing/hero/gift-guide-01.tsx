import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Gift, Heart, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <GiftPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12">
                    <Eyebrow icon={Gift} text="Gift Guide" />
                    <Title text="Find the Perfect" highlight="Gift" />
                    <Description text="Not sure what to get? Use our gift finder to discover thoughtful presents for everyone on your list." />

                    <GiftFinder />
                </div>

                {/* Gift Categories */}
                <GiftCategories items={[
                    { image: 'https://images.unsplash.com/photo-1513884923967-4b182ef167ab?w=300', label: 'For Her', count: '500+ gifts' },
                    { image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300', label: 'For Him', count: '400+ gifts' },
                    { image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300', label: 'For Kids', count: '300+ gifts' },
                    { image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300', label: 'For Home', count: '250+ gifts' },
                ]} />

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/gifts">
                            Browse All Gifts <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const GiftPattern = () => (
    <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10">
            <Gift className="size-24" />
        </div>
        <div className="absolute bottom-20 right-20">
            <Heart className="size-32" />
        </div>
        <div className="absolute top-1/2 right-1/4">
            <Gift className="size-16" />
        </div>
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 @md:mb-10">
        {text}
    </p>
)

const GiftFinder = () => (
    <div className="flex flex-col @sm:flex-row gap-3 max-w-xl mx-auto">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search for gifts..."
                className="pl-10 h-12"
            />
        </div>
        <Button size="lg" className="gap-2 h-12">
            Find Gifts <ArrowRight className="size-4" />
        </Button>
    </div>
)

const GiftCategories = ({ items }: { items: { image: string; label: string; count: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5">
        {items.map(({ image, label, count }) => (
            <Link
                key={label}
                href={`/gifts/${label.toLowerCase().replace(' ', '-')}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
                <Image
                    src={image}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 @md:p-6 text-white">
                    <h3 className="text-xl @md:text-2xl font-bold mb-1">{label}</h3>
                    <p className="text-white/80 text-sm">{count}</p>
                </div>

                {/* Hover icon */}
                <div className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="size-5 text-white" />
                </div>
            </Link>
        ))}
    </div>
)

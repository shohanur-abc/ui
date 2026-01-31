import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shirt, Recycle, Heart, Leaf } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-10 @md:mb-14">
                    <Badge variant="outline" className="mb-4 border-teal-500/50 text-teal-600">
                        <Recycle className="size-3 mr-1" /> Pre-Loved Fashion
                    </Badge>
                    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
                        Second Chance,{' '}
                        <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                            First Class Style
                        </span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Shop authenticated pre-owned luxury and designer pieces. Sustainable fashion that&apos;s good for your wallet and the planet.
                    </p>
                </div>

                {/* Stats */}
                <ImpactStats items={[
                    { icon: Recycle, value: '50K+', label: 'Items Rescued' },
                    { icon: Heart, value: '100%', label: 'Authenticated' },
                    { icon: Leaf, value: '70%', label: 'Less Carbon' },
                ]} />

                {/* Featured Items Grid */}
                <FeaturedItems />

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
                        <Button size="lg" className="gap-2 bg-teal-600 hover:bg-teal-700" asChild>
                            <Link href="/resale">
                                Shop Pre-Loved <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2" asChild>
                            <Link href="/sell">
                                Sell Your Items
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const ImpactStats = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6 mb-10 @md:mb-12">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="p-5 @md:p-6 rounded-2xl bg-teal-500/5 border border-teal-500/10 text-center">
                <Icon className="size-8 mx-auto mb-3 text-teal-600" />
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const FeaturedItems = () => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-5">
        {[
            { image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', brand: 'Louis Vuitton', item: 'Neverfull MM', original: '$1,960', price: '$1,299', condition: 'Excellent' },
            { image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', brand: 'Chanel', item: 'Classic Flap', original: '$8,200', price: '$5,999', condition: 'Very Good' },
            { image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', brand: 'Gucci', item: 'Ace Sneakers', original: '$650', price: '$399', condition: 'Good' },
            { image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400', brand: 'Hermès', item: 'Silk Scarf', original: '$435', price: '$289', condition: 'Excellent' },
        ].map(({ image, brand, item, original, price, condition }) => (
            <Link key={item} href="#" className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                    <Image
                        src={image}
                        alt={item}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-teal-600">{condition}</Badge>
                </div>
                <div className="font-semibold text-sm">{brand}</div>
                <div className="text-sm text-muted-foreground mb-1">{item}</div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-600">{price}</span>
                    <span className="text-sm text-muted-foreground line-through">{original}</span>
                </div>
            </Link>
        ))}
    </div>
)

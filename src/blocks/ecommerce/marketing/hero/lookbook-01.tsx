import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bookmark, Palette, Sofa, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-10 @md:mb-14">
                    <Badge variant="secondary" className="mb-4">
                        <Bookmark className="size-3 mr-1" /> Curated Collections
                    </Badge>
                    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
                        Shop the <span className="text-primary">Look</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Complete room designs curated by our interior experts. Get the entire look with one click.
                    </p>
                </div>

                {/* Featured Look */}
                <FeaturedLookbook />

                {/* Additional Looks */}
                <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6 mt-8">
                    <LookCard
                        image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500"
                        title="Scandinavian Living"
                        items={8}
                        price="$2,499"
                    />
                    <LookCard
                        image="https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=500"
                        title="Modern Bedroom"
                        items={6}
                        price="$1,899"
                    />
                    <LookCard
                        image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
                        title="Minimalist Kitchen"
                        items={12}
                        price="$3,299"
                    />
                </div>

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/lookbook">
                            View All Looks <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const FeaturedLookbook = () => (
    <div className="relative rounded-3xl overflow-hidden">
        <div className="grid @lg:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-[4/3] @lg:aspect-auto">
                <Image
                    src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800"
                    alt="Featured room design"
                    fill
                    className="object-cover"
                />
                {/* Product hotspots */}
                <div className="absolute top-1/4 left-1/3 group">
                    <button className="size-6 rounded-full bg-white shadow-lg flex items-center justify-center animate-pulse">
                        <span className="size-2 rounded-full bg-primary" />
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <div className="text-xs font-medium">Velvet Sofa</div>
                        <div className="text-xs text-muted-foreground">$1,299</div>
                    </div>
                </div>
                <div className="absolute top-1/2 right-1/4 group">
                    <button className="size-6 rounded-full bg-white shadow-lg flex items-center justify-center animate-pulse [animation-delay:0.5s]">
                        <span className="size-2 rounded-full bg-primary" />
                    </button>
                </div>
            </div>

            {/* Content side */}
            <div className="p-6 @md:p-10 bg-muted flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4">
                    <Sparkles className="size-3 mr-1" /> Editor&apos;s Pick
                </Badge>
                <h2 className="text-2xl @md:text-3xl font-bold mb-4">Bohemian Paradise</h2>
                <p className="text-muted-foreground mb-6">
                    A warm and inviting living space that blends natural textures, earthy tones, and artisanal pieces.
                </p>

                {/* Products in look */}
                <div className="mb-6">
                    <div className="text-sm font-medium mb-3">Includes 10 items</div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="size-14 rounded-lg bg-card shrink-0" />
                        ))}
                        <div className="size-14 rounded-lg bg-card/50 shrink-0 flex items-center justify-center text-sm text-muted-foreground">
                            +5
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-muted-foreground">Complete Look</div>
                        <div className="text-2xl font-bold">$4,299</div>
                    </div>
                    <Button className="gap-2" asChild>
                        <Link href="/lookbook/bohemian">
                            Shop This Look <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
)

interface LookCardProps {
    image: string
    title: string
    items: number
    price: string
}

const LookCard = ({ image, title, items, price }: LookCardProps) => (
    <Link href="#" className="group">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
                <div className="font-bold text-lg">{title}</div>
                <div className="text-sm text-white/80">{items} items</div>
            </div>
        </div>
        <div className="flex items-center justify-between">
            <span className="font-bold">{price}</span>
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                View Look →
            </span>
        </div>
    </Link>
)

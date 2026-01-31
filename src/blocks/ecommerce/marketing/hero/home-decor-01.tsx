import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Home, Sofa, Lamp, Paintbrush } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-10 @md:mb-14">
                    <Badge variant="secondary" className="mb-4">
                        <Home className="size-3 mr-1" /> Home Decor
                    </Badge>
                    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
                        Make Your House a{' '}
                        <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Home</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover furniture, decor, and accessories that transform your space into a sanctuary.
                    </p>
                </div>

                {/* Room Showcase */}
                <div className="grid @lg:grid-cols-3 gap-4 @md:gap-6 mb-10 @md:mb-12">
                    <RoomCard
                        image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600"
                        room="Living Room"
                        products={245}
                        featured
                    />
                    <RoomCard
                        image="https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=400"
                        room="Bedroom"
                        products={180}
                    />
                    <RoomCard
                        image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
                        room="Kitchen"
                        products={156}
                    />
                </div>

                {/* Categories */}
                <CategoryPills items={[
                    { icon: Sofa, label: 'Furniture' },
                    { icon: Lamp, label: 'Lighting' },
                    { icon: Paintbrush, label: 'Wall Art' },
                ]} />

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/home">
                            Explore Home Collection <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface RoomCardProps {
    image: string
    room: string
    products: number
    featured?: boolean
}

const RoomCard = ({ image, room, products, featured }: RoomCardProps) => (
    <Link
        href={`/home/${room.toLowerCase().replace(' ', '-')}`}
        className={`group relative rounded-3xl overflow-hidden ${featured ? '@lg:row-span-2' : ''}`}
    >
        <div className={`relative ${featured ? 'aspect-[4/5]' : 'aspect-square'}`}>
            <Image
                src={image}
                alt={room}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
                <h3 className={`text-white font-bold mb-1 ${featured ? 'text-3xl @md:text-4xl' : 'text-xl @md:text-2xl'}`}>
                    {room}
                </h3>
                <p className="text-white/80 text-sm">{products} products</p>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="size-5 text-white" />
            </div>
        </div>
    </Link>
)

const CategoryPills = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {items.map(({ icon: Icon, label }) => (
            <Link
                key={label}
                href={`/home/${label.toLowerCase()}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
                <Icon className="size-5" />
                <span className="font-medium">{label}</span>
            </Link>
        ))}
    </div>
)

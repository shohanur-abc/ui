import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Shirt, Watch, Footprints, Gem } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-10 @md:mb-12">
                    <Eyebrow text="Browse by Category" />
                    <Title text="Shop Your Style" />
                    <Description text="Explore our curated collections across all categories" />
                </div>

                {/* Category Grid */}
                <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5 @xl:gap-6">
                    <CategoryCard
                        icon={Shirt}
                        name="Clothing"
                        count="2,450"
                        image="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400"
                        featured
                    />
                    <CategoryCard
                        icon={Watch}
                        name="Accessories"
                        count="1,230"
                        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                    />
                    <CategoryCard
                        icon={Footprints}
                        name="Footwear"
                        count="890"
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                    />
                    <CategoryCard
                        icon={Gem}
                        name="Jewelry"
                        count="650"
                        image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"
                    />
                </div>

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" variant="outline" className="gap-2" asChild>
                        <Link href="/categories">
                            View All Categories <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3 @md:mb-4">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-lg mx-auto">
        {text}
    </p>
)

interface CategoryCardProps {
    icon: ComponentType<{ className?: string }>
    name: string
    count: string
    image: string
    featured?: boolean
}

const CategoryCard = ({ icon: Icon, name, count, image, featured }: CategoryCardProps) => (
    <Link href={`/category/${name.toLowerCase()}`} className={featured ? '@sm:col-span-2 @xl:col-span-1 @xl:row-span-2' : ''}>
        <Card className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all h-full py-0 ${featured ? 'min-h-80 @xl:min-h-full' : 'min-h-48'}`}>
            <CardContent className="p-0 h-full relative">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 @md:p-6 text-white">
                    <div className="size-10 @md:size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                        <Icon className="size-5 @md:size-6" />
                    </div>
                    <h3 className={`font-bold mb-1 ${featured ? 'text-2xl @md:text-3xl' : 'text-xl'}`}>{name}</h3>
                    <p className="text-white/80 text-sm">{count} Products</p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="size-5 text-white" />
                </div>
            </CardContent>
        </Card>
    </Link>
)

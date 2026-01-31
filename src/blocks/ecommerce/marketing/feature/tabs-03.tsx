'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Gift, Heart, Package, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Collections</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Shop by Category</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Explore curated collections designed for every occasion.</p>
                </div>

                <CategoryTabs items={[
                    {
                        id: 'trending',
                        icon: Sparkles,
                        label: 'Trending',
                        title: 'Trending Now',
                        description: 'The hottest items everyone is talking about. Stay ahead of the curve with our trending selection.',
                        image: 'https://picsum.photos/seed/trending/800/600',
                        stats: { count: '500+', label: 'Products' },
                    },
                    {
                        id: 'new',
                        icon: Package,
                        label: 'New Arrivals',
                        title: 'Fresh & New',
                        description: 'Just landed! Discover the latest additions to our collection, updated weekly.',
                        image: 'https://picsum.photos/seed/newarrivals/800/600',
                        stats: { count: '200+', label: 'New Items' },
                    },
                    {
                        id: 'gifts',
                        icon: Gift,
                        label: 'Gift Ideas',
                        title: 'Perfect Gifts',
                        description: 'Find the perfect present for any occasion. Our gift guide makes giving easy.',
                        image: 'https://picsum.photos/seed/giftideas/800/600',
                        stats: { count: '1000+', label: 'Gift Options' },
                    },
                    {
                        id: 'favorites',
                        icon: Heart,
                        label: 'Best Sellers',
                        title: 'Customer Favorites',
                        description: 'Our most loved products, chosen by customers like you. Quality guaranteed.',
                        image: 'https://picsum.photos/seed/bestsellers/800/600',
                        stats: { count: '4.9', label: 'Avg Rating' },
                    },
                ]} />
            </div>
        </section>
    )
}

interface CategoryItem {
    id: string
    icon: ComponentType<{ className?: string }>
    label: string
    title: string
    description: string
    image: string
    stats: { count: string; label: string }
}

const CategoryTabs = ({ items }: { items: CategoryItem[] }) => (
    <Tabs defaultValue={items[0].id} className="w-full">
        <TabsList className="w-full @md:w-auto h-auto flex-wrap justify-center gap-1 @md:gap-2 p-1.5 mb-8 @md:mb-10">
            {items.map(({ id, icon: Icon, label }) => (
                <TabsTrigger key={id} value={id} className="gap-2 px-4 py-2.5 data-[state=active]:shadow-md">
                    <Icon className="size-4" />
                    <span className="hidden @xs:inline">{label}</span>
                </TabsTrigger>
            ))}
        </TabsList>

        {items.map(({ id, title, description, image, stats }) => (
            <TabsContent key={id} value={id}>
                <div className="grid @xl:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                        <Image src={image} alt={title} fill className="object-cover" />
                    </div>
                    <div>
                        <h3 className="text-2xl @md:text-3xl font-bold mb-4">{title}</h3>
                        <p className="text-muted-foreground mb-6">{description}</p>
                        <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl w-fit">
                            <div className="text-3xl font-bold text-primary">{stats.count}</div>
                            <div className="text-sm text-muted-foreground">{stats.label}</div>
                        </div>
                    </div>
                </div>
            </TabsContent>
        ))}
    </Tabs>
)

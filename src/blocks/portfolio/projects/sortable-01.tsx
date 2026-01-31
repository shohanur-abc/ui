'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowUpRight, ArrowUpDown, Grid3X3, List, LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType, useState } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-8">
                    <div className="max-w-2xl">
                        <Eyebrow icon={ArrowUpDown} text="Sort & Filter" />
                        <Title text="Sortable Portfolio" />
                        <Description text="Explore projects with flexible sorting options." />
                    </div>
                </div>

                <SortableGrid
                    items={[
                        { image: 'https://picsum.photos/seed/sort1/600/400', title: 'E-Commerce Platform', category: 'Web', date: '2025-01-15', views: 2450, href: '#' },
                        { image: 'https://picsum.photos/seed/sort2/600/400', title: 'Mobile Banking App', category: 'Mobile', date: '2024-12-01', views: 3200, href: '#' },
                        { image: 'https://picsum.photos/seed/sort3/600/400', title: 'Analytics Dashboard', category: 'Web', date: '2024-11-20', views: 1890, href: '#' },
                        { image: 'https://picsum.photos/seed/sort4/600/400', title: 'Healthcare Portal', category: 'Web', date: '2025-02-01', views: 980, href: '#' },
                        { image: 'https://picsum.photos/seed/sort5/600/400', title: 'Fitness Tracker', category: 'Mobile', date: '2024-10-15', views: 4100, href: '#' },
                        { image: 'https://picsum.photos/seed/sort6/600/400', title: 'Design System', category: 'UI/UX', date: '2024-09-01', views: 5600, href: '#' },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 mb-3 text-primary">
        <Icon className="size-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface SortableItem {
    image: string
    title: string
    category: string
    date: string
    views: number
    href: string
}

const SortableGrid = ({ items: initialItems }: { items: SortableItem[] }) => {
    const [sortBy, setSortBy] = useState<string>('date')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    const sortedItems = [...initialItems].sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            case 'title':
                return a.title.localeCompare(b.title)
            case 'views':
                return b.views - a.views
            default:
                return 0
        }
    })

    return (
        <div>
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{sortedItems.length} projects</span>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Date (Newest)</SelectItem>
                            <SelectItem value="title">Title (A-Z)</SelectItem>
                            <SelectItem value="views">Most Viewed</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex border rounded-md">
                        <Button 
                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                            size="icon-sm"
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid3X3 className="size-4" />
                        </Button>
                        <Button 
                            variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                            size="icon-sm"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Grid view */}
            {viewMode === 'grid' ? (
                <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
                    {sortedItems.map(({ image, title, category, date, views, href }, i) => (
                        <Card key={i} className="group overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
                            <Link href={href} className="block">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <Badge className="absolute top-3 left-3">{category}</Badge>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                        <span>{views.toLocaleString()} views</span>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            ) : (
                /* List view */
                <div className="space-y-3">
                    {sortedItems.map(({ image, title, category, date, views, href }, i) => (
                        <Link key={i} href={href} className="group flex gap-4 p-3 rounded-lg border bg-card transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
                            <div className="relative size-20 rounded-lg overflow-hidden bg-muted shrink-0">
                                <Image src={image} alt={title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 flex items-center">
                                <div className="flex-1">
                                    <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Badge variant="secondary" className="text-xs">{category}</Badge>
                                        <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                        <span>{views.toLocaleString()} views</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Shop by Image</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Visual Inspiration</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Explore our curated galleries for style inspiration.</p>
                </div>

                <GalleryMasonry items={[
                    { image: 'https://picsum.photos/seed/gallery1/600/800', title: 'Spring Collection', category: 'New' },
                    { image: 'https://picsum.photos/seed/gallery2/600/600', title: 'Accessories', category: 'Trending' },
                    { image: 'https://picsum.photos/seed/gallery3/600/400', title: 'Home Decor', category: 'Featured' },
                    { image: 'https://picsum.photos/seed/gallery4/600/600', title: 'Outdoor', category: 'Sale' },
                    { image: 'https://picsum.photos/seed/gallery5/600/800', title: 'Lifestyle', category: 'New' },
                    { image: 'https://picsum.photos/seed/gallery6/600/500', title: 'Wellness', category: 'Popular' },
                    { image: 'https://picsum.photos/seed/gallery7/600/700', title: 'Tech', category: 'Featured' },
                    { image: 'https://picsum.photos/seed/gallery8/600/450', title: 'Kitchen', category: 'Sale' },
                ]} />
            </div>
        </section>
    )
}

interface GalleryItem {
    image: string
    title: string
    category: string
}

const GalleryMasonry = ({ items }: { items: GalleryItem[] }) => (
    <div className="columns-2 @lg:columns-3 @2xl:columns-4 gap-4 space-y-4">
        {items.map(({ image, title, category }, i) => (
            <Card key={i} className="py-0 break-inside-avoid overflow-hidden group cursor-pointer">
                <div className="relative">
                    <Image
                        src={image}
                        alt={title}
                        width={600}
                        height={600}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/20">{category}</Badge>
                        <h3 className="font-bold text-lg">{title}</h3>
                    </div>
                </div>
            </Card>
        ))}
    </div>
)

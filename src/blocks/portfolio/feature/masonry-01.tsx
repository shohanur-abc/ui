import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Portfolio" />
                    <Title text="Selected Works" />
                    <Description text="A curated collection of projects showcasing my design and development capabilities." />
                </div>

                <MasonryGrid
                    items={[
                        { image: 'https://picsum.photos/seed/masonry1/600/800', title: 'E-Commerce Platform', category: 'Web Development', size: 'tall' },
                        { image: 'https://picsum.photos/seed/masonry2/600/400', title: 'Analytics Dashboard', category: 'UI Design', size: 'normal' },
                        { image: 'https://picsum.photos/seed/masonry3/600/400', title: 'Mobile Banking App', category: 'Mobile', size: 'normal' },
                        { image: 'https://picsum.photos/seed/masonry4/600/600', title: 'Brand Identity', category: 'Design', size: 'square' },
                        { image: 'https://picsum.photos/seed/masonry5/600/400', title: 'SaaS Platform', category: 'Full-Stack', size: 'normal' },
                        { image: 'https://picsum.photos/seed/masonry6/600/800', title: 'Healthcare Portal', category: 'Web Development', size: 'tall' },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface MasonryItem {
    image: string
    title: string
    category: string
    size: 'normal' | 'tall' | 'square'
}

const MasonryGrid = ({ items }: { items: MasonryItem[] }) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 @md:gap-5">
        {items.map(({ image, title, category, size }, i) => (
            <Card
                key={i}
                className={`py-0 mb-4 @md:mb-5 overflow-hidden group cursor-pointer break-inside-avoid ${
                    size === 'tall' ? 'aspect-[3/4]' : size === 'square' ? 'aspect-square' : 'aspect-video'
                }`}
            >
                <CardContent className="p-0 relative h-full">
                    <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 @md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <Badge variant="secondary" className="mb-2 text-xs">
                            {category}
                        </Badge>
                        <h3 className="font-bold text-lg">{title}</h3>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

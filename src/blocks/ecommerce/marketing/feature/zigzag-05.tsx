import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <ZigzagSection items={[
                    {
                        image: 'https://picsum.photos/seed/zigzag10/800/600',
                        badge: 'Limited Edition',
                        eyebrow: 'Exclusive Collection',
                        title: 'Designed for the Extraordinary',
                        description: 'Each piece in our limited edition collection is crafted with meticulous attention to detail, using only the finest materials sourced from around the world.',
                        cta: { text: 'Explore Collection', href: '/limited' },
                        reverse: false,
                    },
                    {
                        image: 'https://picsum.photos/seed/zigzag11/800/600',
                        badge: 'Artisan Made',
                        eyebrow: 'Craftsmanship',
                        title: 'Handcrafted Excellence',
                        description: 'Our artisans bring decades of experience to every product. Each item is individually inspected to ensure it meets our exacting standards.',
                        cta: { text: 'Meet Our Artisans', href: '/artisans' },
                        reverse: true,
                    },
                    {
                        image: 'https://picsum.photos/seed/zigzag12/800/600',
                        badge: 'Sustainable',
                        eyebrow: 'Eco-Conscious',
                        title: 'Luxury Meets Responsibility',
                        description: 'We believe luxury and sustainability go hand in hand. Our commitment to the environment is woven into every aspect of our business.',
                        cta: { text: 'Our Commitment', href: '/sustainability' },
                        reverse: false,
                    },
                ]} />
            </div>
        </section>
    )
}

interface ZigzagItem {
    image: string
    badge: string
    eyebrow: string
    title: string
    description: string
    cta: { text: string; href: string }
    reverse: boolean
}

const ZigzagSection = ({ items }: { items: ZigzagItem[] }) => (
    <div className="space-y-20 @md:space-y-28">
        {items.map(({ image, badge, eyebrow, title, description, cta, reverse }, i) => (
            <div key={i} className={`grid @xl:grid-cols-2 gap-10 @lg:gap-14 items-center`}>
                <div className={`relative ${reverse ? '@xl:order-2' : ''}`}>
                    <div className="aspect-3/2 rounded-2xl @md:rounded-3xl overflow-hidden shadow-2xl">
                        <Image src={image} alt={title} fill className="object-cover" />
                    </div>
                    <Badge className="absolute top-4 left-4">{badge}</Badge>
                </div>

                <div className={reverse ? '@xl:order-1' : ''}>
                    <span className="text-sm font-medium text-primary uppercase tracking-wide">{eyebrow}</span>
                    <h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mt-3 mb-5 leading-tight">{title}</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-8">{description}</p>
                    <Button size="lg" asChild>
                        <Link href={cta.href}>{cta.text}</Link>
                    </Button>
                </div>
            </div>
        ))}
    </div>
)

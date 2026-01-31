import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Truck } from 'lucide-react'
import Image from 'next/image'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <ZigzagFeatures items={[
                    {
                        image: 'https://picsum.photos/seed/zigzag1/800/600',
                        badge: 'Free Shipping',
                        title: 'Lightning-Fast Delivery',
                        description: 'We partner with the best carriers to ensure your orders arrive quickly and safely. Track your package every step of the way.',
                        points: ['Free shipping on orders over $50', 'Same-day dispatch before 2pm', 'Real-time tracking updates', 'Signature on delivery option'],
                        reverse: false,
                    },
                    {
                        image: 'https://picsum.photos/seed/zigzag2/800/600',
                        badge: 'Quality Assured',
                        title: 'Premium Products Only',
                        description: 'Every product in our catalog goes through rigorous quality checks. We only stock items that meet our high standards.',
                        points: ['Authentic products guaranteed', 'Quality inspected before shipping', '2-year warranty included', 'Satisfaction guaranteed'],
                        reverse: true,
                    },
                ]} />
            </div>
        </section>
    )
}

interface ZigzagItem {
    image: string
    badge: string
    title: string
    description: string
    points: string[]
    reverse: boolean
}

const ZigzagFeatures = ({ items }: { items: ZigzagItem[] }) => (
    <div className="space-y-16 @md:space-y-24">
        {items.map(({ image, badge, title, description, points, reverse }, i) => (
            <div key={i} className={`grid @3xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center`}>
                <div className={`relative aspect-4/3 rounded-2xl overflow-hidden ${reverse ? '@3xl:order-2' : ''}`}>
                    <Image src={image} alt={title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>

                <div className={reverse ? '@3xl:order-1' : ''}>
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Truck className="size-3.5" />
                        {badge}
                    </Badge>
                    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{title}</h2>
                    <p className="text-base @md:text-lg text-muted-foreground mb-6 @md:mb-8 leading-relaxed">{description}</p>
                    <ul className="space-y-3 @md:space-y-4">
                        {points.map((point, j) => (
                            <li key={j} className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 @md:size-6 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm @md:text-base">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <ZigzagFeatures items={[
                    {
                        image: 'https://picsum.photos/seed/zigzag6/800/600',
                        badge: 'Personal Shopping',
                        title: 'Your Style, Curated',
                        description: 'Get personalized recommendations based on your preferences and shopping history. Our AI learns what you love.',
                        stats: [
                            { value: '98%', label: 'Match Rate' },
                            { value: '10K+', label: 'Products' },
                        ],
                        cta: { text: 'Get Started', href: '/personalize' },
                        reverse: false,
                    },
                    {
                        image: 'https://picsum.photos/seed/zigzag7/800/600',
                        badge: 'Virtual Try-On',
                        title: 'See Before You Buy',
                        description: 'Use our AR technology to visualize products in your space or try on accessories virtually before purchasing.',
                        stats: [
                            { value: '50%', label: 'Less Returns' },
                            { value: '4.8', label: 'Rating' },
                        ],
                        cta: { text: 'Try Now', href: '/try-on' },
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
    stats: { value: string; label: string }[]
    cta: { text: string; href: string }
    reverse: boolean
}

const ZigzagFeatures = ({ items }: { items: ZigzagItem[] }) => (
    <div className="space-y-16 @md:space-y-24">
        {items.map(({ image, badge, title, description, stats, cta, reverse }, i) => (
            <div key={i} className={`grid @3xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center`}>
                <div className={`relative aspect-4/3 rounded-2xl @md:rounded-3xl overflow-hidden shadow-xl ${reverse ? '@3xl:order-2' : ''}`}>
                    <Image src={image} alt={title} fill className="object-cover" />
                </div>

                <div className={reverse ? '@3xl:order-1' : ''}>
                    <Badge variant="secondary" className="mb-3 @md:mb-4">{badge}</Badge>
                    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{title}</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">{description}</p>

                    <div className="flex gap-8 mb-6 @md:mb-8">
                        {stats.map((stat, j) => (
                            <div key={j}>
                                <div className="text-2xl @md:text-3xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <Button asChild>
                        <Link href={cta.href}>
                            {cta.text} <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        ))}
    </div>
)

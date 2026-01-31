import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <ZigzagFeatures items={[
                    {
                        image: 'https://picsum.photos/seed/zigzag3/800/600',
                        badge: 'Loyalty Program',
                        title: 'Earn While You Shop',
                        description: 'Join our rewards program and earn points on every purchase. Redeem for discounts, free products, and exclusive perks.',
                        points: ['1 point per $1 spent', 'Birthday bonus points', 'Exclusive member sales', 'Free shipping tier'],
                        cta: { text: 'Join Free', href: '/rewards' },
                        reverse: false,
                    },
                    {
                        image: 'https://picsum.photos/seed/zigzag4/800/600',
                        badge: 'Gift Services',
                        title: 'Perfect Gifting Made Easy',
                        description: 'Make every occasion special with our premium gift wrapping and personalization options.',
                        points: ['Elegant gift wrapping', 'Custom gift messages', 'Gift receipt included', 'Direct shipping to recipient'],
                        cta: { text: 'Send a Gift', href: '/gifts' },
                        reverse: true,
                    },
                    {
                        image: 'https://picsum.photos/seed/zigzag5/800/600',
                        badge: 'Expert Support',
                        title: 'Help When You Need It',
                        description: 'Our dedicated support team is here to assist you with any questions or concerns.',
                        points: ['24/7 live chat support', 'Expert product advice', 'Order modifications', 'Returns assistance'],
                        cta: { text: 'Contact Us', href: '/support' },
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
    title: string
    description: string
    points: string[]
    cta: { text: string; href: string }
    reverse: boolean
}

const ZigzagFeatures = ({ items }: { items: ZigzagItem[] }) => (
    <div className="space-y-16 @md:space-y-24">
        {items.map(({ image, badge, title, description, points, cta, reverse }, i) => (
            <div key={i} className={`grid @3xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center`}>
                <div className={`relative aspect-4/3 rounded-2xl @md:rounded-3xl overflow-hidden shadow-lg ${reverse ? '@3xl:order-2' : ''}`}>
                    <Image src={image} alt={title} fill className="object-cover" />
                </div>

                <div className={reverse ? '@3xl:order-1' : ''}>
                    <Badge variant="secondary" className="mb-3 @md:mb-4">{badge}</Badge>
                    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{title}</h2>
                    <p className="text-base @md:text-lg text-muted-foreground mb-6 leading-relaxed">{description}</p>
                    <ul className="grid @sm:grid-cols-2 gap-3 mb-6 @md:mb-8">
                        {points.map((point, j) => (
                            <li key={j} className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span className="text-sm">{point}</span>
                            </li>
                        ))}
                    </ul>
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

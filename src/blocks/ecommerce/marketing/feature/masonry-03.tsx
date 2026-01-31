import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Community</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Join Our Community</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">See what customers are saying. Real stories from real shoppers.</p>
                </div>

                <MasonryTestimonials items={[
                    {
                        quote: 'The best shopping experience I&apos;ve ever had. Fast shipping and amazing customer service!',
                        name: 'Sarah J.',
                        location: 'New York',
                        image: 'https://picsum.photos/seed/user1/80/80',
                        rating: 5,
                    },
                    {
                        quote: 'I love the rewards program. I&apos;ve saved so much on my purchases. The quality is unmatched.',
                        name: 'Michael T.',
                        location: 'Los Angeles',
                        image: 'https://picsum.photos/seed/user2/80/80',
                        rating: 5,
                    },
                    {
                        quote: 'Sustainable packaging and carbon-neutral shipping? Count me in! So glad I found this store.',
                        name: 'Emma R.',
                        location: 'Seattle',
                        image: 'https://picsum.photos/seed/user3/80/80',
                        rating: 5,
                    },
                    {
                        quote: 'The app makes shopping so easy!',
                        name: 'David K.',
                        location: 'Chicago',
                        image: 'https://picsum.photos/seed/user4/80/80',
                        rating: 5,
                    },
                    {
                        quote: 'Free returns saved me. Ordered the wrong size and the exchange was seamless.',
                        name: 'Lisa M.',
                        location: 'Miami',
                        image: 'https://picsum.photos/seed/user5/80/80',
                        rating: 5,
                    },
                    {
                        quote: 'VIP member here! The early access to sales is incredible. Never missing a deal again.',
                        name: 'James W.',
                        location: 'Austin',
                        image: 'https://picsum.photos/seed/user6/80/80',
                        rating: 5,
                    },
                ]} />
            </div>
        </section>
    )
}

interface TestimonialItem {
    quote: string
    name: string
    location: string
    image: string
    rating: number
}

const MasonryTestimonials = ({ items }: { items: TestimonialItem[] }) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 @md:gap-6 space-y-4 @md:space-y-6">
        {items.map(({ quote, name, location, image, rating }, i) => (
            <Card key={i} className="py-0 break-inside-avoid">
                <CardContent className="p-5 @md:p-6">
                    <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: rating }).map((_, j) => (
                            <span key={j} className="text-yellow-500">★</span>
                        ))}
                    </div>
                    <p className="text-sm @md:text-base leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                        <div className="relative size-10 rounded-full overflow-hidden">
                            <Image src={image} alt={name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="font-semibold text-sm">{name}</div>
                            <div className="text-xs text-muted-foreground">{location}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

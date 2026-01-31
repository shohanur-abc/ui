import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Customer Stories</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">What Our Customers Say</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Real experiences from our community of happy shoppers.</p>
                </div>

                <TestimonialsCarousel items={[
                    {
                        quote: 'The quality exceeded my expectations. Fast shipping and beautiful packaging. This is my new favorite store!',
                        name: 'Amanda K.',
                        title: 'Verified Buyer',
                        image: 'https://picsum.photos/seed/testimonial1/100/100',
                        rating: 5,
                        product: 'Premium Collection',
                    },
                    {
                        quote: 'Incredible customer service! They helped me find the perfect gift and even offered free gift wrapping.',
                        name: 'Robert M.',
                        title: 'VIP Member',
                        image: 'https://picsum.photos/seed/testimonial2/100/100',
                        rating: 5,
                        product: 'Gift Box Set',
                    },
                    {
                        quote: 'I love the rewards program. I&apos;ve already earned $50 in points just from my regular shopping.',
                        name: 'Jennifer L.',
                        title: 'Gold Member',
                        image: 'https://picsum.photos/seed/testimonial3/100/100',
                        rating: 5,
                        product: 'Monthly Subscription',
                    },
                    {
                        quote: 'The app is so easy to use. I can track my orders, earn rewards, and shop new arrivals all in one place.',
                        name: 'David S.',
                        title: 'App User',
                        image: 'https://picsum.photos/seed/testimonial4/100/100',
                        rating: 5,
                        product: 'Mobile App',
                    },
                ]} />
            </div>
        </section>
    )
}

interface TestimonialItem {
    quote: string
    name: string
    title: string
    image: string
    rating: number
    product: string
}

const TestimonialsCarousel = ({ items }: { items: TestimonialItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        {items.map(({ quote, name, title, image, rating, product }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-shadow">
                <CardContent className="p-5 @md:p-6">
                    <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: rating }).map((_, j) => (
                            <span key={j} className="text-yellow-500">★</span>
                        ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-5">&ldquo;{quote}&rdquo;</p>
                    <Badge variant="secondary" className="mb-4 text-xs">{product}</Badge>
                    <div className="flex items-center gap-3 pt-4 border-t">
                        <div className="relative size-10 rounded-full overflow-hidden">
                            <Image src={image} alt={name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="font-semibold text-sm">{name}</div>
                            <div className="text-xs text-muted-foreground">{title}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

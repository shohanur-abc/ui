import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">Complete Service</Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
                            Everything You Need for a Perfect Shopping Experience
                        </h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
                            We&apos;ve designed every aspect of our service to make your life easier.
                        </p>
                    </div>

                    <Card className="py-0">
                        <CardContent className="p-6 @md:p-8">
                            <FeatureList items={[
                                'Free shipping on orders over $50',
                                '30-day hassle-free returns',
                                'Price match guarantee',
                                'Secure encrypted checkout',
                                '24/7 customer support',
                                'Real-time order tracking',
                                'Gift wrapping available',
                                'Loyalty rewards program',
                                'Exclusive member discounts',
                                'Same-day dispatch',
                            ]} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="grid @sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
                <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-primary" />
                </div>
                <span className="text-sm @md:text-base">{item}</span>
            </li>
        ))}
    </ul>
)

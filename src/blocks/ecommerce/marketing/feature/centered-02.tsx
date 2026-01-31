import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge variant="secondary" className="mb-4">Premium Benefits</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-6">Everything You Need, All in One Place</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                        From curated collections to exceptional service, we&apos;ve thought of everything to make your shopping experience perfect.
                    </p>

                    <FeatureList items={[
                        'Curated products from 500+ premium brands',
                        'Free 2-day shipping on all orders over $50',
                        'Hassle-free 30-day return policy',
                        'Secure checkout with multiple payment options',
                        'Exclusive member rewards and early access',
                        '24/7 customer support via chat and phone',
                        'Price match guarantee on all items',
                        'Authentic products with quality guarantee',
                    ]} />

                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <Button size="lg" asChild>
                            <Link href="/shop">
                                Start Shopping <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="grid @sm:grid-cols-2 gap-x-8 gap-y-4 text-left max-w-4xl mx-auto">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <span className="text-sm @md:text-base">{item}</span>
            </li>
        ))}
    </ul>
)

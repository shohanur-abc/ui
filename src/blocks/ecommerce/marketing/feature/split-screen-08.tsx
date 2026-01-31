import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @lg:gap-12 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="aspect-4/5 rounded-2xl overflow-hidden">
                                <Image
                                    src="https://picsum.photos/seed/split1/400/500"
                                    alt="Product 1"
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Card className="py-0">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                                    <div className="text-sm text-muted-foreground">5-Star Reviews</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-4 pt-8">
                            <Card className="py-0">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-primary mb-1">2M+</div>
                                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                                </CardContent>
                            </Card>
                            <div className="aspect-4/5 rounded-2xl overflow-hidden">
                                <Image
                                    src="https://picsum.photos/seed/split2/400/500"
                                    alt="Product 2"
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">About Us</Badge>
                        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-6">Curated with Care, Delivered with Love</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p className="text-base @md:text-lg leading-relaxed">
                                We started with a simple mission: to bring the world&apos;s best products to your doorstep. Today, we&apos;re proud to serve millions of customers worldwide.
                            </p>
                            <p className="text-base @md:text-lg leading-relaxed">
                                Every product in our store is carefully selected by our team of experts. We partner with the best brands and artisans to ensure quality, authenticity, and value.
                            </p>
                            <p className="text-base @md:text-lg leading-relaxed">
                                Our commitment to customer satisfaction drives everything we do—from our easy returns policy to our 24/7 customer support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

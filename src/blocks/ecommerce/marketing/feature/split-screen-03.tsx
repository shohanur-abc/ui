import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ShoppingBag, Smartphone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 @3xl:gap-16 items-center">
                    <div className="order-2 @3xl:order-1">
                        <Badge variant="outline" className="mb-3 @md:mb-4">
                            <Smartphone className="size-3.5" />
                            Mobile App
                        </Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
                            Shop Smarter with Our App
                        </h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">
                            Download our app for an even better shopping experience with exclusive features and deals.
                        </p>

                        <ul className="space-y-3 mb-6 @md:mb-8">
                            {[
                                'Exclusive app-only discounts',
                                'Real-time order tracking',
                                'One-tap reordering',
                                'Personalized recommendations',
                                'Early access to sales',
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Check className="size-3 text-primary" />
                                    </div>
                                    <span className="text-sm @md:text-base">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-4">
                            <Button asChild>
                                <Link href="/app">
                                    <ShoppingBag className="size-4" />
                                    Download App
                                </Link>
                            </Button>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                                <span className="text-muted-foreground">4.9 on App Store</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 @3xl:order-2 flex justify-center">
                        <div className="relative w-64 @md:w-72">
                            <div className="aspect-9/16 rounded-3xl overflow-hidden border-8 border-foreground/10 shadow-2xl">
                                <Image
                                    src="https://picsum.photos/seed/mobileapp/400/800"
                                    alt="Mobile app screenshot"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground/10 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Apple, Download, Smartphone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @lg:gap-12 items-center">
                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">
                            <Smartphone className="size-3.5" />
                            Mobile App
                        </Badge>
                        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Shop on the Go</h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">Download our app for a faster, smoother shopping experience with exclusive mobile-only offers.</p>

                        <ul className="space-y-3 mb-8">
                            {[
                                'Push notifications for drops & sales',
                                'Scan & shop with your camera',
                                'Faster checkout with saved info',
                                'Exclusive in-app discounts',
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Star className="size-4 text-primary shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-3">
                            <Button asChild className="gap-2" size="lg">
                                <Link href="/app/ios">
                                    <Apple className="size-5" />
                                    App Store
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="gap-2" size="lg">
                                <Link href="/app/android">
                                    <Download className="size-5" />
                                    Google Play
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square relative max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />
                            <Image
                                src="https://picsum.photos/seed/mobileapp/600/600"
                                alt="Mobile app"
                                fill
                                className="object-cover rounded-2xl"
                            />
                        </div>
                        <Card className="absolute -bottom-4 -left-4 @xl:bottom-8 @xl:-left-8 py-0 shadow-lg">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Star className="size-6 text-primary" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">4.9 Rating</div>
                                    <div className="text-sm text-muted-foreground">50K+ Reviews</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Star, TrendingUp, Zap, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
                    {/* Main Hero Card */}
                    <Card className="@md:col-span-2 @xl:row-span-2 overflow-hidden border-0 shadow-xl py-0">
                        <CardContent className="p-0 h-full relative min-h-80 @xl:min-h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800"
                                alt="Featured Collection"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8 @xl:p-10 text-white">
                                <Badge className="mb-4 bg-white/20 text-white border-0">Featured</Badge>
                                <h1 className="text-3xl @sm:text-4xl @xl:text-5xl font-bold mb-3 leading-tight">
                                    Luxury Essentials
                                </h1>
                                <p className="text-white/80 mb-6 max-w-md text-base @md:text-lg">
                                    Premium quality meets timeless design in our signature collection.
                                </p>
                                <Button size="lg" className="gap-2" asChild>
                                    <Link href="/collection">
                                        Shop Now <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card className="py-0">
                        <CardContent className="p-5 @md:p-6 h-full flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <TrendingUp className="size-5 text-primary" />
                                </div>
                                <span className="font-semibold">Trending Now</span>
                            </div>
                            <div className="text-4xl @md:text-5xl font-bold mb-2">2M+</div>
                            <p className="text-sm text-muted-foreground">Items sold this month</p>
                        </CardContent>
                    </Card>

                    {/* Best Sellers Card */}
                    <Card className="group hover:shadow-lg transition-all py-0">
                        <CardContent className="p-5 @md:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Badge variant="secondary">Best Sellers</Badge>
                                <Star className="size-5 text-yellow-500 fill-yellow-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Top Rated Products</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Discover customer favorites with 4.9+ ratings
                            </p>
                            <Button variant="outline" size="sm" className="gap-2 w-full" asChild>
                                <Link href="/best-sellers">
                                    View All <ArrowRight className="size-3" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* New Arrivals Card */}
                    <Card className="bg-primary text-primary-foreground border-0 py-0">
                        <CardContent className="p-5 @md:p-6">
                            <Zap className="size-8 mb-4" />
                            <h3 className="text-xl font-bold mb-2">New Arrivals</h3>
                            <p className="text-primary-foreground/80 text-sm mb-4">
                                Fresh styles added weekly
                            </p>
                            <Button variant="secondary" size="sm" className="gap-2" asChild>
                                <Link href="/new">
                                    Explore <ArrowRight className="size-3" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Awards Card */}
                    <Card className="py-0">
                        <CardContent className="p-5 @md:p-6 flex items-center gap-4">
                            <div className="size-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                <Award className="size-7 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold">Award Winner</div>
                                <div className="text-sm text-muted-foreground">Best E-commerce 2025</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

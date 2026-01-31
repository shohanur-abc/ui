import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Gift, Heart, Star, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-3 gap-4 @md:gap-6">
                    {/* Large featured image */}
                    <Card className="@xl:col-span-2 @xl:row-span-2 overflow-hidden py-0 group">
                        <div className="relative h-full min-h-80 @xl:min-h-full">
                            <Image
                                src="https://picsum.photos/seed/masonry2/1000/800"
                                alt="Featured collection"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                            <CardContent className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
                                <Badge className="mb-3">Featured</Badge>
                                <h2 className="text-2xl @md:text-3xl @xl:text-4xl font-bold mb-2">Spring Collection</h2>
                                <p className="text-muted-foreground max-w-md mb-4">Discover fresh styles for the new season. Quality craftsmanship meets modern design.</p>
                                <Link href="/collections/spring" className="inline-flex items-center gap-2 text-primary font-medium hover:underline group/link">
                                    Shop Now <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </CardContent>
                        </div>
                    </Card>

                    {/* Feature cards */}
                    <FeatureCard icon={Star} title="Top Picks" description="Curated selection of bestsellers" href="/bestsellers" color="bg-yellow-500/10 text-yellow-600" />
                    <FeatureCard icon={Tag} title="Sale" description="Up to 50% off select items" href="/sale" color="bg-red-500/10 text-red-600" />
                    <FeatureCard icon={Gift} title="Gift Guide" description="Perfect presents for everyone" href="/gifts" color="bg-purple-500/10 text-purple-600" />
                    <FeatureCard icon={Heart} title="Wishlist" description="Save and track your favorites" href="/wishlist" color="bg-pink-500/10 text-pink-600" />
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    href: string
    color: string
}

const FeatureCard = ({ icon: Icon, title, description, href, color }: FeatureCardProps) => (
    <Link href={href} className="block">
        <Card className="h-full py-0 group hover:shadow-md transition-all">
            <CardContent className="p-5 @md:p-6 flex items-center gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="size-6" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </CardContent>
        </Card>
    </Link>
)

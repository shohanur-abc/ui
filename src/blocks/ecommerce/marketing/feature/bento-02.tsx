import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Gift, Heart, Package, Percent, Star } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-3 gap-4 @md:gap-6">
                    {/* Featured large card */}
                    <Card className="@xl:col-span-2 @xl:row-span-2 overflow-hidden py-0 group">
                        <div className="relative h-full min-h-80">
                            <Image
                                src="https://picsum.photos/seed/bento2/800/600"
                                alt="Premium Collection"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                            <CardContent className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
                                <Badge className="mb-3">New Arrival</Badge>
                                <h3 className="text-2xl @md:text-3xl font-bold mb-2">Premium Collection</h3>
                                <p className="text-muted-foreground max-w-md">Discover our exclusive range of handcrafted products made with premium materials.</p>
                            </CardContent>
                        </div>
                    </Card>

                    {/* Smaller feature cards */}
                    <FeatureCards items={[
                        { icon: Star, title: 'Top Rated', description: '4.9/5 customer rating', accent: 'bg-yellow-500/10 text-yellow-600' },
                        { icon: Percent, title: 'Weekly Deals', description: 'Up to 50% off', accent: 'bg-red-500/10 text-red-600' },
                        { icon: Gift, title: 'Gift Cards', description: 'Perfect for any occasion', accent: 'bg-purple-500/10 text-purple-600' },
                        { icon: Heart, title: 'Wishlist', description: 'Save your favorites', accent: 'bg-pink-500/10 text-pink-600' },
                    ]} />
                </div>

                <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6 mt-4 @md:mt-6">
                    <StatCard icon={Package} value="50K+" label="Products" />
                    <StatCard icon={Award} value="100+" label="Brands" />
                    <StatCard icon={Star} value="1M+" label="Happy Customers" />
                </div>
            </div>
        </section>
    )
}

interface FeatureCardItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    accent: string
}

const FeatureCards = ({ items }: { items: FeatureCardItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-1 gap-4 @md:gap-6">
        {items.slice(0, 4).map(({ icon: Icon, title, description, accent }, i) => (
            <Card key={i} className="py-0 hover:shadow-md transition-shadow">
                <CardContent className="p-4 @md:p-5 flex items-center gap-4">
                    <div className={`size-10 @md:size-12 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
                        <Icon className="size-5 @md:size-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const StatCard = ({ icon: Icon, value, label }: { icon: ComponentType<{ className?: string }>; value: string; label: string }) => (
    <Card className="py-0">
        <CardContent className="p-5 @md:p-6 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="size-6 text-primary" />
            </div>
            <div>
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        </CardContent>
    </Card>
)

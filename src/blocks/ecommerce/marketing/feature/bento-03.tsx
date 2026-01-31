import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, Leaf, Recycle, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @lg:grid-cols-6 @xl:grid-cols-12 gap-4 @md:gap-5">
                    {/* Hero card */}
                    <Card className="@lg:col-span-6 @xl:col-span-8 py-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
                        <CardContent className="p-6 @md:p-8 @xl:p-10">
                            <Badge variant="secondary" className="mb-4">Sustainability</Badge>
                            <h2 className="text-2xl @md:text-3xl @xl:text-4xl font-bold mb-4">Shop Green, Live Clean</h2>
                            <p className="text-muted-foreground mb-6 max-w-lg">We&apos;re committed to sustainable practices. Every purchase helps reduce our environmental footprint.</p>
                            <Button asChild>
                                <Link href="/sustainability">
                                    Learn More <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Side cards */}
                    <div className="@lg:col-span-6 @xl:col-span-4 grid @sm:grid-cols-2 @lg:grid-cols-1 gap-4 @md:gap-5">
                        <FeatureCard icon={Leaf} title="Eco-Friendly" description="100% recyclable packaging" color="bg-green-500/10 text-green-600" />
                        <FeatureCard icon={Recycle} title="Carbon Neutral" description="Offset delivery emissions" color="bg-blue-500/10 text-blue-600" />
                    </div>

                    {/* Bottom row */}
                    <FeatureCard icon={Box} title="Minimal Packaging" description="Less waste, more care" color="bg-amber-500/10 text-amber-600" className="@lg:col-span-2 @xl:col-span-3" />
                    <FeatureCard icon={Sparkles} title="Quality Materials" description="Built to last longer" color="bg-purple-500/10 text-purple-600" className="@lg:col-span-2 @xl:col-span-3" />
                    <FeatureCard icon={Zap} title="Fast Shipping" description="Same-day dispatch" color="bg-orange-500/10 text-orange-600" className="@lg:col-span-2 @xl:col-span-3" />

                    <Card className="@lg:col-span-6 @xl:col-span-3 py-0 border-dashed hover:border-solid hover:border-primary transition-colors">
                        <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                            <p className="text-sm text-muted-foreground mb-3">Join our mission</p>
                            <Button variant="outline" size="sm">
                                Get Started <ArrowRight className="size-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
    className?: string
}

const FeatureCard = ({ icon: Icon, title, description, color, className = '' }: FeatureCardProps) => (
    <Card className={`py-0 hover:shadow-md transition-shadow ${className}`}>
        <CardContent className="p-5 @md:p-6 flex items-start gap-4">
            <div className={`size-10 @md:size-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="size-5 @md:size-6" />
            </div>
            <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </CardContent>
    </Card>
)

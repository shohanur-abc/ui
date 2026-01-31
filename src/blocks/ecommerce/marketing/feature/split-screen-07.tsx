import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Leaf, Package, Recycle, Trees, Wind } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @lg:gap-12 items-center">
                    <div className="relative aspect-square @xl:aspect-auto @xl:h-full min-h-96 rounded-2xl @md:rounded-3xl overflow-hidden">
                        <Image
                            src="https://picsum.photos/seed/sustainability/800/800"
                            alt="Sustainability"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/20 backdrop-blur-sm mb-3">Our Commitment</Badge>
                            <p className="text-lg @md:text-xl font-medium">Reducing our carbon footprint by 50% by 2030</p>
                        </div>
                    </div>

                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">
                            <Leaf className="size-3.5" />
                            Sustainability
                        </Badge>
                        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Shop Responsibly</h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-8">We&apos;re committed to sustainable practices that protect our planet for future generations.</p>

                        <ul className="grid @sm:grid-cols-2 gap-4 mb-8">
                            {([
                                { icon: Recycle, title: 'Recyclable Packaging', description: '100% recycled materials' },
                                { icon: Package, title: 'Carbon Neutral', description: 'Offset shipping emissions' },
                                { icon: Trees, title: 'Tree Planting', description: 'One tree per order' },
                                { icon: Wind, title: 'Renewable Energy', description: 'Solar-powered warehouses' },
                            ] satisfies { icon: ComponentType<{ className?: string }>; title: string; description: string }[]).map(({ icon: Icon, title, description }, i) => (
                                <li key={i}>
                                    <Card className="py-0 h-full">
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="size-9 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                                                <Icon className="size-4 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">{title}</h3>
                                                <p className="text-xs text-muted-foreground">{description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </li>
                            ))}
                        </ul>

                        <Button asChild>
                            <Link href="/sustainability">
                                Our Initiatives <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, Clock, Leaf, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 @3xl:gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-4/3 rounded-2xl @md:rounded-3xl overflow-hidden">
                            <Image
                                src="https://picsum.photos/seed/split2/800/600"
                                alt="Sustainable packaging"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <Card className="absolute -bottom-4 -right-4 @md:-bottom-6 @md:-right-6 py-0 shadow-xl">
                            <CardContent className="p-4 @md:p-5 flex items-center gap-3">
                                <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Leaf className="size-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="font-semibold">100% Recyclable</div>
                                    <div className="text-xs text-muted-foreground">Eco-friendly packaging</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Eyebrow text="Sustainability" />
                        <Title text="Better for You, Better for Earth" />
                        <Description text="We're on a mission to make online shopping more sustainable without compromising on quality or convenience." />

                        <FeatureGrid items={[
                            { icon: Leaf, title: 'Carbon Neutral', description: 'All deliveries offset' },
                            { icon: Box, title: 'Zero Waste', description: 'Minimal packaging' },
                            { icon: Shield, title: 'Ethically Sourced', description: 'Verified suppliers' },
                            { icon: Clock, title: 'Long Lasting', description: 'Quality products' },
                        ]} />

                        <Button className="mt-6 @md:mt-8" variant="outline" asChild>
                            <Link href="/sustainability">
                                Learn About Our Mission <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge className="mb-3 @md:mb-4 bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @xs:grid-cols-2 gap-4 mt-6 @md:mt-8">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i} className="flex items-start gap-3">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-4.5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm @md:text-base">{title}</h3>
                    <p className="text-xs @md:text-sm text-muted-foreground">{description}</p>
                </div>
            </li>
        ))}
    </ul>
)

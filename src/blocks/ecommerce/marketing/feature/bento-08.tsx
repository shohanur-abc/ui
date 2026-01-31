import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Percent, Shield, Sparkles, Star, Truck, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <BentoShowcase />
            </div>
        </section>
    )
}

const BentoShowcase = () => (
    <div className="grid @xl:grid-cols-3 @2xl:grid-cols-4 gap-4 @md:gap-6">
        {/* Hero Card */}
        <Card className="py-0 @xl:col-span-2 @2xl:col-span-2 @2xl:row-span-2 overflow-hidden group">
            <div className="relative h-full min-h-80 @2xl:min-h-full">
                <Image
                    src="https://picsum.photos/seed/bentohero/800/800"
                    alt="Featured"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 @md:p-8 text-white">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/20 backdrop-blur-sm mb-3">New Collection</Badge>
                    <h2 className="text-2xl @md:text-3xl @xl:text-4xl font-bold mb-3">Spring Collection 2024</h2>
                    <p className="text-white/80 mb-4 max-w-lg">Discover our latest arrivals featuring fresh designs and sustainable materials.</p>
                    <Button variant="secondary" asChild>
                        <Link href="/new">
                            Shop Now <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </CardContent>
            </div>
        </Card>

        {/* Stats Card */}
        <Card className="py-0 @2xl:col-span-2">
            <CardContent className="p-6 @md:p-8">
                <h3 className="font-bold text-lg mb-4">Why Shop With Us</h3>
                <ul className="grid grid-cols-2 gap-4">
                    {([
                        { icon: Star, value: '4.9', label: 'Rating' },
                        { icon: Truck, value: '24hr', label: 'Delivery' },
                        { icon: Shield, value: '100%', label: 'Secure' },
                        { icon: Zap, value: '2M+', label: 'Customers' },
                    ] satisfies { icon: ComponentType<{ className?: string }>; value: string; label: string }[]).map(({ icon: Icon, value, label }, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">{value}</div>
                                <div className="text-xs text-muted-foreground">{label}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        {/* Feature Cards */}
        {([
            { icon: Percent, title: '20% Off', description: 'First order discount' },
            { icon: Sparkles, title: 'VIP Access', description: 'Early launches' },
        ] satisfies { icon: ComponentType<{ className?: string }>; title: string; description: string }[]).map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="py-0 group hover:border-primary/50 transition-colors">
                <CardContent className="p-5 @md:p-6 h-full flex flex-col">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="size-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

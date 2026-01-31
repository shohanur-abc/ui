import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, CheckCircle2, Gift, Shield, Star, Truck } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-12 gap-4 @md:gap-5">
                    {/* Main feature - spans 8 columns */}
                    <Card className="@xl:col-span-8 @xl:row-span-2 overflow-hidden py-0 group">
                        <div className="grid @md:grid-cols-2 h-full">
                            <div className="relative aspect-video @md:aspect-auto min-h-48">
                                <Image
                                    src="https://picsum.photos/seed/bento5/800/600"
                                    alt="Quality products"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <CardContent className="p-6 @md:p-8 flex flex-col justify-center">
                                <Badge variant="outline" className="w-fit mb-3">
                                    <Award className="size-3.5" />
                                    Premium Quality
                                </Badge>
                                <h2 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3">Uncompromising Quality Standards</h2>
                                <p className="text-muted-foreground mb-4">Every product meets our rigorous quality criteria.</p>
                                <ul className="space-y-2">
                                    {['100% authentic products', 'Multi-point quality checks', 'Satisfaction guaranteed'].map((point, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </div>
                    </Card>

                    {/* Side features - 4 columns */}
                    <FeatureCard icon={Truck} title="Express Shipping" description="Next-day delivery" className="@xl:col-span-4" />
                    <FeatureCard icon={Shield} title="Buyer Protection" description="100% secure shopping" className="@xl:col-span-4" />

                    {/* Bottom row */}
                    <FeatureCard icon={Star} title="Rewards" description="Earn on every purchase" className="@xl:col-span-4" />
                    <FeatureCard icon={Gift} title="Gift Services" description="Beautiful packaging" className="@xl:col-span-4" />
                    <FeatureCard icon={Award} title="Warranty" description="2-year coverage" className="@xl:col-span-4" />
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    className?: string
}

const FeatureCard = ({ icon: Icon, title, description, className = '' }: FeatureCardProps) => (
    <Card className={`py-0 group hover:shadow-md transition-all ${className}`}>
        <CardContent className="p-5 @md:p-6 flex items-center gap-4">
            <div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="size-5 @md:size-6" />
            </div>
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </CardContent>
    </Card>
)

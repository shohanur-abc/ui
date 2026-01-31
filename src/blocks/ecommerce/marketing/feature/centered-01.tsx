import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Clock, Globe, Heart, Shield, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Trusted Worldwide</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">The Complete Shopping Experience</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Everything you need for a seamless online shopping journey.</p>
                </div>

                <FeatureGrid items={[
                    { icon: Globe, title: 'Global Shipping', description: 'We deliver to over 100 countries worldwide with competitive rates.', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                    { icon: Shield, title: 'Secure Shopping', description: 'Bank-level encryption protects your personal and payment information.', color: 'bg-green-500/10 text-green-600 dark:text-green-400' },
                    { icon: Truck, title: 'Fast Delivery', description: 'Express shipping options with same-day dispatch available.', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
                    { icon: Heart, title: 'Customer Love', description: '4.9/5 average rating from over 2 million happy customers.', color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
                    { icon: Award, title: 'Quality Assured', description: 'All products verified for authenticity and quality.', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
                    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer service via chat, email, and phone.', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
                ]} />
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description, color }, i) => (
            <li key={i}>
                <Card className="h-full py-0 group hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <CardContent className="p-6 @md:p-8 text-center">
                        <div className={`size-14 @md:size-16 rounded-2xl flex items-center justify-center mx-auto mb-4 @md:mb-5 ${color} transition-transform group-hover:scale-110`}>
                            <Icon className="size-7 @md:size-8" />
                        </div>
                        <h3 className="text-lg @md:text-xl font-semibold mb-2 @md:mb-3">{title}</h3>
                        <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

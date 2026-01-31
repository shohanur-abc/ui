import { Badge } from '@/components/ui/badge'
import { Gem, Heart, Shield, Sparkles, Star, Verified } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Why We&apos;re Different</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">The Experience You Deserve</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">We go beyond selling products to create memorable shopping moments.</p>
                </div>

                <FeatureGrid items={[
                    { icon: Verified, title: 'Authenticity Promise', description: 'Every item verified genuine' },
                    { icon: Gem, title: 'Premium Selection', description: 'Only the finest quality' },
                    { icon: Heart, title: 'Customer Love', description: '4.9★ from 500K+ reviews' },
                    { icon: Shield, title: 'Protected Shopping', description: 'Full buyer protection' },
                    { icon: Star, title: 'Rewards Program', description: 'Earn on every purchase' },
                    { icon: Sparkles, title: 'Personalized', description: 'Curated just for you' },
                ]} />
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i} className="text-center group">
                <div className="size-16 @md:size-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 @md:mb-5 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all">
                    <Icon className="size-8 @md:size-10" />
                </div>
                <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm @md:text-base text-muted-foreground">{description}</p>
            </li>
        ))}
    </ul>
)

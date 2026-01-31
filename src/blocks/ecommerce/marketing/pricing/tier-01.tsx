import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Crown, Diamond } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Crown} text="Premium Tiers" />
                    <Title text="Choose Your Tier" />
                    <Description text="From basic to legendary, find the tier that matches your ambition." />
                </div>

                <TierCards items={[
                    {
                        icon: Star,
                        tier: 'Bronze',
                        price: '$9',
                        color: 'from-amber-700 to-amber-900',
                        iconColor: 'text-amber-600',
                        features: ['5 projects', '10GB storage', 'Email support']
                    },
                    {
                        icon: Zap,
                        tier: 'Silver',
                        price: '$29',
                        color: 'from-slate-400 to-slate-600',
                        iconColor: 'text-slate-400',
                        features: ['25 projects', '50GB storage', 'Priority support', 'API access']
                    },
                    {
                        icon: Crown,
                        tier: 'Gold',
                        price: '$79',
                        color: 'from-yellow-500 to-amber-600',
                        iconColor: 'text-yellow-500',
                        features: ['Unlimited projects', '200GB storage', '24/7 support', 'Full API', 'Integrations'],
                        popular: true
                    },
                    {
                        icon: Diamond,
                        tier: 'Diamond',
                        price: '$199',
                        color: 'from-cyan-400 to-blue-600',
                        iconColor: 'text-cyan-400',
                        features: ['Everything in Gold', 'Unlimited storage', 'Dedicated manager', 'Custom solutions', 'SLA guarantee']
                    }
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4">
        <Icon className="size-4 mr-1" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface TierItem {
    icon: ComponentType<{ className?: string }>
    tier: string
    price: string
    color: string
    iconColor: string
    features: string[]
    popular?: boolean
}

const TierCards = ({ items }: { items: TierItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map((item, i) => (
            <div
                key={i}
                className={`relative rounded-2xl p-[2px] bg-gradient-to-b ${item.color} ${item.popular ? 'scale-105 shadow-2xl z-10' : ''}`}
            >
                {item.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-0">
                            Most Popular
                        </Badge>
                    </div>
                )}
                <div className="bg-background rounded-2xl p-6 h-full">
                    <div className="text-center mb-6">
                        <div className={`size-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}>
                            <item.icon className="size-7 text-white" />
                        </div>
                        <h3 className={`text-xl font-bold ${item.iconColor}`}>{item.tier}</h3>
                    </div>

                    <div className="text-center mb-6">
                        <span className="text-4xl font-bold">{item.price}</span>
                        <span className="text-muted-foreground">/mo</span>
                    </div>

                    <ul className="space-y-2 mb-6">
                        {item.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                                <Check className={`size-4 ${item.iconColor}`} />
                                {f}
                            </li>
                        ))}
                    </ul>

                    <Button
                        variant={item.popular ? 'default' : 'outline'}
                        className={`w-full ${item.popular ? `bg-gradient-to-r ${item.color} border-0 hover:opacity-90` : ''}`}
                    >
                        Choose {item.tier}
                    </Button>
                </div>
            </div>
        ))}
    </div>
)

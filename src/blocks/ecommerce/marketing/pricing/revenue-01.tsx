"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, Calculator, DollarSign } from 'lucide-react'
import { ComponentType, useState } from 'react'

export default function Main() {
    const [revenue, setRevenue] = useState('10000')

    const revenueNum = parseFloat(revenue) || 0

    const tiers = [
        { max: 10000, percentage: 0, name: 'Free' },
        { max: 50000, percentage: 0.5, name: 'Starter' },
        { max: 250000, percentage: 0.4, name: 'Growth' },
        { max: Infinity, percentage: 0.3, name: 'Scale' }
    ]

    const getCurrentTier = () => {
        for (const tier of tiers) {
            if (revenueNum <= tier.max) return tier
        }
        return tiers[tiers.length - 1]
    }

    const currentTier = getCurrentTier()
    const monthlyFee = revenueNum <= 10000 ? 0 : (revenueNum * currentTier.percentage) / 100

    return (
        <section className="@container">
            <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Calculator} text="Revenue-Based" />
                    <Title text="Pay As You Grow" />
                    <Description text="Your price scales with your success. Free until $10k/month." />
                </div>

                <Card className="border-primary">
                    <CardContent className="p-6 @md:p-10">
                        <div className="grid @md:grid-cols-2 gap-8">
                            <div>
                                <Label htmlFor="revenue" className="text-base font-medium mb-4 block">
                                    Your monthly revenue
                                </Label>
                                <div className="relative mb-6">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                    <Input
                                        id="revenue"
                                        type="number"
                                        value={revenue}
                                        onChange={(e) => setRevenue(e.target.value)}
                                        className="pl-10 text-2xl h-14"
                                        placeholder="10000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm">Pricing Tiers</h4>
                                    {tiers.map((tier, i) => (
                                        <div
                                            key={i}
                                            className={`flex justify-between text-sm p-2 rounded ${currentTier.name === tier.name ? 'bg-primary/10 text-primary font-medium' : ''}`}
                                        >
                                            <span>
                                                {tier.max === Infinity
                                                    ? '$250k+'
                                                    : tier.max === 10000
                                                        ? 'Up to $10k'
                                                        : `$${tiers[i - 1]?.max.toLocaleString() || 0} - $${tier.max.toLocaleString()}`
                                                }
                                            </span>
                                            <span>{tier.percentage === 0 ? 'Free' : `${tier.percentage}%`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="bg-muted rounded-xl p-6 text-center">
                                    <Badge className="mb-4">{currentTier.name} Tier</Badge>
                                    <div className="text-5xl font-bold text-primary mb-2">
                                        ${monthlyFee.toFixed(0)}
                                    </div>
                                    <div className="text-muted-foreground mb-6">per month</div>

                                    {revenueNum <= 10000 && (
                                        <div className="bg-green-500/10 text-green-600 rounded-lg p-3 mb-6 text-sm">
                                            Free until you reach $10k/month in revenue!
                                        </div>
                                    )}

                                    <ul className="space-y-2 text-left mb-6">
                                        {['All features included', 'Unlimited users', 'Priority support', 'No hidden fees'].map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <Check className="size-4 text-primary" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <Button className="w-full" size="lg">Start Free</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4">
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

"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Calculator, Check, Users } from 'lucide-react'
import { ComponentType, useState } from 'react'

export default function Main() {
    const [seats, setSeats] = useState([10])

    const tiers = [
        { min: 1, max: 10, pricePerSeat: 15, name: 'Starter' },
        { min: 11, max: 50, pricePerSeat: 12, name: 'Growth' },
        { min: 51, max: 100, pricePerSeat: 9, name: 'Scale' },
        { min: 101, max: 500, pricePerSeat: 7, name: 'Enterprise' }
    ]

    const currentTier = tiers.find(t => seats[0] >= t.min && seats[0] <= t.max) || tiers[0]
    const totalPrice = seats[0] * currentTier.pricePerSeat

    return (
        <section className="@container">
            <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Calculator} text="Per-Seat Pricing" />
                    <Title text="Scale With Your Team" />
                    <Description text="The more seats, the lower the price per user. Simple and fair." />
                </div>

                <Card className="border-primary">
                    <CardContent className="p-6 @md:p-10">
                        <div className="flex items-center justify-between mb-6">
                            <Label className="text-lg font-medium">Number of seats</Label>
                            <div className="flex items-center gap-2">
                                <Users className="size-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">{seats[0]}</span>
                            </div>
                        </div>

                        <Slider
                            value={seats}
                            onValueChange={setSeats}
                            min={1}
                            max={500}
                            step={1}
                            className="mb-8"
                        />

                        <div className="flex items-center justify-between mb-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{currentTier.name} Tier</Badge>
                                    <span className="text-sm text-muted-foreground">${currentTier.pricePerSeat}/seat/mo</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold">${totalPrice}<span className="text-base text-muted-foreground">/mo</span></div>
                                <div className="text-sm text-muted-foreground">billed monthly</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-6 p-4 bg-muted/50 rounded-lg">
                            {tiers.map((tier, i) => (
                                <div
                                    key={i}
                                    className={`text-center p-2 rounded ${currentTier.name === tier.name ? 'bg-primary text-primary-foreground' : ''}`}
                                >
                                    <div className="text-xs font-medium">{tier.name}</div>
                                    <div className="text-xs opacity-80">{tier.min}-{tier.max === 500 ? '500+' : tier.max} seats</div>
                                    <div className="font-bold text-sm">${tier.pricePerSeat}/seat</div>
                                </div>
                            ))}
                        </div>

                        <ul className="grid @sm:grid-cols-2 gap-2 mb-6">
                            {['Unlimited features', 'Priority support', 'Team analytics', 'Admin controls', 'SSO included', 'Annual discount'].map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <Check className="size-4 text-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col @sm:flex-row gap-4">
                            <Button className="flex-1" size="lg">Start Free Trial</Button>
                            <Button variant="outline" className="flex-1" size="lg">Talk to Sales</Button>
                        </div>
                    </CardContent>
                </Card>
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

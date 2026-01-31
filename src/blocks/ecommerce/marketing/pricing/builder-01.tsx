"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Check, Settings } from 'lucide-react'
import { ComponentType, useState } from 'react'

export default function Main() {
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['core', 'support'])

    const features = [
        { id: 'core', name: 'Core Features', price: 0, description: 'Essential functionality' },
        { id: 'support', name: 'Email Support', price: 0, description: 'Get help when you need it' },
        { id: 'analytics', name: 'Advanced Analytics', price: 15, description: 'Deep insights and reports' },
        { id: 'api', name: 'API Access', price: 20, description: 'Full REST API access' },
        { id: 'priority', name: 'Priority Support', price: 25, description: '2-hour response time' },
        { id: 'integrations', name: 'Custom Integrations', price: 30, description: 'Connect with your tools' },
        { id: 'sso', name: 'SSO & SAML', price: 40, description: 'Enterprise authentication' },
        { id: 'dedicated', name: 'Dedicated Manager', price: 100, description: 'Personal account manager' }
    ]

    const basePrice = 19
    const totalPrice = basePrice + features
        .filter(f => selectedFeatures.includes(f.id))
        .reduce((sum, f) => sum + f.price, 0)

    const toggleFeature = (id: string) => {
        if (id === 'core' || id === 'support') return // These are always included
        setSelectedFeatures(prev =>
            prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id]
        )
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Settings} text="Build Your Plan" />
                    <Title text="Pick What You Need" />
                    <Description text="Only pay for the features you actually use." />
                </div>

                <div className="grid @xl:grid-cols-5 gap-6">
                    <div className="@xl:col-span-3">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Select Features</h3>
                                <div className="space-y-3">
                                    {features.map((feature) => {
                                        const isIncluded = feature.price === 0
                                        const isSelected = selectedFeatures.includes(feature.id)

                                        return (
                                            <div
                                                key={feature.id}
                                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/30'}`}
                                                onClick={() => toggleFeature(feature.id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        disabled={isIncluded}
                                                    />
                                                    <div>
                                                        <div className="font-medium text-sm">{feature.name}</div>
                                                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {isIncluded ? (
                                                        <Badge variant="secondary">Included</Badge>
                                                    ) : (
                                                        <span className="font-semibold">+${feature.price}/mo</span>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="@xl:col-span-2">
                        <Card className="sticky top-6 border-primary">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Your Plan</h3>

                                <div className="space-y-2 mb-4 pb-4 border-b">
                                    <div className="flex justify-between text-sm">
                                        <span>Base price</span>
                                        <span>${basePrice}/mo</span>
                                    </div>
                                    {features
                                        .filter(f => selectedFeatures.includes(f.id) && f.price > 0)
                                        .map(f => (
                                            <div key={f.id} className="flex justify-between text-sm">
                                                <span>{f.name}</span>
                                                <span>+${f.price}/mo</span>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="flex justify-between items-baseline mb-6">
                                    <span className="font-semibold">Total</span>
                                    <div>
                                        <span className="text-3xl font-bold">${totalPrice}</span>
                                        <span className="text-muted-foreground">/mo</span>
                                    </div>
                                </div>

                                <Button className="w-full" size="lg">
                                    Start with This Plan
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
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

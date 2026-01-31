import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Rocket, Target, Trophy, Medal } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Trophy} text="Competition Pricing" />
                    <Title text="How We Stack Up" />
                    <Description text="See why customers choose us over the competition." />
                </div>

                <CompetitorComparison
                    ourBrand={{
                        name: 'Our Platform',
                        icon: Rocket,
                        price: '$29',
                        features: [
                            { name: 'Unlimited projects', value: true },
                            { name: 'API access', value: true },
                            { name: 'Priority support', value: true },
                            { name: 'Custom integrations', value: true },
                            { name: 'Analytics dashboard', value: true },
                            { name: '99.9% uptime SLA', value: true }
                        ]
                    }}
                    competitors={[
                        {
                            name: 'Competitor A',
                            price: '$49',
                            features: [
                                { name: 'Unlimited projects', value: false },
                                { name: 'API access', value: true },
                                { name: 'Priority support', value: false },
                                { name: 'Custom integrations', value: true },
                                { name: 'Analytics dashboard', value: false },
                                { name: '99.9% uptime SLA', value: false }
                            ]
                        },
                        {
                            name: 'Competitor B',
                            price: '$39',
                            features: [
                                { name: 'Unlimited projects', value: true },
                                { name: 'API access', value: false },
                                { name: 'Priority support', value: false },
                                { name: 'Custom integrations', value: false },
                                { name: 'Analytics dashboard', value: true },
                                { name: '99.9% uptime SLA', value: false }
                            ]
                        }
                    ]}
                />
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

interface Feature {
    name: string
    value: boolean
}

interface BrandInfo {
    name: string
    icon?: ComponentType<{ className?: string }>
    price: string
    features: Feature[]
}

interface CompetitorComparisonProps {
    ourBrand: BrandInfo
    competitors: BrandInfo[]
}

const CompetitorComparison = ({ ourBrand, competitors }: CompetitorComparisonProps) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
                <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">Features</th>
                    <th className="p-4 text-center bg-primary/5 border-x border-primary/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {ourBrand.icon && <ourBrand.icon className="size-5 text-primary" />}
                            <span className="font-bold">{ourBrand.name}</span>
                        </div>
                        <span className="text-2xl font-bold text-primary">{ourBrand.price}</span>
                        <span className="text-muted-foreground text-sm">/mo</span>
                    </th>
                    {competitors.map((comp, i) => (
                        <th key={i} className="p-4 text-center opacity-60">
                            <div className="font-semibold mb-2">{comp.name}</div>
                            <span className="text-xl font-bold">{comp.price}</span>
                            <span className="text-muted-foreground text-sm">/mo</span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {ourBrand.features.map((feature, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium">{feature.name}</td>
                        <td className="p-4 text-center bg-primary/5 border-x border-primary/20">
                            {feature.value ? (
                                <Check className="size-5 text-primary mx-auto" />
                            ) : (
                                <span className="text-muted-foreground">—</span>
                            )}
                        </td>
                        {competitors.map((comp, j) => (
                            <td key={j} className="p-4 text-center opacity-60">
                                {comp.features[i]?.value ? (
                                    <Check className="size-5 text-muted-foreground mx-auto" />
                                ) : (
                                    <span className="text-muted-foreground">—</span>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td className="p-4"></td>
                    <td className="p-4 text-center bg-primary/5 border-x border-primary/20">
                        <Button className="w-full max-w-[180px]">Get Started</Button>
                    </td>
                    {competitors.map((_, i) => (
                        <td key={i} className="p-4 text-center opacity-60">
                            <Button variant="ghost" disabled className="w-full max-w-[180px]">N/A</Button>
                        </td>
                    ))}
                </tr>
            </tfoot>
        </table>
    </div>
)

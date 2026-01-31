import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Layers, X } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Layers} text="Compare Plans" />
                    <Title text="Find Your Perfect Fit" />
                    <Description text="Compare all features across our plans to make the best decision." />
                </div>

                <ComparisonTable
                    plans={['Starter', 'Professional', 'Enterprise']}
                    features={[
                        { name: 'Users', values: ['1', '10', 'Unlimited'] },
                        { name: 'Storage', values: ['5GB', '100GB', 'Unlimited'] },
                        { name: 'Projects', values: ['3', '50', 'Unlimited'] },
                        { name: 'API Access', values: [false, true, true] },
                        { name: 'Custom Domain', values: [false, true, true] },
                        { name: 'Analytics', values: ['Basic', 'Advanced', 'Enterprise'] },
                        { name: 'Support', values: ['Email', 'Priority', '24/7 Dedicated'] },
                        { name: 'SSO', values: [false, false, true] },
                        { name: 'Audit Logs', values: [false, false, true] },
                    ]}
                    prices={['$9/mo', '$49/mo', '$199/mo']}
                    ctas={['Start Free', 'Get Pro', 'Contact Sales']}
                    highlighted={1}
                />
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

interface ComparisonTableProps {
    plans: string[]
    features: { name: string; values: (string | boolean)[] }[]
    prices: string[]
    ctas: string[]
    highlighted: number
}

const ComparisonTable = ({ plans, features, prices, ctas, highlighted }: ComparisonTableProps) => (
    <div className="overflow-x-auto">
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">Features</th>
                    {plans.map((plan, i) => (
                        <th key={i} className={`p-4 text-center ${i === highlighted ? 'bg-primary/5' : ''}`}>
                            <div className="font-bold text-lg">{plan}</div>
                            <div className="text-2xl font-bold text-primary mt-1">{prices[i]}</div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {features.map((feature, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium">{feature.name}</td>
                        {feature.values.map((value, j) => (
                            <td key={j} className={`p-4 text-center ${j === highlighted ? 'bg-primary/5' : ''}`}>
                                {typeof value === 'boolean' ? (
                                    value ? (
                                        <Check className="size-5 text-primary mx-auto" />
                                    ) : (
                                        <X className="size-5 text-muted-foreground/40 mx-auto" />
                                    )
                                ) : (
                                    <span className="text-sm">{value}</span>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td className="p-4"></td>
                    {ctas.map((cta, i) => (
                        <td key={i} className={`p-4 text-center ${i === highlighted ? 'bg-primary/5' : ''}`}>
                            <Button variant={i === highlighted ? 'default' : 'outline'} className="w-full max-w-[200px]">
                                {cta}
                            </Button>
                        </td>
                    ))}
                </tr>
            </tfoot>
        </table>
    </div>
)

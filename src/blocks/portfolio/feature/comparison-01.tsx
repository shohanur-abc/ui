import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, HelpCircle, X } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Packages" />
                    <Title text="Service Comparison" />
                    <Description text="Choose the package that best fits your project needs." />
                </div>

                <ComparisonTable
                    features={[
                        { name: 'UI Design', starter: true, pro: true, enterprise: true },
                        { name: 'Responsive Development', starter: true, pro: true, enterprise: true },
                        { name: 'CMS Integration', starter: false, pro: true, enterprise: true },
                        { name: 'E-Commerce Features', starter: false, pro: 'limited', enterprise: true },
                        { name: 'Custom Backend', starter: false, pro: false, enterprise: true },
                        { name: 'Priority Support', starter: false, pro: true, enterprise: true },
                        { name: 'Revisions', starter: '2', pro: '5', enterprise: 'Unlimited' },
                        { name: 'Delivery Time', starter: '2 weeks', pro: '4 weeks', enterprise: '8+ weeks' },
                    ]}
                    packages={[
                        { name: 'Starter', price: '$2,500', cta: 'Get Started' },
                        { name: 'Pro', price: '$7,500', cta: 'Most Popular', highlighted: true },
                        { name: 'Enterprise', price: 'Custom', cta: 'Contact Me' },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureRow {
    name: string
    starter: boolean | string
    pro: boolean | string
    enterprise: boolean | string
}

interface PackageInfo {
    name: string
    price: string
    cta: string
    highlighted?: boolean
}

interface ComparisonTableProps {
    features: FeatureRow[]
    packages: PackageInfo[]
}

const renderCell = (value: boolean | string) => {
    if (value === true) return <Check className="size-5 text-green-600 dark:text-green-500 mx-auto" />
    if (value === false) return <X className="size-5 text-muted-foreground/40 mx-auto" />
    return <span className="text-sm font-medium">{value}</span>
}

const ComparisonTable = ({ features, packages }: ComparisonTableProps) => (
    <Card className="py-0 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-4 @md:p-5 font-semibold">Features</th>
                        {packages.map((pkg, i) => (
                            <th
                                key={i}
                                className={`p-4 @md:p-5 text-center ${
                                    pkg.highlighted ? 'bg-primary/5' : ''
                                }`}
                            >
                                {pkg.highlighted && (
                                    <Badge variant="default" className="mb-2">Popular</Badge>
                                )}
                                <div className="font-bold text-lg">{pkg.name}</div>
                                <div className="text-xl @md:text-2xl font-bold text-primary mt-1">{pkg.price}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature, i) => (
                        <tr key={i} className="border-b last:border-0">
                            <td className="p-4 @md:p-5 text-sm @md:text-base">{feature.name}</td>
                            <td className="p-4 @md:p-5 text-center">{renderCell(feature.starter)}</td>
                            <td className={`p-4 @md:p-5 text-center ${packages[1]?.highlighted ? 'bg-primary/5' : ''}`}>
                                {renderCell(feature.pro)}
                            </td>
                            <td className="p-4 @md:p-5 text-center">{renderCell(feature.enterprise)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-muted/30">
                        <td className="p-4 @md:p-5"></td>
                        {packages.map((pkg, i) => (
                            <td key={i} className={`p-4 @md:p-5 text-center ${pkg.highlighted ? 'bg-primary/5' : ''}`}>
                                <Button variant={pkg.highlighted ? 'default' : 'outline'} className="w-full max-w-[160px]">
                                    {pkg.cta}
                                </Button>
                            </td>
                        ))}
                    </tr>
                </tfoot>
            </table>
        </div>
    </Card>
)

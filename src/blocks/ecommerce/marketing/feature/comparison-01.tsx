import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Box, Check, Clock, CreditCard, Gift, Headphones, Shield, Star, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Service Comparison</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">How We Compare</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">See why more customers choose us over the competition.</p>
                </div>

                <Card className="overflow-hidden py-0">
                    <CardContent className="p-0">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-4 @md:p-6 font-semibold">Feature</th>
                                    <th className="text-center p-4 @md:p-6 font-semibold">
                                        <span className="text-primary">Us</span>
                                    </th>
                                    <th className="text-center p-4 @md:p-6 font-semibold text-muted-foreground">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ComparisonRow icon={Truck} feature="Free Shipping" us="Orders $50+" others="Orders $100+" />
                                <ComparisonRow icon={Clock} feature="Delivery Speed" us="1-2 Days" others="5-7 Days" />
                                <ComparisonRow icon={Box} feature="Returns Period" us="30 Days" others="14 Days" />
                                <ComparisonRow icon={Shield} feature="Buyer Protection" us={true} others={false} />
                                <ComparisonRow icon={Star} feature="Rewards Program" us={true} others={false} />
                                <ComparisonRow icon={Headphones} feature="24/7 Support" us={true} others={false} />
                                <ComparisonRow icon={CreditCard} feature="Pay Later" us={true} others={false} />
                                <ComparisonRow icon={Gift} feature="Gift Wrapping" us="Free" others="$5.99" />
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

interface ComparisonRowProps {
    icon: ComponentType<{ className?: string }>
    feature: string
    us: string | boolean
    others: string | boolean
}

const ComparisonRow = ({ icon: Icon, feature, us, others }: ComparisonRowProps) => (
    <tr className="border-b last:border-0 hover:bg-muted/30 transition-colors">
        <td className="p-4 @md:p-6">
            <div className="flex items-center gap-3">
                <div className="size-8 @md:size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-4 @md:size-5 text-primary" />
                </div>
                <span className="font-medium text-sm @md:text-base">{feature}</span>
            </div>
        </td>
        <td className="p-4 @md:p-6 text-center">
            {typeof us === 'boolean' ? (
                us ? <Check className="size-5 text-primary mx-auto" /> : <span className="text-muted-foreground">-</span>
            ) : (
                <Badge variant="secondary" className="text-xs @md:text-sm">{us}</Badge>
            )}
        </td>
        <td className="p-4 @md:p-6 text-center text-muted-foreground">
            {typeof others === 'boolean' ? (
                others ? <Check className="size-5 mx-auto" /> : <span>-</span>
            ) : (
                <span className="text-xs @md:text-sm">{others}</span>
            )}
        </td>
    </tr>
)

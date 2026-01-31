import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check, X } from 'lucide-react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Returns Comparison</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Industry-Leading Returns</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">See how our return policy compares to the competition.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="col-span-1" />
                        <div className="text-center">
                            <Badge className="mb-2">Our Store</Badge>
                            <div className="text-xs text-muted-foreground">Best-in-class</div>
                        </div>
                        <div className="text-center">
                            <Badge variant="secondary" className="mb-2">Others</Badge>
                            <div className="text-xs text-muted-foreground">Industry avg.</div>
                        </div>
                    </div>

                    <ReturnComparison rows={[
                        { feature: 'Return Window', us: '30 Days', others: '14 Days' },
                        { feature: 'Free Returns', us: true, others: false },
                        { feature: 'No Questions Asked', us: true, others: false },
                        { feature: 'Instant Refunds', us: true, others: false },
                        { feature: 'Exchange Option', us: true, others: true },
                        { feature: 'Store Credit', us: 'Instant', others: '5-7 Days' },
                        { feature: 'Holiday Extended', us: '60 Days', others: '30 Days' },
                        { feature: 'Damaged Items', us: 'Full Refund', others: 'Case by Case' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

interface ComparisonRow {
    feature: string
    us: string | boolean
    others: string | boolean
}

const ReturnComparison = ({ rows }: { rows: ComparisonRow[] }) => (
    <Card className="py-0 overflow-hidden">
        <CardContent className="p-0">
            {rows.map(({ feature, us, others }, i) => (
                <div key={i} className={`grid grid-cols-3 gap-4 p-4 ${i !== rows.length - 1 ? 'border-b' : ''} hover:bg-muted/30 transition-colors`}>
                    <div className="font-medium text-sm">{feature}</div>
                    <div className="text-center">
                        {typeof us === 'boolean' ? (
                            us ? <Check className="size-5 text-primary mx-auto" /> : <X className="size-5 text-muted-foreground mx-auto" />
                        ) : (
                            <span className="text-sm font-semibold text-primary">{us}</span>
                        )}
                    </div>
                    <div className="text-center">
                        {typeof others === 'boolean' ? (
                            others ? <Check className="size-5 text-muted-foreground mx-auto" /> : <X className="size-5 text-muted-foreground mx-auto" />
                        ) : (
                            <span className="text-sm text-muted-foreground">{others}</span>
                        )}
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
)

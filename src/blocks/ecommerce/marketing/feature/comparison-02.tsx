import { Badge } from '@/components/ui/badge'
import { Check, Globe, X } from 'lucide-react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Globe className="size-3.5" />
                        Shipping Zones
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">International Shipping</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">We ship worldwide with various options for every region.</p>
                </div>

                <ShippingComparison zones={[
                    {
                        name: 'North America',
                        standard: '5-7 days',
                        express: '2-3 days',
                        freeThreshold: '$50',
                        tracking: true,
                        insurance: true,
                    },
                    {
                        name: 'Europe',
                        standard: '7-10 days',
                        express: '3-5 days',
                        freeThreshold: '$75',
                        tracking: true,
                        insurance: true,
                    },
                    {
                        name: 'Asia Pacific',
                        standard: '10-14 days',
                        express: '5-7 days',
                        freeThreshold: '$100',
                        tracking: true,
                        insurance: true,
                    },
                    {
                        name: 'Rest of World',
                        standard: '14-21 days',
                        express: '7-10 days',
                        freeThreshold: '$150',
                        tracking: true,
                        insurance: false,
                    },
                ]} />
            </div>
        </section>
    )
}

interface ShippingZone {
    name: string
    standard: string
    express: string
    freeThreshold: string
    tracking: boolean
    insurance: boolean
}

const ShippingComparison = ({ zones }: { zones: ShippingZone[] }) => (
    <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
            <thead>
                <tr>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Region</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Standard</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Express</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Free Shipping</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Tracking</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Insurance</th>
                </tr>
            </thead>
            <tbody>
                {zones.map(({ name, standard, express, freeThreshold, tracking, insurance }, i) => (
                    <tr key={i} className="border-t hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-semibold">{name}</td>
                        <td className="p-4 text-center">{standard}</td>
                        <td className="p-4 text-center">
                            <Badge variant="secondary">{express}</Badge>
                        </td>
                        <td className="p-4 text-center text-primary font-medium">{freeThreshold}+</td>
                        <td className="p-4 text-center">
                            {tracking ? <Check className="size-5 text-primary mx-auto" /> : <X className="size-5 text-muted-foreground mx-auto" />}
                        </td>
                        <td className="p-4 text-center">
                            {insurance ? <Check className="size-5 text-primary mx-auto" /> : <X className="size-5 text-muted-foreground mx-auto" />}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

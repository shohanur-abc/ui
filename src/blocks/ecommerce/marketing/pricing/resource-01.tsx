import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Cpu, HardDrive, Server, Wifi } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Server} text="Infrastructure Pricing" />
                    <Title text="Cloud Resources, Your Terms" />
                    <Description text="Scalable infrastructure with transparent, predictable pricing." />
                </div>

                <ResourcePricing resources={[
                    {
                        icon: Cpu,
                        name: 'Compute',
                        description: 'Virtual machines and containers',
                        tiers: [
                            { name: '1 vCPU', price: '$5/mo' },
                            { name: '2 vCPU', price: '$10/mo' },
                            { name: '4 vCPU', price: '$20/mo' },
                            { name: '8 vCPU', price: '$40/mo' }
                        ]
                    },
                    {
                        icon: HardDrive,
                        name: 'Storage',
                        description: 'SSD block storage',
                        tiers: [
                            { name: '50GB', price: '$2/mo' },
                            { name: '100GB', price: '$4/mo' },
                            { name: '500GB', price: '$15/mo' },
                            { name: '1TB', price: '$25/mo' }
                        ]
                    },
                    {
                        icon: Wifi,
                        name: 'Bandwidth',
                        description: 'Data transfer out',
                        tiers: [
                            { name: '100GB', price: 'Free' },
                            { name: '500GB', price: '$10/mo' },
                            { name: '2TB', price: '$30/mo' },
                            { name: '10TB', price: '$100/mo' }
                        ]
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
    name: string
    price: string
}

interface ResourceItem {
    icon: ComponentType<{ className?: string }>
    name: string
    description: string
    tiers: TierItem[]
}

const ResourcePricing = ({ resources }: { resources: ResourceItem[] }) => (
    <div className="grid @md:grid-cols-3 gap-6">
        {resources.map((resource, i) => (
            <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <resource.icon className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{resource.name}</h3>
                            <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {resource.tiers.map((tier, j) => (
                            <div key={j} className="flex items-center justify-between py-2 px-3 rounded bg-muted/50 hover:bg-muted transition-colors">
                                <span className="text-sm">{tier.name}</span>
                                <span className="font-semibold text-sm">{tier.price}</span>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="w-full mt-4" size="sm">
                        Configure
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)

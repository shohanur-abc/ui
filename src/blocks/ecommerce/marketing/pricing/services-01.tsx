import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Code2, Palette, Server, Smartphone, Globe, Shield } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Code2} text="Agency Pricing" />
                    <Title text="Service Packages" />
                    <Description text="Professional services packages for agencies and consultants." />
                </div>

                <ServicePackages items={[
                    {
                        icon: Palette,
                        name: 'Design',
                        price: '$2,500',
                        description: 'Complete design package',
                        deliverables: ['Brand identity', 'UI/UX design', 'Design system', 'Figma files']
                    },
                    {
                        icon: Code2,
                        name: 'Development',
                        price: '$5,000',
                        description: 'Full-stack development',
                        deliverables: ['Frontend development', 'Backend API', 'Database setup', 'Deployment']
                    },
                    {
                        icon: Globe,
                        name: 'Full Website',
                        price: '$8,000',
                        description: 'Design + Development',
                        deliverables: ['Everything in Design', 'Everything in Development', 'CMS integration', '1 month support'],
                        popular: true
                    },
                    {
                        icon: Smartphone,
                        name: 'Mobile App',
                        price: '$12,000',
                        description: 'iOS & Android app',
                        deliverables: ['Cross-platform app', 'UI/UX design', 'Backend API', 'App store submission']
                    },
                    {
                        icon: Server,
                        name: 'Enterprise',
                        price: '$25,000+',
                        description: 'Custom enterprise solutions',
                        deliverables: ['Custom architecture', 'Scalable infrastructure', 'Security audit', 'Dedicated team']
                    },
                    {
                        icon: Shield,
                        name: 'Retainer',
                        price: '$3,000',
                        description: 'Monthly maintenance',
                        deliverables: ['20 hours/month', 'Priority support', 'Updates & patches', 'Performance monitoring']
                    }
                ]} />
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

interface PackageItem {
    icon: ComponentType<{ className?: string }>
    name: string
    price: string
    description: string
    deliverables: string[]
    popular?: boolean
}

const ServicePackages = ({ items }: { items: PackageItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map((item, i) => (
            <Card key={i} className={`relative group hover:shadow-lg transition-all ${item.popular ? 'border-primary' : ''}`}>
                {item.popular && <Badge className="absolute -top-2 left-4">Most Popular</Badge>}
                <CardContent className="p-6">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <item.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="text-3xl font-bold mb-4">{item.price}</div>

                    <ul className="space-y-2 mb-4">
                        {item.deliverables.map((d, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                                <Check className="size-4 text-primary shrink-0" />
                                {d}
                            </li>
                        ))}
                    </ul>

                    <Button variant={item.popular ? 'default' : 'outline'} className="w-full">
                        Get Started
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)

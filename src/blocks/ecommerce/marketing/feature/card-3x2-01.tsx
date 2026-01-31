import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, Headphones, Package, RefreshCcw, Shield, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="Service Excellence" />
                    <Title text="Shop With Peace of Mind" />
                    <Description text="From secure payments to hassle-free returns, we've got you covered every step of the way." />
                </div>

                <FeatureGrid items={[
                    { icon: Truck, title: 'Express Shipping', description: 'Get your orders delivered in as fast as 24 hours with our express service.' },
                    { icon: RefreshCcw, title: 'Easy Returns', description: '30-day return policy with free return shipping on all orders.' },
                    { icon: Shield, title: 'Buyer Protection', description: 'Full refund guarantee if your order doesn&apos;t arrive or match the description.' },
                    { icon: CreditCard, title: 'Flexible Payment', description: 'Pay your way with credit cards, PayPal, or buy now pay later options.' },
                    { icon: Package, title: 'Premium Packaging', description: 'Every item is carefully packaged to ensure it arrives in perfect condition.' },
                    { icon: Headphones, title: '24/7 Support', description: 'Our customer service team is always ready to help via chat, email, or phone.' },
                ]} />
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

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i}>
                <Card className="h-full py-0 group hover:border-primary/50 transition-colors">
                    <CardContent className="p-5 @md:p-6 flex gap-4">
                        <div className="size-10 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-5 @md:size-6" />
                        </div>
                        <div>
                            <h3 className="text-base @md:text-lg font-semibold mb-1.5">{title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

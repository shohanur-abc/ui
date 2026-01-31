import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Headphones, Shield, Truck, Undo2, Wallet } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="Why Shop With Us" />
                    <Title text="Shopping Made Easy" />
                    <Description text="Experience the difference with our customer-first approach to online shopping." />
                </div>

                <BentoGrid items={[
                    { icon: Truck, title: 'Free Shipping', description: 'Free delivery on all orders over $50. No hidden fees, no surprises at checkout.', size: 'large' },
                    { icon: Shield, title: 'Secure Payments', description: 'Your data is protected.', size: 'small' },
                    { icon: Undo2, title: 'Easy Returns', description: '30-day hassle-free returns.', size: 'small' },
                    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer service.', size: 'small' },
                    { icon: Wallet, title: 'Best Prices', description: 'Price match guarantee.', size: 'small' },
                    { icon: Headphones, title: 'Expert Help', description: 'Get personalized recommendations from our product experts whenever you need guidance.', size: 'large' },
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

interface BentoItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    size: 'small' | 'large'
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, size }, i) => (
            <Card
                key={i}
                className={`group hover:shadow-lg transition-all hover:-translate-y-0.5 py-0 ${size === 'large' ? '@xl:col-span-2' : ''}`}
            >
                <CardContent className="p-5 @md:p-6 @xl:p-8 h-full flex flex-col">
                    <div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Icon className="size-5 @md:size-6" />
                    </div>
                    <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm @md:text-base text-muted-foreground leading-relaxed flex-1">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

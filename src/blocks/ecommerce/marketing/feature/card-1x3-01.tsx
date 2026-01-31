import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, Package, ShieldCheck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="Our Promise" />
                    <Title text="Shop with Confidence" />
                    <Description text="We stand behind every product with guarantees that give you peace of mind." />
                </div>

                <FeatureRow items={[
                    { icon: Package, title: 'Free & Fast Shipping', description: 'Enjoy complimentary shipping on orders over $50. Most orders arrive within 2-3 business days.' },
                    { icon: ShieldCheck, title: '2-Year Warranty', description: 'All products come with a comprehensive warranty covering manufacturing defects and quality issues.' },
                    { icon: CreditCard, title: 'Secure Checkout', description: 'Shop safely with encrypted payments. We accept all major credit cards and digital wallets.' },
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

const FeatureRow = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @md:grid-cols-3 gap-6 @md:gap-8">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i}>
                <Card className="h-full text-center py-0 group hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="p-6 @md:p-8 @xl:p-10">
                        <div className="size-16 @md:size-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 @md:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-8 @md:size-10" />
                        </div>
                        <h3 className="text-lg @md:text-xl font-semibold mb-3">{title}</h3>
                        <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

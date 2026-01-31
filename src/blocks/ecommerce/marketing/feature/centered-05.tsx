import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, Globe, Lock, Percent, Shield, Wallet } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Wallet className="size-3.5" />
                        Payment Options
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Flexible Ways to Pay</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">We accept all major payment methods with secure, encrypted checkout.</p>
                </div>

                <PaymentFeatures items={[
                    {
                        icon: CreditCard,
                        title: 'All Major Cards',
                        description: 'Visa, Mastercard, Amex, and Discover accepted with no extra fees.',
                        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                    },
                    {
                        icon: Percent,
                        title: 'Pay in 4',
                        description: 'Split your purchase into 4 interest-free payments with Klarna or Afterpay.',
                        color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
                    },
                    {
                        icon: Wallet,
                        title: 'Digital Wallets',
                        description: 'Apple Pay, Google Pay, and PayPal for faster checkout.',
                        color: 'bg-green-500/10 text-green-600 dark:text-green-400',
                    },
                    {
                        icon: Shield,
                        title: 'Fraud Protection',
                        description: 'Every transaction is monitored with advanced fraud detection.',
                        color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
                    },
                    {
                        icon: Lock,
                        title: 'SSL Encryption',
                        description: 'Bank-level security keeps your information safe.',
                        color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
                    },
                    {
                        icon: Globe,
                        title: 'Multi-Currency',
                        description: 'Pay in your local currency from anywhere in the world.',
                        color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
                    },
                ]} />
            </div>
        </section>
    )
}

interface PaymentItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

const PaymentFeatures = ({ items }: { items: PaymentItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, description, color }, i) => (
            <li key={i}>
                <Card className="py-0 h-full group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                            <Icon className="size-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

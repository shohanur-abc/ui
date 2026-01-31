import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Crown, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

interface SubscriptionProps {
    image: string
    name: string
    description: string
    price: number
    interval: string
    features: string[]
    popular?: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative mx-auto size-24 @sm:size-28">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl" />
        <Image src={src} alt={alt} fill className="relative rounded-full object-cover ring-4 ring-primary/20" />
    </div>
)

const PopularBadge = () => (
    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 bg-primary text-primary-foreground">
        <Crown className="size-3" />
        Most Popular
    </Badge>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-xl font-bold text-center text-foreground">{text}</h3>
)

const ProductDescription = ({ text }: { text: string }) => (
    <p className="text-sm text-center text-muted-foreground">{text}</p>
)

const PriceDisplay = ({ amount, interval }: { amount: number; interval: string }) => (
    <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-bold text-foreground">${amount}</span>
        <span className="text-muted-foreground">/{interval}</span>
    </div>
)

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="space-y-3">
        {items.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
                <Check className="size-5 shrink-0 text-primary" />
                <span className="text-foreground">{feature}</span>
            </li>
        ))}
    </ul>
)

const SubscribeButton = ({ label, popular }: { label: string; popular?: boolean }) => (
    <Button className="w-full gap-2" variant={popular ? "default" : "outline"} size="lg">
        <Sparkles className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const subscription: SubscriptionProps = {
        image: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=200&h=200&fit=crop",
        name: "Premium Plan",
        description: "Perfect for growing businesses",
        price: 29,
        interval: "month",
        features: [
            "Unlimited projects",
            "Priority support 24/7",
            "Advanced analytics",
            "Custom integrations",
            "Team collaboration",
        ],
        popular: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className={`relative space-y-6 p-6 ${subscription.popular ? "border-primary ring-2 ring-primary/20" : ""}`}>
                    {subscription.popular && <PopularBadge />}
                    <ProductImage src={subscription.image} alt={subscription.name} />
                    <div className="space-y-2 text-center">
                        <ProductName text={subscription.name} />
                        <ProductDescription text={subscription.description} />
                    </div>
                    <PriceDisplay amount={subscription.price} interval={subscription.interval} />
                    <Separator />
                    <FeatureList items={subscription.features} />
                    <SubscribeButton label="Start Free Trial" popular={subscription.popular} />
                </Card>
            </div>
        </section>
    )
}

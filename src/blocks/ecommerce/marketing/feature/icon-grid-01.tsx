import { Badge } from '@/components/ui/badge'
import { ArrowRight, Gift, Heart, Sparkles, Star, Truck, Wallet } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Shop Smarter</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Benefits That Make a Difference</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Enjoy exclusive perks designed to enhance your shopping experience.</p>
                </div>

                <IconGrid items={[
                    { icon: Truck, title: 'Free Shipping', description: 'On orders over $50', href: '/shipping' },
                    { icon: Gift, title: 'Gift Wrapping', description: 'Premium packaging', href: '/gifts' },
                    { icon: Heart, title: 'Wishlist', description: 'Save favorites', href: '/wishlist' },
                    { icon: Star, title: 'Rewards', description: 'Earn points', href: '/rewards' },
                    { icon: Wallet, title: 'Best Prices', description: 'Price match guarantee', href: '/price-match' },
                    { icon: Sparkles, title: 'New Arrivals', description: 'Fresh picks weekly', href: '/new' },
                ]} />
            </div>
        </section>
    )
}

interface IconGridItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    href: string
}

const IconGrid = ({ items }: { items: IconGridItem[] }) => (
    <ul className="grid @xs:grid-cols-2 @md:grid-cols-3 @xl:grid-cols-6 gap-6 @md:gap-8">
        {items.map(({ icon: Icon, title, description, href }, i) => (
            <li key={i}>
                <Link href={href} className="group block text-center">
                    <div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:scale-110">
                        <Icon className="size-7 @md:size-8" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{description}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight className="size-3" />
                    </span>
                </Link>
            </li>
        ))}
    </ul>
)

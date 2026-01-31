import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, Box, Gift, Headphones, Heart, Package, Shield, Sparkles, Star, Truck, Wallet, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Quick Links</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Explore Our Services</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Quick access to all the benefits and services we offer.</p>
                </div>

                <IconLinkGrid items={[
                    { icon: Truck, title: 'Shipping', href: '/shipping', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                    { icon: Box, title: 'Returns', href: '/returns', color: 'bg-green-500/10 text-green-600 dark:text-green-400' },
                    { icon: Shield, title: 'Protection', href: '/protection', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
                    { icon: Headphones, title: 'Support', href: '/support', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
                    { icon: Gift, title: 'Gift Cards', href: '/gifts', color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
                    { icon: Star, title: 'Rewards', href: '/rewards', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
                    { icon: Heart, title: 'Wishlist', href: '/wishlist', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
                    { icon: Wallet, title: 'Payment', href: '/payment', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
                    { icon: Sparkles, title: 'New', href: '/new', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
                    { icon: Package, title: 'Track Order', href: '/track', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
                    { icon: Zap, title: 'Express', href: '/express', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
                    { icon: Shield, title: 'Warranty', href: '/warranty', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400' },
                ]} />
            </div>
        </section>
    )
}

interface IconLinkItem {
    icon: ComponentType<{ className?: string }>
    title: string
    href: string
    color: string
}

const IconLinkGrid = ({ items }: { items: IconLinkItem[] }) => (
    <ul className="grid grid-cols-3 @sm:grid-cols-4 @xl:grid-cols-6 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, href, color }, i) => (
            <li key={i}>
                <Link href={href} className="group block text-center p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className={`size-12 @md:size-14 rounded-xl flex items-center justify-center mx-auto mb-3 ${color} group-hover:scale-110 transition-transform`}>
                        <Icon className="size-6 @md:size-7" />
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <span className="font-medium text-sm">{title}</span>
                        <ArrowUpRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Link>
            </li>
        ))}
    </ul>
)

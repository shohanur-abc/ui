import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, Check, Crown, Gift, Percent, Sparkles, Star, Truck, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Crown className="size-3.5" />
                        Membership
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Join the Club</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Become a member and enjoy exclusive perks, discounts, and early access to everything.</p>
                </div>

                <MembershipBenefits items={{
                    free: {
                        title: 'Free Members',
                        features: [
                            { icon: Star, text: 'Earn 1 point per $1' },
                            { icon: Gift, text: 'Birthday discount' },
                            { icon: Sparkles, text: 'Member-only sales' },
                        ],
                    },
                    premium: {
                        title: 'Premium Members',
                        price: '$9.99/mo',
                        features: [
                            { icon: Truck, text: 'Free unlimited shipping' },
                            { icon: Percent, text: '10% off everything' },
                            { icon: Zap, text: '2x points on purchases' },
                            { icon: Box, text: 'Free gift wrapping' },
                            { icon: Crown, text: 'VIP support line' },
                            { icon: Sparkles, text: '48hr early access' },
                        ],
                    },
                }} />
            </div>
        </section>
    )
}

interface MembershipProps {
    items: {
        free: {
            title: string
            features: { icon: ComponentType<{ className?: string }>; text: string }[]
        }
        premium: {
            title: string
            price: string
            features: { icon: ComponentType<{ className?: string }>; text: string }[]
        }
    }
}

const MembershipBenefits = ({ items }: MembershipProps) => (
    <div className="grid @lg:grid-cols-2 gap-6 @md:gap-8 max-w-4xl mx-auto">
        <Card className="py-0">
            <CardContent className="p-6 @md:p-8">
                <h3 className="text-xl font-bold mb-1">{items.free.title}</h3>
                <p className="text-2xl font-bold text-primary mb-6">Free</p>
                <ul className="space-y-3 mb-6">
                    {items.free.features.map(({ icon: Icon, text }, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <Icon className="size-4 text-muted-foreground" />
                            <span className="text-sm">{text}</span>
                        </li>
                    ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/join">
                        Join Free <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <Card className="py-0 border-primary ring-2 ring-primary relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="shadow-md">Most Popular</Badge>
            </div>
            <CardContent className="p-6 @md:p-8">
                <h3 className="text-xl font-bold mb-1">{items.premium.title}</h3>
                <p className="text-2xl font-bold text-primary mb-6">{items.premium.price}</p>
                <ul className="space-y-3 mb-6">
                    {items.premium.features.map(({ text }, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="size-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <Check className="size-3 text-primary-foreground" />
                            </div>
                            <span className="text-sm font-medium">{text}</span>
                        </li>
                    ))}
                </ul>
                <Button className="w-full" asChild>
                    <Link href="/premium">
                        Go Premium <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
)

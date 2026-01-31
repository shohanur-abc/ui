import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, CreditCard, Globe, Headphones, Shield, Truck } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Our Capabilities</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Powered by Excellence</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Explore our core strengths that drive customer satisfaction.</p>
                </div>

                <Masonry items={[
                    { icon: Truck, title: 'Global Shipping', description: 'Fast and reliable delivery to over 100 countries with real-time tracking and insurance.', href: '/shipping', featured: true },
                    { icon: Shield, title: 'Buyer Protection', description: 'Full refund guarantee on all orders.', href: '/protection', featured: false },
                    { icon: Headphones, title: '24/7 Support', description: 'Always here to help you.', href: '/support', featured: false },
                    { icon: CreditCard, title: 'Secure Payments', description: 'Bank-level encryption for all transactions. Multiple payment methods supported.', href: '/payments', featured: true },
                    { icon: Box, title: 'Quality Products', description: 'Verified authentic items only.', href: '/quality', featured: false },
                    { icon: Globe, title: 'Multi-Currency', description: 'Shop in your local currency.', href: '/currencies', featured: false },
                ]} />
            </div>
        </section>
    )
}

interface MasonryItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    href: string
    featured: boolean
}

const Masonry = ({ items }: { items: MasonryItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, href, featured }, i) => (
            <li key={i} className={featured ? '@xl:row-span-2' : ''}>
                <Link href={href} className="block h-full">
                    <Card className={`h-full group hover:shadow-lg hover:border-primary/50 transition-all py-0 ${featured ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent' : ''}`}>
                        <CardContent className={`p-5 @md:p-6 ${featured ? '@xl:p-8' : ''} h-full flex flex-col`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${featured ? 'size-14' : 'size-11'} rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors`}>
                                    <Icon className={featured ? 'size-7' : 'size-5'} />
                                </div>
                                <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className={`${featured ? 'text-xl @md:text-2xl' : 'text-lg'} font-semibold mb-2`}>{title}</h3>
                            <p className={`${featured ? 'text-base' : 'text-sm'} text-muted-foreground leading-relaxed flex-1`}>{description}</p>
                        </CardContent>
                    </Card>
                </Link>
            </li>
        ))}
    </ul>
)

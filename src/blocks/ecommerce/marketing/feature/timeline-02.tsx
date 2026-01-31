import { Badge } from '@/components/ui/badge'
import { Box, CreditCard, Headphones, RefreshCcw, Shield, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Our Journey</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Building Trust Since Day One</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">The milestones that shaped our commitment to excellence.</p>
                </div>

                <VerticalTimeline items={[
                    { year: '2020', icon: Box, title: 'Founded', description: 'Started with a mission to make quality products accessible to everyone.' },
                    { year: '2021', icon: Truck, title: 'Free Shipping', description: 'Introduced free shipping on all orders to enhance customer value.' },
                    { year: '2022', icon: Shield, title: 'Buyer Protection', description: 'Launched comprehensive buyer protection and guarantee programs.' },
                    { year: '2023', icon: Headphones, title: '24/7 Support', description: 'Expanded customer support to round-the-clock availability.' },
                    { year: '2024', icon: CreditCard, title: 'Flexible Payments', description: 'Added buy now, pay later options for greater flexibility.' },
                    { year: '2025', icon: RefreshCcw, title: 'Sustainability', description: 'Committed to carbon-neutral shipping and eco-friendly packaging.' },
                ]} />
            </div>
        </section>
    )
}

interface TimelineItem {
    year: string
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const VerticalTimeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 @md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        <ul className="space-y-8 @md:space-y-12">
            {items.map(({ year, icon: Icon, title, description }, i) => (
                <li key={i} className={`relative flex gap-6 @md:gap-8 ${i % 2 === 0 ? '@md:flex-row' : '@md:flex-row-reverse'}`}>
                    <div className="@md:w-1/2 @md:text-right flex @md:block items-start gap-4">
                        <div className={`size-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 relative z-10 @md:absolute @md:left-1/2 @md:-translate-x-1/2 ${i % 2 === 0 ? '' : ''}`}>
                            <Icon className="size-6" />
                        </div>
                        <div className={`@md:pr-8 ${i % 2 === 0 ? '' : '@md:text-left @md:pl-8 @md:pr-0'}`}>
                            <Badge variant="secondary" className="mb-2">{year}</Badge>
                            <h3 className="text-lg font-semibold mb-1">{title}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)

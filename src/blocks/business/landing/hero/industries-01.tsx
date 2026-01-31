import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Target, Zap, GraduationCap, Building2, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Target} text="Solutions by Industry" />
                    <Title text="Built for Your Industry" />
                    <Description text="Purpose-built solutions for the unique challenges of your industry. See how businesses like yours are succeeding." />
                </div>
                <IndustryGrid items={[
                    {
                        icon: Building2,
                        title: 'Enterprise',
                        description: 'Scale-ready solutions with enterprise security, compliance, and dedicated support for large organizations.',
                        features: ['SSO Integration', 'Custom SLA', 'Dedicated Support'],
                        href: '#enterprise',
                    },
                    {
                        icon: ShoppingCart,
                        title: 'E-Commerce',
                        description: 'Boost sales and streamline operations with tools designed for online retail.',
                        features: ['Inventory Sync', 'Order Management', 'Multi-channel'],
                        href: '#ecommerce',
                    },
                    {
                        icon: GraduationCap,
                        title: 'Education',
                        description: 'Empower institutions with tools for student engagement, administration, and learning.',
                        features: ['LMS Integration', 'Student Portal', 'Analytics'],
                        href: '#education',
                    },
                    {
                        icon: Zap,
                        title: 'Startups',
                        description: 'Move fast with tools that scale. Special pricing and programs for early-stage companies.',
                        features: ['Startup Pricing', 'Quick Setup', 'Investor Reports'],
                        href: '#startups',
                    },
                ]} />
                <div className="text-center mt-10">
                    <CTA items={[
                        { label: 'Explore All Industries', href: '#industries', icon: ArrowRight },
                        { label: 'Request Custom Solution', href: '#custom', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const IndustryGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string; features: string[]; href: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, description, features, href }, i) => (
            <Link key={i} href={href}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/50 transition-all bg-card/50 backdrop-blur">
                    <CardHeader>
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all">
                            <Icon className="size-6 text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{description}</p>
                        <ul className="space-y-2">
                            {features.map((feature, j) => (
                                <li key={j} className="text-xs flex items-center gap-2">
                                    <span className="size-1 rounded-full bg-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

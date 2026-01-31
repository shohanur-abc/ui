import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Layers, Sparkles, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

interface CTAItem {
    label: string
    href: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
    icon?: ComponentType<{ className?: string }>
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Sparkles} text="Powerful Features" />
                    <Title text="Everything You Need to" highlight="Scale Your Business" />
                    <Description text="Comprehensive tools and solutions designed to streamline your workflow and accelerate growth." />
                </div>

                <BentoGrid items={[
                    {
                        icon: Zap,
                        title: 'Lightning Fast Performance',
                        description: 'Optimized infrastructure delivering sub-millisecond response times for critical operations.',
                    },
                    {
                        icon: Shield,
                        title: 'Enterprise Security',
                        description: 'Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA standards.',
                    },
                    {
                        icon: Layers,
                        title: 'Seamless Integrations',
                        description: 'Connect with 200+ tools and platforms through our robust API ecosystem.',
                    },
                ]} />

                <CTA items={[
                    { label: 'Get Started Free', href: '/signup', icon: ArrowRight },
                    { label: 'View Documentation', href: '/docs', variant: 'outline' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-5">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 @md:mb-5 text-3xl @sm:text-4xl @xl:text-5xl @3xl:text-6xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        {text}
    </p>
)

const BentoGrid = ({ items }: { items: FeatureItem[] }) => (
    <div className="mb-10 @md:mb-12 @xl:mb-16 grid gap-4 @md:gap-6 @lg:grid-cols-3">
        {items.map((item, index) => (
            <Card 
                key={item.title} 
                className={`group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${index === 0 ? '@lg:col-span-2 @lg:row-span-2' : ''}`}
            >
                <CardContent className={`p-5 @md:p-6 ${index === 0 ? '@lg:p-8' : ''}`}>
                    <div className={`mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 ${index === 0 ? 'size-14 @lg:size-16' : 'size-12'}`}>
                        <item.icon className={`text-primary ${index === 0 ? 'size-7 @lg:size-8' : 'size-6'}`} />
                    </div>
                    <h3 className={`mb-2 font-semibold ${index === 0 ? 'text-xl @lg:text-2xl' : 'text-lg'}`}>
                        {item.title}
                    </h3>
                    <p className={`text-muted-foreground leading-relaxed ${index === 0 ? 'text-base @lg:text-lg' : 'text-sm'}`}>
                        {item.description}
                    </p>
                </CardContent>
            </Card>
        ))}
    </div>
)

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }) => (
            <Button key={label} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

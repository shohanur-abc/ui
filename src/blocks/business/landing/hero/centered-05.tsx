import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BarChart3, TrendingUp, Rocket } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-5xl mx-auto text-center">
                    <Eyebrow icon={Rocket} text="Launching Soon" />
                    <Title text="The Future of Business Intelligence" />
                    <Description text="Harness the power of AI-driven analytics to make smarter decisions, faster. Real-time insights that drive real results." />
                    <CTA items={[
                        { label: 'Join Waitlist', href: '#waitlist', icon: ArrowRight },
                        { label: 'See Features', href: '#features', variant: 'outline' },
                    ]} />
                    <FeatureCards items={[
                        { icon: BarChart3, title: 'Advanced Analytics', description: 'Deep insights from your data' },
                        { icon: TrendingUp, title: 'Predictive AI', description: 'Forecast trends accurately' },
                        { icon: Rocket, title: 'Fast Deployment', description: 'Up and running in minutes' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-6 @md:mb-8 gap-2 px-4 py-1.5">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-12 @md:mb-16">
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

const FeatureCards = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

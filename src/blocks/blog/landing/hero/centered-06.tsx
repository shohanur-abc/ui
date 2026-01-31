import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock, Flame, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="emerald">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <Eyebrow icon={Flame} text="Hot Off the Press" />
                    <Title text="Stay Ahead of the Curve" />
                    <Description text="Breaking news, in-depth analysis, and expert commentary on the tech industry's biggest stories. Updated daily." />
                    <FeatureCards
                        items={[
                            { icon: Zap, title: 'Real-time Updates', description: 'Get notified instantly when news breaks' },
                            { icon: Clock, title: 'Daily Digests', description: 'Curated summaries delivered to your inbox' },
                            { icon: Flame, title: 'Trending Analysis', description: 'Deep dives into what matters most' },
                        ]}
                    />
                    <CTA
                        items={[
                            { label: 'Read Latest', href: '/latest', icon: ArrowRight },
                            { label: 'Set Up Alerts', href: '/alerts', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-6">
        <Badge className="gap-2 px-4 py-1.5 bg-destructive/10 text-destructive border-destructive/20">
            <Icon className="size-4" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
        {text}
    </p>
)

interface FeatureItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureCards = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-3 gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-card/50 backdrop-blur border-primary/10 py-4">
                <CardContent className="text-center p-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }) => (
            <Button key={label} size="lg" variant={variant} asChild className="gap-2">
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

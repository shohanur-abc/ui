import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Repeat, Clock, RefreshCcw, FileCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Repeat} text="Seamless Migration" />
                        <Title text="Switch in Minutes, Not Months" />
                        <Description text="Migrating from another platform? We make it easy. Our automated migration tools handle everything—no downtime, no data loss." />
                        <MigrationSteps items={[
                            { icon: FileCheck, title: 'Connect Your Account', description: 'Securely link your existing platform' },
                            { icon: RefreshCcw, title: 'Automatic Data Transfer', description: 'We migrate all your data automatically' },
                            { icon: Clock, title: 'Go Live Instantly', description: 'Zero downtime cutover when you\'re ready' },
                        ]} />
                        <CTA items={[
                            { label: 'Start Migration', href: '#migrate', icon: ArrowRight },
                            { label: 'Migration Guide', href: '#guide', variant: 'outline' },
                        ]} />
                    </div>
                    <MigrationVisual 
                        sources={[
                            { name: 'Competitor A', logo: 'https://via.placeholder.com/120x40/f1f5f9/64748b?text=Comp+A' },
                            { name: 'Competitor B', logo: 'https://via.placeholder.com/120x40/f1f5f9/64748b?text=Comp+B' },
                            { name: 'Competitor C', logo: 'https://via.placeholder.com/120x40/f1f5f9/64748b?text=Comp+C' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
)

const MigrationSteps = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="space-y-4 mb-8">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
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

const MigrationVisual = ({ sources }: { sources: { name: string; logo: string }[] }) => (
    <Card className="bg-card/50 backdrop-blur">
        <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground mb-6">We support migration from</p>
            <div className="space-y-4">
                {sources.map(({ name, logo }, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                        <Image 
                            src={logo} 
                            alt={name} 
                            width={120} 
                            height={40} 
                            className="h-8 w-auto object-contain"
                        />
                        <ArrowRight className="size-5 text-primary ml-auto" />
                        <Badge className="shrink-0">Supported</Badge>
                    </div>
                ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
                Don&apos;t see your platform? Contact us for custom migration support.
            </p>
        </CardContent>
    </Card>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Check } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-slate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <WorldMap />
                    <div>
                        <Eyebrow icon={Globe} text="Global Infrastructure" />
                        <Title text="Lightning Fast, Everywhere" />
                        <Description text="With data centers in 30+ regions, your users get sub-50ms latency no matter where they are in the world." />
                        <RegionList items={[
                            { region: 'North America', locations: 'US East, US West, Canada', latency: '<20ms' },
                            { region: 'Europe', locations: 'Germany, UK, France, Netherlands', latency: '<25ms' },
                            { region: 'Asia Pacific', locations: 'Singapore, Tokyo, Sydney', latency: '<30ms' },
                        ]} />
                        <CTA items={[
                            { label: 'View Status Page', href: '#status', icon: ArrowRight },
                            { label: 'Performance Docs', href: '#docs', variant: 'outline' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const WorldMap = () => (
    <div className="relative aspect-square @xl:aspect-[4/3] rounded-2xl overflow-hidden bg-muted/50 border border-border">
        {/* Simplified world map representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <svg viewBox="0 0 800 400" className="w-full h-full opacity-30">
            <path d="M50,200 Q200,150 350,180 T650,170 T750,200" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
            <path d="M50,220 Q200,250 350,230 T650,240 T750,220" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
        </svg>
        {/* Data center markers */}
        <DataCenterMarker position="top-1/4 left-1/4" label="US West" />
        <DataCenterMarker position="top-1/4 left-1/3" label="US East" />
        <DataCenterMarker position="top-1/3 left-1/2" label="EU" />
        <DataCenterMarker position="top-1/3 right-1/4" label="Asia" />
        <DataCenterMarker position="bottom-1/3 right-1/5" label="Australia" />
    </div>
)

const DataCenterMarker = ({ position, label }: { position: string; label: string }) => (
    <div className={`absolute ${position}`}>
        <div className="relative group">
            <div className="size-4 rounded-full bg-primary animate-pulse" />
            <div className="absolute -top-1 -left-1 size-6 rounded-full bg-primary/30 animate-ping" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {label}
            </div>
        </div>
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
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

const RegionList = ({ items }: { items: { region: string; locations: string; latency: string }[] }) => (
    <div className="space-y-3 mb-8">
        {items.map(({ region, locations, latency }, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                <Check className="size-5 text-primary shrink-0" />
                <div className="flex-1">
                    <p className="font-medium">{region}</p>
                    <p className="text-sm text-muted-foreground">{locations}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">{latency}</Badge>
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

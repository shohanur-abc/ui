import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <Eyebrow icon={Zap} text="Lightning Fast Results" />
                    <Title text="Scale Your Revenue" subtitle="Not Your Headcount" />
                    <Description text="Automate repetitive tasks, optimize workflows, and free your team to focus on what matters most—growing your business." />
                    <CTA items={[
                        { label: 'Get Started Free', href: '#start' },
                        { label: 'Watch Demo', href: '#demo', icon: Play, variant: 'ghost' },
                    ]} />
                    <Stats items={[
                        { value: '99.9%', label: 'Uptime SLA' },
                        { value: '150+', label: 'Integrations' },
                        { value: '24/7', label: 'Support' },
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

const Title = ({ text, subtitle }: { text: string; subtitle: string }) => (
    <div className="mb-6 @md:mb-8">
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight">
            {text}
        </h1>
        <p className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-light text-muted-foreground mt-2">
            {subtitle}
        </p>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' | 'ghost' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-12 @md:mb-16">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {Icon && <Icon className="size-4" />}
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-8 @md:gap-12">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-2xl @md:text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

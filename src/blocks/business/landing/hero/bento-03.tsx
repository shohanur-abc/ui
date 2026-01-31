import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Award, Rocket, Target, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @4xl:grid-cols-[1.2fr_1fr] gap-8 @xl:gap-12 items-center">
                    <BentoLayout items={[
                        { icon: Target, title: 'Strategic Planning', value: '95%', label: 'Goal Achievement', variant: 'highlight' },
                        { icon: TrendingUp, title: 'Growth Rate', value: '+127%', label: 'YoY Growth', variant: 'stat' },
                        { icon: Users, title: 'Team Size', value: '500+', label: 'Professionals', variant: 'stat' },
                        { icon: Award, title: 'Industry Awards', value: '45+', label: 'Accolades', variant: 'stat' },
                    ]} />
                    <div>
                        <Eyebrow icon={Rocket} text="Growth Accelerator" />
                        <Title text="Supercharge Your Business Growth" highlight="Growth" />
                        <Description text="Strategic consulting and hands-on execution to help you capture market share, optimize operations, and maximize ROI." />
                        <CTA items={[
                            { label: 'Get Strategy Session', href: '#strategy', icon: ArrowRight },
                            { label: 'See Results', href: '#results', variant: 'outline' },
                        ]} />
                    </div>
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

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text.split(highlight)[0]}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
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

const BentoLayout = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; value: string; label: string; variant: 'highlight' | 'stat' }[] }) => (
    <div className="grid grid-cols-2 gap-4">
        {items.map(({ icon: Icon, title, value, label, variant }, i) => (
            <Card 
                key={i} 
                className={`group hover:shadow-lg transition-all ${
                    variant === 'highlight' ? 'col-span-2 bg-primary text-primary-foreground' : 'hover:border-primary/30'
                }`}
            >
                <CardContent className={`pt-6 ${variant === 'highlight' ? 'pb-4' : ''}`}>
                    <div className={`size-10 rounded-lg flex items-center justify-center mb-3 ${
                        variant === 'highlight' ? 'bg-primary-foreground/20' : 'bg-primary/10 group-hover:bg-primary/20'
                    } transition-colors`}>
                        <Icon className={`size-5 ${variant === 'highlight' ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <p className={`text-sm mb-2 ${variant === 'highlight' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{title}</p>
                    <p className={`text-3xl @md:text-4xl font-bold mb-1 ${variant === 'highlight' ? '' : 'text-foreground'}`}>{value}</p>
                    <p className={`text-sm ${variant === 'highlight' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{label}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

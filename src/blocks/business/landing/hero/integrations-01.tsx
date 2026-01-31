import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Link as LinkIcon, Plug, RefreshCcw, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Plug} text="Seamless Integrations" />
                        <Title text="Connect Your Favorite Tools" />
                        <Description text="Sync data across 200+ apps in real-time. No coding required. Set up in minutes, not months." />
                        <IntegrationBenefits items={[
                            { icon: Zap, text: 'Real-time sync' },
                            { icon: RefreshCcw, text: 'Bi-directional' },
                            { icon: LinkIcon, text: 'No-code setup' },
                        ]} />
                        <CTA items={[
                            { label: 'View All Integrations', href: '#integrations', icon: ArrowRight },
                            { label: 'API Docs', href: '#docs', variant: 'outline' },
                        ]} />
                    </div>
                    <IntegrationLogos items={[
                        { name: 'Salesforce', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=SF' },
                        { name: 'Slack', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=SL' },
                        { name: 'HubSpot', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=HS' },
                        { name: 'Stripe', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=ST' },
                        { name: 'Notion', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=NO' },
                        { name: 'GitHub', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=GH' },
                        { name: 'Figma', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=FI' },
                        { name: 'Jira', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=JI' },
                        { name: 'Zendesk', logo: 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=ZD' },
                    ]} />
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

const IntegrationBenefits = ({ items }: { items: { icon: ComponentType<{ className?: string }>; text: string }[] }) => (
    <div className="flex flex-wrap gap-4 @md:gap-6 mb-8">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm @md:text-base">
                <Icon className="size-4 text-primary" />
                <span>{text}</span>
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

const IntegrationLogos = ({ items }: { items: { name: string; logo: string }[] }) => (
    <div className="grid grid-cols-3 gap-4">
        {items.map(({ name, logo }, i) => (
            <Card key={i} className="group hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="p-4 @md:p-6 flex items-center justify-center">
                    <Image 
                        src={logo} 
                        alt={name} 
                        width={80} 
                        height={80} 
                        className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                </CardContent>
            </Card>
        ))}
    </div>
)

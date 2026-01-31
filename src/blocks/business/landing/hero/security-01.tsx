import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Shield, CheckCircle, Lock } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Shield} text="Enterprise Security" />
                        <Title text="Your Data is Safe With Us" />
                        <Description text="Bank-level encryption, compliance certifications, and enterprise-grade security. We take data protection seriously." />
                        <SecurityFeatures items={[
                            { icon: Lock, title: 'End-to-End Encryption', description: 'AES-256 encryption for all data' },
                            { icon: Shield, title: 'SOC 2 Type II', description: 'Annually audited compliance' },
                            { icon: CheckCircle, title: 'GDPR Compliant', description: 'Full European data protection' },
                        ]} />
                        <CTA items={[
                            { label: 'View Security Docs', href: '#security', icon: ArrowRight },
                            { label: 'Request Audit Report', href: '#audit', variant: 'outline' },
                        ]} />
                    </div>
                    <SecurityBadges items={[
                        { name: 'SOC 2 Type II', logo: 'SOC2' },
                        { name: 'GDPR', logo: 'GDPR' },
                        { name: 'HIPAA', logo: 'HIPAA' },
                        { name: 'ISO 27001', logo: 'ISO' },
                        { name: 'PCI DSS', logo: 'PCI' },
                        { name: 'CCPA', logo: 'CCPA' },
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

const SecurityFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
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

const SecurityBadges = ({ items }: { items: { name: string; logo: string }[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-3 gap-4">
        {items.map(({ name, logo }, i) => (
            <Card key={i} className="group hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="p-6 text-center">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                        <span className="text-lg font-bold text-primary">{logo}</span>
                    </div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">Certified</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

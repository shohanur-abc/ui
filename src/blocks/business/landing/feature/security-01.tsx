import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Lock, Shield, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface ComplianceItem {
    name: string
    description: string
    icon: string
}

interface SecurityFeature {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-start">
                    <div>
                        <Eyebrow icon={Shield} text="Security & Compliance" />
                        <Title text="Enterprise-Grade Security You Can" highlight="Trust" />
                        <Description text="We take security seriously. Our platform is built with multiple layers of protection to keep your data safe." />
                        <SecurityFeatures items={[
                            { icon: Lock, title: 'End-to-End Encryption', description: 'AES-256 encryption for data at rest, TLS 1.3 for data in transit.' },
                            { icon: ShieldCheck, title: 'Zero-Trust Architecture', description: 'Every request is authenticated and authorized, regardless of origin.' },
                            { icon: Shield, title: 'Continuous Monitoring', description: '24/7 threat detection with automated incident response.' },
                        ]} />
                        <CTAButton label="View Security Whitepaper" href="/security" />
                    </div>

                    <ComplianceBadges items={[
                        { name: 'SOC 2 Type II', description: 'Audited annually by independent third parties.', icon: '🛡️' },
                        { name: 'GDPR', description: 'Full compliance with EU data protection regulations.', icon: '🇪🇺' },
                        { name: 'HIPAA', description: 'Healthcare data protection standards met.', icon: '🏥' },
                        { name: 'ISO 27001', description: 'International information security standard.', icon: '📋' },
                        { name: 'PCI DSS', description: 'Payment card industry data security.', icon: '💳' },
                        { name: 'CCPA', description: 'California consumer privacy compliance.', icon: '🔒' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const SecurityFeatures = ({ items }: { items: SecurityFeature[] }) => (
    <div className="space-y-4 mb-6">
        {items.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" variant="outline" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const ComplianceBadges = ({ items }: { items: ComplianceItem[] }) => (
    <div className="grid gap-4 @sm:grid-cols-2">
        {items.map((item) => (
            <Card key={item.name} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
                <CardContent className="p-5 flex items-start gap-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

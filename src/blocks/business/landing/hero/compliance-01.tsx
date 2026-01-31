import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Scale, FileCheck, Gavel, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Scale} text="Legal & Compliance" />
                    <Title text="Built for Regulated Industries" />
                    <Description text="Meet the strictest compliance requirements. Purpose-built for healthcare, finance, government, and other regulated sectors." />
                    <CTA items={[
                        { label: 'Request Compliance Pack', href: '#compliance', icon: ArrowRight },
                        { label: 'Speak to Specialist', href: '#specialist', variant: 'outline' },
                    ]} />
                </div>
                <ComplianceGrid items={[
                    { 
                        icon: FileCheck, 
                        title: 'Healthcare', 
                        certifications: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11'],
                        description: 'Full patient data protection and audit trails',
                    },
                    { 
                        icon: Gavel, 
                        title: 'Financial Services', 
                        certifications: ['SOX', 'PCI DSS', 'GLBA'],
                        description: 'Transaction security and financial compliance',
                    },
                    { 
                        icon: ShieldCheck, 
                        title: 'Government', 
                        certifications: ['FedRAMP', 'StateRAMP', 'ITAR'],
                        description: 'Government-grade security and data handling',
                    },
                    { 
                        icon: Scale, 
                        title: 'Legal', 
                        certifications: ['Attorney-Client Privilege', 'eDiscovery Ready'],
                        description: 'Confidential document handling and retention',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
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

const ComplianceGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; certifications: string[]; description: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, certifications, description }, i) => (
            <Card key={i} className="group hover:shadow-lg hover:border-primary/50 transition-all bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all">
                        <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                        {certifications.map((cert, j) => (
                            <Badge key={j} variant="outline" className="text-xs">
                                {cert}
                            </Badge>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

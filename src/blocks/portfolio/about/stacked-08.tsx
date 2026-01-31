import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, CheckCircle2, Clock, DollarSign, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto space-y-16">
                    <HeroSection
                        src="https://picsum.photos/seed/stack8/800/400"
                        name="Alex Thompson"
                        title="Freelance Web Developer"
                        tagline="I help businesses build their online presence with custom web solutions."
                    />
                    <ProcessSection
                        title="How I Work"
                        steps={[
                            { number: '01', title: 'Discovery', description: 'We start with a call to understand your needs, goals, and timeline.' },
                            { number: '02', title: 'Proposal', description: 'I provide a detailed proposal with scope, timeline, and fixed pricing.' },
                            { number: '03', title: 'Development', description: 'I build your project with regular check-ins and updates.' },
                            { number: '04', title: 'Launch', description: 'We launch together and I provide support to ensure everything runs smoothly.' },
                        ]}
                    />
                    <Separator />
                    <ServicesSection
                        title="Services"
                        services={[
                            { title: 'Web Development', price: 'From $5,000', features: ['Custom websites', 'Web applications', 'E-commerce stores', 'CMS integration'] },
                            { title: 'Consulting', price: '$200/hour', features: ['Architecture review', 'Code audit', 'Tech strategy', 'Team training'] },
                            { title: 'Maintenance', price: '$500/month', features: ['Bug fixes', 'Updates', 'Monitoring', 'Priority support'] },
                        ]}
                    />
                    <Separator />
                    <WhyMeSection
                        title="Why Work With Me"
                        reasons={[
                            { icon: Zap, title: 'Fast Delivery', description: 'I respect deadlines and deliver on time, every time.' },
                            { icon: DollarSign, title: 'Fixed Pricing', description: 'No surprises. You know exactly what you\'ll pay upfront.' },
                            { icon: Clock, title: 'Responsive', description: 'Quick responses and regular updates throughout the project.' },
                            { icon: CheckCircle2, title: 'Quality', description: 'Clean code, tested thoroughly, built to last.' },
                        ]}
                    />
                    <CTASection
                        title="Ready to Start Your Project?"
                        description="Let's discuss your needs and see if we're a good fit."
                        cta={{ label: 'Get a Free Quote', href: '/contact', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface HeroSectionProps {
    src: string
    name: string
    title: string
    tagline: string
}

const HeroSection = ({ src, name, title, tagline }: HeroSectionProps) => (
    <div>
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image src={src} alt={name} fill className="object-cover" />
        </div>
        <Badge variant="secondary" className="mb-4">{title}</Badge>
        <h1 className="text-3xl @lg:text-4xl font-bold mb-4">{name}</h1>
        <p className="text-xl text-muted-foreground">{tagline}</p>
    </div>
)

interface ProcessStep {
    number: string
    title: string
    description: string
}

interface ProcessSectionProps {
    title: string
    steps: ProcessStep[]
}

const ProcessSection = ({ title, steps }: ProcessSectionProps) => (
    <div>
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid @md:grid-cols-2 gap-6">
            {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                    <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                        {step.number}
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

interface ServiceItem {
    title: string
    price: string
    features: string[]
}

interface ServicesSectionProps {
    title: string
    services: ServiceItem[]
}

const ServicesSection = ({ title, services }: ServicesSectionProps) => (
    <div>
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid @md:grid-cols-3 gap-6">
            {services.map((service) => (
                <Card key={service.title}>
                    <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{service.title}</h3>
                        <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                        <ul className="space-y-2">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="size-4 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
)

interface ReasonItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

interface WhyMeSectionProps {
    title: string
    reasons: ReasonItem[]
}

const WhyMeSection = ({ title, reasons }: WhyMeSectionProps) => (
    <div>
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid @sm:grid-cols-2 gap-6">
            {reasons.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                    <Icon className="size-6 text-primary shrink-0" />
                    <div>
                        <h3 className="font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTASectionProps {
    title: string
    description: string
    cta: CTAData
}

const CTASection = ({ title, description, cta }: CTASectionProps) => (
    <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="mb-6 opacity-90">{description}</p>
            <Button variant="secondary" size="lg" className="gap-2" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

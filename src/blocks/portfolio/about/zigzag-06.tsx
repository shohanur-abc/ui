import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="space-y-24">
                    <HeroBlock
                        src="https://picsum.photos/seed/zz18/400/400"
                        fallback="AT"
                        name="Alex Thompson"
                        role="Freelance Web Developer"
                        tagline="I help businesses build their online presence with custom web solutions."
                        status="Available for projects"
                        reverse={false}
                    />
                    <ProcessBlock
                        src="https://picsum.photos/seed/zz19/800/600"
                        title="How I Work"
                        steps={[
                            { number: '01', title: 'Discovery', description: 'Understand your needs and goals' },
                            { number: '02', title: 'Proposal', description: 'Detailed scope and fixed pricing' },
                            { number: '03', title: 'Development', description: 'Build with regular updates' },
                            { number: '04', title: 'Launch', description: 'Go live with ongoing support' },
                        ]}
                        reverse={true}
                    />
                    <ServicesBlock
                        src="https://picsum.photos/seed/zz20/800/600"
                        title="Services"
                        services={[
                            { title: 'Web Development', price: 'From $5,000', features: ['Custom websites', 'Web apps', 'E-commerce'] },
                            { title: 'Consulting', price: '$200/hour', features: ['Code audit', 'Architecture', 'Training'] },
                        ]}
                        reverse={false}
                    />
                    <WhyMeBlock
                        src="https://picsum.photos/seed/zz21/800/600"
                        title="Why Work With Me"
                        reasons={[
                            { icon: Zap, title: 'Fast Delivery', description: 'I respect deadlines and deliver on time.' },
                            { icon: Clock, title: 'Responsive', description: 'Quick responses and regular updates.' },
                            { icon: CheckCircle2, title: 'Quality', description: 'Clean code, tested thoroughly.' },
                        ]}
                        cta={{ label: 'Get a Free Quote', href: '/contact', icon: ArrowRight }}
                        reverse={true}
                    />
                </div>
            </div>
        </section>
    )
}

interface HeroBlockProps {
    src: string
    fallback: string
    name: string
    role: string
    tagline: string
    status: string
    reverse: boolean
}

const HeroBlock = ({ src, fallback, name, role, tagline, status, reverse }: HeroBlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2 flex justify-center">
            <Avatar className="size-64 ring-4 ring-border">
                <AvatarImage src={src} alt={name} />
                <AvatarFallback className="text-5xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
            </Avatar>
        </div>
        <div className="@lg:w-1/2 text-center @lg:text-left">
            <Badge className="mb-4">{role}</Badge>
            <h1 className="text-4xl @xl:text-5xl font-bold mb-4">{name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{tagline}</p>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                <span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                {status}
            </Badge>
        </div>
    </div>
)

interface ProcessStep {
    number: string
    title: string
    description: string
}

interface ProcessBlockProps {
    src: string
    title: string
    steps: ProcessStep[]
    reverse: boolean
}

const ProcessBlock = ({ src, title, steps, reverse }: ProcessBlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={src} alt={title} fill className="object-cover" />
            </div>
        </div>
        <div className="@lg:w-1/2">
            <h2 className="text-3xl font-bold mb-8">{title}</h2>
            <div className="grid @sm:grid-cols-2 gap-4">
                {steps.map((step) => (
                    <Card key={step.number}>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-primary mb-2">{step.number}</div>
                            <h3 className="font-semibold mb-1">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
)

interface ServiceItem {
    title: string
    price: string
    features: string[]
}

interface ServicesBlockProps {
    src: string
    title: string
    services: ServiceItem[]
    reverse: boolean
}

const ServicesBlock = ({ src, title, services, reverse }: ServicesBlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={src} alt={title} fill className="object-cover" />
            </div>
        </div>
        <div className="@lg:w-1/2">
            <h2 className="text-3xl font-bold mb-8">{title}</h2>
            <div className="space-y-4">
                {services.map((service) => (
                    <Card key={service.title}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold">{service.title}</h3>
                                <Badge variant="secondary">{service.price}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {service.features.map((feature) => (
                                    <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
)

interface ReasonItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface WhyMeBlockProps {
    src: string
    title: string
    reasons: ReasonItem[]
    cta: CTAData
    reverse: boolean
}

const WhyMeBlock = ({ src, title, reasons, cta, reverse }: WhyMeBlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={src} alt={title} fill className="object-cover" />
            </div>
        </div>
        <div className="@lg:w-1/2">
            <h2 className="text-3xl font-bold mb-8">{title}</h2>
            <div className="space-y-6 mb-8">
                {reasons.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex gap-4">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">{title}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button size="lg" className="gap-2" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </div>
    </div>
)

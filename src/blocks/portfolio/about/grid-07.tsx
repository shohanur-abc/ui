import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, Clock, DollarSign, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-8">
                    <HeroCard
                        src="https://picsum.photos/seed/gr7/800/800"
                        name="Alex Thompson"
                        role="Freelance Web Developer"
                        tagline="I help businesses build their online presence."
                        status="Available for projects"
                    />
                    <div className="space-y-6">
                        <BenefitsGrid
                            benefits={[
                                { icon: Zap, title: 'Fast Delivery', description: 'Projects delivered on time' },
                                { icon: DollarSign, title: 'Fixed Pricing', description: 'No hidden costs' },
                                { icon: Clock, title: 'Responsive', description: 'Quick communication' },
                                { icon: CheckCircle2, title: 'Quality', description: 'Clean, tested code' },
                            ]}
                        />
                        <ServicesCard
                            title="Services"
                            services={[
                                { name: 'Web Development', price: 'From $5,000' },
                                { name: 'Consulting', price: '$200/hour' },
                                { name: 'Maintenance', price: '$500/month' },
                            ]}
                        />
                        <CTACard
                            title="Ready to Start?"
                            description="Let's discuss your project and find the best solution."
                            cta={{ label: 'Get a Free Quote', href: '/contact', icon: ArrowRight }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface HeroCardProps {
    src: string
    name: string
    role: string
    tagline: string
    status: string
}

const HeroCard = ({ src, name, role, tagline, status }: HeroCardProps) => (
    <Card className="overflow-hidden py-0">
        <div className="relative aspect-square">
            <Image src={src} alt={name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Badge className="mb-3">{role}</Badge>
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                <p className="text-lg text-white/80 mb-4">{tagline}</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <span className="size-2 rounded-full bg-green-400 mr-1.5 animate-pulse" />
                    {status}
                </Badge>
            </div>
        </div>
    </Card>
)

interface BenefitItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

interface BenefitsGridProps {
    benefits: BenefitItem[]
}

const BenefitsGrid = ({ benefits }: BenefitsGridProps) => (
    <div className="grid grid-cols-2 gap-4">
        {benefits.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
                <CardContent className="p-4">
                    <Icon className="size-6 text-primary mb-2" />
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

interface ServiceItem {
    name: string
    price: string
}

interface ServicesCardProps {
    title: string
    services: ServiceItem[]
}

const ServicesCard = ({ title, services }: ServicesCardProps) => (
    <Card>
        <CardHeader>
            <h2 className="text-lg font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="space-y-3">
            {services.map((service) => (
                <div key={service.name} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">{service.name}</span>
                    <Badge variant="secondary">{service.price}</Badge>
                </div>
            ))}
        </CardContent>
    </Card>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTACardProps {
    title: string
    description: string
    cta: CTAData
}

const CTACard = ({ title, description, cta }: CTACardProps) => (
    <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="opacity-90 mb-4">{description}</p>
            <Button variant="secondary" className="gap-2" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

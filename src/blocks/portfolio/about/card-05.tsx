import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, Clock, DollarSign, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-lg mx-auto">
                    <FreelancerCard
                        src="https://picsum.photos/seed/card5/800/600"
                        name="David Park"
                        role="Freelance Web Developer"
                        status="Open for projects"
                        description="I help businesses build their online presence. From landing pages to full web applications, I deliver quality work on time."
                        features={[
                            { icon: Zap, text: '2-4 week delivery' },
                            { icon: DollarSign, text: 'Fixed pricing' },
                            { icon: Clock, text: '24/7 support' },
                        ]}
                        services={['Landing Pages', 'E-commerce', 'Web Apps', 'APIs']}
                        cta={{ label: 'Request a Quote', href: '/quote', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface FreelancerCardProps {
    src: string
    name: string
    role: string
    status: string
    description: string
    features: FeatureItem[]
    services: string[]
    cta: CTAData
}

const FreelancerCard = ({ src, name, role, status, description, features, services, cta }: FreelancerCardProps) => (
    <Card className="overflow-hidden py-0">
        <div className="relative aspect-video">
            <Image src={src} alt={name} fill className="object-cover" />
            <Badge className="absolute top-4 right-4 bg-green-500/90 text-white border-none">
                <span className="size-2 rounded-full bg-white mr-1.5 animate-pulse" />
                {status}
            </Badge>
        </div>
        <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <p className="text-primary font-medium mb-4">{role}</p>
            <p className="text-muted-foreground text-sm mb-6">{description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
                {features.map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                        <Icon className="size-4 text-primary" />
                        <span>{text}</span>
                    </div>
                ))}
            </div>
            <div className="mb-6">
                <p className="text-sm font-medium mb-2">Services</p>
                <div className="grid grid-cols-2 gap-2">
                    {services.map((service) => (
                        <div key={service} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="size-4 text-primary" />
                            <span>{service}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button className="gap-2 w-full" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

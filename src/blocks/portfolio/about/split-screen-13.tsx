import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight, Clock, DollarSign, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <ContentSection
                        status="Open for Projects"
                        title="Laura Chen"
                        role="Freelance Web Developer"
                        description="I build custom websites and web applications for small businesses and startups. From e-commerce to SaaS, I deliver pixel-perfect, performant solutions that drive results."
                        offerings={[
                            { icon: Zap, title: 'Fast Delivery', text: '2-4 week turnaround' },
                            { icon: DollarSign, title: 'Fixed Pricing', text: 'No hourly surprises' },
                            { icon: Clock, title: '24/7 Support', text: 'Always available' },
                        ]}
                        packages={[
                            { name: 'Landing Page', price: 'From $2,000' },
                            { name: 'Full Website', price: 'From $5,000' },
                            { name: 'Web App', price: 'From $10,000' },
                        ]}
                        cta={{ label: 'Get a Quote', href: '/quote', icon: ArrowUpRight }}
                    />
                    <ImageSection
                        src="https://picsum.photos/seed/split13/800/900"
                        alt="Laura Chen"
                    />
                </div>
            </div>
        </section>
    )
}

interface OfferingItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    text: string
}

interface PackageItem {
    name: string
    price: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ContentSectionProps {
    status: string
    title: string
    role: string
    description: string
    offerings: OfferingItem[]
    packages: PackageItem[]
    cta: CTAData
}

const ContentSection = ({ status, title, role, description, offerings, packages, cta }: ContentSectionProps) => (
    <div>
        <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
            <span className="size-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            {status}
        </Badge>
        <h1 className="text-4xl @sm:text-5xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-lg text-primary font-medium mb-6">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
            {offerings.map(({ icon: Icon, title, text }, i) => (
                <div key={i} className="text-center">
                    <Icon className="size-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{text}</p>
                </div>
            ))}
        </div>
        <Separator className="my-6" />
        <div className="mb-8">
            <p className="text-sm font-medium mb-4">Starting Prices</p>
            <div className="flex gap-4">
                {packages.map(({ name, price }) => (
                    <Badge key={name} variant="secondary" className="flex-1 justify-center py-2 flex-col h-auto">
                        <span className="text-xs text-muted-foreground">{name}</span>
                        <span className="font-semibold">{price}</span>
                    </Badge>
                ))}
            </div>
        </div>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

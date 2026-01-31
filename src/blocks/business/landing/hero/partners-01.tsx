import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Handshake, Award, Building2, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Handshake} text="Partner Program" />
                        <Title text="Grow Your Business With Us" />
                        <Description text="Join our global partner ecosystem. Earn commissions, access exclusive resources, and co-market to millions of potential customers." />
                        <PartnerBenefits items={[
                            { icon: Award, title: 'Up to 30% Commission', description: 'Industry-leading revenue share' },
                            { icon: Building2, title: 'Dedicated Support', description: 'Personal partner manager' },
                            { icon: Users, title: 'Co-marketing', description: 'Joint campaigns and events' },
                        ]} />
                        <CTA items={[
                            { label: 'Become a Partner', href: '#partner', icon: ArrowRight },
                            { label: 'Partner Portal', href: '#portal', variant: 'outline' },
                        ]} />
                    </div>
                    <PartnerLogos items={[
                        'https://via.placeholder.com/200x80/f1f5f9/64748b?text=Partner+1',
                        'https://via.placeholder.com/200x80/f1f5f9/64748b?text=Partner+2',
                        'https://via.placeholder.com/200x80/f1f5f9/64748b?text=Partner+3',
                        'https://via.placeholder.com/200x80/f1f5f9/64748b?text=Partner+4',
                        'https://via.placeholder.com/200x80/f1f5f9/64748b?text=Partner+5',
                        'https://via.placeholder.com/200x80/f1f5f9/64748b?text=Partner+6',
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2">
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

const PartnerBenefits = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
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

const PartnerLogos = ({ items }: { items: string[] }) => (
    <Card className="bg-card/50 backdrop-blur">
        <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground mb-6">Trusted by 500+ partners worldwide</p>
            <div className="grid grid-cols-2 @sm:grid-cols-3 gap-6 items-center">
                {items.map((logo, i) => (
                    <div key={i} className="flex justify-center">
                        <Image 
                            src={logo} 
                            alt={`Partner ${i + 1}`} 
                            width={200} 
                            height={80} 
                            className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                        />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

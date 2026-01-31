import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, DollarSign, Rocket, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <ProfileHeader
                    src="https://picsum.photos/seed/acc5/400/400"
                    fallback="JD"
                    name="Jane Doe"
                    role="Freelance Consultant"
                    tagline="Helping startups build better products"
                />
                <ServicesAccordion
                    items={[
                        {
                            id: 'startup',
                            icon: Rocket,
                            title: 'Startup Package',
                            price: '$5,000',
                            description: 'Perfect for early-stage startups looking to build their MVP.',
                            features: [
                                'Product strategy session',
                                'MVP development (4 weeks)',
                                'Basic design system',
                                'Deployment to production',
                                '2 weeks post-launch support',
                            ],
                            popular: false,
                        },
                        {
                            id: 'growth',
                            icon: Zap,
                            title: 'Growth Package',
                            price: '$15,000',
                            description: 'For growing companies that need to scale their product.',
                            features: [
                                'Everything in Startup',
                                'Full product development (8 weeks)',
                                'Advanced design system',
                                'Performance optimization',
                                'Analytics integration',
                                '1 month post-launch support',
                            ],
                            popular: true,
                        },
                        {
                            id: 'enterprise',
                            icon: Sparkles,
                            title: 'Enterprise Package',
                            price: 'Custom',
                            description: 'Tailored solutions for large organizations with complex needs.',
                            features: [
                                'Everything in Growth',
                                'Dedicated project manager',
                                'Custom integrations',
                                'Security audit',
                                'Team training',
                                'Ongoing retainer support',
                            ],
                            popular: false,
                        },
                    ]}
                />
                <CTA label="Book a Consultation" href="/contact" icon={ArrowRight} />
            </div>
        </section>
    )
}

interface ProfileHeaderProps {
    src: string
    fallback: string
    name: string
    role: string
    tagline: string
}

const ProfileHeader = ({ src, fallback, name, role, tagline }: ProfileHeaderProps) => (
    <div className="text-center mb-12">
        <Avatar className="size-24 mx-auto mb-4 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-muted-foreground">{tagline}</p>
    </div>
)

interface ServiceItem {
    id: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    price: string
    description: string
    features: string[]
    popular: boolean
}

interface ServicesAccordionProps {
    items: ServiceItem[]
}

const ServicesAccordion = ({ items }: ServicesAccordionProps) => (
    <Card className="max-w-2xl mx-auto mb-12">
        <CardHeader className="text-center">
            <Badge variant="secondary" className="w-fit mx-auto mb-2">Services</Badge>
            <h2 className="text-2xl font-bold">Choose Your Package</h2>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible defaultValue="growth">
                {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center justify-between w-full pr-4">
                                <div className="flex items-center gap-3">
                                    <div className={`size-10 rounded-full flex items-center justify-center ${item.popular ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <item.icon className="size-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{item.title}</span>
                                            {item.popular && <Badge className="text-xs">Popular</Badge>}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-lg font-bold">
                                    <DollarSign className="size-4" />
                                    {item.price.replace('$', '')}
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-13 pt-4">
                                <div className="grid @sm:grid-cols-2 gap-2">
                                    {item.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button className="mt-6 w-full @sm:w-auto" variant={item.popular ? 'default' : 'outline'} asChild>
                                    <Link href={`/contact?package=${item.id}`}>
                                        Get Started
                                    </Link>
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
    </Card>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center">
        <p className="text-muted-foreground mb-4">Not sure which package is right for you?</p>
        <Button variant="outline" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)

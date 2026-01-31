import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, CheckCircle2, Clock, DollarSign, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <ProfileHeader
                    src="https://picsum.photos/seed/tabs7/400/400"
                    fallback="JD"
                    name="Jane Doe"
                    role="Freelance Developer"
                    status="Available for projects"
                />
                <ServicesTabs
                    tabs={[
                        {
                            id: 'web',
                            label: 'Web Development',
                            title: 'Custom Web Applications',
                            description: 'Full-stack web development with modern frameworks. From landing pages to complex SaaS applications.',
                            features: [
                                'Responsive design',
                                'Performance optimized',
                                'SEO-friendly',
                                'Accessible (WCAG 2.1)',
                                'CMS integration',
                                'E-commerce ready',
                            ],
                            pricing: { from: '$5,000', timeframe: '2-4 weeks' },
                        },
                        {
                            id: 'mobile',
                            label: 'Mobile Apps',
                            title: 'Cross-Platform Mobile Apps',
                            description: 'Native-quality mobile apps using React Native. One codebase, multiple platforms.',
                            features: [
                                'iOS & Android',
                                'Offline support',
                                'Push notifications',
                                'App store submission',
                                'Analytics integration',
                                'Regular updates',
                            ],
                            pricing: { from: '$10,000', timeframe: '4-8 weeks' },
                        },
                        {
                            id: 'consulting',
                            label: 'Consulting',
                            title: 'Technical Consulting',
                            description: 'Expert advice on architecture, technology choices, and team processes.',
                            features: [
                                'Architecture review',
                                'Code audit',
                                'Tech stack selection',
                                'Team training',
                                'Process improvement',
                                'Ongoing support',
                            ],
                            pricing: { from: '$200/hr', timeframe: 'Flexible' },
                        },
                    ]}
                />
                <CTA label="Start a Project" href="/contact" icon={ArrowRight} />
            </div>
        </section>
    )
}

interface ProfileHeaderProps {
    src: string
    fallback: string
    name: string
    role: string
    status: string
}

const ProfileHeader = ({ src, fallback, name, role, status }: ProfileHeaderProps) => (
    <div className="flex flex-col @sm:flex-row items-center gap-4 mb-12">
        <Avatar className="size-20 ring-2 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <div className="text-center @sm:text-left">
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <p className="text-primary font-medium mb-2">{role}</p>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                <span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                {status}
            </Badge>
        </div>
    </div>
)

interface PricingData {
    from: string
    timeframe: string
}

interface TabItem {
    id: string
    label: string
    title: string
    description: string
    features: string[]
    pricing: PricingData
}

interface ServicesTabsProps {
    tabs: TabItem[]
}

const ServicesTabs = ({ tabs }: ServicesTabsProps) => (
    <Tabs defaultValue={tabs[0].id} className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
            {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
            ))}
        </TabsList>
        {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold mb-2">{tab.title}</h2>
                        <p className="text-muted-foreground mb-6">{tab.description}</p>
                        <div className="grid @sm:grid-cols-2 gap-3 mb-6">
                            {tab.features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="size-4 text-green-500" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col @sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <DollarSign className="size-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Starting from</p>
                                    <p className="font-semibold">{tab.pricing.from}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="size-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Timeframe</p>
                                    <p className="font-semibold">{tab.pricing.timeframe}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 @sm:ml-auto">
                                <Zap className="size-5 text-primary" />
                                <span className="text-sm font-medium">Quick turnaround</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        ))}
    </Tabs>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center mt-12">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)

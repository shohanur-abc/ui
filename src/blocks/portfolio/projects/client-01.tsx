import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Building2, Briefcase } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Building2} text="Enterprise" />
                    <Title text="Client Work" />
                    <Description text="Projects delivered for leading companies across industries." />
                </div>

                <ClientGrid
                    items={[
                        {
                            logo: 'https://logo.clearbit.com/google.com',
                            client: 'Google',
                            industry: 'Technology',
                            project: 'Internal Analytics Tool',
                            description: 'Data visualization platform for internal metrics.',
                            year: '2025',
                            href: '#',
                        },
                        {
                            logo: 'https://logo.clearbit.com/stripe.com',
                            client: 'Stripe',
                            industry: 'Fintech',
                            project: 'Payment Dashboard',
                            description: 'Merchant analytics and transaction monitoring.',
                            year: '2024',
                            href: '#',
                        },
                        {
                            logo: 'https://logo.clearbit.com/shopify.com',
                            client: 'Shopify',
                            industry: 'E-Commerce',
                            project: 'App Integration',
                            description: 'Custom app for inventory management.',
                            year: '2024',
                            href: '#',
                        },
                        {
                            logo: 'https://logo.clearbit.com/notion.so',
                            client: 'Notion',
                            industry: 'Productivity',
                            project: 'Template System',
                            description: 'Custom template creation workflow.',
                            year: '2024',
                            href: '#',
                        },
                        {
                            logo: 'https://logo.clearbit.com/figma.com',
                            client: 'Figma',
                            industry: 'Design',
                            project: 'Plugin Development',
                            description: 'Design system sync plugin.',
                            year: '2023',
                            href: '#',
                        },
                        {
                            logo: 'https://logo.clearbit.com/vercel.com',
                            client: 'Vercel',
                            industry: 'Infrastructure',
                            project: 'Dashboard Redesign',
                            description: 'Project management interface improvements.',
                            year: '2023',
                            href: '#',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex justify-center mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface ClientItem {
    logo: string
    client: string
    industry: string
    project: string
    description: string
    year: string
    href: string
}

const ClientGrid = ({ items }: { items: ClientItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ logo, client, industry, project, description, year, href }, i) => (
            <Card key={i} className="group border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <div className="size-12 rounded-lg bg-white p-2 flex items-center justify-center">
                            <Image src={logo} alt={client} width={32} height={32} className="object-contain" />
                        </div>
                        <Badge variant="secondary">{year}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Briefcase className="size-3.5" />
                        <span>{industry}</span>
                    </div>
                    <CardTitle className="text-lg">{client}</CardTitle>
                </CardHeader>
                
                <CardContent>
                    <h4 className="font-medium mb-2 group-hover:text-primary transition-colors">{project}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{description}</p>
                    
                    <Button variant="outline" size="sm" className="gap-1.5 w-full" asChild>
                        <Link href={href}>
                            View Case Study <ArrowUpRight className="size-3.5" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)

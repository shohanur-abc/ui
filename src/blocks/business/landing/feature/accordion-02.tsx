'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, BarChart, Code, Layers, Lock, Rocket, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface AccordionItemData {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    features: string[]
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Layers} text="Platform Capabilities" />
                    <Title text="Explore Our Core" highlight="Features" />
                    <Description text="Click on each category to discover the powerful features that help businesses succeed." />
                </div>

                <FeatureAccordion items={[
                    { icon: Zap, title: 'Automation Engine', description: 'Automate complex workflows with our visual builder and pre-built templates.', features: ['Visual workflow designer', 'Conditional branching', 'Error handling', 'Scheduled triggers', 'API webhooks'] },
                    { icon: BarChart, title: 'Analytics Suite', description: 'Gain deep insights with real-time dashboards and predictive analytics.', features: ['Custom dashboards', 'Real-time metrics', 'Cohort analysis', 'Funnel tracking', 'Export capabilities'] },
                    { icon: Code, title: 'Developer Tools', description: 'Build custom integrations with our comprehensive API and SDK library.', features: ['RESTful API', 'GraphQL support', 'SDK for 10+ languages', 'Webhook management', 'Sandbox environment'] },
                    { icon: Lock, title: 'Security Features', description: 'Enterprise-grade security with compliance certifications and audit trails.', features: ['SSO / SAML', 'Role-based access', 'Audit logging', 'Data encryption', 'Compliance reports'] },
                    { icon: Rocket, title: 'Performance', description: 'Built for speed with global edge deployment and intelligent caching.', features: ['Global CDN', 'Edge functions', 'Auto-scaling', 'Load balancing', '99.99% uptime SLA'] },
                ]} />

                <CTASection 
                    label="Get Started Free"
                    href="/signup"
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const FeatureAccordion = ({ items }: { items: AccordionItemData[] }) => (
    <Accordion type="single" collapsible defaultValue="item-0" className="max-w-3xl mx-auto">
        {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                <AccordionTrigger className="hover:no-underline py-5 @md:py-6">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                            <item.icon className="size-5 text-primary" />
                        </div>
                        <span className="font-semibold text-left">{item.title}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                    <div className="pl-14">
                        <p className="mb-4 text-muted-foreground">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {item.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                    {feature}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)

const CTASection = ({ label, href }: { label: string; href: string }) => (
    <div className="mt-12 @md:mt-16 text-center">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

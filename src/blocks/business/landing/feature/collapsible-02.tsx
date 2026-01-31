'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CheckCircle2, ChevronRight, Layers, Star } from 'lucide-react'
import { ComponentType, useState } from 'react'

interface FeatureCategory {
    title: string
    badge?: string
    features: string[]
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Star} text="Complete Feature List" />
                    <Title text="Packed with Everything" highlight="You Need" />
                    <Description text="Explore our comprehensive feature set organized by category. Click to expand each section." />
                </div>

                <FeatureCategories items={[
                    { title: 'Automation & Workflows', badge: 'Popular', features: ['Visual workflow builder', 'Conditional logic', 'Scheduled triggers', 'Webhooks & API triggers', 'Error handling & retries', 'Audit logging'] },
                    { title: 'Analytics & Reporting', features: ['Custom dashboards', 'Real-time metrics', 'Scheduled reports', 'Export to CSV/PDF', 'Predictive analytics', 'Funnel analysis'] },
                    { title: 'Team Collaboration', features: ['Shared workspaces', 'Real-time co-editing', 'Comments & mentions', 'Role-based permissions', 'Activity timeline', 'Version history'] },
                    { title: 'Security & Compliance', badge: 'Enterprise', features: ['SOC 2 Type II', 'GDPR compliant', 'SSO / SAML', 'Two-factor authentication', 'IP allowlisting', 'Audit trails'] },
                    { title: 'Integrations', features: ['500+ native integrations', 'Custom API access', 'Zapier compatible', 'Webhooks', 'SDKs for popular languages', 'Data sync'] },
                    { title: 'Support & Services', features: ['24/7 email support', 'Live chat', 'Dedicated success manager', 'Onboarding assistance', 'Training webinars', 'API documentation'] },
                ]} />
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

const FeatureCategories = ({ items }: { items: FeatureCategory[] }) => {
    const [openIndices, setOpenIndices] = useState<number[]>([0])

    const toggleIndex = (index: number) => {
        setOpenIndices(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    return (
        <div className="grid gap-4 @md:gap-5 @lg:grid-cols-2">
            {items.map((category, index) => (
                <Collapsible 
                    key={category.title}
                    open={openIndices.includes(index)}
                    onOpenChange={() => toggleIndex(index)}
                >
                    <Card className="border-border/50 transition-all hover:border-primary/30">
                        <CollapsibleTrigger className="w-full">
                            <CardContent className="p-4 @md:p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ChevronRight className={`size-5 text-primary shrink-0 transition-transform duration-200 ${openIndices.includes(index) ? 'rotate-90' : ''}`} />
                                    <span className="font-semibold text-left">{category.title}</span>
                                    {category.badge && (
                                        <Badge variant="secondary" className="text-xs">{category.badge}</Badge>
                                    )}
                                </div>
                                <span className="text-sm text-muted-foreground">{category.features.length} features</span>
                            </CardContent>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <CardContent className="px-4 @md:px-5 pb-4 @md:pb-5 pt-0">
                                <div className="grid gap-2 @sm:grid-cols-2 pt-4 border-t border-border/50">
                                    {category.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="size-4 text-primary shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </CollapsibleContent>
                    </Card>
                </Collapsible>
            ))}
        </div>
    )
}

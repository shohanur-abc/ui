'use client'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, HelpCircle, Layers } from 'lucide-react'
import { ComponentType, useState } from 'react'

interface CollapsibleItem {
    title: string
    content: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-start">
                    <div className="@xl:sticky @xl:top-24">
                        <Eyebrow icon={HelpCircle} text="Common Questions" />
                        <Title text="Everything You Need to" highlight="Know" />
                        <Description text="Find answers to frequently asked questions about our platform, features, and pricing." />
                    </div>

                    <CollapsibleList items={[
                        { title: 'How does the free trial work?', content: 'Start with a 14-day free trial with full access to all features. No credit card required. At the end of your trial, choose the plan that fits your needs.' },
                        { title: 'Can I cancel my subscription anytime?', content: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period, and we don\'t charge any cancellation fees.' },
                        { title: 'What payment methods do you accept?', content: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice.' },
                        { title: 'Is my data secure?', content: 'Absolutely. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. We\'re SOC 2 Type II certified and GDPR compliant.' },
                        { title: 'Do you offer custom enterprise plans?', content: 'Yes, we offer custom enterprise plans with dedicated support, SLA guarantees, custom integrations, and volume discounts. Contact our sales team for details.' },
                        { title: 'How do I migrate from another platform?', content: 'We provide free migration assistance including data import tools, API mapping, and dedicated support to ensure a smooth transition with zero data loss.' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const CollapsibleList = ({ items }: { items: CollapsibleItem[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <Collapsible 
                    key={item.title} 
                    open={openIndex === index}
                    onOpenChange={(isOpen) => setOpenIndex(isOpen ? index : null)}
                >
                    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
                        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 @md:p-5 text-left">
                            <span className="font-medium pr-4">{item.title}</span>
                            <ChevronDown className={`size-5 text-muted-foreground shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="px-4 @md:px-5 pb-4 @md:pb-5 pt-0">
                                <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">{item.content}</p>
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            ))}
        </div>
    )
}

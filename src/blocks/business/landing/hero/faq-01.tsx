import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-start">
                    <div className="@3xl:sticky @3xl:top-24">
                        <Eyebrow icon={HelpCircle} text="Common Questions" />
                        <Title text="Everything You Need to Know" />
                        <Description text="Get answers to the most frequently asked questions about our platform. Can&apos;t find what you&apos;re looking for? Our team is here to help." />
                        <CTA items={[
                            { label: 'Contact Support', href: '#support', icon: ArrowRight },
                            { label: 'Help Center', href: '#help', variant: 'outline' },
                        ]} />
                    </div>
                    <FAQList items={[
                        { question: 'How long does implementation take?', answer: 'Most customers are up and running within 1-2 weeks. Our dedicated onboarding team guides you through every step of the process.' },
                        { question: 'Can I integrate with my existing tools?', answer: 'Yes! We offer 200+ native integrations including Salesforce, HubSpot, Slack, and more. Custom integrations are available on Enterprise plans.' },
                        { question: 'Is my data secure?', answer: 'Absolutely. We&apos;re SOC 2 Type II certified, GDPR compliant, and use bank-level encryption for all data at rest and in transit.' },
                        { question: 'What kind of support do you offer?', answer: 'All plans include email support. Pro plans get priority support with 4-hour response times. Enterprise customers get dedicated account managers and 24/7 phone support.' },
                        { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time. No long-term contracts, no cancellation fees. Your data is always exportable.' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
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

const FAQList = ({ items }: { items: { question: string; answer: string }[] }) => (
    <div className="space-y-4">
        {items.map(({ question, answer }, i) => (
            <details key={i} className="group bg-card border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-muted/50 transition-colors">
                    <span className="font-medium text-left">{question}</span>
                    <ChevronDown className="size-5 text-muted-foreground shrink-0 group-open:hidden" />
                    <ChevronUp className="size-5 text-primary shrink-0 hidden group-open:block" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground">
                    {answer}
                </div>
            </details>
        ))}
    </div>
)

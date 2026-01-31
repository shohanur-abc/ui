import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Box, CreditCard, Globe, Shield, Truck, Undo2 } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">FAQ</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Common Questions</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Find quick answers to frequently asked questions about our services.</p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <FaqAccordion items={[
                        {
                            icon: Truck,
                            question: 'How long does shipping take?',
                            answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 1-2 day delivery. Free shipping is offered on orders over $50.',
                        },
                        {
                            icon: Undo2,
                            question: 'What is your return policy?',
                            answer: 'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the return.',
                        },
                        {
                            icon: CreditCard,
                            question: 'What payment methods do you accept?',
                            answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and offer interest-free installments through Klarna.',
                        },
                        {
                            icon: Shield,
                            question: 'Is my payment information secure?',
                            answer: 'Absolutely. We use industry-standard SSL encryption to protect all transactions. Your payment information is never stored on our servers.',
                        },
                        {
                            icon: Globe,
                            question: 'Do you ship internationally?',
                            answer: 'Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination. Customs duties may apply.',
                        },
                        {
                            icon: Box,
                            question: 'How can I track my order?',
                            answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can also track your order in your account dashboard or by visiting our order tracking page.',
                        },
                    ]} />
                </div>
            </div>
        </section>
    )
}

interface FaqItem {
    icon: ComponentType<{ className?: string }>
    question: string
    answer: string
}

const FaqAccordion = ({ items }: { items: FaqItem[] }) => (
    <Accordion type="single" collapsible className="w-full">
        {items.map(({ icon: Icon, question, answer }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left gap-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="size-4 text-primary" />
                        </div>
                        <span className="font-semibold">{question}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-11">
                    {answer}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)

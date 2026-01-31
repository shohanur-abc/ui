'use client'

import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-start">
                    <div className="@xl:sticky @xl:top-8">
                        <Eyebrow icon={HelpCircle} text="Common Questions" />
                        <Title text="Frequently Asked Questions" />
                        <Description text="Everything you need to know about working with me. Can't find what you're looking for? Feel free to reach out directly." />
                    </div>

                    <FAQAccordion
                        items={[
                            {
                                question: 'What services do you offer?',
                                answer: 'I offer full-stack web development, mobile app development, UI/UX design, and technical consulting. Each project is tailored to your specific needs.',
                            },
                            {
                                question: 'How long does a typical project take?',
                                answer: 'Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a full web application could take 2-6 months.',
                            },
                            {
                                question: 'What is your pricing structure?',
                                answer: 'I offer both project-based and hourly pricing depending on the nature of the work. Contact me for a detailed quote based on your requirements.',
                            },
                            {
                                question: 'Do you offer ongoing support?',
                                answer: 'Yes, I provide maintenance and support packages to ensure your application stays up-to-date and runs smoothly after launch.',
                            },
                            {
                                question: 'What technologies do you specialize in?',
                                answer: 'My core stack includes React, Next.js, TypeScript, Node.js, and PostgreSQL. I also work with Python, Go, and various cloud platforms.',
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface EyebrowProps {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
    <Badge variant="outline" className="mb-3 @md:mb-4 gap-1.5">
        <Icon className="size-3.5" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FAQItem {
    question: string
    answer: string
}

const FAQAccordion = ({ items }: { items: FAQItem[] }) => (
    <Accordion type="single" collapsible className="w-full">
        {items.map(({ question, answer }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base @md:text-lg font-medium hover:no-underline">
                    {question}
                </AccordionTrigger>
                <AccordionContent className="text-sm @md:text-base text-muted-foreground">
                    {answer}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)

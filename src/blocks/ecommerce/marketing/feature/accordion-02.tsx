import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @lg:gap-12">
                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">Help Center</Badge>
                        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Questions? We&apos;ve Got Answers</h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">Browse our most frequently asked questions below or contact our support team for personalized assistance.</p>

                        <Card className="py-0">
                            <CardContent className="p-5 @md:p-6">
                                <h3 className="font-bold mb-2">Still need help?</h3>
                                <p className="text-sm text-muted-foreground mb-4">Our support team is available 24/7 to assist you with any questions.</p>
                                <div className="flex gap-4 text-sm">
                                    <div>
                                        <div className="font-semibold">Email</div>
                                        <div className="text-muted-foreground">support@store.com</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Phone</div>
                                        <div className="text-muted-foreground">1-800-123-4567</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <CategoryFaq categories={[
                            {
                                name: 'Shipping',
                                items: [
                                    { q: 'How fast is shipping?', a: 'Standard: 5-7 days. Express: 1-2 days.' },
                                    { q: 'Is shipping free?', a: 'Free on orders over $50.' },
                                ],
                            },
                            {
                                name: 'Returns',
                                items: [
                                    { q: 'Can I return items?', a: '30-day returns on all items.' },
                                    { q: 'Are returns free?', a: 'Yes, pre-paid labels included.' },
                                ],
                            },
                            {
                                name: 'Payment',
                                items: [
                                    { q: 'What payments do you accept?', a: 'All major cards, PayPal, Apple Pay.' },
                                    { q: 'Can I pay in installments?', a: 'Yes, 4 interest-free payments available.' },
                                ],
                            },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface FaqCategory {
    name: string
    items: { q: string; a: string }[]
}

const CategoryFaq = ({ categories }: { categories: FaqCategory[] }) => (
    <div className="space-y-6">
        {categories.map(({ name, items }, i) => (
            <div key={i}>
                <h3 className="font-bold text-lg mb-3">{name}</h3>
                <Accordion type="single" collapsible className="w-full">
                    {items.map(({ q, a }, j) => (
                        <AccordionItem key={j} value={`${i}-${j}`}>
                            <AccordionTrigger className="text-left text-sm hover:no-underline">
                                {q}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">
                                {a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        ))}
    </div>
)

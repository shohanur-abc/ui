import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Services" />
                    <Title text="Development Services" />
                    <Description text="Comprehensive solutions for every stage of your product journey." />
                </div>

                <ServiceList
                    items={[
                        {
                            title: 'MVP Development',
                            description: 'Get to market quickly with a lean, functional product.',
                            price: 'From $5,000',
                            features: ['Core feature development', 'Basic UI/UX design', 'Cloud deployment', '30 days delivery'],
                        },
                        {
                            title: 'Full Product Development',
                            description: 'End-to-end development for serious businesses.',
                            price: 'From $15,000',
                            features: ['Custom design system', 'Full-stack development', 'Third-party integrations', 'Ongoing support', 'Documentation'],
                        },
                        {
                            title: 'Enterprise Solutions',
                            description: 'Complex systems for large organizations.',
                            price: 'Custom Quote',
                            features: ['Architecture consulting', 'Team augmentation', 'Legacy modernization', 'Compliance & security', 'Dedicated support'],
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface ServiceItem {
    title: string
    description: string
    price: string
    features: string[]
}

const ServiceList = ({ items }: { items: ServiceItem[] }) => (
    <div className="space-y-4 @md:space-y-5 max-w-4xl mx-auto">
        {items.map(({ title, description, price, features }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all">
                <CardContent className="p-6 @md:p-8">
                    <div className="grid @lg:grid-cols-3 gap-6 @lg:gap-8 items-start">
                        <div className="@lg:col-span-2">
                            <div className="flex items-start justify-between mb-2 @lg:mb-0">
                                <h3 className="font-bold text-xl @md:text-2xl">{title}</h3>
                                <span className="@lg:hidden text-lg font-bold text-primary">{price}</span>
                            </div>
                            <p className="text-sm @md:text-base text-muted-foreground mb-4">{description}</p>

                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {features.map((feature, j) => (
                                    <div key={j} className="flex items-center gap-2 text-sm">
                                        <Check className="size-4 text-primary" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden @lg:block text-right">
                            <div className="text-2xl font-bold text-primary">{price}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

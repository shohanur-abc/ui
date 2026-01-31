import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Services" />
                    <Title text="Service Packages" />
                    <Description text="Flexible options to match your project needs and budget." />
                </div>

                <CardGrid
                    items={[
                        {
                            title: 'Landing Page',
                            description: 'Perfect for startups and small businesses.',
                            price: '$2,500',
                            features: ['Single page design', 'Mobile responsive', 'Contact form', '1 week delivery'],
                            popular: false,
                        },
                        {
                            title: 'Full Website',
                            description: 'Complete solution for growing businesses.',
                            price: '$7,500',
                            features: ['Up to 10 pages', 'CMS integration', 'SEO optimization', 'Analytics setup', '2-4 weeks delivery'],
                            popular: true,
                        },
                        {
                            title: 'Web Application',
                            description: 'Custom solutions for complex requirements.',
                            price: 'Custom',
                            features: ['Full-stack development', 'Database design', 'User authentication', 'API integration', 'Ongoing support'],
                            popular: false,
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

interface CardItem {
    title: string
    description: string
    price: string
    features: string[]
    popular: boolean
}

const CardGrid = ({ items }: { items: CardItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8 max-w-5xl mx-auto">
        {items.map(({ title, description, price, features, popular }, i) => (
            <Card
                key={i}
                className={`py-0 relative ${popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
                {popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="shadow-md">Most Popular</Badge>
                    </div>
                )}
                <CardContent className="p-6 @md:p-8">
                    <h3 className="font-bold text-xl mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{description}</p>

                    <div className="mb-6">
                        <span className="text-3xl @md:text-4xl font-bold">{price}</span>
                        {price !== 'Custom' && <span className="text-muted-foreground">/project</span>}
                    </div>

                    <ul className="space-y-3">
                        {features.map((feature, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="size-4 text-primary shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button className={`w-full mt-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        popular
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-muted hover:bg-muted/80'
                    }`}>
                        Get Started
                        <ArrowRight className="size-4" />
                    </button>
                </CardContent>
            </Card>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Sparkles, Star, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-3 gap-8 @xl:gap-12 items-center">
                    <div className="@3xl:col-span-1">
                        <Eyebrow text="Features" />
                        <Title text="What Sets Us Apart" />
                        <Description text="Discover the unique benefits that make shopping with us an exceptional experience." />
                        <Link href="/about" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-6 group">
                            Learn More
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="@3xl:col-span-2">
                        <FeatureGrid items={[
                            { icon: Star, title: 'Curated Selection', description: 'Handpicked products from top brands worldwide.', highlight: true },
                            { icon: Zap, title: 'Lightning Fast', description: 'Same-day processing and express shipping options.' },
                            { icon: Sparkles, title: 'Premium Quality', description: 'Only the finest materials and craftsmanship.' },
                            { icon: TrendingUp, title: 'Best Value', description: 'Competitive pricing with exclusive member deals.' },
                        ]} />
                    </div>
                </div>
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
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    highlight?: boolean
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, highlight }, i) => (
            <li key={i}>
                <Card className={`h-full py-0 group hover:shadow-lg transition-all ${highlight ? 'border-primary bg-primary/5' : ''}`}>
                    <CardContent className="p-5 @md:p-6">
                        <div className={`size-11 @md:size-12 rounded-xl flex items-center justify-center mb-4 ${highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground'} transition-colors`}>
                            <Icon className="size-5 @md:size-6" />
                        </div>
                        <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-sm @md:text-base text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

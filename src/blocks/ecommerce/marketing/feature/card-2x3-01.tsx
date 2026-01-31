import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Gem, Globe, Heart, Leaf, Shield, Sparkles } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="Our Values" />
                    <Title text="Built on Trust" />
                    <Description text="The principles that guide everything we do, from sourcing to delivery." />
                </div>

                <FeatureGrid items={[
                    { icon: Shield, title: 'Authenticity Guaranteed', description: 'Every product is verified for authenticity with our rigorous quality checks.' },
                    { icon: Leaf, title: 'Sustainable Sourcing', description: 'Partnering with ethical suppliers who share our commitment to the planet.' },
                    { icon: Heart, title: 'Customer First', description: 'Your satisfaction drives every decision we make as a company.' },
                    { icon: Gem, title: 'Premium Selection', description: 'Curated collections featuring only the finest products available.' },
                    { icon: Globe, title: 'Global Reach', description: 'Delivering to over 100 countries with localized support.' },
                    { icon: Sparkles, title: 'Innovation', description: 'Constantly improving our platform and product offerings.' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i}>
                <Card className="h-full py-0 group hover:shadow-md transition-all">
                    <CardContent className="p-6 @md:p-8">
                        <div className="size-12 @md:size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 @md:mb-5 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all">
                            <Icon className="size-6 @md:size-7" />
                        </div>
                        <h3 className="text-lg @md:text-xl font-semibold mb-2 @md:mb-3">{title}</h3>
                        <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

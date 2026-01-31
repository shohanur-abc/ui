import { Badge } from '@/components/ui/badge'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 @md:mb-14">
                        <Eyebrow text="Numbers" />
                        <Title text="Impact in Numbers" />
                        <Description text="A track record of delivering results." />
                    </div>

                    <MinimalStats
                        items={[
                            { value: '150+', label: 'Projects Delivered', description: 'Across web, mobile, and cloud' },
                            { value: '8+', label: 'Years Experience', description: 'Building digital products' },
                            { value: '99%', label: 'Client Satisfaction', description: 'Based on post-project surveys' },
                            { value: '50+', label: 'Happy Clients', description: 'From startups to enterprises' },
                        ]}
                    />
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface StatItem {
    value: string
    label: string
    description: string
}

const MinimalStats = ({ items }: { items: StatItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-8 @md:gap-10">
        {items.map(({ value, label, description }, i) => (
            <div key={i} className="text-center group">
                <div className="text-4xl @sm:text-5xl @md:text-6xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    {value}
                </div>
                <div className="font-semibold text-base @md:text-lg mb-1">{label}</div>
                <div className="text-sm text-muted-foreground">{description}</div>
            </div>
        ))}
    </div>
)

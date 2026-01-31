import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Layers, Palette, Rocket, Sparkles, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="Core Expertise" />
                    <Title text="What I Bring to the Table" />
                    <Description text="A unique blend of design sensibility and technical expertise to create exceptional digital experiences." />
                </div>

                <BentoGrid items={[
                    { icon: Code2, title: 'Clean Code', description: 'Writing maintainable, scalable, and well-documented code that stands the test of time.', size: 'large' },
                    { icon: Palette, title: 'Design Systems', description: 'Building consistent UI libraries.', size: 'small' },
                    { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency.', size: 'small' },
                    { icon: Layers, title: 'Architecture', description: 'Designing robust system structures.', size: 'small' },
                    { icon: Sparkles, title: 'Innovation', description: 'Exploring cutting-edge technologies.', size: 'small' },
                    { icon: Rocket, title: 'Rapid Delivery', description: 'Shipping features fast without compromising quality, using agile methodologies.', size: 'large' },
                ]} />
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

interface BentoItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    size: 'small' | 'large'
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, size }, i) => (
            <Card
                key={i}
                className={`group hover:shadow-lg transition-all hover:-translate-y-0.5 py-0 ${size === 'large' ? '@xl:col-span-2' : ''}`}
            >
                <CardContent className="p-5 @md:p-6 @xl:p-8 h-full flex flex-col">
                    <div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Icon className="size-5 @md:size-6" />
                    </div>
                    <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm @md:text-base text-muted-foreground leading-relaxed flex-1">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

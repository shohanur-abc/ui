import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, Clock, Heart, Star, Trophy, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Why Choose Me" />
                    <Title text="Commitment to Excellence" />
                    <Description text="Dedicated to delivering outstanding results through passion, expertise, and unwavering attention to detail." />
                </div>

                <HighlightGrid
                    items={[
                        { icon: Trophy, title: 'Award Winning', description: 'Recognized for outstanding work', highlight: true },
                        { icon: Clock, title: 'On-Time Delivery', description: 'Meeting deadlines consistently' },
                        { icon: Heart, title: 'Client Focused', description: 'Your success is my priority' },
                        { icon: Star, title: 'Quality First', description: 'Excellence in every detail' },
                        { icon: Zap, title: 'Fast Turnaround', description: 'Quick without compromising' },
                        { icon: Briefcase, title: 'Professional', description: 'Industry best practices', highlight: true },
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

interface GridItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    highlight?: boolean
}

const HighlightGrid = ({ items }: { items: GridItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5 max-w-5xl mx-auto">
        {items.map(({ icon: Icon, title, description, highlight }, i) => (
            <Card
                key={i}
                className={`py-0 group transition-all hover:shadow-lg text-center ${
                    highlight ? 'border-primary/50 bg-primary/5' : ''
                }`}
            >
                <CardContent className="p-6 @md:p-8">
                    <div className={`size-14 @md:size-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
                        highlight 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}>
                        <Icon className="size-6 @md:size-7" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

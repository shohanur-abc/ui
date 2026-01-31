import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Compass, Lightbulb, Rocket, Search } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="The Journey" />
                    <Title text="From Idea to Reality" />
                    <Description text="A proven methodology that transforms your vision into a successful digital product." />
                </div>

                <Timeline items={[
                    { step: 1, icon: Search, title: 'Discovery & Research', description: 'Deep dive into your business goals, target audience, and competitive landscape to establish a solid foundation.' },
                    { step: 2, icon: Lightbulb, title: 'Strategy & Planning', description: 'Define the roadmap, technical architecture, and milestones that will guide the project to success.' },
                    { step: 3, icon: Compass, title: 'Design & Development', description: 'Iterative cycles of design, build, and refinement with regular feedback and collaboration.' },
                    { step: 4, icon: Rocket, title: 'Launch & Growth', description: 'Careful deployment, performance monitoring, and continuous optimization for long-term success.' },
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

interface TimelineItem {
    step: number
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const Timeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="relative">
        {/* Connecting line */}
        <div className="hidden @xl:block absolute top-12 left-0 right-0 h-0.5 bg-border" />

        <ul className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-6 @md:gap-8">
            {items.map(({ step, icon: Icon, title, description }, i) => (
                <li key={i} className="relative">
                    <Card className="h-full py-0 relative z-10">
                        <CardContent className="p-6 @md:p-8 text-center">
                            <div className="relative mx-auto mb-4 @md:mb-5">
                                <div className="size-14 @md:size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mx-auto">
                                    <Icon className="size-7 @md:size-8" />
                                </div>
                                <span className="absolute -top-2 -right-2 size-7 rounded-full bg-secondary text-sm font-bold flex items-center justify-center border">
                                    {step}
                                </span>
                            </div>
                            <h3 className="text-lg @md:text-xl font-semibold mb-2 @md:mb-3">{title}</h3>
                            <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">{description}</p>
                        </CardContent>
                    </Card>
                </li>
            ))}
        </ul>
    </div>
)

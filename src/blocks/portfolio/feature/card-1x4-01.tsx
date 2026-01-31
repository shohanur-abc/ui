import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8  py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 @xl:mb-20">
                    <Eyebrow icon={CheckCircle2} text="My Process" />
                    <Title text="How I Work" />
                    <Description text="A structured approach to delivering exceptional results on every project." />
                </div>

                <ProcessSteps items={[
                    {
                        step: '01',
                        title: 'Discovery',
                        description: 'Understanding your goals, audience, and requirements through in-depth research and discussions.',
                        points: ['Stakeholder interviews', 'Competitive analysis', 'Technical assessment']
                    },
                    {
                        step: '02',
                        title: 'Design',
                        description: 'Creating user-centered designs that align with your brand and business objectives.',
                        points: ['Wireframing', 'Visual design', 'Prototype testing']
                    },
                    {
                        step: '03',
                        title: 'Development',
                        description: 'Building robust, scalable solutions with clean code and best practices.',
                        points: ['Agile sprints', 'Code reviews', 'Quality assurance']
                    },
                    {
                        step: '04',
                        title: 'Launch',
                        description: 'Deploying your product with comprehensive testing and ongoing support.',
                        points: ['Performance optimization', 'Deployment', 'Monitoring & support']
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mx-auto mb-3 @md:mb-4">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface ProcessItem {
    step: string
    title: string
    description: string
    points: string[]
}

const ProcessSteps = ({ items }: { items: ProcessItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        {items.map(({ step, title, description, points }, i) => (
            <Card key={i} className="relative overflow-hidden group py-0">
                <CardContent className="p-6 @md:p-8">
                    <span className="text-6xl font-bold text-muted/20 absolute top-1 right-1 group-hover:text-primary/10 transition-colors">
                        {step}
                    </span>
                    <div className="relative">
                        <h3 className="text-lg @md:text-xl font-semibold mb-3">{title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed ">{description}</p>
                        <ul className="space-y-2">
                            {points.map((point, j) => (
                                <li key={j} className="flex items-center gap-2 text-xs @md:text-sm">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Code, Lightbulb, MessageCircle, Rocket, Target } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <AsymmetricLayout
                    header={{
                        eyebrow: 'Strengths',
                        title: 'What Sets Me Apart',
                    }}
                    featured={{
                        icon: Brain,
                        title: 'Strategic Thinking',
                        description: 'I don\'t just write code—I solve business problems. Every technical decision is evaluated against your goals and constraints.',
                    }}
                    items={[
                        { icon: Code, title: 'Technical Depth', description: 'Deep expertise in modern web technologies.' },
                        { icon: Lightbulb, title: 'Creative Solutions', description: 'Finding elegant solutions to complex problems.' },
                        { icon: MessageCircle, title: 'Communication', description: 'Clear, proactive updates throughout.' },
                        { icon: Rocket, title: 'Delivery', description: 'On-time, quality-focused execution.' },
                        { icon: Target, title: 'Goal-Oriented', description: 'Aligned with your business objectives.' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    eyebrow: string
    title: string
}

interface FeaturedProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

interface GridItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

interface AsymmetricLayoutProps {
    header: HeaderProps
    featured: FeaturedProps
    items: GridItem[]
}

const AsymmetricLayout = ({ header, featured, items }: AsymmetricLayoutProps) => {
    const FeaturedIcon = featured.icon
    return (
        <div>
            <div className="mb-10 @md:mb-14">
                <Badge variant="outline" className="mb-3 @md:mb-4">
                    {header.eyebrow}
                </Badge>
                <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
                    {header.title}
                </h2>
            </div>

            <div className="grid @xl:grid-cols-3 gap-4 @md:gap-6">
                <Card className="py-0 @xl:col-span-2 @xl:row-span-2 group hover:shadow-xl transition-all bg-primary text-primary-foreground">
                    <CardContent className="p-6 @md:p-8 @xl:p-10 h-full flex flex-col justify-between">
                        <div className="size-14 @md:size-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                            <FeaturedIcon className="size-7 @md:size-8" />
                        </div>
                        <div>
                            <h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3 @md:mb-4">
                                {featured.title}
                            </h3>
                            <p className="text-sm @md:text-base @xl:text-lg text-primary-foreground/80 leading-relaxed">
                                {featured.description}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {items.map(({ icon: Icon, title, description }, i) => (
                    <Card key={i} className="py-0 group hover:shadow-lg transition-all">
                        <CardContent className="p-5 @md:p-6 flex gap-4">
                            <div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                <Icon className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-0.5">{title}</h3>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

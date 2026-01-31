import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Lightbulb, Rocket, Target } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 @3xl:gap-16 items-center">
                    <div className="order-2 @3xl:order-1">
                        <Eyebrow text="My Approach" />
                        <Title text="Building with Purpose and Precision" />
                        <Description text="Every project begins with understanding your vision and ends with exceeding your expectations." />

                        <FeatureList items={[
                            { icon: Target, title: 'Goal-Oriented', description: 'Focused on achieving measurable results' },
                            { icon: Lightbulb, title: 'Creative Solutions', description: 'Innovative approaches to complex problems' },
                            { icon: Code2, title: 'Best Practices', description: 'Industry-standard methodologies' },
                            { icon: Rocket, title: 'Fast Delivery', description: 'Efficient workflows for quick turnarounds' },
                        ]} />

                        <div className="mt-6 @md:mt-8">
                            <Button size="lg">
                                Start a Project
                                <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="order-1 @3xl:order-2 relative">
                        <div className="aspect-square @3xl:aspect-4/5 rounded-2xl @md:rounded-3xl overflow-hidden relative">
                            <Image
                                src="https://picsum.photos/seed/split1/800/900"
                                alt="Development process"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 @md:-bottom-6 @md:-left-6 bg-card border rounded-xl @md:rounded-2xl p-4 @md:p-6 shadow-lg">
                            <div className="text-2xl @md:text-3xl font-bold text-primary">100+</div>
                            <div className="text-sm text-muted-foreground">Projects Delivered</div>
                        </div>
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
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureList = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i} className="flex gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold mb-0.5">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </li>
        ))}
    </ul>
)

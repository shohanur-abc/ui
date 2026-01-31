import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, Cpu, Eye, Fingerprint, Gauge, Puzzle } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-3 gap-6 @xl:gap-8">
                    <div className="@xl:col-span-1">
                        <Eyebrow text="Specializations" />
                        <Title text="Areas of Focus" />
                        <Description text="Deep expertise in key areas that drive modern digital products." />
                        <Link
                            href="#contact"
                            className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-6 group"
                        >
                            Learn More
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="@xl:col-span-2">
                        <FeatureGrid items={[
                            { icon: Eye, title: 'Visual Design', description: 'Creating stunning visual experiences that captivate and engage users.' },
                            { icon: Gauge, title: 'Performance', description: 'Optimizing every aspect for speed and efficiency.' },
                            { icon: Fingerprint, title: 'Accessibility', description: 'Building inclusive products for all users.' },
                            { icon: Puzzle, title: 'Integration', description: 'Seamless third-party service connections.' },
                            { icon: Box, title: 'Component Systems', description: 'Reusable, scalable design systems.' },
                            { icon: Cpu, title: 'Automation', description: 'Streamlined workflows and processes.' },
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
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-5 leading-tight">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @2xl:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i}>
                <Card className="h-full py-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 @md:p-5">
                        <div className="size-9 @md:size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                            <Icon className="size-4.5 @md:size-5 text-primary" />
                        </div>
                        <h3 className="text-sm @md:text-base font-semibold mb-1">{title}</h3>
                        <p className="text-xs @md:text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Blocks, CloudCog, Compass, PenTool, Repeat, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-10 @md:mb-14">
                    <div className="max-w-2xl">
                        <Eyebrow text="Methodology" />
                        <Title text="How I Work" />
                        <Description text="A systematic approach combining creativity with technical precision." />
                    </div>
                    <CTA label="View Process" href="#process" />
                </div>

                <ServiceGrid
                    items={[
                        { icon: Compass, title: 'Discovery', description: 'Understanding your goals and requirements through in-depth consultation.', number: '01' },
                        { icon: PenTool, title: 'Design', description: 'Crafting user-centered designs with wireframes and prototypes.', number: '02' },
                        { icon: Blocks, title: 'Build', description: 'Developing robust solutions using modern technologies.', number: '03' },
                        { icon: Repeat, title: 'Iterate', description: 'Refining based on feedback and testing results.', number: '04' },
                        { icon: Zap, title: 'Optimize', description: 'Enhancing performance and user experience.', number: '05' },
                        { icon: CloudCog, title: 'Deploy', description: 'Launching with CI/CD and monitoring in place.', number: '06' },
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
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-3 @md:mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <Button variant="outline" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

interface ServiceItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    number: string
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, number }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all relative overflow-hidden">
                <CardContent className="p-5 @md:p-6">
                    <span className="absolute top-4 right-4 text-6xl @md:text-7xl font-bold text-muted-foreground/10 group-hover:text-primary/10 transition-colors">
                        {number}
                    </span>
                    <div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all relative z-10">
                        <Icon className="size-5 @md:size-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 relative z-10">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

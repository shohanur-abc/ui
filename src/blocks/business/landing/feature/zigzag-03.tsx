import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Layers, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface ZigzagStep {
    step: string
    title: string
    description: string
    features: string[]
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-12 @md:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Layers} text="Our Process" />
                    <Title text="From Idea to Launch in" highlight="Record Time" />
                    <Description text="Our streamlined workflow gets your project from concept to production faster than ever." />
                </div>

                <ZigzagSteps items={[
                    { step: '01', title: 'Discovery', description: 'We start by understanding your unique needs, goals, and challenges through in-depth consultation.', features: ['Requirements gathering', 'Stakeholder interviews', 'Competitive analysis'] },
                    { step: '02', title: 'Design', description: 'Our team creates wireframes and prototypes that align with your brand and user expectations.', features: ['UI/UX design', 'Interactive prototypes', 'Design system creation'] },
                    { step: '03', title: 'Development', description: 'Agile development with continuous integration ensures quality at every stage.', features: ['Sprint-based delivery', 'Code reviews', 'Automated testing'] },
                    { step: '04', title: 'Launch', description: 'We handle deployment, monitoring, and optimization for a successful launch.', features: ['Zero-downtime deploy', 'Performance monitoring', 'Ongoing support'] },
                ]} />

                <CTASection label="Start Your Project" href="/contact" />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const ZigzagSteps = ({ items }: { items: ZigzagStep[] }) => (
    <div className="space-y-12 @md:space-y-16">
        {items.map((item, index) => (
            <div 
                key={item.step}
                className={`flex flex-col @xl:flex-row gap-8 @xl:gap-12 items-center ${index % 2 === 1 ? '@xl:flex-row-reverse' : ''}`}
            >
                <div className="flex-1 w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-6xl @md:text-7xl font-bold text-primary/20">{item.step}</span>
                        <h3 className="text-2xl @md:text-3xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">{item.description}</p>
                    <ul className="space-y-2">
                        {item.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                                <Check className="size-4 text-primary" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 w-full">
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50" />
                </div>
            </div>
        ))}
    </div>
)

const CTASection = ({ label, href }: { label: string; href: string }) => (
    <div className="mt-12 @md:mt-16 text-center">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

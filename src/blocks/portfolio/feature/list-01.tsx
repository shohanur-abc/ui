import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 @3xl:gap-20 items-center">
                    <div>
                        <Eyebrow text="Comprehensive Solutions" />
                        <Title text="Everything You Need for Digital Success" />
                        <Description text="From initial concept to final deployment and beyond, I provide end-to-end services that cover every aspect of your digital product." />
                    </div>

                    <div>
                        <FeatureList items={[
                            'Custom web application development',
                            'Responsive mobile-first design',
                            'E-commerce platform solutions',
                            'API design and integration',
                            'Performance optimization',
                            'SEO and accessibility compliance',
                            'Security audits and hardening',
                            'Ongoing maintenance and support',
                        ]} />

                        <div className="mt-6 @md:mt-8 flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="#contact">
                                    Get Started
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="#portfolio">View Work</Link>
                            </Button>
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
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="grid @sm:grid-cols-2 gap-3 @md:gap-4">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
                <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-primary" />
                </div>
                <span className="text-sm @md:text-base">{item}</span>
            </li>
        ))}
    </ul>
)

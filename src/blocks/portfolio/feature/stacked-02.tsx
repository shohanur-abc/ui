import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <StackedFeatures
                    items={[
                        {
                            eyebrow: 'Development',
                            title: 'Clean, Maintainable Code',
                            description: 'Every line of code is written with readability and scalability in mind. Following industry best practices and design patterns ensures your codebase remains manageable as it grows.',
                            features: ['TypeScript for type safety', 'Comprehensive testing coverage', 'Documentation for all modules', 'Git-based version control'],
                            cta: { label: 'View Code Samples', href: '#code' },
                        },
                        {
                            eyebrow: 'Performance',
                            title: 'Lightning-Fast Applications',
                            description: 'Speed matters. From initial load to runtime interactions, every aspect is optimized for the best possible user experience.',
                            features: ['Server-side rendering', 'Image optimization', 'Code splitting', 'CDN deployment'],
                            cta: { label: 'See Performance Metrics', href: '#performance' },
                        },
                        {
                            eyebrow: 'Security',
                            title: 'Enterprise-Grade Protection',
                            description: 'Security is built-in, not bolted on. Following OWASP guidelines and implementing defense in depth strategies to protect your data.',
                            features: ['Authentication & authorization', 'Data encryption', 'Regular security audits', 'Compliance adherence'],
                            cta: { label: 'Learn About Security', href: '#security' },
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface StackedFeatureItem {
    eyebrow: string
    title: string
    description: string
    features: string[]
    cta: { label: string; href: string }
}

const StackedFeatures = ({ items }: { items: StackedFeatureItem[] }) => (
    <div className="space-y-16 @md:space-y-24">
        {items.map(({ eyebrow, title, description, features, cta }, i) => (
            <div key={i} className="max-w-4xl mx-auto">
                <div className="text-center mb-8 @md:mb-10">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        {eyebrow}
                    </Badge>
                    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4">
                        {title}
                    </h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid @sm:grid-cols-2 gap-4 @md:gap-5 mb-6 @md:mb-8">
                    {features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                            <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Check className="size-3.5 text-primary" />
                            </div>
                            <span className="text-sm @md:text-base">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Button variant="outline" asChild>
                        <Link href={cta.href}>
                            {cta.label}
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        ))}
    </div>
)

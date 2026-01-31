import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <ZigzagBlocks
                    items={[
                        {
                            image: 'https://picsum.photos/seed/zigzag1/800/600',
                            eyebrow: 'Web Development',
                            title: 'Crafting Modern Web Experiences',
                            description: 'Building fast, accessible, and beautiful websites using the latest technologies and best practices.',
                            points: ['Server-side rendering', 'Static site generation', 'Progressive web apps', 'API integration'],
                            reverse: false,
                        },
                        {
                            image: 'https://picsum.photos/seed/zigzag2/800/600',
                            eyebrow: 'Mobile Development',
                            title: 'Native-Quality Mobile Apps',
                            description: 'Cross-platform applications that deliver exceptional user experiences on any device.',
                            points: ['React Native expertise', 'iOS & Android support', 'Offline capabilities', 'Push notifications'],
                            reverse: true,
                        },
                        {
                            image: 'https://picsum.photos/seed/zigzag3/800/600',
                            eyebrow: 'Cloud Architecture',
                            title: 'Scalable Infrastructure',
                            description: 'Designing and implementing cloud solutions that grow with your business needs.',
                            points: ['AWS & GCP certified', 'Microservices design', 'Auto-scaling systems', 'Cost optimization'],
                            reverse: false,
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface ZigzagItem {
    image: string
    eyebrow: string
    title: string
    description: string
    points: string[]
    reverse: boolean
}

const ZigzagBlocks = ({ items }: { items: ZigzagItem[] }) => (
    <div className="space-y-16 @md:space-y-24 @xl:space-y-32">
        {items.map(({ image, eyebrow, title, description, points, reverse }, i) => (
            <div key={i} className={`grid @3xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center`}>
                <div className={`relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg ${reverse ? '@3xl:order-2' : ''}`}>
                    <Image src={image} alt={title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-60" />
                </div>

                <div className={reverse ? '@3xl:order-1' : ''}>
                    <Badge variant="secondary" className="mb-3 @md:mb-4">
                        {eyebrow}
                    </Badge>
                    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
                        {title}
                    </h2>
                    <p className="text-base @md:text-lg text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
                        {description}
                    </p>
                    <ul className="space-y-3 @md:space-y-4">
                        {points.map((point, j) => (
                            <li key={j} className="flex items-center gap-3 group">
                                <CheckCircle2 className="size-5 text-primary shrink-0" />
                                <span className="text-sm @md:text-base">{point}</span>
                                <ArrowRight className="size-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-auto" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
    </div>
)

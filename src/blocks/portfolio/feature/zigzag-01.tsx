import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <FeatureBlocks items={[
                    {
                        image: 'https://picsum.photos/seed/feature1/800/600',
                        eyebrow: 'Frontend Development',
                        title: 'Beautiful, Responsive Interfaces',
                        description: 'I build pixel-perfect UIs that work seamlessly across all devices and screen sizes.',
                        points: ['Mobile-first responsive design', 'Accessible components (WCAG 2.1)', 'Smooth animations & micro-interactions', 'Cross-browser compatibility'],
                        reverse: false,
                    },
                    {
                        image: 'https://picsum.photos/seed/feature2/800/600',
                        eyebrow: 'Backend Development',
                        title: 'Scalable & Secure Infrastructure',
                        description: 'From databases to APIs, I create robust backend systems that power your applications.',
                        points: ['RESTful & GraphQL APIs', 'Database design & optimization', 'Authentication & authorization', 'Cloud-native architecture'],
                        reverse: true,
                    },
                ]} />
            </div>
        </section>
    )
}

interface FeatureBlockItem {
    image: string
    eyebrow: string
    title: string
    description: string
    points: string[]
    reverse: boolean
}

const FeatureBlocks = ({ items }: { items: FeatureBlockItem[] }) => (
    <div className="space-y-16 @md:space-y-24">
        {items.map(({ image, eyebrow, title, description, points, reverse }, i) => (
            <div key={i} className={`grid @3xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center ${reverse ? '' : ''}`}>
                <div className={`relative aspect-4/3 rounded-2xl overflow-hidden ${reverse ? '@3xl:order-2' : ''}`}>
                    <Image src={image} alt={title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
                </div>

                <div className={reverse ? '@3xl:order-1' : ''}>
                    <span className="text-sm @md:text-base font-medium text-primary mb-3 @md:mb-4 block">{eyebrow}</span>
                    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-[1.1]">{title}</h2>
                    <p className="text-base @md:text-lg text-muted-foreground mb-6 @md:mb-8 leading-relaxed">{description}</p>
                    <ul className="space-y-3 @md:space-y-4">
                        {points.map((point, j) => (
                            <li key={j} className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 @md:size-6 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm @md:text-base">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
    </div>
)

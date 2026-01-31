import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Quote } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-4xl mx-auto space-y-16">
                    <IntroSection
                        eyebrow="About Me"
                        title="Hi, I'm Emma Wilson"
                        subtitle="I'm a designer, developer, and creative technologist based in New York City."
                    />
                    <ImageSection
                        src="https://picsum.photos/seed/stack4/1400/700"
                        alt="Emma Wilson at work"
                    />
                    <QuoteSection
                        quote="Design is not just what it looks like and feels like. Design is how it works."
                        attribution="Steve Jobs"
                    />
                    <Separator />
                    <ContentSection
                        title="My Journey"
                        paragraphs={[
                            "I started my career as a graphic designer, creating brand identities for local businesses. But I was always curious about how things worked behind the scenes. That curiosity led me to learn to code.",
                            "Over the past 12 years, I've had the opportunity to work with incredible teams at companies like Apple, Spotify, and Square. I've designed and built products that millions of people use every day.",
                            "Today, I focus on the intersection of design and technology. I help companies create products that are not only beautiful but also technically sound and accessible to everyone.",
                        ]}
                    />
                    <ImageGridSection
                        images={[
                            { src: 'https://picsum.photos/seed/g1/400/300', alt: 'Work 1' },
                            { src: 'https://picsum.photos/seed/g2/400/300', alt: 'Work 2' },
                            { src: 'https://picsum.photos/seed/g3/400/300', alt: 'Work 3' },
                        ]}
                    />
                    <Separator />
                    <ExpertiseSection
                        title="Areas of Expertise"
                        areas={[
                            { title: 'Product Design', description: 'End-to-end product design from research to implementation' },
                            { title: 'Design Systems', description: 'Building scalable and consistent component libraries' },
                            { title: 'Frontend Development', description: 'Bringing designs to life with React and modern CSS' },
                            { title: 'Creative Direction', description: 'Guiding visual strategy and brand expression' },
                        ]}
                    />
                    <CTASection
                        title="Let's Create Together"
                        description="Whether you have a project in mind or just want to chat, I'd love to hear from you."
                        cta={{ label: 'Say Hello', href: '/contact', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface IntroSectionProps {
    eyebrow: string
    title: string
    subtitle: string
}

const IntroSection = ({ eyebrow, title, subtitle }: IntroSectionProps) => (
    <div className="text-center">
        <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
        <h1 className="text-4xl @lg:text-5xl @xl:text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    </div>
)

interface ImageSectionProps {
    src: string
    alt: string
}

const ImageSection = ({ src, alt }: ImageSectionProps) => (
    <div className="relative aspect-[2/1] rounded-xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

interface QuoteSectionProps {
    quote: string
    attribution: string
}

const QuoteSection = ({ quote, attribution }: QuoteSectionProps) => (
    <div className="text-center py-8">
        <Quote className="size-12 text-primary/20 mx-auto mb-4" />
        <blockquote className="text-2xl @lg:text-3xl font-medium italic mb-4 max-w-2xl mx-auto">
            &ldquo;{quote}&rdquo;
        </blockquote>
        <p className="text-muted-foreground">— {attribution}</p>
    </div>
)

interface ContentSectionProps {
    title: string
    paragraphs: string[]
}

const ContentSection = ({ title, paragraphs }: ContentSectionProps) => (
    <div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    </div>
)

interface ImageItem {
    src: string
    alt: string
}

interface ImageGridSectionProps {
    images: ImageItem[]
}

const ImageGridSection = ({ images }: ImageGridSectionProps) => (
    <div className="grid grid-cols-3 gap-4">
        {images.map((img, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
        ))}
    </div>
)

interface ExpertiseItem {
    title: string
    description: string
}

interface ExpertiseSectionProps {
    title: string
    areas: ExpertiseItem[]
}

const ExpertiseSection = ({ title, areas }: ExpertiseSectionProps) => (
    <div>
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid @md:grid-cols-2 gap-8">
            {areas.map((area) => (
                <div key={area.title}>
                    <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
                    <p className="text-muted-foreground">{area.description}</p>
                </div>
            ))}
        </div>
    </div>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTASectionProps {
    title: string
    description: string
    cta: CTAData
}

const CTASection = ({ title, description, cta }: CTASectionProps) => (
    <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-muted-foreground mb-8">{description}</p>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="space-y-32">
                    <IntroBlock
                        src="https://picsum.photos/seed/zz11/800/600"
                        eyebrow="About Me"
                        title="Hi, I'm Emma Wilson"
                        subtitle="Designer, Developer, and Creative Technologist"
                        bio="I'm based in New York City, crafting digital experiences that blend beautiful design with clean code. I help startups and enterprises create products that users love."
                        reverse={false}
                    />
                    <ExpertiseBlock
                        src="https://picsum.photos/seed/zz12/800/600"
                        eyebrow="Expertise"
                        title="What I Do Best"
                        areas={[
                            { title: 'Product Design', description: 'End-to-end product design from research to final pixels.' },
                            { title: 'Design Systems', description: 'Scalable component libraries that grow with your product.' },
                            { title: 'Frontend Dev', description: 'Bringing designs to life with React and modern CSS.' },
                        ]}
                        reverse={true}
                    />
                    <TestimonialBlock
                        src="https://picsum.photos/seed/zz13/800/600"
                        quote="Emma is a rare talent who can both design beautiful interfaces and bring them to life with clean code. Her work on our product exceeded all expectations."
                        author="John Smith"
                        role="CEO, TechStartup"
                        rating={5}
                        reverse={false}
                    />
                    <CTABlock
                        src="https://picsum.photos/seed/zz14/800/600"
                        title="Let's Create Together"
                        description="Whether you have a project in mind or just want to chat about design and technology, I'd love to hear from you."
                        cta={{ label: 'Say Hello', href: '/contact', icon: ArrowRight }}
                        reverse={true}
                    />
                </div>
            </div>
        </section>
    )
}

interface IntroBlockProps {
    src: string
    eyebrow: string
    title: string
    subtitle: string
    bio: string
    reverse: boolean
}

const IntroBlock = ({ src, eyebrow, title, subtitle, bio, reverse }: IntroBlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={src} alt={title} fill className="object-cover" />
            </div>
        </div>
        <div className="@lg:w-1/2">
            <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
            <h1 className="text-4xl @xl:text-5xl font-bold mb-3">{title}</h1>
            <p className="text-xl text-primary font-medium mb-4">{subtitle}</p>
            <p className="text-lg text-muted-foreground">{bio}</p>
        </div>
    </div>
)

interface ExpertiseArea {
    title: string
    description: string
}

interface ExpertiseBlockProps {
    src: string
    eyebrow: string
    title: string
    areas: ExpertiseArea[]
    reverse: boolean
}

const ExpertiseBlock = ({ src, eyebrow, title, areas, reverse }: ExpertiseBlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={src} alt={title} fill className="object-cover" />
            </div>
        </div>
        <div className="@lg:w-1/2">
            <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
            <h2 className="text-3xl font-bold mb-8">{title}</h2>
            <div className="space-y-6">
                {areas.map((area) => (
                    <div key={area.title} className="border-l-2 border-primary pl-4">
                        <h3 className="font-semibold mb-1">{area.title}</h3>
                        <p className="text-muted-foreground">{area.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

interface TestimonialBlockProps {
    src: string
    quote: string
    author: string
    role: string
    rating: number
    reverse: boolean
}

const TestimonialBlock = ({ src, quote, author, role, rating, reverse }: TestimonialBlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={src} alt={author} fill className="object-cover" />
            </div>
        </div>
        <div className="@lg:w-1/2">
            <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="size-5 fill-yellow-500 text-yellow-500" />
                ))}
            </div>
            <blockquote className="text-2xl font-medium italic mb-6">&ldquo;{quote}&rdquo;</blockquote>
            <div>
                <p className="font-semibold">{author}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
        </div>
    </div>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTABlockProps {
    src: string
    title: string
    description: string
    cta: CTAData
    reverse: boolean
}

const CTABlock = ({ src, title, description, cta, reverse }: CTABlockProps) => (
    <div className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}>
        <div className="@lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={src} alt={title} fill className="object-cover" />
            </div>
        </div>
        <div className="@lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{description}</p>
            <Button size="lg" className="gap-2" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-5" />
                </Link>
            </Button>
        </div>
    </div>
)

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden min-h-[80vh]" data-theme="neon">
            <BackgroundImage src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920" />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 @sm:px-6 @2xl:px-8 py-20 text-center">
                <Content
                    eyebrow="Welcome to the Future"
                    title="Insights for the Modern Developer"
                    description="Explore cutting-edge articles on web development, AI, cloud computing, and emerging technologies that shape our digital world."
                    primaryCTA={{ label: 'Start Reading', href: '/blog' }}
                    secondaryCTA={{ label: 'Subscribe', href: '/newsletter' }}
                />
            </div>
        </section>
    )
}

interface BackgroundImageProps {
    src: string
}

const BackgroundImage = ({ src }: BackgroundImageProps) => (
    <>
        <Image src={src} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
    </>
)

interface CTALink {
    label: string
    href: string
}

interface ContentProps {
    eyebrow: string
    title: string
    description: string
    primaryCTA: CTALink
    secondaryCTA: CTALink
}

const Content = ({ eyebrow, title, description, primaryCTA, secondaryCTA }: ContentProps) => (
    <div className="max-w-4xl mx-auto">
        <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
            <Sparkles className="size-3.5 mr-1.5" />
            {eyebrow}
        </Badge>
        <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
        </h1>
        <p className="text-lg @md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            {description}
        </p>
        <div className="flex flex-col @sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8">
                <Link href={primaryCTA.href}>
                    {primaryCTA.label}
                    <ArrowRight className="size-4 ml-2" />
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                <Link href={secondaryCTA.href}>
                    {secondaryCTA.label}
                </Link>
            </Button>
        </div>
    </div>
)

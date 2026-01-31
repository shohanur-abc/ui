import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Heart, Lightbulb, Palette, Sparkles, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
                    <ImageCard
                        src="https://picsum.photos/seed/bento12/800/1000"
                        alt="Ava Chen"
                        className="@lg:row-span-2"
                    />
                    <IntroCard
                        eyebrow={{ icon: Sparkles, text: 'Brand Designer' }}
                        title="Ava Chen"
                        description="I create visual identities that tell stories. From startups to Fortune 500s, I help brands find their voice."
                        className="@lg:col-span-2"
                    />
                    <ValueCard icon={Heart} title="Passion" description="Love what you create" />
                    <ProcessCard
                        title="My Process"
                        items={[
                            { icon: Lightbulb, label: 'Discover' },
                            { icon: Palette, label: 'Design' },
                            { icon: Target, label: 'Deliver' },
                        ]}
                        className="@lg:col-span-2"
                    />
                    <ValueCard icon={Sparkles} title="Quality" description="Excellence in details" />
                    <CTACard
                        title="Start Your Brand Journey"
                        href="/contact"
                        icon={ArrowRight}
                        className="@sm:col-span-2 @lg:col-span-3"
                    />
                </div>
            </div>
        </section>
    )
}

interface ImageCardProps {
    src: string
    alt: string
    className?: string
}

const ImageCard = ({ src, alt, className }: ImageCardProps) => (
    <Card className={`overflow-hidden py-0 ${className}`}>
        <CardContent className="p-0 h-full relative min-h-64">
            <Image src={src} alt={alt} fill className="object-cover" />
        </CardContent>
    </Card>
)

interface EyebrowData {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface IntroCardProps {
    eyebrow: EyebrowData
    title: string
    description: string
    className?: string
}

const IntroCard = ({ eyebrow, title, description, className }: IntroCardProps) => (
    <Card className={className}>
        <CardContent className="p-6 flex flex-col justify-center h-full">
            <Badge variant="secondary" className="w-fit mb-4">
                <eyebrow.icon className="size-3 mr-1" />
                {eyebrow.text}
            </Badge>
            <h1 className="text-3xl font-bold mb-3">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

interface ValueCardProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => (
    <Card className="bg-muted/50 border-none">
        <CardContent className="p-6 flex flex-col justify-center h-full text-center">
            <Icon className="size-6 text-primary mx-auto mb-2" />
            <p className="font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

interface ProcessItem {
    icon: React.ComponentType<{ className?: string }>
    label: string
}

interface ProcessCardProps {
    title: string
    items: ProcessItem[]
    className?: string
}

const ProcessCard = ({ title, items, className }: ProcessCardProps) => (
    <Card className={`bg-primary text-primary-foreground ${className}`}>
        <CardContent className="p-6">
            <p className="text-sm font-medium mb-4 opacity-80">{title}</p>
            <div className="flex justify-around">
                {items.map(({ icon: Icon, label }, i) => (
                    <div key={i} className="text-center">
                        <div className="size-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                            <Icon className="size-5" />
                        </div>
                        <span className="text-sm">{label}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface CTACardProps {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    className?: string
}

const CTACard = ({ title, href, icon: Icon, className }: CTACardProps) => (
    <Card className={className}>
        <CardContent className="p-6 flex items-center justify-between">
            <p className="font-semibold text-lg">{title}</p>
            <Button className="gap-2" asChild>
                <Link href={href}>
                    Get Started
                    <Icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

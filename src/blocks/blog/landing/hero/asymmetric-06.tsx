import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, Bell, Mail, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @xl:grid-cols-12 gap-6 @xl:gap-10 items-center">
                    <ImageSection
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                        alt="Newsletter"
                        className="@xl:col-span-7 order-2 @xl:order-1"
                    />
                    <ContentSection
                        title="Never Miss a Post"
                        description="Get the latest articles, tutorials, and resources delivered straight to your inbox every week."
                        subscribers="45,000+"
                        className="@xl:col-span-5 order-1 @xl:order-2"
                    />
                </div>
            </div>
        </section>
    )
}

interface ImageSectionProps {
    src: string
    alt: string
    className?: string
}

const ImageSection = ({ src, alt, className }: ImageSectionProps) => (
    <div className={className}>
        <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image src={src} alt={alt} fill className="object-cover" />
            </div>
            <FloatingCard
                icon={Mail}
                title="Weekly Digest"
                description="Every Friday"
                className="absolute -bottom-4 -right-4 @md:bottom-6 @md:-right-6"
            />
            <FloatingCard
                icon={Bell}
                title="Instant Alerts"
                description="Breaking news"
                className="absolute -top-4 -left-4 @md:top-6 @md:-left-6"
            />
        </div>
    </div>
)

interface FloatingCardProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    className?: string
}

const FloatingCard = ({ icon: Icon, title, description, className }: FloatingCardProps) => (
    <Card className={`bg-card/90 backdrop-blur-sm shadow-lg ${className}`}>
        <CardContent className="p-3 @md:p-4 flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="size-5 text-primary" />
            </div>
            <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </CardContent>
    </Card>
)

interface ContentSectionProps {
    title: string
    description: string
    subscribers: string
    className?: string
}

const ContentSection = ({ title, description, subscribers, className }: ContentSectionProps) => (
    <div className={className}>
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="size-3.5 mr-1.5" />
            Newsletter
        </Badge>
        <h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
            {description}
        </p>
        <SubscribeForm />
        <p className="text-sm text-muted-foreground mt-4">
            Join <span className="font-semibold text-foreground">{subscribers}</span> subscribers
        </p>
        <Features
            items={['Free forever', 'No spam', 'Unsubscribe anytime']}
        />
    </div>
)

const SubscribeForm = () => (
    <form className="flex flex-col @sm:flex-row gap-3">
        <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 px-5 flex-1"
        />
        <Button size="lg" className="h-12 gap-2">
            Subscribe
            <ArrowRight className="size-4" />
        </Button>
    </form>
)

interface FeaturesProps {
    items: string[]
}

const Features = ({ items }: FeaturesProps) => (
    <ul className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
        {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-primary" />
                {item}
            </li>
        ))}
    </ul>
)

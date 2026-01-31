import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
                    <ImageCard
                        src="https://picsum.photos/seed/bento8/600/900"
                        alt="Tom Wilson"
                        className="@xl:row-span-2"
                    />
                    <IntroCard
                        eyebrow="Consultant"
                        title="Tom Wilson"
                        description="I help companies scale their engineering organizations. 15 years of experience building teams from 5 to 500+."
                        className="@xl:col-span-2"
                    />
                    <TestimonialCard
                        quote="Tom transformed our engineering culture."
                        author="CEO, TechStartup"
                        rating={5}
                        className="@xl:row-span-2"
                    />
                    <ServicesCard
                        title="Services"
                        items={[
                            'Engineering Strategy',
                            'Team Building',
                            'Process Optimization',
                            'Technical Due Diligence',
                        ]}
                        className="@xl:col-span-2"
                    />
                    <CTACard
                        title="Book Consultation"
                        subtitle="Free 30-min discovery call"
                        href="/book"
                        icon={ArrowRight}
                        className="@sm:col-span-2"
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

interface IntroCardProps {
    eyebrow: string
    title: string
    description: string
    className?: string
}

const IntroCard = ({ eyebrow, title, description, className }: IntroCardProps) => (
    <Card className={className}>
        <CardContent className="p-6">
            <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
            <h1 className="text-2xl @lg:text-3xl font-bold mb-3">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

interface TestimonialCardProps {
    quote: string
    author: string
    rating: number
    className?: string
}

const TestimonialCard = ({ quote, author, rating, className }: TestimonialCardProps) => (
    <Card className={`bg-primary text-primary-foreground ${className}`}>
        <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
                <div className="flex gap-1 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                    ))}
                </div>
                <p className="italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
            </div>
            <p className="text-sm opacity-80 mt-4">— {author}</p>
        </CardContent>
    </Card>
)

interface ServicesCardProps {
    title: string
    items: string[]
    className?: string
}

const ServicesCard = ({ title, items, className }: ServicesCardProps) => (
    <Card className={className}>
        <CardContent className="p-6">
            <p className="text-sm font-medium mb-4">{title}</p>
            <div className="grid grid-cols-2 gap-2">
                {items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface CTACardProps {
    title: string
    subtitle: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    className?: string
}

const CTACard = ({ title, subtitle, href, icon: Icon, className }: CTACardProps) => (
    <Card className={`bg-muted/50 border-none ${className}`}>
        <CardContent className="p-6 flex items-center justify-between">
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <Button className="gap-2" asChild>
                <Link href={href}>
                    Get Started
                    <Icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

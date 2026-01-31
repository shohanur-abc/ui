import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="New Course" icon={Sparkles} />
                    <Title text="Master React in 2026" />
                    <Description text="A comprehensive course covering React 20, Server Components, and modern patterns." />
                    <Features
                        items={[
                            '50+ video lessons',
                            'Real-world projects',
                            'Lifetime access',
                            'Certificate included',
                        ]}
                    />
                    <PriceTag price="$49" originalPrice="$99" />
                    <CTAGroup
                        primary={{ label: 'Enroll Now', href: '/course/react' }}
                        secondary={{ label: 'Preview Free', href: '/course/react/preview' }}
                    />
                    <CoursePreview
                        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"
                        alt="React Course Preview"
                    />
                </div>
            </div>
        </section>
    )
}

interface EyebrowProps {
    label: string
    icon: React.ComponentType<{ className?: string }>
}

const Eyebrow = ({ label, icon: Icon }: EyebrowProps) => (
    <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
        <Icon className="size-3.5 mr-2" />
        {label}
    </Badge>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}
    </h1>
)

interface DescriptionProps {
    text: string
}

const Description = ({ text }: DescriptionProps) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-xl">
        {text}
    </p>
)

interface FeaturesProps {
    items: string[]
}

const Features = ({ items }: FeaturesProps) => (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {items.map((item) => (
            <span key={item} className="flex items-center gap-2">
                <CheckCircle className="size-4 text-primary" />
                {item}
            </span>
        ))}
    </div>
)

interface PriceTagProps {
    price: string
    originalPrice: string
}

const PriceTag = ({ price, originalPrice }: PriceTagProps) => (
    <div className="flex items-baseline gap-3">
        <span className="text-4xl @md:text-5xl font-bold">{price}</span>
        <span className="text-xl text-muted-foreground line-through">{originalPrice}</span>
        <Badge variant="secondary" className="text-xs">50% OFF</Badge>
    </div>
)

interface CTAGroupProps {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
}

const CTAGroup = ({ primary, secondary }: CTAGroupProps) => (
    <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" asChild className="gap-2">
            <Link href={primary.href}>
                {primary.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
            <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
    </div>
)

interface CoursePreviewProps {
    image: string
    alt: string
}

const CoursePreview = ({ image, alt }: CoursePreviewProps) => (
    <div className="relative w-full max-w-3xl aspect-video mt-6 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
        <Image src={image} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="size-16 @md:size-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <div className="size-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-primary ml-1" />
            </div>
        </div>
    </div>
)

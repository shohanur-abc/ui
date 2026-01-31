import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="Weekly Newsletter" icon={Mail} />
                    <Title text="Get the Best Articles in Your Inbox" />
                    <Description text="Join 45,000+ developers who receive our weekly digest of curated articles, tutorials, and resources." />
                    <NewsletterForm />
                    <SocialProof value="45,000+" label="subscribers" />
                    <Features
                        items={[
                            'Curated top articles weekly',
                            'Exclusive content for subscribers',
                            'No spam, unsubscribe anytime',
                        ]}
                    />
                </div>
            </div>
            <BackgroundDecorative />
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
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
        {text}
    </h1>
)

interface DescriptionProps {
    text: string
}

const Description = ({ text }: DescriptionProps) => (
    <p className="text-lg text-muted-foreground max-w-xl">
        {text}
    </p>
)

const NewsletterForm = () => (
    <form className="w-full max-w-md mt-2">
        <div className="flex flex-col @sm:flex-row gap-3">
            <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 px-5 flex-1"
            />
            <Button size="lg" className="h-12 px-8">
                Subscribe
            </Button>
        </div>
    </form>
)

interface SocialProofProps {
    value: string
    label: string
}

const SocialProof = ({ value, label }: SocialProofProps) => (
    <p className="text-sm text-muted-foreground">
        <span className="font-bold text-foreground">{value}</span> {label}
    </p>
)

interface FeaturesProps {
    items: string[]
}

const Features = ({ items }: FeaturesProps) => (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-2">
        {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-primary" />
                {item}
            </li>
        ))}
    </ul>
)

const BackgroundDecorative = () => (
    <>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </>
)

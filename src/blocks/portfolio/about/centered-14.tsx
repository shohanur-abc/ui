import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Heart, Palette, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Sparkles} text="Hello, World!" />
                    <Title text="Amanda Foster" />
                    <Role text="Brand Designer" />
                    <ProfileImage
                        src="https://picsum.photos/seed/about-centered14/400/400"
                        fallback="AF"
                    />
                    <Description
                        text="I help startups and small businesses create memorable brand identities. From logos to complete brand systems, I craft visual stories that resonate with your audience."
                    />
                    <ProcessSteps
                        items={[
                            { icon: Heart, title: 'Discover', description: 'Understanding your vision' },
                            { icon: Palette, title: 'Design', description: 'Crafting your identity' },
                            { icon: Sparkles, title: 'Deliver', description: 'Bringing it to life' },
                        ]}
                    />
                    <CTA label="Let's Create Together" href="/contact" icon={ArrowRight} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4">
        <Icon className="size-3.5 mr-1" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-2">{text}</h1>
)

const Role = ({ text }: { text: string }) => (
    <p className="text-xl @md:text-2xl text-primary font-medium mb-8">{text}</p>
)

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
    <Avatar className="size-32 @md:size-40 mx-auto mb-8 ring-4 ring-primary/20 shadow-xl">
        <AvatarImage src={src} alt="Profile" />
        <AvatarFallback className="text-3xl @md:text-4xl bg-primary text-primary-foreground font-bold">
            {fallback}
        </AvatarFallback>
    </Avatar>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
        {text}
    </p>
)

interface ProcessItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

const ProcessSteps = ({ items }: { items: ProcessItem[] }) => (
    <div className="grid grid-cols-3 gap-4 mb-10">
        {items.map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="bg-muted/50 border-none">
                <CardContent className="p-4 @md:p-6 text-center">
                    <Icon className="size-6 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <Icon className="size-4" />
        </Link>
    </Button>
)

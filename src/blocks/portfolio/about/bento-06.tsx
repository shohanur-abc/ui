import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Code, Database, Globe, Server, Smartphone, Terminal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
                    <IntroCard
                        eyebrow="Full-Stack Dev"
                        title="Chris Anderson"
                        description="I build end-to-end solutions from database to UI. 10 years shipping products across web, mobile, and cloud."
                        className="@sm:col-span-2"
                    />
                    <ImageCard
                        src="https://picsum.photos/seed/bento6/600/800"
                        alt="Chris Anderson"
                        className="@sm:col-span-2 @lg:col-span-2 @lg:row-span-2"
                    />
                    <TechStackCard
                        title="Frontend"
                        items={[
                            { icon: Code, name: 'React' },
                            { icon: Globe, name: 'Next.js' },
                            { icon: Smartphone, name: 'React Native' },
                        ]}
                    />
                    <TechStackCard
                        title="Backend"
                        items={[
                            { icon: Server, name: 'Node.js' },
                            { icon: Database, name: 'PostgreSQL' },
                            { icon: Terminal, name: 'GraphQL' },
                        ]}
                    />
                    <CTACard
                        title="View Projects"
                        subtitle="See my latest work"
                        href="/projects"
                        icon={ArrowUpRight}
                        className="@sm:col-span-2"
                    />
                </div>
            </div>
        </section>
    )
}

interface IntroCardProps {
    eyebrow: string
    title: string
    description: string
    className?: string
}

const IntroCard = ({ eyebrow, title, description, className }: IntroCardProps) => (
    <Card className={className}>
        <CardContent className="p-6">
            <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
            <h1 className="text-3xl font-bold mb-3">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

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

interface TechItem {
    icon: React.ComponentType<{ className?: string }>
    name: string
}

interface TechStackCardProps {
    title: string
    items: TechItem[]
}

const TechStackCard = ({ title, items }: TechStackCardProps) => (
    <Card className="bg-muted/50 border-none">
        <CardContent className="p-6">
            <p className="text-sm font-medium mb-4">{title}</p>
            <div className="space-y-2">
                {items.map(({ icon: Icon, name }) => (
                    <div key={name} className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" />
                        <span className="text-sm">{name}</span>
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
    <Card className={`bg-primary text-primary-foreground ${className}`}>
        <CardContent className="p-6 flex items-center justify-between">
            <div>
                <p className="font-semibold text-lg">{title}</p>
                <p className="text-sm opacity-80">{subtitle}</p>
            </div>
            <Button variant="secondary" size="icon" asChild>
                <Link href={href}>
                    <Icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

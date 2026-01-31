import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Star, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-background" data-theme="neon">
            <div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-28">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="Open Source" icon={Github} />
                    <Title text="Build Faster with Our CLI" />
                    <Description text="A powerful command-line tool for scaffolding, building, and deploying modern web applications." />
                    <GithubStats stars={12500} forks={2300} />
                    <InstallCommand command="npx create-awesome-app my-app" />
                    <CTAGroup
                        primary={{ label: 'Get Started', href: '/docs' }}
                        secondary={{ label: 'View on GitHub', href: 'https://github.com' }}
                    />
                    <Features
                        items={[
                            'Zero config setup',
                            'TypeScript ready',
                            'Hot reload',
                            'Production optimized',
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
    <Badge variant="outline" className="font-mono px-4 py-1.5 border-primary/30 text-primary">
        <Icon className="size-3.5 mr-2" />
        {label}
    </Badge>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight font-mono">
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

interface GithubStatsProps {
    stars: number
    forks: number
}

const GithubStats = ({ stars, forks }: GithubStatsProps) => (
    <div className="flex gap-6">
        <span className="flex items-center gap-2 text-sm">
            <Star className="size-4 fill-amber-500 text-amber-500" />
            <span className="font-semibold">{(stars / 1000).toFixed(1)}K</span>
            <span className="text-muted-foreground">stars</span>
        </span>
        <span className="flex items-center gap-2 text-sm">
            <Github className="size-4" />
            <span className="font-semibold">{(forks / 1000).toFixed(1)}K</span>
            <span className="text-muted-foreground">forks</span>
        </span>
    </div>
)

interface InstallCommandProps {
    command: string
}

const InstallCommand = ({ command }: InstallCommandProps) => (
    <div className="w-full max-w-lg bg-[#0d1117] rounded-xl p-4 font-mono text-sm border border-primary/20">
        <div className="flex items-center gap-3">
            <Terminal className="size-4 text-primary shrink-0" />
            <code className="text-slate-300 truncate">{command}</code>
            <Button variant="ghost" size="sm" className="ml-auto shrink-0 h-7 text-xs text-slate-400 hover:text-white">
                Copy
            </Button>
        </div>
    </div>
)

interface CTAGroupProps {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
}

const CTAGroup = ({ primary, secondary }: CTAGroupProps) => (
    <div className="flex flex-wrap justify-center gap-4 mt-2">
        <Button size="lg" asChild className="gap-2">
            <Link href={primary.href}>
                {primary.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="gap-2">
            <Link href={secondary.href}>
                <Github className="size-4" />
                {secondary.label}
            </Link>
        </Button>
    </div>
)

interface FeaturesProps {
    items: string[]
}

const Features = ({ items }: FeaturesProps) => (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
        {items.map((item) => (
            <Badge key={item} variant="secondary" className="font-normal">
                {item}
            </Badge>
        ))}
    </div>
)

const BackgroundDecorative = () => (
    <>
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
    </>
)

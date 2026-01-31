import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Code2, Sparkles, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-background" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Terminal} text="For Developers, By Developers" />
                    <Title
                        parts={[
                            { text: 'Code.', highlight: true },
                            { text: 'Learn.', highlight: false },
                            { text: 'Ship.', highlight: true },
                        ]}
                    />
                    <Description text="Practical tutorials, code snippets, and best practices for modern web development. From fundamentals to advanced patterns." />
                    <Newsletter placeholder="developer@email.com" buttonText="Join the Dev Community" />
                    <TechStack
                        items={['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Prisma']}
                    />
                </div>
            </div>
            <CodeDecorative />
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-6">
        <Badge variant="outline" className="gap-2 px-4 py-1.5 font-mono text-xs border-primary/30 text-primary">
            <Icon className="size-4" />
            {text}
        </Badge>
    </div>
)

interface TitlePart {
    text: string
    highlight: boolean
}

const Title = ({ parts }: { parts: TitlePart[] }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6 font-mono">
        {parts.map(({ text, highlight }, i) => (
            <span key={i} className={highlight ? 'text-primary' : 'text-foreground'}>
                {text}{' '}
            </span>
        ))}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
        {text}
    </p>
)

const Newsletter = ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
    <div className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto mb-8 @md:mb-10">
        <Input
            type="email"
            placeholder={placeholder}
            className="h-12 bg-card border-2 font-mono text-sm"
        />
        <Button size="lg" className="h-12 gap-2 whitespace-nowrap">
            {buttonText}
            <ArrowRight className="size-4" />
        </Button>
    </div>
)

const TechStack = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {items.map((tech) => (
            <Link
                key={tech}
                href={`/topics/${tech.toLowerCase()}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-card border transition-all hover:border-primary hover:bg-primary/5"
            >
                <Code2 className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">{tech}</span>
            </Link>
        ))}
    </div>
)

const CodeDecorative = () => (
    <>
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="pointer-events-none absolute -top-20 -right-20 size-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-40 rounded-full bg-accent/10 blur-3xl" />
    </>
)

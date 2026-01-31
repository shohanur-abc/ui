import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Cpu, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface SDKItem {
    name: string
    language: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={Code2} text="Developer API" />
                        <Title text="Build Anything with Our" highlight="Powerful API" />
                        <Description text="RESTful API with comprehensive documentation, SDKs in multiple languages, and webhooks for real-time updates. Build custom integrations in minutes." />
                        <SDKBadges items={[
                            { name: 'JavaScript', language: 'js' },
                            { name: 'Python', language: 'py' },
                            { name: 'Go', language: 'go' },
                            { name: 'Ruby', language: 'rb' },
                            { name: 'PHP', language: 'php' },
                        ]} />
                        <CTAButtons 
                            primaryLabel="Read API Docs"
                            primaryHref="/docs/api"
                            secondaryLabel="View SDKs"
                            secondaryHref="/docs/sdks"
                        />
                    </div>

                    <CodePreview />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const SDKBadges = ({ items }: { items: SDKItem[] }) => (
    <div className="flex flex-wrap gap-2 mb-6">
        {items.map((sdk) => (
            <Badge key={sdk.name} variant="secondary" className="text-xs">
                {sdk.name}
            </Badge>
        ))}
    </div>
)

const CTAButtons = ({ primaryLabel, primaryHref, secondaryLabel, secondaryHref }: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string }) => (
    <div className="flex flex-wrap gap-3">
        <Button size="lg" className="gap-2" asChild>
            <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
            <Link href={secondaryHref}>
                {secondaryLabel}
            </Link>
        </Button>
    </div>
)

const CodePreview = () => (
    <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-3xl opacity-30" />
        <div className="relative rounded-2xl border border-border/50 bg-zinc-950 overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-zinc-900">
                <div className="size-3 rounded-full bg-red-500" />
                <div className="size-3 rounded-full bg-yellow-500" />
                <div className="size-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-muted-foreground">api.js</span>
            </div>
            {/* Code content */}
            <div className="p-4 @md:p-6 font-mono text-sm">
                <pre className="text-zinc-300">
                    <code>{`import { Client } from '@acme/sdk';

const client = new Client({
  apiKey: process.env.API_KEY
});

// Create a new project
const project = await client.projects.create({
  name: 'My Project',
  description: 'Built with love'
});

// Fetch analytics
const stats = await client.analytics.get({
  projectId: project.id,
  period: '30d'
});

console.log(stats);`}</code>
                </pre>
            </div>
        </div>
    </div>
)

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Terminal, GitBranch, Boxes } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Code2} text="Developer Platform" />
                        <Title text="Built by Developers, for Developers" />
                        <Description text="Powerful APIs, comprehensive SDKs, and extensive documentation. Build integrations in hours, not weeks." />
                        <APIFeatures items={[
                            { icon: Terminal, label: 'RESTful & GraphQL APIs' },
                            { icon: Boxes, label: 'SDKs for 10+ Languages' },
                            { icon: GitBranch, label: 'Webhooks & Realtime' },
                        ]} />
                        <CTA items={[
                            { label: 'Read the Docs', href: '#docs', icon: ArrowRight },
                            { label: 'API Playground', href: '#playground', variant: 'outline' },
                        ]} />
                    </div>
                    <CodePreview />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
)

const APIFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8">
        {items.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm @md:text-base">
                <Icon className="size-4 text-primary" />
                <span>{label}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const CodePreview = () => (
    <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl border border-border/30">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-border/30">
            <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-500" />
                <span className="size-3 rounded-full bg-yellow-500" />
                <span className="size-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">api-example.ts</span>
        </div>
        <div className="p-4 @md:p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-[#9cdcfe]">
                <code>
                    <span className="text-[#c586c0]">import</span>{' '}
                    <span className="text-[#4ec9b0]">{'{ Client }'}</span>{' '}
                    <span className="text-[#c586c0]">from</span>{' '}
                    <span className="text-[#ce9178]">&apos;@platform/sdk&apos;</span>
                    <span className="text-[#d4d4d4]">;</span>
                    {'\n\n'}
                    <span className="text-[#c586c0]">const</span>{' '}
                    <span className="text-[#4fc1ff]">client</span>{' '}
                    <span className="text-[#d4d4d4]">=</span>{' '}
                    <span className="text-[#c586c0]">new</span>{' '}
                    <span className="text-[#4ec9b0]">Client</span>
                    <span className="text-[#d4d4d4]">(</span>
                    <span className="text-[#ce9178]">&apos;your-api-key&apos;</span>
                    <span className="text-[#d4d4d4]">);</span>
                    {'\n\n'}
                    <span className="text-[#608b4e]">{"// Fetch user data"}</span>
                    {'\n'}
                    <span className="text-[#c586c0]">const</span>{' '}
                    <span className="text-[#4fc1ff]">users</span>{' '}
                    <span className="text-[#d4d4d4]">=</span>{' '}
                    <span className="text-[#c586c0]">await</span>{' '}
                    <span className="text-[#4fc1ff]">client</span>
                    <span className="text-[#d4d4d4]">.</span>
                    <span className="text-[#dcdcaa]">users</span>
                    <span className="text-[#d4d4d4]">.</span>
                    <span className="text-[#dcdcaa]">list</span>
                    <span className="text-[#d4d4d4]">(</span>
                    <span className="text-[#d4d4d4]">{'{'}</span>
                    {'\n'}
                    {'  '}
                    <span className="text-[#9cdcfe]">limit</span>
                    <span className="text-[#d4d4d4]">:</span>{' '}
                    <span className="text-[#b5cea8]">100</span>
                    <span className="text-[#d4d4d4]">,</span>
                    {'\n'}
                    {'  '}
                    <span className="text-[#9cdcfe]">status</span>
                    <span className="text-[#d4d4d4]">:</span>{' '}
                    <span className="text-[#ce9178]">&apos;active&apos;</span>
                    {'\n'}
                    <span className="text-[#d4d4d4]">{'}'}</span>
                    <span className="text-[#d4d4d4]">);</span>
                </code>
            </pre>
        </div>
    </div>
)

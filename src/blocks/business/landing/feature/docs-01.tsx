import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, FileText, Folder, GitBranch, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface DocSection {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    linkCount: number
    href: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={BookOpen} text="Documentation" />
                    <Title text="Everything You Need to" highlight="Get Started" />
                    <Description text="Comprehensive guides, tutorials, and API references to help you build with confidence." />
                    <SearchBar placeholder="Search documentation..." />
                </div>

                <DocSections items={[
                    { icon: Folder, title: 'Getting Started', description: 'Quick start guides and setup tutorials for new users.', linkCount: 8, href: '/docs/getting-started' },
                    { icon: FileText, title: 'Guides', description: 'In-depth tutorials for common use cases and workflows.', linkCount: 24, href: '/docs/guides' },
                    { icon: GitBranch, title: 'API Reference', description: 'Complete API documentation with examples.', linkCount: 120, href: '/docs/api' },
                    { icon: Sparkles, title: 'Best Practices', description: 'Tips and patterns for building robust applications.', linkCount: 15, href: '/docs/best-practices' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const SearchBar = ({ placeholder }: { placeholder: string }) => (
    <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input 
            type="text"
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
    </div>
)

const DocSections = ({ items }: { items: DocSection[] }) => (
    <div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-4">
        {items.map((section) => (
            <Link key={section.title} href={section.href}>
                <Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg">
                    <CardContent className="p-5 @md:p-6">
                        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
                            <section.icon className="size-6 text-primary" />
                        </div>
                        <h3 className="mb-2 font-semibold group-hover:text-primary transition-colors">{section.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{section.linkCount} articles</span>
                            <ArrowRight className="size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)

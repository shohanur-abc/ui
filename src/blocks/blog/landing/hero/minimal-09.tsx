import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative" data-theme="neon">
            <div className="relative mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24">
                <div className="grid grid-cols-1 @lg:grid-cols-3 gap-8">
                    <IntroBlock
                        title="Hello, I'm Alex"
                        description="I build things for the web and write about what I learn."
                    />
                    <TopicsBlock
                        topics={['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS', 'Design']}
                    />
                    <CTABlock
                        label="Latest article"
                        href="/articles/latest"
                    />
                </div>
            </div>
            <Divider />
        </section>
    )
}

interface IntroBlockProps {
    title: string
    description: string
}

const IntroBlock = ({ title, description }: IntroBlockProps) => (
    <div>
        <h1 className="text-2xl @md:text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
    </div>
)

interface TopicsBlockProps {
    topics: string[]
}

const TopicsBlock = ({ topics }: TopicsBlockProps) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Writing about</p>
        <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
                <Link
                    key={topic}
                    href={`/topic/${topic.toLowerCase()}`}
                    className="text-sm px-3 py-1 rounded-full border hover:border-primary hover:text-primary transition-colors"
                >
                    {topic}
                </Link>
            ))}
        </div>
    </div>
)

interface CTABlockProps {
    label: string
    href: string
}

const CTABlock = ({ label, href }: CTABlockProps) => (
    <div className="flex items-end @lg:justify-end">
        <Button variant="link" asChild className="gap-2 p-0 h-auto">
            <Link href={href}>
                {label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

const Divider = () => (
    <div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8">
        <div className="h-px bg-border" />
    </div>
)

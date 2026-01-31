import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Brush, Code, GitBranch, Terminal, Wand2 } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @xl:gap-12 items-start">
                    <div className="sticky top-8">
                        <Eyebrow text="Workflow" />
                        <Title text="Streamlined Process" />
                        <Description text="A battle-tested workflow that ensures quality delivery from initial concept to final deployment." />
                    </div>

                    <HexGrid
                        items={[
                            { icon: Wand2, title: 'Ideation', description: 'Brainstorming and concept development', link: '#ideation' },
                            { icon: Brush, title: 'Design', description: 'Visual design and prototyping', link: '#design' },
                            { icon: Code, title: 'Development', description: 'Clean, maintainable code', link: '#development' },
                            { icon: Terminal, title: 'Testing', description: 'Quality assurance and debugging', link: '#testing' },
                            { icon: GitBranch, title: 'Version Control', description: 'Git-based collaboration', link: '#version' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface HexItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    link: string
}

const HexGrid = ({ items }: { items: HexItem[] }) => (
    <div className="grid gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, link }, i) => (
            <Card
                key={i}
                className="py-0 group hover:shadow-lg transition-all hover:border-primary/50"
            >
                <CardContent className="p-5 @md:p-6">
                    <a href={link} className="flex items-start gap-4">
                        <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <Icon className="size-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-base @md:text-lg">{title}</h3>
                                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </a>
                </CardContent>
            </Card>
        ))}
    </div>
)

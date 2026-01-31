import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Blocks, Cloud, Code2, Database, Globe, Palette, Server, Smartphone, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Tech Stack" />
                    <Title text="Technologies" />
                    <Description text="The tools and frameworks I use to build exceptional products." />
                </div>

                <IconGrid
                    items={[
                        { icon: Globe, label: 'Next.js' },
                        { icon: Code2, label: 'TypeScript' },
                        { icon: Palette, label: 'Tailwind' },
                        { icon: Blocks, label: 'React' },
                        { icon: Server, label: 'Node.js' },
                        { icon: Database, label: 'PostgreSQL' },
                        { icon: Cloud, label: 'AWS' },
                        { icon: Smartphone, label: 'React Native' },
                        { icon: Zap, label: 'Vercel' },
                    ]}
                />
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface IconItem {
    icon: ComponentType<{ className?: string }>
    label: string
}

const IconGrid = ({ items }: { items: IconItem[] }) => (
    <div className="grid grid-cols-3 @sm:grid-cols-5 @lg:grid-cols-9 gap-4 @md:gap-6 max-w-4xl mx-auto">
        {items.map(({ icon: Icon, label }, i) => (
            <div key={i} className="group flex flex-col items-center gap-2 p-3 @md:p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:scale-110">
                    <Icon className="size-6 @md:size-7" />
                </div>
                <span className="text-xs @md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                </span>
            </div>
        ))}
    </div>
)

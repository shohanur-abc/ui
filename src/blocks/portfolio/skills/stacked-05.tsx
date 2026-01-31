import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Braces, Cloud, Database, Globe, Palette, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    eyebrow="My Stack"
                    title="Technology Layers"
                    description="Stacked technologies from foundation to interface"
                />

                <LayeredStack
                    layers={[
                        { icon: Palette, title: 'Design', description: 'UI/UX and visual design', skills: ['Figma', 'Design Systems', 'Accessibility'], color: 'border-l-pink-500' },
                        { icon: Globe, title: 'Frontend', description: 'Client-side development', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'], color: 'border-l-blue-500' },
                        { icon: Braces, title: 'API', description: 'Interface layer', skills: ['GraphQL', 'REST', 'tRPC'], color: 'border-l-purple-500' },
                        { icon: Server, title: 'Backend', description: 'Server-side logic', skills: ['Node.js', 'Python', 'Go'], color: 'border-l-green-500' },
                        { icon: Database, title: 'Data', description: 'Storage and caching', skills: ['PostgreSQL', 'MongoDB', 'Redis'], color: 'border-l-yellow-500' },
                        { icon: Cloud, title: 'Infrastructure', description: 'Cloud and deployment', skills: ['AWS', 'Docker', 'Kubernetes'], color: 'border-l-orange-500' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    eyebrow: string
    title: string
    description: string
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {description}
        </p>
    </div>
)

interface Layer {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    skills: string[]
    color: string
}

const LayeredStack = ({ layers }: { layers: Layer[] }) => (
    <div className="max-w-2xl mx-auto space-y-3">
        {layers.map((layer, i) => (
            <LayerCard key={i} {...layer} />
        ))}
    </div>
)

const LayerCard = ({ icon: Icon, title, description, skills, color }: Layer) => (
    <Card className={`group hover:border-primary/50 transition-all border-l-4 ${color}`}>
        <CardContent className="p-4 @md:p-5 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <Icon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{title}</h4>
                    <span className="text-sm text-muted-foreground hidden @sm:inline">{description}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                </div>
            </div>
            <ArrowRight className="size-5 text-muted-foreground hidden @md:block" />
        </CardContent>
    </Card>
)

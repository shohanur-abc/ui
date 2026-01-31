import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Blocks, Cpu, Globe, Paintbrush, Server, Smartphone } from 'lucide-react'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @3xl:grid-cols-2 gap-12 @lg:gap-16 @3xl:gap-20 items-start">
                    <div className="@3xl:sticky @3xl:top-8">
                        <Eyebrow text="Expertise" />
                        <Title text="Full-Stack Capabilities" />
                        <Description text="I bring a comprehensive skill set that covers every layer of modern web development." />
                    </div>

                    <FeatureList items={[
                        { icon: Globe, title: 'Frontend Development', tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                        { icon: Server, title: 'Backend Development', tags: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
                        { icon: Smartphone, title: 'Mobile Development', tags: ['React Native', 'iOS', 'Android'] },
                        { icon: Cpu, title: 'DevOps & Cloud', tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
                        { icon: Paintbrush, title: 'Design Systems', tags: ['Figma', 'Component Libraries', 'Documentation'] },
                        { icon: Blocks, title: 'API Design', tags: ['REST', 'GraphQL', 'WebSocket', 'tRPC'] },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="flex items-center gap-2 mb-3 @md:mb-4">
        {Icon && <Icon className="size-4" />} {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-[1.1]">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    tags: string[]
}

const FeatureList = ({ items }: { items: FeatureItem[] }) => (
    <ul className="space-y-0">
        {items.map(({ icon: Icon, title, tags }, i) => (
            <li key={i}>
                {i > 0 && <Separator className="my-6" />}
                <div className="flex gap-4 @md:gap-6">
                    <div className="size-10 @md:size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Icon className="size-5 @md:size-6 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base @md:text-lg font-semibold mb-2 @md:mb-3">{title}</h3>
                        <div className="flex flex-wrap gap-1.5 @md:gap-2">
                            {tags.map((tag, j) => (
                                <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

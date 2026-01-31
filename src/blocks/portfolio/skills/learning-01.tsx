import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Book, Code2, Layers, Rocket, Wrench, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Skill Journey"
                    title="Learning Progress"
                    description="Currently improving and exploring new technologies"
                />

                <LearningGrid
                    current={[
                        { icon: Code2, name: 'Rust', progress: 45, status: 'In Progress' },
                        { icon: Zap, name: 'AI/ML', progress: 55, status: 'In Progress' },
                        { icon: Layers, name: 'WebAssembly', progress: 40, status: 'Getting Started' },
                    ]}
                    mastered={[
                        { icon: Rocket, name: 'React', progress: 95 },
                        { icon: Book, name: 'TypeScript', progress: 95 },
                        { icon: Wrench, name: 'Next.js', progress: 92 },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleBlockProps {
    eyebrow: string
    title: string
    description: string
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
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

interface CurrentSkill {
    icon: ComponentType<{ className?: string }>
    name: string
    progress: number
    status: string
}

interface MasteredSkill {
    icon: ComponentType<{ className?: string }>
    name: string
    progress: number
}

interface LearningGridProps {
    current: CurrentSkill[]
    mastered: MasteredSkill[]
}

const LearningGrid = ({ current, mastered }: LearningGridProps) => (
    <div className="grid @lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card>
            <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Zap className="size-5 text-yellow-500" />
                    Currently Learning
                </h3>
                <div className="space-y-5">
                    {current.map(({ icon: Icon, name, progress, status }, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Icon className="size-5 text-primary" />
                                    <span className="font-medium">{name}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">{status}</Badge>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card className="border-primary/30">
            <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Rocket className="size-5 text-green-500" />
                    Mastered
                </h3>
                <div className="space-y-5">
                    {mastered.map(({ icon: Icon, name, progress }, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Icon className="size-5 text-primary" />
                                    <span className="font-medium">{name}</span>
                                </div>
                                <span className="font-bold text-green-500">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
)

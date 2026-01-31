import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Project Workflow" />
                    <Title text="From Idea to Launch" />
                    <Description text="A transparent view of how I take projects from initial concept to successful deployment." />
                </div>

                <StepTimeline
                    items={[
                        { status: 'completed', title: 'Discovery & Research', description: 'Understanding your needs, goals, and target audience through in-depth discussions.' },
                        { status: 'completed', title: 'Strategy & Planning', description: 'Creating a detailed project roadmap with clear milestones and deliverables.' },
                        { status: 'current', title: 'Design & Prototype', description: 'Crafting wireframes and interactive prototypes for user validation.' },
                        { status: 'upcoming', title: 'Development', description: 'Building the solution with clean, maintainable, and scalable code.' },
                        { status: 'upcoming', title: 'Testing & QA', description: 'Rigorous testing to ensure quality and reliability across all scenarios.' },
                        { status: 'upcoming', title: 'Launch & Support', description: 'Deploying to production and providing ongoing maintenance.' },
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

interface StepItem {
    status: 'completed' | 'current' | 'upcoming'
    title: string
    description: string
}

const StepTimeline = ({ items }: { items: StepItem[] }) => {
    const StatusIcon: Record<StepItem['status'], ComponentType<{ className?: string }>> = {
        completed: CheckCircle,
        current: Clock,
        upcoming: Circle,
    }

    return (
        <div className="max-w-4xl mx-auto grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
            {items.map(({ status, title, description }, i) => {
                const Icon = StatusIcon[status]
                return (
                    <div
                        key={i}
                        className={`relative p-5 @md:p-6 rounded-xl border transition-all ${
                            status === 'current'
                                ? 'border-primary bg-primary/5 shadow-md'
                                : status === 'completed'
                                ? 'border-border bg-muted/30'
                                : 'border-dashed border-muted-foreground/30'
                        }`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Icon
                                className={`size-5 ${
                                    status === 'completed'
                                        ? 'text-primary'
                                        : status === 'current'
                                        ? 'text-primary animate-pulse'
                                        : 'text-muted-foreground/50'
                                }`}
                            />
                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Step {i + 1}
                            </span>
                        </div>
                        <h3 className={`font-semibold mb-1 ${status === 'upcoming' ? 'text-muted-foreground' : ''}`}>
                            {title}
                        </h3>
                        <p className={`text-sm ${status === 'upcoming' ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                            {description}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

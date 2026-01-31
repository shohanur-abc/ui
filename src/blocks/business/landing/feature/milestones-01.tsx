import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Flag, Gem, History, Rocket, Star, Target, Trophy, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface MilestoneItem {
    year: string
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={History} text="Our Journey" />
                    <Title text="From Idea to" highlight="Industry Leader" />
                    <Description text="A timeline of milestones that have shaped our company and the solutions we offer today." />
                </div>

                <MilestoneTimeline items={[
                    { year: '2019', icon: Rocket, title: 'Founded', description: 'Started in a small garage with a big vision to transform team productivity.' },
                    { year: '2020', icon: Flag, title: 'Series A', description: 'Raised $10M to expand our team and accelerate product development.' },
                    { year: '2021', icon: Star, title: '10K Customers', description: 'Reached our first major customer milestone with teams worldwide.' },
                    { year: '2022', icon: Trophy, title: 'Best SaaS Award', description: 'Recognized as the best productivity tool by TechAwards.' },
                    { year: '2023', icon: Target, title: 'Series B', description: 'Raised $50M to scale globally and launch enterprise features.' },
                    { year: '2024', icon: Gem, title: '1M Users', description: 'Celebrated 1 million active users on our platform.' },
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
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const MilestoneTimeline = ({ items }: { items: MilestoneItem[] }) => (
    <div className="relative">
        {/* Horizontal line for large screens */}
        <div className="hidden @xl:block absolute top-8 left-0 right-0 h-0.5 bg-border" />
        
        <div className="grid gap-8 @xl:grid-cols-6">
            {items.map((milestone, index) => (
                <div key={milestone.year} className="relative">
                    {/* Connector dot */}
                    <div className="hidden @xl:block absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-primary ring-4 ring-background" />
                    
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm @xl:mt-12 transition-all hover:border-primary/30">
                        <CardContent className="p-4 text-center">
                            <Badge variant="outline" className="mb-3">{milestone.year}</Badge>
                            <div className="mb-3 mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                <milestone.icon className="size-5 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-1 text-sm">{milestone.title}</h3>
                            <p className="text-xs text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    </div>
)

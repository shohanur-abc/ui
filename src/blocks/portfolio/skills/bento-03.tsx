import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CircuitBoard, Code, FileCode, Gauge, Layers3, Workflow } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    label="Core Competencies"
                    heading="Full Stack Expertise"
                    subheading="Delivering end-to-end solutions with modern technologies"
                />

                <AsymmetricBento
                    largeCard={{
                        icon: Code,
                        title: 'Frontend Architecture',
                        description: 'Building scalable component systems with React ecosystem. Expertise in state management, performance optimization, and accessibility.',
                        tags: ['React', 'Next.js', 'TypeScript', 'Zustand', 'React Query'],
                    }}
                    mediumCards={[
                        {
                            icon: CircuitBoard,
                            title: 'Backend Systems',
                            description: 'RESTful APIs, GraphQL, and microservices architecture',
                            tags: ['Node.js', 'Python', 'Go'],
                        },
                        {
                            icon: Layers3,
                            title: 'Data Layer',
                            description: 'Database design, ORM integration, and caching strategies',
                            tags: ['PostgreSQL', 'Redis', 'Prisma'],
                        },
                    ]}
                    smallCards={[
                        { icon: FileCode, title: 'Testing', stat: '95%', label: 'Coverage' },
                        { icon: Gauge, title: 'Performance', stat: '100', label: 'Lighthouse' },
                        { icon: Workflow, title: 'CI/CD', stat: '50+', label: 'Pipelines' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleBlockProps {
    label: string
    heading: string
    subheading: string
}

const TitleBlock = ({ label, heading, subheading }: TitleBlockProps) => (
    <div className="mb-12 @md:mb-16 @xl:mb-20">
        <Badge variant="secondary" className="mb-4">
            {label}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
            {heading}
        </h2>
        <p className="text-muted-foreground text-lg @md:text-xl max-w-3xl">
            {subheading}
        </p>
    </div>
)

interface LargeCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    tags: string[]
}

interface MediumCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    tags: string[]
}

interface SmallCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    stat: string
    label: string
}

interface AsymmetricBentoProps {
    largeCard: LargeCardProps
    mediumCards: MediumCardProps[]
    smallCards: SmallCardProps[]
}

const AsymmetricBento = ({ largeCard, mediumCards, smallCards }: AsymmetricBentoProps) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        <LargeSkillCard {...largeCard} />
        <div className="@xl:col-span-2 grid gap-4 @md:gap-6">
            {mediumCards.map((card, i) => (
                <MediumSkillCard key={i} {...card} />
            ))}
        </div>
        <div className="grid @sm:grid-cols-3 @xl:grid-cols-1 gap-4 @md:gap-6">
            {smallCards.map((card, i) => (
                <SmallSkillCard key={i} {...card} />
            ))}
        </div>
    </div>
)

const LargeSkillCard = ({ icon: Icon, title, description, tags }: LargeCardProps) => (
    <Card className="@md:col-span-2 @xl:row-span-2 group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-6 @md:p-8 h-full flex flex-col">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:from-primary/30 transition-colors">
                <Icon className="size-7 text-primary" />
            </div>
            <h3 className="text-2xl @md:text-3xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

const MediumSkillCard = ({ icon: Icon, title, description, tags }: MediumCardProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-start gap-4">
                <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{description}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
)

const SmallSkillCard = ({ icon: Icon, title, stat, label }: SmallCardProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-4 @md:p-5 text-center">
            <Icon className="size-5 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{stat}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
        </CardContent>
    </Card>
)

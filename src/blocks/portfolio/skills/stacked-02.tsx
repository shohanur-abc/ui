import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Code2, Database, Layout, Server, Smartphone, Wrench } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <HeaderSection
                    eyebrow="Expertise Areas"
                    title="What I Bring"
                    description="Comprehensive skills developed through real-world projects"
                />

                <StackedCards
                    items={[
                        {
                            icon: Code2,
                            title: 'Frontend Engineering',
                            features: ['React & Next.js', 'TypeScript', 'State Management', 'Performance Optimization', 'Accessibility'],
                        },
                        {
                            icon: Server,
                            title: 'Backend Development',
                            features: ['Node.js & Express', 'Python & FastAPI', 'GraphQL & REST', 'Authentication', 'Caching'],
                        },
                        {
                            icon: Database,
                            title: 'Data Architecture',
                            features: ['PostgreSQL', 'MongoDB', 'Redis', 'Data Modeling', 'Query Optimization'],
                        },
                        {
                            icon: Layout,
                            title: 'UI/UX Implementation',
                            features: ['Responsive Design', 'Design Systems', 'Animations', 'Component Libraries'],
                        },
                        {
                            icon: Wrench,
                            title: 'DevOps & Tooling',
                            features: ['Docker', 'CI/CD', 'AWS', 'Monitoring', 'Infrastructure as Code'],
                        },
                        {
                            icon: Smartphone,
                            title: 'Mobile Development',
                            features: ['React Native', 'Cross-platform', 'Native APIs', 'App Store Deployment'],
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderSectionProps {
    eyebrow: string
    title: string
    description: string
}

const HeaderSection = ({ eyebrow, title, description }: HeaderSectionProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {description}
        </p>
    </div>
)

interface StackedItem {
    icon: ComponentType<{ className?: string }>
    title: string
    features: string[]
}

const StackedCards = ({ items }: { items: StackedItem[] }) => (
    <div className="max-w-4xl mx-auto grid @md:grid-cols-2 gap-4 @md:gap-6">
        {items.map((item, i) => (
            <FeatureCard key={i} {...item} />
        ))}
    </div>
)

const FeatureCard = ({ icon: Icon, title, features }: StackedItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-bold">{title}</h3>
            </div>
            <ul className="space-y-2">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
)

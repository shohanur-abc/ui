import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Box, Brush, GitBranch, Globe, Rocket, Shield } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <IntroSection
                    tag="Capabilities"
                    title="What I Bring to the Table"
                    description="A diverse skill set honed through years of building products that matter"
                />

                <MasonryBento
                    items={[
                        {
                            icon: Globe,
                            title: 'Web Development',
                            description: 'Creating fast, responsive, and SEO-friendly web applications using modern frameworks and best practices.',
                            level: 'Expert',
                            size: 'large',
                        },
                        {
                            icon: Box,
                            title: '3D & WebGL',
                            description: 'Interactive 3D experiences with Three.js',
                            level: 'Advanced',
                            size: 'small',
                        },
                        {
                            icon: Brush,
                            title: 'Design Systems',
                            description: 'Building cohesive component libraries',
                            level: 'Expert',
                            size: 'small',
                        },
                        {
                            icon: Shield,
                            title: 'Security',
                            description: 'Implementing secure authentication flows, data encryption, and vulnerability prevention.',
                            level: 'Advanced',
                            size: 'medium',
                        },
                        {
                            icon: Rocket,
                            title: 'Performance',
                            description: 'Optimizing load times and runtime performance',
                            level: 'Expert',
                            size: 'small',
                        },
                        {
                            icon: GitBranch,
                            title: 'Version Control',
                            description: 'Git workflows, code review, and collaboration',
                            level: 'Expert',
                            size: 'small',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface IntroSectionProps {
    tag: string
    title: string
    description: string
}

const IntroSection = ({ tag, title, description }: IntroSectionProps) => (
    <div className="text-center mb-12 @md:mb-16 @xl:mb-20">
        <Badge className="mb-4">{tag}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {description}
        </p>
    </div>
)

interface BentoItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    level: string
    size: 'large' | 'medium' | 'small'
}

const MasonryBento = ({ items }: { items: BentoItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6 auto-rows-fr">
        {items.map((item, i) => (
            <BentoCard key={i} {...item} />
        ))}
    </div>
)

const BentoCard = ({ icon: Icon, title, description, level, size }: BentoItem) => {
    const sizeClasses = {
        large: '@sm:col-span-2 @xl:row-span-2',
        medium: '@sm:col-span-2 @xl:col-span-2',
        small: '',
    }

    return (
        <Card className={`group hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${sizeClasses[size]}`}>
            <CardContent className={`h-full flex flex-col ${size === 'large' ? 'p-6 @md:p-8' : 'p-5'}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className={`rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${size === 'large' ? 'size-14' : 'size-11'}`}>
                        <Icon className={`text-primary ${size === 'large' ? 'size-7' : 'size-5'}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                        {level}
                    </Badge>
                </div>
                <h3 className={`font-bold mb-2 ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>
                    {title}
                </h3>
                <p className={`text-muted-foreground flex-grow ${size === 'large' ? 'text-base' : 'text-sm'}`}>
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}

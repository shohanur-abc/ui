import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, Briefcase, Code2, Database, Layers, Palette } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @3xl:grid-cols-2 gap-12 @xl:gap-16 @3xl:gap-20 items-center">
                    <SkillsGrid
                        items={[
                            { icon: Code2, title: 'Frontend', level: 95, color: 'bg-blue-500' },
                            { icon: Database, title: 'Backend', level: 85, color: 'bg-green-500' },
                            { icon: Layers, title: 'DevOps', level: 80, color: 'bg-purple-500' },
                            { icon: Palette, title: 'Design', level: 75, color: 'bg-pink-500' },
                        ]}
                    />

                    <ContentArea
                        eyebrow={{ icon: Briefcase, text: 'Professional Skills' }}
                        title="Building Digital Excellence"
                        description="With over 8 years of experience, I've mastered the art of creating scalable, performant, and beautiful applications. My expertise spans the entire development lifecycle."
                        highlights={[
                            '50+ projects delivered',
                            '30+ technologies mastered',
                            '100% client satisfaction',
                        ]}
                        cta={{ label: 'See My Work', href: '#portfolio' }}
                    />
                </div>
            </div>
        </section>
    )
}

interface SkillGridItem {
    icon: ComponentType<{ className?: string }>
    title: string
    level: number
    color: string
}

const SkillsGrid = ({ items }: { items: SkillGridItem[] }) => (
    <div className="grid grid-cols-2 gap-4 @md:gap-6">
        {items.map((item, i) => (
            <SkillGridCard key={i} {...item} />
        ))}
    </div>
)

const SkillGridCard = ({ icon: Icon, title, level, color }: SkillGridItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-5 @md:p-6">
            <div className={`size-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`size-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <h3 className="font-semibold mb-3">{title}</h3>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="font-medium">{level}%</span>
                </div>
                <Progress value={level} className="h-2" />
            </div>
        </CardContent>
    </Card>
)

interface ContentAreaProps {
    eyebrow: { icon: ComponentType<{ className?: string }>; text: string }
    title: string
    description: string
    highlights: string[]
    cta: { label: string; href: string }
}

const ContentArea = ({ eyebrow, title, description, highlights, cta }: ContentAreaProps) => {
    const EyebrowIcon = eyebrow.icon
    return (
        <div>
            <Badge variant="outline" className="mb-4">
                <EyebrowIcon className="size-3 mr-1.5" />
                {eyebrow.text}
            </Badge>
            <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
                {title}
            </h2>
            <p className="text-muted-foreground text-base @md:text-lg mb-6 leading-relaxed">
                {description}
            </p>
            <ul className="space-y-3 mb-8">
                {highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium">{item}</span>
                    </li>
                ))}
            </ul>
            <Button size="lg" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4 ml-2" />
                </Link>
            </Button>
        </div>
    )
}

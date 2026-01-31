import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Braces, Cloud, Database, Globe, Palette, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Showcase"
                    title="Skills Spotlight"
                    description="Highlighted areas of expertise"
                />

                <ShowcaseGrid
                    featured={{
                        icon: Braces,
                        title: 'Full Stack Development',
                        description: 'Building complete web applications from frontend to backend with modern technologies and best practices.',
                        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
                        cta: 'View Projects',
                    }}
                    secondary={[
                        { icon: Globe, title: 'Frontend', skills: ['React', 'Next.js', 'Tailwind'] },
                        { icon: Server, title: 'Backend', skills: ['Node.js', 'Python', 'Go'] },
                        { icon: Database, title: 'Database', skills: ['PostgreSQL', 'MongoDB'] },
                        { icon: Cloud, title: 'Cloud', skills: ['AWS', 'Docker', 'K8s'] },
                        { icon: Palette, title: 'Design', skills: ['Figma', 'UI/UX'] },
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

interface FeaturedSkill {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    skills: string[]
    cta: string
}

interface SecondarySkill {
    icon: ComponentType<{ className?: string }>
    title: string
    skills: string[]
}

interface ShowcaseGridProps {
    featured: FeaturedSkill
    secondary: SecondarySkill[]
}

const ShowcaseGrid = ({ featured, secondary }: ShowcaseGridProps) => (
    <div className="max-w-5xl mx-auto">
        <FeaturedCard {...featured} />
        <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-5 gap-4 mt-6">
            {secondary.map((skill, i) => (
                <SecondaryCard key={i} {...skill} />
            ))}
        </div>
    </div>
)

const FeaturedCard = ({ icon: Icon, title, description, skills, cta }: FeaturedSkill) => (
    <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6 @md:p-8 @lg:p-10">
            <div className="@lg:flex @lg:items-center @lg:gap-10">
                <div className="mb-6 @lg:mb-0 @lg:flex-1">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <Icon className="size-8 text-primary" />
                    </div>
                    <h3 className="text-2xl @md:text-3xl font-bold mb-3">{title}</h3>
                    <p className="text-muted-foreground mb-6">{description}</p>
                    <Button className="gap-2">
                        {cta}
                        <ArrowRight className="size-4" />
                    </Button>
                </div>
                <div className="@lg:w-72 shrink-0">
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-sm px-4 py-1.5">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
)

const SecondaryCard = ({ icon: Icon, title, skills }: SecondarySkill) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-4 text-center">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-xs text-muted-foreground">{skills.join(', ')}</p>
        </CardContent>
    </Card>
)

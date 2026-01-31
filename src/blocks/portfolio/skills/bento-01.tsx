import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Database, Layout, Server, Smartphone, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    eyebrow="Expertise"
                    title="My Skills"
                    description="A comprehensive toolkit for building exceptional digital experiences"
                />

                <BentoGrid
                    items={[
                        {
                            icon: Code2,
                            title: 'Frontend Development',
                            description: 'Building responsive, accessible interfaces with React, Next.js, and TypeScript',
                            skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
                            featured: true,
                        },
                        {
                            icon: Server,
                            title: 'Backend Development',
                            description: 'Scalable server-side solutions with Node.js and Python',
                            skills: ['Node.js', 'Python', 'GraphQL', 'REST APIs'],
                            featured: false,
                        },
                        {
                            icon: Database,
                            title: 'Database Design',
                            description: 'Efficient data architecture with SQL and NoSQL databases',
                            skills: ['PostgreSQL', 'MongoDB', 'Redis'],
                            featured: false,
                        },
                        {
                            icon: Layout,
                            title: 'UI/UX Design',
                            description: 'Creating intuitive user experiences with modern design tools',
                            skills: ['Figma', 'Prototyping', 'Design Systems'],
                            featured: false,
                        },
                        {
                            icon: Smartphone,
                            title: 'Mobile Development',
                            description: 'Cross-platform mobile apps with React Native',
                            skills: ['React Native', 'iOS', 'Android'],
                            featured: false,
                        },
                        {
                            icon: Zap,
                            title: 'Performance',
                            description: 'Optimizing applications for speed and efficiency',
                            skills: ['Web Vitals', 'Caching', 'CDN'],
                            featured: true,
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    eyebrow: string
    title: string
    description: string
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
    <div className="text-center mb-12 @md:mb-16 @xl:mb-20">
        <Badge variant="outline" className="mb-4">
            {eyebrow}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
        </p>
    </div>
)

interface SkillItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    skills: string[]
    featured: boolean
}

const BentoGrid = ({ items }: { items: SkillItem[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map((item, i) => (
            <SkillCard key={i} {...item} />
        ))}
    </div>
)

const SkillCard = ({ icon: Icon, title, description, skills, featured }: SkillItem) => (
    <Card className={`group transition-all duration-300 hover:shadow-lg hover:border-primary/50 ${featured ? '@xl:col-span-1 @xl:row-span-1' : ''}`}>
        <CardContent className="p-6">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, j) => (
                    <Badge key={j} variant="secondary" className="text-xs">
                        {skill}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

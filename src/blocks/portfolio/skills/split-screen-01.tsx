import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, Code2, Database, Palette, Server, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 bg-muted/30">
                <div className="grid @3xl:grid-cols-2 gap-12 @lg:gap-16 @3xl:gap-20">
                    <div>
                        <Eyebrow text="Skills" />
                        <Title text="Technical Expertise" />
                        <Description text="Years of hands-on experience with modern technologies and frameworks." />

                        <SkillBars items={[
                            { name: 'Frontend Development', level: 95 },
                            { name: 'Backend Development', level: 85 },
                            { name: 'Database Design', level: 80 },
                            { name: 'DevOps & Cloud', level: 75 },
                            { name: 'UI/UX Design', level: 70 },
                        ]} />

                        <CTA iconRight={ArrowRight} text="View My Projects" />
                    </div>

                    <div>
                        <TechCategories items={[
                            { icon: Code2, title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
                            { icon: Server, title: 'Backend', skills: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST APIs'] },
                            { icon: Database, title: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
                            { icon: Smartphone, title: 'Mobile', skills: ['React Native', 'Flutter', 'iOS', 'Android'] },
                            { icon: Palette, title: 'Design', skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'] },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="flex justify-center mb-3 @md:mb-4">
        {Icon && <Icon className="size-4 mr-2" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground mb-8 @md:mb-10">{text}</p>
)

const SkillBars = ({ items }: { items: { name: string; level: number }[] }) => (
    <div className="space-y-5 @md:space-y-6 mb-10 @md:mb-12">
        {items.map(({ name, level }, i) => (
            <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{name}</span>
                    <span className="text-muted-foreground">{level}%</span>
                </div>
                <Progress value={level} className="h-2" />
            </div>
        ))}
    </div>
)

const CTA = ({ iconRight: Icon, text }: { iconRight?: ComponentType<{ className?: string }>; text: string }) => (
    <Button variant="outline" className="gap-2" asChild>
        <Link href="#projects">
            {text}
            {Icon && <Icon className="size-4" />}
        </Link>
    </Button>
)

interface TechCategory {
    icon: ComponentType<{ className?: string }>
    title: string
    skills: string[]
}

const TechCategories = ({ items }: { items: TechCategory[] }) => (
    <div className="space-y-6 @md:space-y-8">
        {items.map(({ icon: Icon, title, skills }, i) => (
            <div key={i} className="p-5 @md:p-6 rounded-xl border bg-background">
                <div className="flex items-center gap-3 mb-4">
                    <Icon className="size-5 text-primary" />
                    <h3 className="font-semibold">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

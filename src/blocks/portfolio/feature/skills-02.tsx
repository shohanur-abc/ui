import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Expertise" />
                    <Title text="Skill Categories" />
                    <Description text="Organized view of my technical capabilities." />
                </div>

                <SkillCategories
                    categories={[
                        {
                            name: 'Languages',
                            skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
                        },
                        {
                            name: 'Frontend',
                            skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion'],
                        },
                        {
                            name: 'Backend',
                            skills: ['Node.js', 'Express', 'FastAPI', 'GraphQL', 'REST'],
                        },
                        {
                            name: 'Database',
                            skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Drizzle'],
                        },
                        {
                            name: 'DevOps',
                            skills: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Terraform'],
                        },
                        {
                            name: 'Tools',
                            skills: ['Git', 'Figma', 'VS Code', 'Postman', 'Notion'],
                        },
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

interface CategoryItem {
    name: string
    skills: string[]
}

const SkillCategories = ({ categories }: { categories: CategoryItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {categories.map(({ name, skills }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all hover:border-primary/30">
                <CardContent className="p-5 @md:p-6">
                    <h3 className="font-bold text-lg mb-4 text-primary">{name}</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, j) => (
                            <span
                                key={j}
                                className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

import { Badge } from '@/components/ui/badge'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Tech Stack"
                    title="Technologies I Work With"
                    description="From frontend frameworks to cloud infrastructure"
                />

                <TechBadgeCloud
                    categories={[
                        {
                            name: 'Frontend',
                            items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Svelte'],
                        },
                        {
                            name: 'Backend',
                            items: ['Node.js', 'Python', 'Go', 'Rust', 'GraphQL', 'REST'],
                        },
                        {
                            name: 'Database',
                            items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Prisma'],
                        },
                        {
                            name: 'DevOps',
                            items: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'GitHub Actions'],
                        },
                        {
                            name: 'Tools',
                            items: ['Git', 'Figma', 'VS Code', 'Postman', 'Linear'],
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface SectionHeaderProps {
    badge: string
    title: string
    description: string
}

const SectionHeader = ({ badge, title, description }: SectionHeaderProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {description}
        </p>
    </div>
)

interface Category {
    name: string
    items: string[]
}

const TechBadgeCloud = ({ categories }: { categories: Category[] }) => (
    <div className="space-y-8 @md:space-y-10 max-w-4xl mx-auto">
        {categories.map((category, i) => (
            <CategoryRow key={i} {...category} />
        ))}
    </div>
)

const CategoryRow = ({ name, items }: Category) => (
    <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">{name}</h3>
        <div className="flex flex-wrap justify-center gap-2 @md:gap-3">
            {items.map((item, i) => (
                <TechBadge key={i} name={item} />
            ))}
        </div>
    </div>
)

const TechBadge = ({ name }: { name: string }) => (
    <span className="inline-flex items-center px-4 @md:px-5 py-2 @md:py-2.5 rounded-full border bg-card text-sm @md:text-base font-medium hover:border-primary/50 hover:bg-accent/50 transition-all cursor-default">
        {name}
    </span>
)

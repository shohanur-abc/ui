import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Cloud, Code2, Database, FileCode, Palette, Terminal } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="Tech Stack" />
                    <Title text="Tools & Technologies" />
                    <Description text="The modern technology stack I use to build robust, scalable applications." />
                </div>

                <Masonry items={[
                    { icon: Code2, title: 'Frontend', description: 'React, Next.js, Vue, TypeScript, Tailwind CSS, Framer Motion', href: '#frontend', featured: true },
                    { icon: Terminal, title: 'Backend', description: 'Node.js, Python, Go', href: '#backend', featured: false },
                    { icon: Database, title: 'Database', description: 'PostgreSQL, MongoDB, Redis, Prisma', href: '#database', featured: false },
                    { icon: Cloud, title: 'Cloud & DevOps', description: 'AWS, Vercel, Docker, Kubernetes, GitHub Actions', href: '#cloud', featured: true },
                    { icon: Palette, title: 'Design', description: 'Figma, Adobe Creative Suite', href: '#design', featured: false },
                    { icon: FileCode, title: 'Testing', description: 'Jest, Playwright, Vitest', href: '#testing', featured: false },
                ]} />
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

interface MasonryItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    href: string
    featured: boolean
}

const Masonry = ({ items }: { items: MasonryItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, href, featured }, i) => (
            <li key={i} className={featured ? '@xl:row-span-2' : ''}>
                <Link href={href} className="block h-full">
                    <Card className={`h-full group hover:shadow-lg hover:border-primary/50 transition-all py-0 ${featured ? 'bg-primary/5' : ''}`}>
                        <CardContent className={`p-5 @md:p-6 ${featured ? '@xl:p-8' : ''} h-full flex flex-col`}>
                            <div className="flex items-start justify-between mb-3 @md:mb-4">
                                <div className={`${featured ? 'size-12 @md:size-14' : 'size-10 @md:size-12'} rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors`}>
                                    <Icon className={featured ? 'size-6 @md:size-7' : 'size-5 @md:size-6'} />
                                </div>
                                <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className={`${featured ? 'text-xl @md:text-2xl' : 'text-lg @md:text-xl'} font-semibold mb-2`}>{title}</h3>
                            <p className={`${featured ? 'text-sm @md:text-base' : 'text-sm'} text-muted-foreground leading-relaxed flex-1`}>{description}</p>
                        </CardContent>
                    </Card>
                </Link>
            </li>
        ))}
    </ul>
)

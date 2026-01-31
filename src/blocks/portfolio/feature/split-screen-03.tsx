import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <ImageWithStats
                        src="https://picsum.photos/seed/skills-visual/800/700"
                        alt="Skills visualization"
                        stats={[
                            { label: 'Projects', value: '200+' },
                            { label: 'Clients', value: '85+' },
                        ]}
                    />

                    <SkillsBlock
                        eyebrow="Technical Skills"
                        title="Mastering Modern Technologies"
                        description="Continuous learning and hands-on experience across the full stack."
                        skills={[
                            { name: 'Frontend Development', level: 95 },
                            { name: 'Backend Development', level: 88 },
                            { name: 'UI/UX Design', level: 82 },
                            { name: 'DevOps & Cloud', level: 75 },
                        ]}
                        cta={{ label: 'View All Skills', href: '#skills' }}
                    />
                </div>
            </div>
        </section>
    )
}

interface ImageWithStatsProps {
    src: string
    alt: string
    stats: { label: string; value: string }[]
}

const ImageWithStats = ({ src, alt, stats }: ImageWithStatsProps) => (
    <div className="relative">
        <div className="aspect-square @3xl:aspect-[4/3.5] rounded-2xl @md:rounded-3xl overflow-hidden">
            <Image src={src} alt={alt} fill className="object-cover" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 @md:bottom-6 @md:left-6 @md:right-6 flex gap-3 @md:gap-4">
            {stats.map(({ label, value }, i) => (
                <div key={i} className="flex-1 bg-background/90 backdrop-blur-sm border rounded-xl p-3 @md:p-4">
                    <div className="text-xl @md:text-2xl font-bold">{value}</div>
                    <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
                </div>
            ))}
        </div>
    </div>
)

interface SkillsBlockProps {
    eyebrow: string
    title: string
    description: string
    skills: { name: string; level: number }[]
    cta: { label: string; href: string }
}

const SkillsBlock = ({ eyebrow, title, description, skills, cta }: SkillsBlockProps) => (
    <div>
        <Badge variant="outline" className="mb-3 @md:mb-4">
            {eyebrow}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
            {title}
        </h2>
        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
            {description}
        </p>

        <div className="space-y-5 @md:space-y-6 mb-6 @md:mb-8">
            {skills.map(({ name, level }, i) => (
                <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm @md:text-base">{name}</span>
                        <span className="text-sm text-muted-foreground">{level}%</span>
                    </div>
                    <Progress value={level} className="h-2" />
                </div>
            ))}
        </div>

        <Button variant="outline" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

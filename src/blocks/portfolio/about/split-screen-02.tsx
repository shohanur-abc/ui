import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Calendar, Code, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <ContentSection
                        eyebrow="About Me"
                        title="Michael Rodriguez"
                        role="Senior Full-Stack Engineer"
                        description="I build robust, scalable applications that power businesses. With expertise spanning frontend frameworks to cloud infrastructure, I deliver end-to-end solutions."
                        stats={[
                            { icon: Calendar, value: '12+', label: 'Years' },
                            { icon: Code, value: '200+', label: 'Projects' },
                            { icon: Users, value: '50+', label: 'Clients' },
                        ]}
                        skills={['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'GraphQL']}
                        cta={{ label: 'Get In Touch', href: '/contact', icon: ArrowRight }}
                    />
                    <ImageSection
                        src="https://picsum.photos/seed/split2/800/1000"
                        alt="Michael Rodriguez"
                    />
                </div>
            </div>
        </section>
    )
}

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ContentSectionProps {
    eyebrow: string
    title: string
    role: string
    description: string
    stats: StatItem[]
    skills: string[]
    cta: CTAData
}

const ContentSection = ({ eyebrow, title, role, description, stats, skills, cta }: ContentSectionProps) => (
    <div>
        <Badge variant="outline" className="mb-4">
            {eyebrow}
        </Badge>
        <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-lg @md:text-xl text-primary font-medium mb-6">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
        <div className="flex gap-8 mb-8">
            {stats.map(({ icon: Icon, value, label }, i) => (
                <div key={i} className="text-center">
                    <Icon className="size-5 text-primary mx-auto mb-1" />
                    <div className="text-xl @md:text-2xl font-bold">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                </div>
            ))}
        </div>
        <Separator className="my-8" />
        <div className="mb-8">
            <p className="text-sm font-medium mb-3">Core Technologies</p>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

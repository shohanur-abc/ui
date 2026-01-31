import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, Globe, Heart, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <ImageSection
                        src="https://picsum.photos/seed/split11/800/1000"
                        alt="Sophia Anderson"
                    />
                    <ContentSection
                        eyebrow={{ icon: Sparkles, text: 'Creative Technologist' }}
                        title="Sophia Anderson"
                        description="I exist at the intersection of art and technology. My work explores how code can create emotional experiences, turning data into beauty and algorithms into art."
                        skills={[
                            { name: 'Creative Coding', value: 95 },
                            { name: 'WebGL & Three.js', value: 90 },
                            { name: 'Generative Art', value: 88 },
                            { name: 'Interactive Design', value: 85 },
                        ]}
                        passions={[
                            { icon: Heart, text: 'Digital Art' },
                            { icon: Globe, text: 'Web Experiences' },
                        ]}
                        cta={{ label: 'View Experiments', href: '/lab', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
    </div>
)

interface EyebrowData {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface SkillItem {
    name: string
    value: number
}

interface PassionItem {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ContentSectionProps {
    eyebrow: EyebrowData
    title: string
    description: string
    skills: SkillItem[]
    passions: PassionItem[]
    cta: CTAData
}

const ContentSection = ({ eyebrow, title, description, skills, passions, cta }: ContentSectionProps) => (
    <div>
        <Badge variant="secondary" className="mb-4">
            <eyebrow.icon className="size-3.5 mr-1" />
            {eyebrow.text}
        </Badge>
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-6">{title}</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
        <div className="space-y-4 mb-8">
            {skills.map(({ name, value }) => (
                <div key={name}>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-sm text-muted-foreground">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                </div>
            ))}
        </div>
        <div className="flex gap-4 mb-8">
            {passions.map(({ icon: Icon, text }, i) => (
                <Badge key={i} variant="outline" className="px-4 py-2">
                    <Icon className="size-4 mr-2" />
                    {text}
                </Badge>
            ))}
        </div>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

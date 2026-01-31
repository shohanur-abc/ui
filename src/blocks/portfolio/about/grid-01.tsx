import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, Code, Palette, Server, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="space-y-12">
                    <HeaderSection
                        src="https://picsum.photos/seed/gr1/400/400"
                        fallback="JD"
                        name="John Doe"
                        role="Full-Stack Developer"
                        bio="Building scalable web applications with modern technologies. 8+ years of experience in React, Node.js, and cloud infrastructure."
                    />
                    <SkillsGrid
                        title="Areas of Expertise"
                        skills={[
                            { icon: Code, title: 'Frontend Development', description: 'React, Next.js, TypeScript, Tailwind CSS, and modern web standards.' },
                            { icon: Server, title: 'Backend Development', description: 'Node.js, Python, PostgreSQL, Redis, and RESTful APIs.' },
                            { icon: Smartphone, title: 'Mobile Development', description: 'React Native, cross-platform apps, and responsive design.' },
                            { icon: Palette, title: 'UI/UX Design', description: 'Figma, design systems, accessibility, and user research.' },
                        ]}
                    />
                    <CTASection
                        title="Interested in working together?"
                        cta={{ label: 'Get in Touch', href: '/contact', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface HeaderSectionProps {
    src: string
    fallback: string
    name: string
    role: string
    bio: string
}

const HeaderSection = ({ src, fallback, name, role, bio }: HeaderSectionProps) => (
    <div className="text-center max-w-2xl mx-auto">
        <Avatar className="size-24 mx-auto mb-6 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <Badge variant="secondary" className="mb-4">{role}</Badge>
        <h1 className="text-3xl @lg:text-4xl font-bold mb-4">{name}</h1>
        <p className="text-lg text-muted-foreground">{bio}</p>
    </div>
)

interface SkillItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

interface SkillsGridProps {
    title: string
    skills: SkillItem[]
}

const SkillsGrid = ({ title, skills }: SkillsGridProps) => (
    <div>
        <h2 className="text-xl font-bold mb-6 text-center">{title}</h2>
        <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-6">
            {skills.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="text-center">
                    <CardHeader className="pb-2">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                            <Icon className="size-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{title}</h3>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTASectionProps {
    title: string
    cta: CTAData
}

const CTASection = ({ title, cta }: CTASectionProps) => (
    <div className="text-center">
        <p className="text-muted-foreground mb-4">{title}</p>
        <Button className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

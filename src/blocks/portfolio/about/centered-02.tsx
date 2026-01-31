import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight, Code2, Coffee, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <ProfileImage
                        src="https://picsum.photos/seed/about-centered2/400/400"
                        fallback="SR"
                    />
                    <Title text="Sarah Rodriguez" highlight="Full-Stack Developer" />
                    <Description
                        text="Passionate about building scalable web applications and mentoring the next generation of developers. I believe in clean code, thoughtful architecture, and continuous learning."
                    />
                    <Stats
                        items={[
                            { icon: Code2, value: '200+', label: 'Projects' },
                            { icon: Coffee, value: '10K+', label: 'Commits' },
                            { icon: Zap, value: '15+', label: 'Years Exp' },
                        ]}
                    />
                    <Separator className="my-8 @md:my-10 max-w-md mx-auto" />
                    <Skills
                        items={['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS']}
                    />
                    <CTA label="Let's Work Together" href="#contact" icon={ArrowUpRight} />
                </div>
            </div>
        </section>
    )
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
    <Avatar className="size-24 @sm:size-28 @md:size-36 mx-auto mb-6 @md:mb-8 ring-2 ring-primary/20">
        <AvatarImage src={src} alt="Profile" />
        <AvatarFallback className="text-2xl @md:text-3xl bg-primary text-primary-foreground">
            {fallback}
        </AvatarFallback>
    </Avatar>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <div className="mb-6">
        <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">{text}</h1>
        <p className="text-lg @md:text-xl text-primary font-medium">{highlight}</p>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
        {text}
    </p>
)

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const Stats = ({ items }: { items: StatItem[] }) => (
    <div className="flex justify-center gap-8 @md:gap-12">
        {items.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center">
                <Icon className="size-5 text-primary mx-auto mb-2" />
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const Skills = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-2 mb-8 @md:mb-10">
        {items.map((skill) => (
            <Badge key={skill} variant="outline" className="px-3 py-1">
                {skill}
            </Badge>
        ))}
    </div>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <Icon className="size-4" />
        </Link>
    </Button>
)

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, Award, Code, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-md mx-auto">
                    <ProfileCard
                        src="https://picsum.photos/seed/card3/400/400"
                        fallback="MR"
                        name="Mike Robinson"
                        role="Full-Stack Developer"
                        status="Available for hire"
                        bio="I build web applications from idea to deployment. Expertise in React, Node.js, and cloud infrastructure."
                        stats={[
                            { icon: Code, value: '100+', label: 'Projects' },
                            { icon: Users, value: '50+', label: 'Clients' },
                            { icon: Award, value: '10', label: 'Awards' },
                        ]}
                        skills={[
                            { name: 'Frontend', value: 95 },
                            { name: 'Backend', value: 90 },
                            { name: 'DevOps', value: 75 },
                        ]}
                        cta={{ label: 'Hire Me', href: '/contact', icon: ArrowRight }}
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

interface SkillItem {
    name: string
    value: number
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ProfileCardProps {
    src: string
    fallback: string
    name: string
    role: string
    status: string
    bio: string
    stats: StatItem[]
    skills: SkillItem[]
    cta: CTAData
}

const ProfileCard = ({ src, fallback, name, role, status, bio, stats, skills, cta }: ProfileCardProps) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
                <Avatar className="size-16 ring-2 ring-border">
                    <AvatarImage src={src} alt={name} />
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h1 className="text-xl font-bold">{name}</h1>
                    <p className="text-muted-foreground text-sm">{role}</p>
                    <Badge className="mt-2 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                        <span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                        {status}
                    </Badge>
                </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6">{bio}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map(({ icon: Icon, value, label }, i) => (
                    <div key={i} className="text-center">
                        <Icon className="size-4 text-primary mx-auto mb-1" />
                        <div className="text-lg font-bold">{value}</div>
                        <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                ))}
            </div>
            <div className="space-y-3 mb-6">
                {skills.map(({ name, value }) => (
                    <div key={name}>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">{name}</span>
                            <span className="text-sm text-muted-foreground">{value}%</span>
                        </div>
                        <Progress value={value} className="h-1.5" />
                    </div>
                ))}
            </div>
            <Button className="gap-2 w-full" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

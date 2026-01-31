import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Briefcase, Calendar, MapPin, Quote, Award, FileCode, Star } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Briefcase} text="Overview" />
                    <Title text="Experience Overview" />
                    <Description text="A comprehensive view of my professional journey." />
                </div>

                <div className="columns-1 @md:columns-2 @xl:columns-3 gap-4 space-y-4">
                    <WorkCard
                        company="TechCorp"
                        role="Principal Engineer"
                        period="2023 - Present"
                        location="San Francisco"
                        current
                    />
                    <TestimonialCard
                        quote="John is the best engineer I've ever worked with."
                        author="Sarah Chen"
                        role="VP Engineering"
                    />
                    <SkillCard
                        title="Frontend"
                        skills={['React', 'TypeScript', 'Next.js', 'Tailwind']}
                    />
                    <WorkCard
                        company="StartupX"
                        role="Staff Engineer"
                        period="2021 - 2023"
                        location="Remote"
                    />
                    <AwardCard
                        title="Engineer of the Year"
                        org="TechCorp"
                        year="2024"
                    />
                    <StatCard value="8+" label="Years Experience" />
                    <WorkCard
                        company="Meta"
                        role="Senior Engineer"
                        period="2019 - 2021"
                        location="Menlo Park"
                    />
                    <ProjectCard
                        name="design-system"
                        stars={2450}
                        description="200+ component library"
                    />
                    <SkillCard
                        title="Backend"
                        skills={['Node.js', 'Python', 'PostgreSQL']}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface WorkCardProps {
    company: string
    role: string
    period: string
    location: string
    current?: boolean
}

const WorkCard = ({ company, role, period, location, current }: WorkCardProps) => (
    <Card className={`break-inside-avoid ${current ? 'ring-2 ring-primary' : ''}`}>
        <CardContent className="p-5">
            {current && <Badge className="mb-2">Current</Badge>}
            <h3 className="font-bold">{role}</h3>
            <p className="text-sm text-primary mb-2">{company}</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="size-3" />{period}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
            </div>
        </CardContent>
    </Card>
)

interface TestimonialCardProps {
    quote: string
    author: string
    role: string
}

const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => (
    <Card className="break-inside-avoid bg-primary/5">
        <CardContent className="p-5">
            <Quote className="size-6 text-primary/30 mb-2" />
            <p className="text-sm italic mb-3">&quot;{quote}&quot;</p>
            <p className="text-xs font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
        </CardContent>
    </Card>
)

interface SkillCardProps {
    title: string
    skills: string[]
}

const SkillCard = ({ title, skills }: SkillCardProps) => (
    <Card className="break-inside-avoid">
        <CardContent className="p-5">
            <h4 className="font-medium mb-3">{title}</h4>
            <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface AwardCardProps {
    title: string
    org: string
    year: string
}

const AwardCard = ({ title, org, year }: AwardCardProps) => (
    <Card className="break-inside-avoid">
        <CardContent className="p-5 text-center">
            <Award className="size-8 text-primary mx-auto mb-2" />
            <h4 className="font-bold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground">{org} · {year}</p>
        </CardContent>
    </Card>
)

interface StatCardProps {
    value: string
    label: string
}

const StatCard = ({ value, label }: StatCardProps) => (
    <Card className="break-inside-avoid bg-primary text-primary-foreground">
        <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm opacity-80">{label}</p>
        </CardContent>
    </Card>
)

interface ProjectCardProps {
    name: string
    stars: number
    description: string
}

const ProjectCard = ({ name, stars, description }: ProjectCardProps) => (
    <Card className="break-inside-avoid">
        <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
                <FileCode className="size-4 text-primary" />
                <h4 className="font-mono font-bold text-sm">{name}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{description}</p>
            <div className="flex items-center gap-1 text-xs">
                <Star className="size-3 text-yellow-500 fill-current" />
                <span>{stars.toLocaleString()}</span>
            </div>
        </CardContent>
    </Card>
)

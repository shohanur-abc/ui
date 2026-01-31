import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Briefcase, GraduationCap, Trophy, User } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-2xl mx-auto">
                    <ProfileHeader
                        src="https://picsum.photos/seed/tabs1/400/400"
                        fallback="JD"
                        name="John Doe"
                        role="Full-Stack Developer"
                        bio="Building web applications with passion and precision."
                    />
                    <ProfileTabs
                        about="I'm a software developer with 8+ years of experience building web applications. I love solving complex problems and creating intuitive user experiences. When I'm not coding, you'll find me hiking or reading sci-fi novels."
                        experience={[
                            { role: 'Senior Developer', company: 'TechCorp', period: '2021–Present', description: 'Leading frontend development' },
                            { role: 'Developer', company: 'StartupXYZ', period: '2018–2021', description: 'Full-stack development' },
                            { role: 'Junior Developer', company: 'AgencyABC', period: '2016–2018', description: 'Website development' },
                        ]}
                        education={[
                            { degree: 'M.S. Computer Science', school: 'Stanford University', year: '2016' },
                            { degree: 'B.S. Computer Science', school: 'UC Berkeley', year: '2014' },
                        ]}
                        awards={[
                            { title: 'Developer of the Year', org: 'TechCorp', year: '2023' },
                            { title: 'Best Open Source Project', org: 'GitHub', year: '2022' },
                        ]}
                    />
                    <CTA label="Get in Touch" href="/contact" icon={ArrowRight} />
                </div>
            </div>
        </section>
    )
}

interface ProfileHeaderProps {
    src: string
    fallback: string
    name: string
    role: string
    bio: string
}

const ProfileHeader = ({ src, fallback, name, role, bio }: ProfileHeaderProps) => (
    <div className="text-center mb-8">
        <Avatar className="size-24 mx-auto mb-4 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-1">{name}</h1>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-muted-foreground text-sm">{bio}</p>
    </div>
)

interface ExperienceItem {
    role: string
    company: string
    period: string
    description: string
}

interface EducationItem {
    degree: string
    school: string
    year: string
}

interface AwardItem {
    title: string
    org: string
    year: string
}

interface ProfileTabsProps {
    about: string
    experience: ExperienceItem[]
    education: EducationItem[]
    awards: AwardItem[]
}

const ProfileTabs = ({ about, experience, education, awards }: ProfileTabsProps) => (
    <Tabs defaultValue="about" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about" className="gap-1">
                <User className="size-4" />
                <span className="hidden @sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="gap-1">
                <Briefcase className="size-4" />
                <span className="hidden @sm:inline">Work</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-1">
                <GraduationCap className="size-4" />
                <span className="hidden @sm:inline">Edu</span>
            </TabsTrigger>
            <TabsTrigger value="awards" className="gap-1">
                <Trophy className="size-4" />
                <span className="hidden @sm:inline">Awards</span>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="mt-6">
            <p className="text-muted-foreground leading-relaxed">{about}</p>
        </TabsContent>
        <TabsContent value="experience" className="mt-6 space-y-4">
            {experience.map((item, i) => (
                <div key={i} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-semibold">{item.role}</h3>
                            <p className="text-sm text-primary">{item.company}</p>
                        </div>
                        <Badge variant="secondary">{item.period}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
            ))}
        </TabsContent>
        <TabsContent value="education" className="mt-6 space-y-4">
            {education.map((item, i) => (
                <div key={i} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold">{item.degree}</h3>
                            <p className="text-sm text-muted-foreground">{item.school}</p>
                        </div>
                        <Badge variant="secondary">{item.year}</Badge>
                    </div>
                </div>
            ))}
        </TabsContent>
        <TabsContent value="awards" className="mt-6 space-y-4">
            {awards.map((item, i) => (
                <div key={i} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.org}</p>
                        </div>
                        <Badge variant="secondary">{item.year}</Badge>
                    </div>
                </div>
            ))}
        </TabsContent>
    </Tabs>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center">
        <Button className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)

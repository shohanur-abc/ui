import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, BookOpen, Briefcase, CheckCircle, Code2, GraduationCap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @3xl:grid-cols-2 gap-12 @xl:gap-16">
                    <ExperienceColumn
                        badge="Experience"
                        title="Professional Journey"
                        items={[
                            { title: 'Senior Software Engineer', company: 'Tech Corp', period: '2021 - Present', skills: ['React', 'Node.js', 'AWS'] },
                            { title: 'Full Stack Developer', company: 'StartupXYZ', period: '2018 - 2021', skills: ['Vue.js', 'Python', 'PostgreSQL'] },
                            { title: 'Junior Developer', company: 'Agency Inc', period: '2016 - 2018', skills: ['JavaScript', 'PHP', 'MySQL'] },
                        ]}
                    />

                    <EducationColumn
                        certifications={[
                            { icon: Award, title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2023' },
                            { icon: Code2, title: 'Google Cloud Professional', issuer: 'Google Cloud', year: '2022' },
                            { icon: BookOpen, title: 'Meta Frontend Developer', issuer: 'Meta', year: '2022' },
                        ]}
                        education={{
                            icon: GraduationCap,
                            degree: 'B.S. Computer Science',
                            school: 'University of Technology',
                            year: '2016',
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

interface ExperienceItem {
    title: string
    company: string
    period: string
    skills: string[]
}

interface ExperienceColumnProps {
    badge: string
    title: string
    items: ExperienceItem[]
}

const ExperienceColumn = ({ badge, title, items }: ExperienceColumnProps) => (
    <div>
        <Badge variant="outline" className="mb-4">
            <Briefcase className="size-3 mr-1.5" />
            {badge}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-8">
            {title}
        </h2>

        <div className="space-y-6">
            {items.map((item, i) => (
                <ExperienceCard key={i} {...item} />
            ))}
        </div>
    </div>
)

const ExperienceCard = ({ title, company, period, skills }: ExperienceItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{company}</p>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{period}</Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface CertificationItem {
    icon: ComponentType<{ className?: string }>
    title: string
    issuer: string
    year: string
}

interface EducationItem {
    icon: ComponentType<{ className?: string }>
    degree: string
    school: string
    year: string
}

interface EducationColumnProps {
    certifications: CertificationItem[]
    education: EducationItem
}

const EducationColumn = ({ certifications, education }: EducationColumnProps) => (
    <div className="space-y-8">
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="size-5 text-primary" />
                Certifications
            </h3>
            <div className="space-y-3">
                {certifications.map((cert, i) => (
                    <CertificationCard key={i} {...cert} />
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="size-5 text-primary" />
                Education
            </h3>
            <EducationCard {...education} />
        </div>
    </div>
)

const CertificationCard = ({ icon: Icon, title, issuer, year }: CertificationItem) => (
    <div className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/50 transition-all">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="size-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground">{issuer}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle className="size-3 text-green-500" />
            {year}
        </div>
    </div>
)

const EducationCard = ({ icon: Icon, degree, school, year }: EducationItem) => (
    <Card>
        <CardContent className="p-5 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="size-6 text-primary" />
            </div>
            <div>
                <h4 className="font-semibold">{degree}</h4>
                <p className="text-sm text-muted-foreground">{school}</p>
                <Badge variant="outline" className="text-xs mt-2">{year}</Badge>
            </div>
        </CardContent>
    </Card>
)

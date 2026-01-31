import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Briefcase} text="Experience" />
                    <Title text="Work History" />
                    <Description text="Roles and responsibilities across my career." />
                </div>

                <div className="grid @lg:grid-cols-2 gap-6 max-w-5xl">
                    <ExperienceCard
                        logo="https://github.com/google.png"
                        initials="TC"
                        company="TechCorp"
                        role="Principal Engineer"
                        type="Full-time"
                        period="Jan 2023 - Present"
                        location="San Francisco, CA"
                        responsibilities={[
                            'Leading technical direction for platform engineering',
                            'Managing architecture decisions across 5 product teams',
                            'Building design system used by 200+ engineers',
                            'Mentoring senior engineers for staff-level promotion',
                        ]}
                        current
                    />
                    <ExperienceCard
                        logo="https://github.com/facebook.png"
                        initials="SX"
                        company="StartupX"
                        role="Staff Engineer"
                        type="Full-time"
                        period="Mar 2021 - Dec 2022"
                        location="Remote"
                        responsibilities={[
                            'Built and scaled design system from ground up',
                            'Led frontend platform initiatives',
                            'Mentored 8 engineers across experience levels',
                            'Established coding standards and best practices',
                        ]}
                    />
                    <ExperienceCard
                        logo="https://github.com/facebook.png"
                        initials="M"
                        company="Meta"
                        role="Senior Software Engineer"
                        type="Full-time"
                        period="Jun 2019 - Feb 2021"
                        location="Menlo Park, CA"
                        responsibilities={[
                            'Developed Instagram Stories features',
                            'Optimized performance for billions of users',
                            'Led React Native performance improvements',
                            'Started leading my first team of 4 engineers',
                        ]}
                    />
                    <ExperienceCard
                        logo="https://github.com/stripe.png"
                        initials="S"
                        company="Stripe"
                        role="Software Engineer"
                        type="Full-time"
                        period="Aug 2017 - May 2019"
                        location="San Francisco, CA"
                        responsibilities={[
                            'Built merchant dashboards and payment flows',
                            'Contributed to the component library',
                            'Implemented accessibility improvements',
                            'Collaborated with design team on UX',
                        ]}
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

interface ExperienceCardProps {
    logo: string
    initials: string
    company: string
    role: string
    type: string
    period: string
    location: string
    responsibilities: string[]
    current?: boolean
}

const ExperienceCard = ({ logo, initials, company, role, type, period, location, responsibilities, current }: ExperienceCardProps) => (
    <Card className={`hover:shadow-lg transition-all ${current ? 'ring-2 ring-primary' : ''}`}>
        <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
                <Avatar className="size-12 rounded-xl border">
                    <AvatarImage src={logo} alt={company} />
                    <AvatarFallback className="rounded-xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold">{role}</h3>
                        {current && <Badge>Current</Badge>}
                    </div>
                    <p className="text-sm text-primary">{company} · {type}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar className="size-3" />{period}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
            </div>

            <ul className="space-y-2">
                {responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="size-4 text-primary mt-0.5 shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
)

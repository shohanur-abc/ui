import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Briefcase} text="Experience" />
                    <Title text="Work History" />
                    <Description text="A chronological list of my professional experience." />
                </div>

                <div className="max-w-3xl space-y-0">
                    <ExperienceItem
                        role="Principal Engineer"
                        company="TechCorp"
                        location="San Francisco, CA"
                        period="Jan 2023 - Present"
                        description="Leading technical direction for platform engineering. Overseeing architecture decisions across 5 product teams."
                        tags={['Leadership', 'Architecture', 'Strategy']}
                        current
                    />
                    <ExperienceItem
                        role="Staff Engineer"
                        company="StartupX"
                        location="Remote"
                        period="Mar 2021 - Dec 2022"
                        description="Built and scaled design system used by 200+ engineers. Led frontend platform initiatives."
                        tags={['Design Systems', 'React', 'TypeScript']}
                    />
                    <ExperienceItem
                        role="Senior Engineer"
                        company="Meta"
                        location="Menlo Park, CA"
                        period="Jun 2019 - Feb 2021"
                        description="Developed Instagram Stories features. Optimized performance for billions of users."
                        tags={['React Native', 'Performance', 'Scale']}
                    />
                    <ExperienceItem
                        role="Software Engineer"
                        company="Stripe"
                        location="San Francisco, CA"
                        period="Aug 2017 - May 2019"
                        description="Built merchant dashboards and payment flows. Contributed to component library."
                        tags={['Ruby', 'React', 'Payments']}
                    />
                    <ExperienceItem
                        role="Junior Developer"
                        company="Startup Inc"
                        location="New York, NY"
                        period="Jun 2015 - Jul 2017"
                        description="Full-stack development on SaaS platform. First engineering hire."
                        tags={['JavaScript', 'Node.js', 'MongoDB']}
                        isLast
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

interface ExperienceItemProps {
    role: string
    company: string
    location: string
    period: string
    description: string
    tags: string[]
    current?: boolean
    isLast?: boolean
}

const ExperienceItem = ({ role, company, location, period, description, tags, current, isLast }: ExperienceItemProps) => (
    <>
        <div className="py-8 group">
            <div className="flex flex-col @md:flex-row @md:items-start gap-4 @md:gap-8">
                <div className="@md:w-48 shrink-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="size-4" />
                        <span className="font-mono">{period}</span>
                    </div>
                    {current && <Badge className="mt-2">Current</Badge>}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{role}</h3>
                    <p className="text-primary mb-1">{company}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                        <MapPin className="size-3" />
                        {location}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        {!isLast && <Separator />}
    </>
)

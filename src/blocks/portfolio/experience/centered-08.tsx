import { Badge } from '@/components/ui/badge'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={GraduationCap} text="Education" />
                    <Title text="Academic Background" />
                    <Description text="My educational foundation in computer science." />
                </div>

                <div className="flex flex-col @lg:flex-row gap-8 justify-center max-w-4xl mx-auto">
                    <EducationCard
                        degree="Master of Science"
                        field="Computer Science"
                        school="Stanford University"
                        location="Stanford, CA"
                        period="2016 - 2018"
                        honors={['Research Fellowship', "Dean's List"]}
                    />
                    <EducationCard
                        degree="Bachelor of Science"
                        field="Computer Science"
                        school="UC Berkeley"
                        location="Berkeley, CA"
                        period="2012 - 2016"
                        honors={['Summa Cum Laude', 'Phi Beta Kappa']}
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

interface EducationCardProps {
    degree: string
    field: string
    school: string
    location: string
    period: string
    honors: string[]
}

const EducationCard = ({ degree, field, school, location, period, honors }: EducationCardProps) => (
    <div className="flex-1 text-center p-8 bg-background rounded-xl border">
        <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="size-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-1">{degree}</h3>
        <p className="text-primary mb-2">{field}</p>
        <p className="font-medium mb-4">{school}</p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><Calendar className="size-3" />{period}</span>
            <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
            {honors.map((honor, i) => (
                <Badge key={i} variant="secondary" className="text-xs gap-1">
                    <Award className="size-3" />
                    {honor}
                </Badge>
            ))}
        </div>
    </div>
)

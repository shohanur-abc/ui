import { Badge } from '@/components/ui/badge'
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react'
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

                <div className="max-w-5xl mx-auto space-y-16">
                    <EducationZigzag
                        degree="Master of Science"
                        field="Computer Science"
                        school="Stanford University"
                        location="Stanford, CA"
                        period="2016 - 2018"
                        gpa="3.9"
                        thesis="Distributed Caching Strategies for Large-Scale Web Applications"
                        honors={['Research Fellowship', "Dean's List"]}
                        align="left"
                    />
                    <EducationZigzag
                        degree="Bachelor of Science"
                        field="Computer Science"
                        school="UC Berkeley"
                        location="Berkeley, CA"
                        period="2012 - 2016"
                        gpa="3.8"
                        honors={['Summa Cum Laude', 'Phi Beta Kappa', 'CS Department Award']}
                        align="right"
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

interface EducationZigzagProps {
    degree: string
    field: string
    school: string
    location: string
    period: string
    gpa: string
    thesis?: string
    honors: string[]
    align: 'left' | 'right'
}

const EducationZigzag = ({ degree, field, school, location, period, gpa, thesis, honors, align }: EducationZigzagProps) => (
    <div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
        <div className={`${align === 'right' ? '@lg:order-2' : ''}`}>
            <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <GraduationCap className="size-8 text-primary" />
            </div>
            <h3 className="text-2xl @md:text-3xl font-bold mb-1">{degree}</h3>
            <p className="text-lg text-primary mb-2">{field}</p>
            <p className="font-medium mb-4">{school}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="size-4" />{period}</span>
                <span className="flex items-center gap-1"><MapPin className="size-4" />{location}</span>
                <Badge variant="outline">GPA: {gpa}/4.0</Badge>
            </div>
        </div>
        <div className={`p-6 bg-background rounded-xl border ${align === 'right' ? '@lg:order-1' : ''}`}>
            {thesis && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Thesis</p>
                    <p className="text-sm font-medium">{thesis}</p>
                </div>
            )}
            <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
                    <Award className="size-4 text-primary" />
                    Honors & Awards
                </h4>
                <div className="flex flex-wrap gap-2">
                    {honors.map((honor, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{honor}</Badge>
                    ))}
                </div>
            </div>
        </div>
    </div>
)

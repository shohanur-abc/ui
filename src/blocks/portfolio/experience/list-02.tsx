import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Calendar, MapPin, Award, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={GraduationCap} text="Education" />
                    <Title text="Academic Background" />
                    <Description text="Formal education and certifications." />
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                    <EducationItem
                        degree="Master of Science in Computer Science"
                        institution="Stanford University"
                        period="2013 - 2015"
                        location="Stanford, CA"
                        gpa="3.95 / 4.0"
                        honors="Honors with Distinction"
                        thesis="Optimizing React Applications at Scale"
                        thesisUrl="https://thesis.stanford.edu"
                    />
                    <EducationItem
                        degree="Bachelor of Science in Software Engineering"
                        institution="UC Berkeley"
                        period="2009 - 2013"
                        location="Berkeley, CA"
                        gpa="3.85 / 4.0"
                        honors="Magna Cum Laude"
                    />
                    <Card className="bg-muted/30">
                        <CardContent className="p-5 @md:p-6">
                            <h4 className="font-bold mb-3 flex items-center gap-2">
                                <Award className="size-4 text-primary" />
                                Professional Certifications
                            </h4>
                            <div className="grid @sm:grid-cols-2 gap-3">
                                <CertificationBadge name="AWS Solutions Architect" year="2023" />
                                <CertificationBadge name="Google Cloud Professional" year="2022" />
                                <CertificationBadge name="MongoDB Developer" year="2021" />
                                <CertificationBadge name="GraphQL Certified" year="2020" />
                            </div>
                        </CardContent>
                    </Card>
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

interface EducationItemProps {
    degree: string
    institution: string
    period: string
    location: string
    gpa: string
    honors: string
    thesis?: string
    thesisUrl?: string
}

const EducationItem = ({ degree, institution, period, location, gpa, honors, thesis, thesisUrl }: EducationItemProps) => (
    <Card className="hover:shadow-lg transition-all">
        <CardContent className="p-5 @md:p-6">
            <div className="flex flex-col @md:flex-row @md:items-start justify-between gap-3 mb-3">
                <div>
                    <h3 className="font-bold text-lg">{degree}</h3>
                    <p className="text-primary">{institution}</p>
                </div>
                <Badge variant="secondary">{honors}</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Calendar className="size-4" />{period}</span>
                <span className="flex items-center gap-1"><MapPin className="size-4" />{location}</span>
                <span className="flex items-center gap-1"><Award className="size-4" />GPA: {gpa}</span>
            </div>
            {thesis && (
                <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Thesis:</p>
                    <div className="flex items-center justify-between">
                        <p className="font-medium">{thesis}</p>
                        {thesisUrl && (
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={thesisUrl} target="_blank">
                                    View <ExternalLink className="size-3 ml-1" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </CardContent>
    </Card>
)

interface CertificationBadgeProps {
    name: string
    year: string
}

const CertificationBadge = ({ name, year }: CertificationBadgeProps) => (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
        <span className="text-sm font-medium">{name}</span>
        <Badge variant="outline" className="text-xs">{year}</Badge>
    </div>
)

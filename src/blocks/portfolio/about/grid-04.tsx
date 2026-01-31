import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-8">
                    <ImageSection
                        src="https://picsum.photos/seed/gr4/800/1000"
                        alt="Emma Wilson"
                    />
                    <div className="space-y-6">
                        <IntroCard
                            eyebrow="About Me"
                            name="Emma Wilson"
                            role="Designer & Developer"
                            bio="I'm a designer and developer based in New York City. I help companies create beautiful, functional digital products that solve real problems."
                        />
                        <ExperienceCard
                            title="Experience"
                            items={[
                                { role: 'Senior Designer', company: 'Google', period: '2020 - Present' },
                                { role: 'Product Designer', company: 'Airbnb', period: '2017 - 2020' },
                                { role: 'UI Designer', company: 'Stripe', period: '2015 - 2017' },
                            ]}
                        />
                        <EducationCard
                            title="Education"
                            items={[
                                { degree: 'M.F.A. Design', school: 'RISD', year: '2015' },
                                { degree: 'B.A. Visual Arts', school: 'Yale', year: '2013' },
                            ]}
                        />
                        <CTACard
                            title="Let's Work Together"
                            description="I'm available for freelance projects."
                            cta={{ label: 'Get in Touch', href: '/contact', icon: ArrowRight }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface ImageSectionProps {
    src: string
    alt: string
}

const ImageSection = ({ src, alt }: ImageSectionProps) => (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

interface IntroCardProps {
    eyebrow: string
    name: string
    role: string
    bio: string
}

const IntroCard = ({ eyebrow, name, role, bio }: IntroCardProps) => (
    <div>
        <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
        <h1 className="text-3xl @xl:text-4xl font-bold mb-2">{name}</h1>
        <p className="text-xl text-primary mb-4">{role}</p>
        <p className="text-muted-foreground">{bio}</p>
    </div>
)

interface ExperienceItem {
    role: string
    company: string
    period: string
}

interface ExperienceCardProps {
    title: string
    items: ExperienceItem[]
}

const ExperienceCard = ({ title, items }: ExperienceCardProps) => (
    <Card>
        <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.company} className="flex justify-between items-start">
                        <div>
                            <h3 className="font-medium">{item.role}</h3>
                            <p className="text-sm text-muted-foreground">{item.company}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0 text-xs">
                            <Calendar className="size-3 mr-1" />
                            {item.period}
                        </Badge>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface EducationItem {
    degree: string
    school: string
    year: string
}

interface EducationCardProps {
    title: string
    items: EducationItem[]
}

const EducationCard = ({ title, items }: EducationCardProps) => (
    <Card>
        <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="size-5" />
                {title}
            </h2>
            <div className="grid @sm:grid-cols-2 gap-4">
                {items.map((item) => (
                    <div key={item.school}>
                        <h3 className="font-medium">{item.degree}</h3>
                        <p className="text-sm text-muted-foreground">{item.school}, {item.year}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTACardProps {
    title: string
    description: string
    cta: CTAData
}

const CTACard = ({ title, description, cta }: CTACardProps) => (
    <Card className="bg-muted/50">
        <CardContent className="p-6 flex flex-col @sm:flex-row justify-between items-start @sm:items-center gap-4">
            <div>
                <h2 className="font-bold">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button className="gap-2 shrink-0" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

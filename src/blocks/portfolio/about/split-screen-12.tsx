import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Briefcase, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-5 gap-12 @lg:gap-16">
                    <ContentSection
                        eyebrow="About Me"
                        title="Nathan Brooks"
                        role="DevOps Engineer"
                        description="I automate everything. From CI/CD pipelines to infrastructure as code, I help teams ship faster and more reliably. Let's make your deployments boring—in the best way possible."
                        details={[
                            { icon: Briefcase, text: 'Sr. DevOps Engineer at Stripe' },
                            { icon: MapPin, text: 'Remote (San Francisco)' },
                            { icon: Calendar, text: 'Available for consulting' },
                        ]}
                        technologies={['Kubernetes', 'Terraform', 'AWS', 'Docker', 'GitHub Actions', 'Datadog']}
                        cta={{ label: 'Schedule a Call', href: '/consult', icon: ArrowRight }}
                    />
                    <ProfileSection
                        src="https://picsum.photos/seed/split12/600/600"
                        fallback="NB"
                        certifications={[
                            'AWS Solutions Architect Pro',
                            'CKA (Kubernetes)',
                            'HashiCorp Terraform Associate',
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface DetailItem {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ContentSectionProps {
    eyebrow: string
    title: string
    role: string
    description: string
    details: DetailItem[]
    technologies: string[]
    cta: CTAData
}

const ContentSection = ({ eyebrow, title, role, description, details, technologies, cta }: ContentSectionProps) => (
    <div className="@lg:col-span-3">
        <Badge variant="outline" className="mb-4">
            {eyebrow}
        </Badge>
        <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-lg text-primary font-medium mb-6">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
        <div className="space-y-2 mb-8">
            {details.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="size-4" />
                    <span>{text}</span>
                </div>
            ))}
        </div>
        <div className="mb-8">
            <p className="text-sm font-medium mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                        {tech}
                    </Badge>
                ))}
            </div>
        </div>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

interface ProfileSectionProps {
    src: string
    fallback: string
    certifications: string[]
}

const ProfileSection = ({ src, fallback, certifications }: ProfileSectionProps) => (
    <div className="@lg:col-span-2">
        <Avatar className="size-48 @md:size-56 mx-auto mb-6 ring-4 ring-border shadow-xl">
            <AvatarImage src={src} alt="Profile" />
            <AvatarFallback className="text-4xl @md:text-5xl bg-primary text-primary-foreground font-bold">
                {fallback}
            </AvatarFallback>
        </Avatar>
        <Card className="bg-muted/50 border-none">
            <CardContent className="p-4">
                <p className="text-sm font-medium mb-3 text-center">Certifications</p>
                <div className="space-y-2">
                    {certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="w-full justify-center py-1.5">
                            {cert}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
)

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, BookOpen, GraduationCap, Heart, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <ProfileSection
                        src="https://picsum.photos/seed/split15/600/600"
                        fallback="OM"
                        mission="Making tech education accessible to everyone"
                        values={[
                            { icon: Heart, text: 'Inclusivity' },
                            { icon: BookOpen, text: 'Continuous Learning' },
                            { icon: Users, text: 'Community' },
                        ]}
                    />
                    <ContentSection
                        eyebrow={{ icon: GraduationCap, text: 'Educator & Mentor' }}
                        title="Olivia Morgan"
                        role="Coding Bootcamp Instructor"
                        description="I've helped 1,000+ students transition into tech careers. From career changers to first-gen college students, I believe everyone deserves access to quality tech education."
                        stats={[
                            { value: '1,000+', label: 'Students Taught' },
                            { value: '95%', label: 'Job Placement Rate' },
                            { value: '5', label: 'Years Teaching' },
                        ]}
                        testimonial={{
                            quote: "Olivia's teaching changed my life. I went from retail to software engineering in 6 months.",
                            author: 'Former Student',
                        }}
                        cta={{ label: 'Book Mentorship', href: '/mentorship', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface ValueItem {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface ProfileSectionProps {
    src: string
    fallback: string
    mission: string
    values: ValueItem[]
}

const ProfileSection = ({ src, fallback, mission, values }: ProfileSectionProps) => (
    <div className="flex flex-col items-center @lg:items-start">
        <Avatar className="size-48 @md:size-64 mb-8 ring-4 ring-primary/20 shadow-xl">
            <AvatarImage src={src} alt="Profile" />
            <AvatarFallback className="text-5xl @md:text-6xl bg-primary text-primary-foreground font-bold">
                {fallback}
            </AvatarFallback>
        </Avatar>
        <Card className="w-full bg-muted/50 border-none">
            <CardContent className="p-6">
                <p className="text-sm font-medium mb-2">My Mission</p>
                <p className="text-muted-foreground italic mb-4">&ldquo;{mission}&rdquo;</p>
                <Separator className="my-4" />
                <div className="flex justify-around">
                    {values.map(({ icon: Icon, text }, i) => (
                        <div key={i} className="text-center">
                            <Icon className="size-5 text-primary mx-auto mb-1" />
                            <span className="text-xs">{text}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
)

interface EyebrowData {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface StatItem {
    value: string
    label: string
}

interface TestimonialData {
    quote: string
    author: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ContentSectionProps {
    eyebrow: EyebrowData
    title: string
    role: string
    description: string
    stats: StatItem[]
    testimonial: TestimonialData
    cta: CTAData
}

const ContentSection = ({ eyebrow, title, role, description, stats, testimonial, cta }: ContentSectionProps) => (
    <div>
        <Badge variant="secondary" className="mb-4">
            <eyebrow.icon className="size-3.5 mr-1" />
            {eyebrow.text}
        </Badge>
        <h1 className="text-4xl @sm:text-5xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-lg text-primary font-medium mb-6">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
        <div className="flex gap-8 mb-8">
            {stats.map(({ value, label }, i) => (
                <div key={i} className="text-center">
                    <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                </div>
            ))}
        </div>
        <Card className="bg-primary/5 border-primary/20 mb-8">
            <CardContent className="p-4">
                <p className="text-sm italic text-muted-foreground mb-2">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="text-xs font-medium">— {testimonial.author}</p>
            </CardContent>
        </Card>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)
